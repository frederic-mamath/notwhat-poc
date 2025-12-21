import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuthenticated } from '../lib/auth';

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <div>
        <nav>
          <div>NoWhat</div>
          <div>
            <button onClick={() => navigate('/login')}>
              Login
            </button>
            <button onClick={() => navigate('/register')}>
              Sign Up
            </button>
          </div>
        </nav>
      </div>

      <div>
        <h1>
          Welcome to NoWhat
        </h1>
        <p>
          A modern live streaming platform built with tRPC, React, Agora, and PostgreSQL.
          Secure, type-safe, and ready for production.
        </p>
        <div>
          <button onClick={() => navigate('/register')}>
            Get Started
          </button>
          <button onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
