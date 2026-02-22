from fastapi import APIRouter, HTTPException, Depends
from app.schemas.flight import FlightInput
from app.api.deps import get_current_user
from app.core.config import settings
import joblib
import pandas as pd
import numpy as np

router = APIRouter()

delay_model = joblib.load(settings.DELAY_MODEL_PATH)
delay_encoders = joblib.load(settings.DELAY_ENCODER_PATH)

@router.post("/predict-delay")
async def predict_delay(req: FlightInput, current_user: dict = Depends(get_current_user)):
    try:
        dt = pd.to_datetime(req.date)
        dep_time = pd.to_datetime(req.time, format='%H:%M')
        
        month = dt.month
        day_of_week = dt.dayofweek + 1
        dep_hour = dep_time.hour
        
        month_sin = np.sin(2 * np.pi * month / 12)
        month_cos = np.cos(2 * np.pi * month / 12)
        day_sin = np.sin(2 * np.pi * day_of_week / 7)
        day_cos = np.cos(2 * np.pi * day_of_week / 7)

        try:
            airline_enc = delay_encoders['Marketing_Airline_Network'].transform([req.airline])[0]
        except ValueError:
            airline_enc = 0
            
        try:
            origin_enc = delay_encoders['OriginCityName'].transform([req.origin])[0]
        except ValueError:
            origin_enc = 0

        try:
            dest_enc = delay_encoders['DestCityName'].transform([req.destination])[0]
        except ValueError:
            dest_enc = 0

        features = [dep_hour, month_sin, month_cos, day_sin, day_cos, 
                    airline_enc, origin_enc, dest_enc]
        
        input_df = pd.DataFrame([features], columns=[
            'DepHour', 'Month_Sin', 'Month_Cos', 'Day_Sin', 'Day_Cos', 
            'Marketing_Airline_Network', 'OriginCityName', 'DestCityName'
        ])

        prob = delay_model.predict_proba(input_df)[0][1]

        return {
            "prediction": "DELAYED" if prob > 0.5 else "ON TIME",
            "probability": float(round(prob, 4)),
            "risk_score": int(prob * 100)
        }

    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Inference Error: {str(e)}"
        )

@router.get("/delay-options")
def get_delay_options():
    try:
        airlines = delay_encoders['Marketing_Airline_Network'].classes_.tolist()
        origins = delay_encoders['OriginCityName'].classes_.tolist()
        destinations = delay_encoders['DestCityName'].classes_.tolist()
        cities = sorted(list(set(origins + destinations)))
        return {"airlines": airlines, "cities": cities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))