
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaRocket,
} from 'react-icons/fa';
import api from '../services/api';

const Signup = ({ onSignup }) => {
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const normalizedOrgName = orgName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedOrgName.length < 2 || normalizedOrgName.length > 100) {
      setError('Organization name must be between 2 and 100 characters.');
      return;
    }

    if (password.length < 8 || password.length > 72) {
      setError('Password must be between 8 and 72 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/signup', {
        orgName: normalizedOrgName,
        email: normalizedEmail,
        password,
      });

      const data = res.data?.data ?? res.data;
      const { token, user, organization } = data ?? {};

      if (!token || !user || !organization) {
        throw new Error('The server returned an incomplete signup response.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('organization', JSON.stringify(organization));

      onSignup();
    } catch (err) {
      console.error('Signup failed:', err.response?.status);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to create your account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-card animate__animated animate__fadeInUp">
          <div className="signup-header">
            <div className="signup-icon">
              <FaRocket size={48} />
            </div>
            <h1 className="signup-title">Launch Your SaaS</h1>
            <p className="signup-subtitle">
              Create your organization and admin account
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
              <button
                type="button"
                className="btn-close float-end"
                aria-label="Dismiss error"
                onClick={() => setError('')}
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label fw-bold" htmlFor="orgName">
                Organization Name
              </label>
              <div className="input-group input-group-lg input-with-icon">
                <span className="input-group-text bg-primary text-white border-0">
                  <FaUser />
                </span>
                <input
                  id="orgName"
                  className="form-control form-control-custom"
                  type="text"
                  autoComplete="organization"
                  placeholder="Enter organization name"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  minLength={2}
                  maxLength={100}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label fw-bold" htmlFor="email">
                Email Address
              </label>
              <div className="input-group input-group-lg input-with-icon">
                <span className="input-group-text bg-info text-white border-0">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  className="form-control form-control-custom"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label fw-bold" htmlFor="password">
                Password
              </label>
              <div className="input-group input-group-lg input-with-icon">
                <span className="input-group-text bg-success text-white border-0">
                  <FaLock />
                </span>
                <input
                  id="password"
                  className="form-control form-control-custom"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  minLength={8}
                  maxLength={72}
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
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  Get Started <FaArrowRight className="ms-2" />
                </>
              )}
            </button>
          </form>

          <div className="signup-footer text-center">
            <p className="text-muted small">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
            <p className="text-muted small">
              Build powerful multi-tenant apps with confidence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
