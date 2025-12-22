import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Video, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import { isAuthenticated } from '../lib/auth';
import Button from '../components/ui/Button';

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Video className="size-16 text-primary" />
              <h1 className="text-6xl font-bold">NoWhat</h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern live streaming platform built with tRPC, React, Agora, and PostgreSQL.
              Secure, type-safe, and ready for production.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => navigate('/register')}>
                Get Started
                <ArrowRight className="size-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose NoWhat?</h2>
            <p className="text-muted-foreground">Everything you need for live streaming</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-lg border border-border p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="size-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Real-Time Streaming</h3>
              <p className="text-muted-foreground">
                Crystal clear video and audio powered by Agora's industry-leading WebRTC technology
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-lg border border-border p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="size-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground">
                End-to-end type safety with tRPC and secure authentication for all users
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-lg border border-border p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="size-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built with modern technologies for blazing fast performance and reliability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Users className="size-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users already streaming live on NoWhat
          </p>
          <Button size="lg" onClick={() => navigate('/register')}>
            Create Your Account
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
