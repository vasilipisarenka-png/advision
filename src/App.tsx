import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './stores/StoreContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AppLayout from './components/Layout/AppLayout';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import CamerasPage from './pages/Cameras/CamerasPage';
import AdsPage from './pages/Ads/AdsPage';
import MonitorsPage from './pages/Monitors/MonitorsPage';
import DisplayPage from './pages/Display/DisplayPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

const App: React.FC = () => (
  <StoreProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/display/:monitorId" element={<DisplayPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/cameras" element={<CamerasPage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/monitors" element={<MonitorsPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
