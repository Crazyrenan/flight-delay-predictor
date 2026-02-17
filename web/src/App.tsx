import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;