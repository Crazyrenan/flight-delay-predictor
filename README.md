<p align="center"> <img src="https://i.pinimg.com/1200x/0f/bd/53/0fbd53c826baa95aae48b5fa97dd8ece.jpg" alt="WINDBREAKER Header" width="100%"/> </p> <h1 align="center">✈️ WINDBREAKER.Ai</h1> <p align="center"><b>Enterprise-Grade Flight Delay Predictive Analytics</b></p>
📌 Overview

WINDBREAKER.Ai adalah solusi analitik prediktif modern yang dirancang untuk industri penerbangan. Proyek ini mengintegrasikan model Machine Learning berperforma tinggi dengan arsitektur web production-ready untuk memprediksi keterlambatan penerbangan secara real-time berdasarkan data operasional.

🌟 Key Features

🚀 High-Performance ML Model
Menggunakan algoritma XGBoost (XGBClassifier) yang dioptimalkan untuk klasifikasi status keterlambatan secara akurat.

⚡ Asynchronous API
Backend berbasis FastAPI dengan dukungan asynchronous request handling untuk efisiensi dan skalabilitas tinggi.

🖥 Interactive Dashboard
Antarmuka modern berbasis React + TypeScript (Vite) untuk input data penerbangan dan visualisasi hasil prediksi.

🔄 Automated Data Transformation
Pemrosesan fitur kategorikal seperti Origin dan Dest menggunakan LabelEncoder secara konsisten antara training dan inference.

🛠 Tech Stack
🔹 AI & Backend Engine

Language: Python 3.10+

Framework: FastAPI (ASGI)

ML Libraries:

XGBoost

Scikit-Learn

Pandas

Model Serialization:

Joblib

Pickle

🔹 Frontend (Production UI)

Framework: React.js + TypeScript (Vite)

Styling: Tailwind CSS

HTTP Client: Axios

🚀 Installation Guide
1️⃣ Backend Setup (API)

Masuk ke direktori utama proyek, lalu jalankan:

# Install dependencies
pip install pandas scikit-learn xgboost fastapi uvicorn joblib

# Run API server
python api.py

Server akan berjalan di:

http://localhost:8000

Dokumentasi interaktif tersedia di:

http://localhost:8000/docs
2️⃣ Frontend Setup (Web)

Buka terminal baru, masuk ke folder web, lalu jalankan:

cd web
npm install
npm run dev

Aplikasi frontend akan berjalan secara default di:

http://localhost:5173
📊 Machine Learning Methodology

Pengembangan model WINDBREAKER.Ai meliputi:

🔹 1. Feature Selection

Identifikasi variabel kunci seperti:

DepTime

DepDelay

CRSArrTime

Origin

Dest

🔹 2. Categorical Encoding

Transformasi fitur kategorikal menggunakan LabelEncoder yang konsisten antara tahap pelatihan dan inference.

🔹 3. Model Training

Optimisasi model XGBoost untuk meminimalkan error pada target prediksi keterlambatan kedatangan (ARR_DELAY).

📁 Project Structure (Optional but Recommended)
WINDBREAKER.Ai/
│
├── api.py
├── model/
│   ├── xgb_model.pkl
│   ├── encoder_origin.pkl
│   └── encoder_dest.pkl
│
├── web/
│   ├── src/
│   └── package.json
│
└── README.md
📫 Contact

Jonathan Axl Wibowo

🌐 Portfolio: https://jonathanaxl.id

💼 LinkedIn: https://linkedin.com/in/jonathanaxl

📧 Email: jonathan.axlw@gmail.com

<p align="center"> <i>Dikembangkan dengan fokus pada integritas data, skalabilitas sistem, dan pengalaman pengguna yang optimal.</i> </p>
