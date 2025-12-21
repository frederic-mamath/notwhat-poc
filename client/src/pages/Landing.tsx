import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuthenticated } from '../lib/auth';
import { Button } from '../components/ui/button';

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-6">
          <div className="text-3xl font-bold text-white">NoWhat</div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/login')} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Login
            </Button>
            <Button onClick={() => navigate('/register')} className="bg-white text-blue-600 hover:bg-gray-100">
              Sign Up
            </Button>
          </div>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <h1 className="text-6xl font-bold text-white mb-6">
          Welcome to NoWhat
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          A modern live streaming platform built with tRPC, React, Agora, and PostgreSQL.
          Secure, type-safe, and ready for production.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/register')} className="bg-white text-blue-600 hover:bg-gray-100">
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
