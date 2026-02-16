<p align="center">
  <img src="https://i.pinimg.com/1200x/0f/bd/53/0fbd53c826baa95aae48b5fa97dd8ece.jpg" alt="WINDBREAKER Header" width="100%"/>
</p>

# ✈️ WINDBREAKER.Ai
### *Enterprise-Grade Flight Delay Predictive Analytics*

**WINDBREAKER.Ai** adalah solusi analitik prediktif modern yang dirancang untuk industri penerbangan. Proyek ini mengintegrasikan *Machine Learning* performa tinggi dengan arsitektur web produksi untuk memprediksi keterlambatan penerbangan secara real-time berdasarkan data operasional.

---

## 🌟 Fitur Unggulan
- **High-Performance ML Model**: Menggunakan algoritma **XGBoost** (XGBClassifier) yang dioptimalkan untuk klasifikasi status keterlambatan secara akurat.
- **Asynchronous API**: Backend berbasis **FastAPI** yang mendukung pemrosesan permintaan prediksi secara asinkron untuk efisiensi tinggi.
- **Interactive Dashboard**: Antarmuka pengguna modern yang dibangun dengan **React** untuk pengisian data penerbangan dan visualisasi hasil prediksi.
- **Automated Data Transformation**: Menggunakan **LabelEncoder** untuk memproses fitur kategorikal seperti bandara asal (`Origin`) dan tujuan (`Dest`) secara instan.

---

## 🛠 Tech Stack

### **AI & Backend Engine**
- **Language**: Python 3.10+
- **Framework**: FastAPI (ASGI Server)
- **ML Libraries**: XGBoost, Scikit-Learn, Pandas
- **Inference**: Joblib & Pickle untuk memuat model dan encoder yang telah dilatih.

### **Frontend (Production UI)**
- **Framework**: React.js dengan TypeScript (Vite)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios untuk komunikasi data dengan API.

---

## 🚀 Panduan Instalasi

### 1. Persiapan Backend (API)
Masuk ke direktori utama proyek, lalu jalankan:


# Instal dependensi yang diperlukan
pip install pandas scikit-learn xgboost fastapi uvicorn joblib

# Jalankan server API
python api.py
API akan berjalan di http://localhost:8000. Dokumentasi interaktif tersedia di /docs.

2. Persiapan Frontend (Web)
Buka terminal baru, masuk ke folder web, lalu jalankan:

Bash

cd web
npm install
npm run dev
📊 Metodologi Machine Learning
Proses pengembangan model WINDBREAKER.Ai meliputi:

Feature Selection: Mengidentifikasi variabel kunci seperti waktu keberangkatan (DepTime), keterlambatan keberangkatan (DepDelay), dan jadwal tiba (CRSArrTime).

Categorical Encoding: Transformasi data bandara dan maskapai menggunakan Label Encoder yang konsisten antara tahap pelatihan dan inferensi.

Model Training: Optimalisasi XGBoost untuk meminimalkan error pada target prediksi keterlambatan kedatangan (ARR_DELAY).

📫 Kontak & Kontribusi
Jonathan Axl Wibowo

LinkedIn: Jonathan Axl Wibowo

Email: jonathan.axlw@gmail.com

Portfolio: jonathanaxl.id

<p align="center">
<i>Dikembangkan dengan fokus pada integritas data dan pengalaman pengguna yang luar biasa.</i>
</p>
```bash
