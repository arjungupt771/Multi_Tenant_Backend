
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Projects from './components/Projects';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function AppRoutes() {
  const { isAuthenticated, refreshAuth, logout } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && (
        <header className="app-header">
          <Link to="/" className="app-brand">
            Tenant SaaS
          </Link>

          <nav>
            <Link to="/">Projects</Link>
            <button type="button" onClick={logout}>
              Log out
            </button>
          </nav>
        </header>
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/projects" replace /> : <Home />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/projects" replace />
            ) : (
              <Login onLogin={refreshAuth} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/projects" replace />
            ) : (
              <Signup onSignup={refreshAuth} />
            )
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<Projects />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
