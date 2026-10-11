import React, { useState } from 'react';
import api from '../services/api';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
        ...(orgName.trim() ? { orgName: orgName.trim() } : {})
      });
      const data = res.data.data || res.data;
      const { token, user, organization } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('organization', JSON.stringify(organization));
      onLogin();
    } catch (err) {
      console.error('Login error', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-card animate__animated animate__fadeInUp">
          <div className="signup-header">
            <h1 className="signup-title">Welcome Back</h1>
            <p className="signup-subtitle">Please sign in to continue</p>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show animate__animated animate__shakeX" role="alert">
              <strong>⚠️</strong> {error}
              <button type="button" className="btn-close" onClick={() => setError(null)}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <div className="input-group input-group-lg input-with-icon">
                <span className="input-group-text bg-info text-white border-0">
                  <FaEnvelope />
                </span>
                <input
                  className="form-control form-control-custom"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label fw-bold">
                Organization Name (optional)
              </label>
              <input
                className="form-control form-control-custom"
                type="text"
                placeholder="Enter if your credentials match multiple organizations"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                autoComplete="organization"
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label fw-bold">Password</label>
              <div className="input-group input-group-lg input-with-icon">
                <span className="input-group-text bg-success text-white border-0">
                  <FaLock />
                </span>
                <input
                  className="form-control form-control-custom"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              className="btn btn-gradient btn-lg w-100 fw-bold btn-signup"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <FaSignInAlt className="ms-2" />
                </>
              )}
            </button>
          </form>

          <div className="signup-footer text-center">
            <p className="text-muted small">Need an account? <a href="/signup">Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
