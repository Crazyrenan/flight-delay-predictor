import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import DelayPredictor from './pages/DelayPredictor';
import PriceOracle from './pages/PriceOracle';
import MainLayout from './components/MainLayout';

// Komponen untuk memproteksi rute dan membungkusnya dengan Sidebar Layout
const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem("user_token") !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTE PUBLIK */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* RUTE TERPROTEKSI DENGAN SIDEBAR */}
        <Route 
          path="/dashboard" 
          element={<ProtectedLayout><Dashboard /></ProtectedLayout>} 
        />
        <Route 
          path="/delay-predictor" 
          element={<ProtectedLayout><DelayPredictor /></ProtectedLayout>} 
        />
        <Route 
          path="/price-oracle" 
          element={<ProtectedLayout><PriceOracle /></ProtectedLayout>} 
        />

        {/* REDIRECT DEFAULT */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;