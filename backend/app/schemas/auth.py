from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr
    new_password: str
