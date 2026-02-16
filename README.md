<p align="center">
  <img src="https://i.pinimg.com/1200x/0f/bd/53/0fbd53c826baa95aae48b5fa97dd8ece.jpg" alt="WINDBREAKER Header" width="100%"/>
</p>

<h1 align="center">✈️ WINDBREAKER.Ai</h1>
<p align="center"><b>Enterprise-Grade Flight Delay Predictive Analytics</b></p>

---

## 📌 Overview

**WINDBREAKER.Ai** adalah solusi analitik prediktif modern yang dirancang untuk industri penerbangan.  
Proyek ini mengintegrasikan model Machine Learning berperforma tinggi dengan arsitektur web production-ready untuk memprediksi keterlambatan penerbangan secara real-time berdasarkan data operasional.

---

## 🌟 Key Features

- 🚀 **High-Performance ML Model**  
  Menggunakan algoritma **XGBoost (XGBClassifier)** yang dioptimalkan untuk klasifikasi status keterlambatan secara akurat.

- ⚡ **Asynchronous API**  
  Backend berbasis **FastAPI** dengan dukungan asynchronous request handling untuk efisiensi dan skalabilitas tinggi.

- 🖥 **Interactive Dashboard**  
  Antarmuka modern berbasis **React + TypeScript (Vite)** untuk input data dan visualisasi hasil prediksi.

- 🔄 **Automated Data Transformation**  
  Pemrosesan fitur kategorikal seperti `Origin` dan `Dest` menggunakan LabelEncoder secara konsisten antara training dan inference.

---

## 🛠 Tech Stack

### 🔹 AI & Backend
- Python 3.10+
- FastAPI (ASGI)
- XGBoost
- Scikit-Learn
- Pandas
- Joblib / Pickle

### 🔹 Frontend
- React.js + TypeScript (Vite)
- Tailwind CSS
- Axios

---

## 🚀 Installation Guide

### 1️⃣ Backend Setup

```bash
pip install pandas scikit-learn xgboost fastapi uvicorn joblib
python api.py
```

API berjalan di:
```
http://localhost:8000
```

Dokumentasi tersedia di:
```
http://localhost:8000/docs
```

---

### 2️⃣ Frontend Setup

```bash
cd web
npm install
npm run dev
```

Frontend biasanya berjalan di:
```
http://localhost:5173
```

---

## 📊 Machine Learning Methodology

### 1. Feature Selection
- `DepTime`
- `DepDelay`
- `CRSArrTime`
- `Origin`
- `Dest`

### 2. Categorical Encoding
Menggunakan LabelEncoder yang konsisten antara tahap training dan inference.

### 3. Model Training
Optimalisasi XGBoost untuk meminimalkan error pada target prediksi keterlambatan kedatangan (`ARR_DELAY`).

---

## 📁 Project Structure

```bash
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
```

---

## 📫 Contact

**Jonathan Axl Wibowo**

- 🌐 Portfolio: https://jonathanaxl.id  
- 💼 LinkedIn: https://linkedin.com/in/jonathanaxl  
- 📧 Email: jonathan.axlw@gmail.com  

---

<p align="center">
<i>Dikembangkan dengan fokus pada integritas data, skalabilitas sistem, dan pengalaman pengguna yang optimal.</i>
</p>
