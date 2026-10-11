import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaTasks, FaProjectDiagram } from 'react-icons/fa';

const Home = () => (
  <div className="home-wrapper">
    <div className="home-container animate__animated animate__fadeIn">
      <h1 className="home-title">Multi‑Tenant SaaS Starter</h1>
      <p className="home-desc">
        Build powerful, secure, multi‑tenant applications with role-based access control and tenant isolation.
      </p>
      <div className="home-features">
        <div className="home-feature">
          <FaRocket className="me-2" />
          <span>Quick onboarding</span>
        </div>
        <div className="home-feature">
          <FaProjectDiagram className="me-2" />
          <span>Project & organization support</span>
        </div>
        <div className="home-feature">
          <FaTasks className="me-2" />
          <span>Task management</span>
        </div>
      </div>
      <div className="home-actions mt-4">
        <Link to="/signup" className="btn btn-gradient me-2">
          Get Started
        </Link>
        <Link to="/login" className="btn btn-outline-light">
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
