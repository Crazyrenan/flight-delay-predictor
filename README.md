<p align="center">
  <img src="https://i.pinimg.com/1200x/0f/bd/53/0fbd53c826baa95aae48b5fa97dd8ece.jpg" alt="WINDBREAKER Header" width="100%"/>
</p>

# ✈️ WINDBREAKER.Ai
### *Enterprise-Grade Flight Delay Predictive Analytics*

**WINDBREAKER.Ai** adalah solusi analitik prediktif modern yang dirancang untuk industri penerbangan. Proyek ini mengintegrasikan *Machine Learning* performa tinggi dengan arsitektur web produksi untuk memprediksi keterlambatan penerbangan secara real-time berdasarkan data historis dan operasional.

---

## 🌟 Fitur Unggulan
- **High-Performance ML Model**: Menggunakan algoritma **XGBoost** yang dioptimalkan untuk klasifikasi delay yang akurat.
- **Asynchronous API**: Backend berbasis **FastAPI** yang mendukung pemrosesan permintaan konkuren dengan latensi rendah.
- **Modern User Interface**: Dashboard interaktif yang dibangun dengan **React** dan **Tailwind CSS** untuk visualisasi prediksi yang jernih.
- **Automated Preprocessing**: Pipeline data menggunakan **Scikit-Learn Label Encoders** untuk transformasi fitur kategorikal secara instan.

---

## 🛠 Tech Stack

### **AI & Backend Engine**
- **Language**: Python 3.10+
- **Framework**: FastAPI (Production-ready ASGI server)
- **ML Libraries**: XGBoost, Scikit-Learn, Pandas, Joblib
- **Model Storage**: Pickle-based serialization for fast inference

### **Frontend (Production UI)**
- **Library**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios

---

## 🏗 Arsitektur Proyek
Sistem ini menggunakan pemisahan tanggung jawab yang ketat untuk memastikan skalabilitas:
1. **Model Training (`train.py`)**: Skrip untuk melatih model XGBoost dan mengekspor encoder fitur.
2. **Inference API (`api.py`)**: Server backend yang memuat model terlatih dan menyediakan endpoint prediksi `/predict`.
3. **Frontend Dashboard (`/web`)**: Antarmuka pengguna yang mengonsumsi API untuk menyajikan hasil prediksi secara visual.

---

## 🚀 Panduan Instalasi

### 1. Persiapan Backend (API)
Pastikan Python sudah terinstal, lalu jalankan:
```bash

# Instal dependensi
pip install pandas scikit-learn xgboost fastapi uvicorn joblib

# Jalankan server
python api.py
