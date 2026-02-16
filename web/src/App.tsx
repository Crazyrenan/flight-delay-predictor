import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

const App = () => {
  // Simulasi Auth (Nanti kita ganti dengan sistem login beneran)
  const isAuthenticated = true; 

  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Depan */}
        <Route path="/" element={<Landing />} />
        
        {/* Halaman Dashboard (Diproteksi) */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
        
        {/* Login Page (Nanti dibuat) */}
        <Route path="/login" element={<div className="text-white text-center p-20">Login Page Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;