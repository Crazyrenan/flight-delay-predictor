import os
import jwt
import sqlite3
from dotenv import load_dotenv
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

load_dotenv()

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key_for_dev_only")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
DB_PATH = os.getenv("DB_PATH", "windbreaker_users.db")


pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# --- SCHEMAS ---

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr
    new_password: str



def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: sqlite3.Connection = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token tidak valid atau sudah kedaluwarsa",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
        
    user = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if user is None:
        raise credentials_exception
    return user

# --- AUTH ENDPOINTS ---

@router.post("/api/register", status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: sqlite3.Connection = Depends(get_db)):
    existing = db.execute("SELECT * FROM users WHERE email = ?", (user.email,)).fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")
    
    hashed_password = pwd_context.hash(user.password)
    db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
               (user.name, user.email, hashed_password))
    db.commit()
    return {"message": "Registrasi berhasil"}

@router.post("/api/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: sqlite3.Connection = Depends(get_db)):
    user = db.execute("SELECT * FROM users WHERE email = ?", (form_data.username,)).fetchone()
    if not user or not pwd_context.verify(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user_name": user["name"]}

@router.post("/api/forgot-password")
def forgot_password(req: ForgotPassword, db: sqlite3.Connection = Depends(get_db)):
    db_user = db.execute("SELECT * FROM users WHERE email = ?", (req.email,)).fetchone()
    if not db_user:
        raise HTTPException(status_code=404, detail="Email tidak ditemukan")
    
    hashed_password = pwd_context.hash(req.new_password)
    db.execute("UPDATE users SET password = ? WHERE email = ?", (hashed_password, req.email))
    db.commit()
    return {"message": "Password berhasil diperbarui"}

@router.get("/api/me")
def read_users_me(current_user: sqlite3.Row = Depends(get_current_user)):
    return {"email": current_user["email"], "name": current_user["name"]}