// src/App.jsx
// Main router with all pages

import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AdmissionForm from './components/pages/AdmissionForm';
import ConfirmationPage from './components/pages/ConfirmationPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import NotFound from './components/pages/NotFound';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/admission"          element={<AdmissionForm />} />
          <Route path="/confirmation"       element={<ConfirmationPage />} />
          <Route path="/admin/login"        element={<AdminLogin />} />
          <Route path="/admin/dashboard"    element={<AdminDashboard />} />
          <Route path="*"                   element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
