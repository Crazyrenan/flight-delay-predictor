from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

# 1. SETUP
app = FastAPI(title="Flight Delay Predictor API")

# Penting agar React (Frontend) bisa akses API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. LOAD MODELS
MODEL_PATH = os.path.join('models', 'xgb_flight_delay.pkl')
ENCODER_PATH = os.path.join('models', 'encoders.pkl')

print("Loading model artifacts...")
model = joblib.load(MODEL_PATH)
encoders = joblib.load(ENCODER_PATH)

# 3. SCHEMA
class FlightInput(BaseModel):
    airline: str      # e.g. "DL"
    origin: str       # e.g. "Atlanta, GA"
    destination: str  # e.g. "Los Angeles, CA"
    date: str         # "YYYY-MM-DD"
    time: str         # "HH:MM"

# 4. ENDPOINTS
@app.post("/predict")
def predict_delay(input: FlightInput):
    try:
        # A. Preprocessing Date/Time
        dt = pd.to_datetime(input.date)
        dep_time = pd.to_datetime(input.time, format='%H:%M')
        
        month = dt.month
        day_of_week = dt.dayofweek + 1
        dep_hour = dep_time.hour
        
        # B. Cyclical Features
        month_sin = np.sin(2 * np.pi * month / 12)
        month_cos = np.cos(2 * np.pi * month / 12)
        day_sin = np.sin(2 * np.pi * day_of_week / 7)
        day_cos = np.cos(2 * np.pi * day_of_week / 7)

        # C. Encode Categories
        airline_enc = encoders['Marketing_Airline_Network'].transform([input.airline])[0]
        origin_enc = encoders['OriginCityName'].transform([input.origin])[0]
        dest_enc = encoders['DestCityName'].transform([input.destination])[0]

        # D. Predict
        features = [dep_hour, month_sin, month_cos, day_sin, day_cos, 
                    airline_enc, origin_enc, dest_enc]
        
        input_df = pd.DataFrame([features], columns=[
            'DepHour', 'Month_Sin', 'Month_Cos', 'Day_Sin', 'Day_Cos', 
            'Marketing_Airline_Network', 'OriginCityName', 'DestCityName'
        ])

        prob = model.predict_proba(input_df)[0][1]

        return {
            "prediction": "DELAYED" if prob > 0.5 else "ON TIME",
            "probability": float(round(prob, 4)),
            "risk_score": int(prob * 100)
        }

    except Exception as e:
        raise HTTPException(
        status_code=400, 
        detail=f"Input tidak dikenal: {str(e)}. Pastikan menggunakan kode maskapai (misal: AA) dan nama kota yang sesuai dataset."
    )

@app.get("/")
def health():
    return {"status": "online"}