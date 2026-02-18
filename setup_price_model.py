import kagglehub
import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBRegressor

def setup_and_train():
    path = kagglehub.dataset_download("joyshil0599/comprehensive-flight-data-from-priceline")

    csv_file = None
    for file in os.listdir(path):
        if file.endswith(".csv"):
            csv_file = os.path.join(path, file)
            break
            
    if not csv_file: 
        raise FileNotFoundError("No CSV file found in the downloaded dataset")

    df = pd.read_csv(csv_file, low_memory=False)
    df.columns = df.columns.str.strip().str.lower()
    
    column_mapping = {
        'ticket prize(doller)': 'price',  
        'ticket price(dollar)': 'price', 
        'airline name': 'airline',
        'depreture airport': 'origin',
        'destination airport': 'destination',
        'travel time':'duration'
    }    
    df = df.rename(columns=column_mapping)

    if 'price' not in df.columns:
        possible_price = [c for c in df.columns if 'prize' in c or 'price' in c]
        if possible_price:
            df = df.rename(columns={possible_price[0]: 'price'})
        else:
            raise KeyError(f"Kolom 'price' tidak ditemukan. Kolom ada: {list(df.columns)}")
    
    df = df.dropna(subset=['price'])

    if df['price'].dtype == object:
        df['price'] = df['price'].astype(str).str.replace('$', '', regex=False).str.replace(',', '', regex=False)
        df['price'] = pd.to_numeric(df['price'], errors='coerce')
    df = df.dropna(subset=['price'])

    def parse_duration(duration_str):
        if pd.isna(duration_str): return 0
        s = str(duration_str).lower().strip()
        h, m = 0, 0
        try:
            if 'h' in s:
                parts = s.split('h')
                h = int(parts[0].strip()) if parts[0].strip().isdigit() else 0
                if len(parts) > 1 and 'm' in parts[1]:
                    m_part = parts[1].split('m')[0].strip()
                    m = int(m_part) if m_part.isdigit() else 0
            elif 'm' in s:
                m_part = s.split('m')[0].strip()
                m = int(m_part) if m_part.isdigit() else 0
        except:
            return 0
        return h * 60 + m  # Perbaikan: h * 60 + m (bukan kali)
    
    if 'duration' in df.columns:
        df['duration_mins'] = df['duration'].apply(parse_duration)
    else:
        # Coba cari kolom yang mengandung 'time' dan 'travel' (misal: 'travel  time')
        time_col = [c for c in df.columns if 'time' in c and 'travel' in c]
        if time_col:
            # PERBAIKAN: df[nama_kolom].apply(...) bukan nama_kolom.apply(...)
            df['duration_mins'] = df[time_col[0]].apply(parse_duration)
        else:
            df['duration_mins'] = 0
    
    encoders = {}
    categorical_cols = ['airline', 'origin', 'destination']

    for col in categorical_cols:
        if col in df.columns:
            le = LabelEncoder()
            df[col] = df[col].astype(str)
            df[col] = le.fit_transform(df[col])
            encoders[col] = le

    features = ['airline', 'origin', 'destination', 'duration_mins']
    target = 'price'

    final_features = [f for f in features if f in df.columns]
    X = df[final_features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"✅ R2 Score: {score:.4f}")

    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/xgb_price.pkl")
    joblib.dump(encoders, "models/price_encoders.pkl")
    print("🎉 SUCCESS! Models saved in models/ folder.")

if __name__ == "__main__":
    setup_and_train()