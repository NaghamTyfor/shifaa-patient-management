import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientsDashboard } from './components/patients/PatientsDashboard';
import Login from './pages/Login';

import { AnimatedStethoscope } from './components/ui/AnimatedStethoscope';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4fbfc] gap-4">
        <AnimatedStethoscope size={64} />
        <p className="text-teal-800 text-sm font-bold tracking-wide animate-pulse" dir="rtl">
          جاري تهيئة النظام الطبي...
        </p>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <PatientsDashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;