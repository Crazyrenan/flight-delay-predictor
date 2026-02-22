import os
import joblib
import pandas as pd
from fastapi import APIRouter, HTTPException
from app.schemas.price import PricePredictionRequest
from app.core.config import settings

router = APIRouter()

# 1. Deklarasi nama variabel yang konsisten
price_model = None
price_encoders = {}

# 2. Proses load dengan proteksi path
try:
    if os.path.exists(settings.PRICE_MODEL_PATH) and os.path.exists(settings.PRICE_ENCODER_PATH):
        price_model = joblib.load(settings.PRICE_MODEL_PATH)
        price_encoders = joblib.load(settings.PRICE_ENCODER_PATH)
except Exception as e:
    print(f"Critical Load Error: {e}")

@router.get("/price-options")
def get_price_options():
    if not price_encoders:
        return {"airlines": [], "cities": []}

    try:
        airlines = price_encoders.get('airline').classes_.tolist() if 'airline' in price_encoders else []
        origins = price_encoders.get('origin').classes_.tolist() if 'origin' in price_encoders else []
        destinations = price_encoders.get('destination').classes_.tolist() if 'destination' in price_encoders else []
        
        raw_cities = origins + destinations
        cities = sorted(list(set([str(c) for c in raw_cities if str(c).lower() != 'nan'])))
        
        return {"airlines": airlines, "cities": cities}
    except Exception as e:
        print(f"Options Endpoint Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict-price")
async def predict_price(request: PricePredictionRequest):
    # 3. Validasi dengan variabel yang benar
    if price_model is None or not price_encoders:
        raise HTTPException(status_code=500, detail="Models or Encoders not loaded.")

    try:
        input_dict = {
            "airline": request.airline,
            "origin": request.origin,
            "destination": request.destination,
            "duration_mins": float(request.duration_mins)
        }

        # 4. Transformasi kategorikal menjadi integer skalar
        for col in ['airline', 'origin', 'destination']:
            le = price_encoders.get(col)
            val = str(input_dict[col])
            
            if le and val in le.classes_:
                input_dict[col] = int(le.transform([val])[0])
            else:
                input_dict[col] = 0

        # 5. Eksekusi DataFrame
        df_input = pd.DataFrame([input_dict])
        
        for col in ['airline', 'origin', 'destination']:
            df_input[col] = df_input[col].astype(int)

        df_input = df_input[['airline', 'origin', 'destination', 'duration_mins']]

        # 6. Prediksi
        prediction = price_model.predict(df_input)
        return {"estimated_price": float(abs(prediction[0]))}

    except Exception as e:
        print(f"DEBUG Inference Error: {e}")
        raise HTTPException(status_code=500, detail=f"Inference Error: {str(e)}")