import pandas as pd
import numpy as np
import xgboost as xgb
import joblib
import os
import re
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

DATA_PATH = "backend/flight.csv"
MODEL_DIR = "backend/models"

def train_price_logic():
    # Load data
    df = pd.read_csv(DATA_PATH, low_memory=False)
    
    # 1. DEEP CLEAN COLUMN NAMES
    # Ini akan menghapus karakter \xa0 (non-breaking space) dan spasi ganda
    df.columns = [re.sub(r'\s+', ' ', col.replace('\xa0', ' ')).strip() for col in df.columns]
    
    # 2. MAPPING DENGAN TOLERANSI TYPO
    # Kita cari kolom yang paling mendekati jika nama eksak gagal
    def find_col(possible_names):
        for name in possible_names:
            if name in df.columns: return name
        return None

    airline_col = find_col(['airline', 'Airline name', 'Marketing_Airline_Network'])
    dest_col = find_col(['destination', 'Destination Airport', 'DestCityName'])
    price_col = find_col(['price', 'Ticket prize(Doller)', 'Ticket prize'])
    time_col = find_col(['Travel Time', 'Travel Time', 'travel_time'])

    # Jika pencarian nama gagal, gunakan index kolom berdasarkan log DEBUG Anda:
    # Index 0: airline, Index 1: Travel Time, Index 4: price, Index 13: destination
    if not time_col: time_col = df.columns[1]
    if not airline_col: airline_col = df.columns[0]
    if not price_col: price_col = df.columns[4]
    if not dest_col: dest_col = df.columns[13]

    print(f"Menggunakan kolom: Time={time_col}, Airline={airline_col}, Price={price_col}, Dest={dest_col}")

    # 3. PARSING DURASI
    def parse_to_mins(s):
        if pd.isna(s) or s == '': return 0
        s = str(s).replace('\xa0', ' ')
        h, m = 0, 0
        h_match = re.search(r'(\d+)\s*h', s)
        m_match = re.search(r'(\d+)\s*m', s)
        if h_match: h = int(h_match.group(1))
        if m_match: m = int(m_match.group(1))
        return (h * 60) + m

    df['duration_mins'] = df[time_col].apply(parse_to_mins)

    # 4. CLEANING PRICE
    if df[price_col].dtype == 'object':
        df['price_clean'] = df[price_col].str.replace(r'[^\d.]', '', regex=True).replace('', '0').astype(float)
    else:
        df['price_clean'] = df[price_col].fillna(0).astype(float)

    # 5. ENCODING
    encoders = {}
    for target, col_name in [('airline', airline_col), ('destination', dest_col)]:
        le = LabelEncoder()
        df[target + '_enc'] = le.fit_transform(df[col_name].astype(str).str.strip().fillna('Unknown'))
        encoders[target] = le

    # 6. TRAINING
    # Fitur: Airline (encoded), Destination (encoded), Duration (mins)
    X = df[['airline_enc', 'destination_enc', 'duration_mins']]
    X.columns = ['airline', 'destination', 'duration_mins'] # Rename untuk model
    y = df['price_clean']
    
    model = xgb.XGBRegressor(
        objective='reg:squarederror', 
        n_estimators=1000,
        learning_rate=0.05,
        max_depth=6
    )
    
    print("Mulai training model...")
    model.fit(X, y)

    # 7. EXPORT
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(model, f"{MODEL_DIR}/xgb_price.pkl")
    joblib.dump(encoders, f"{MODEL_DIR}/price_encoders.pkl")
    
    print("SUCCESS: Retraining Completed.")

if __name__ == "__main__":
    train_price_logic()