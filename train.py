import pandas as pd
import numpy as np
import joblib
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, roc_auc_score
import os

# CONFIG
DATA_PATH = os.path.join('data', 'raw', 'Flight_Delay.parquet')
MODEL_DIR = 'models'
MODEL_PATH = os.path.join(MODEL_DIR, 'xgb_flight_delay.pkl')
ENCODER_PATH = os.path.join(MODEL_DIR, 'encoders.pkl')

def train_model():
    print("--- VERSION 3.0: NO CANCELLED COLUMN ---") 
    
    # 0. Safety Check
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)

    print(f"--- [PHASE 1] Loading Data from {DATA_PATH} ---")
    
    # STRICT LIST: No 'Cancelled', No 'DayOfWeek'
    cols = [
        'Month', 'FlightDate', 'CRSDepTime', 
        'Marketing_Airline_Network', 'OriginCityName', 'DestCityName', 
        'ArrDelayMinutes' 
    ]
    
    try:
        df = pd.read_parquet(DATA_PATH, columns=cols, engine='pyarrow')
    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return

    # Filter: Implicitly remove cancelled flights by dropping rows with no Delay info
    initial_len = len(df)
    df = df.dropna(subset=['ArrDelayMinutes'])
    print(f"Dropped {initial_len - len(df)} rows (Cancelled or invalid data).")

    # MVP Speed Hack
    if len(df) > 1_000_000:
        print(f"Dataset is huge ({len(df)} rows). Sampling 500k for MVP training...")
        df = df.sample(n=500_000, random_state=42)

    print(f"Training on {len(df):,} flights.")

    print("--- [PHASE 2] Feature Engineering ---")
    # 1. Target: Binary Classification
    df['is_delayed'] = (df['ArrDelayMinutes'] > 15).astype(int)
    
    # 2. Time of Day (Binning)
    df['DepHour'] = (df['CRSDepTime'] // 100).astype(int)
    
    # 3. Calculate DayOfWeek from FlightDate
    print("Converting FlightDate...")
    df['FlightDate'] = pd.to_datetime(df['FlightDate'])
    df['DayOfWeek'] = df['FlightDate'].dt.dayofweek + 1 

    # 4. Cyclical Features
    df['Month_Sin'] = np.sin(2 * np.pi * df['Month'] / 12)
    df['Month_Cos'] = np.cos(2 * np.pi * df['Month'] / 12)
    df['Day_Sin'] = np.sin(2 * np.pi * df['DayOfWeek'] / 7)
    df['Day_Cos'] = np.cos(2 * np.pi * df['DayOfWeek'] / 7)

    # 5. Encoders
    print("Encoding categories...")
    categorical_cols = ['Marketing_Airline_Network', 'OriginCityName', 'DestCityName']
    encoders = {}
    
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    # Features (X) and Target (y)
    features = ['DepHour', 'Month_Sin', 'Month_Cos', 'Day_Sin', 'Day_Cos', 
                'Marketing_Airline_Network', 'OriginCityName', 'DestCityName']
    X = df[features]
    y = df['is_delayed']

    # Scale Pos Weight
    neg, pos = np.bincount(y)
    scale_pos_weight = neg / pos
    print(f"Class Imbalance: 1 delayed flight for every {neg/pos:.1f} on-time flights.")

    print("--- [PHASE 3] Training XGBoost ---")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = xgb.XGBClassifier(
        n_estimators=100,      
        learning_rate=0.1,     
        max_depth=7,           
        scale_pos_weight=scale_pos_weight,
        eval_metric='logloss',
        n_jobs=-1              
    )
    
    model.fit(X_train, y_train)

    print("--- [PHASE 4] Evaluation ---")
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    print(classification_report(y_test, y_pred))
    print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")

    print("--- [PHASE 5] Saving Artifacts ---")
    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoders, ENCODER_PATH)
    print(f"Model saved to {MODEL_PATH}")

if __name__ == "__main__":
    train_model()