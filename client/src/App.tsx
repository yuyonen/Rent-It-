import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './App.css'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyServicesPage from './pages/MyServicesPage'
import MessagesPage from './pages/MessagesPage'
import Header from './components/Header'
import { useAuth } from './context/AuthContext'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Ladataan...</div>
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/my-services" element={isAuthenticated ? <MyServicesPage /> : <Navigate to="/login" />} />
        <Route path="/messages" element={isAuthenticated ? <MessagesPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App