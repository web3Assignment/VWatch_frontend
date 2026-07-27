import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/shared/GlassCard';
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/shared/Toast';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    setIsLoading(true);
    try {
      await register({ username, emailAddress: email, password });
      showToast('Account created successfully! Please sign in with your credentials.', 'success');
      navigate('/login', { replace: true, state: location.state });
    } catch (err: any) {
      showToast(err?.message || 'Failed to create account', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-frame p-2 md:p-4 flex flex-col font-body-md">
      <div className="flex-1 bg-background text-on-surface rounded-[32px] overflow-hidden relative flex flex-col justify-center items-center shadow-2xl">
      <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />
      
      <main className="relative z-10 w-full max-w-[480px] px-6">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-lg">V</span>
            <span className="font-display-lg text-[28px] text-on-surface tracking-tight">VWatch</span>
          </Link>
          <p className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest">Join the Platform</p>
        </div>

        <GlassCard className="p-8 md:p-10">
          <div className="mb-8">
            <h2 className="font-headline-sm text-xl text-on-surface mb-1 font-semibold">Create Account</h2>
            <p className="font-body-md text-on-surface-variant text-sm">Sign up to host your own watch parties</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <Input 
              label="USERNAME"
              icon="person"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <Input 
              label="EMAIL ADDRESS"
              icon="alternate_email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Input 
              label="PASSWORD"
              icon="lock"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" fullWidth disabled={isLoading} className="mt-4">
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
             <p className="font-body-md text-on-surface-variant text-sm">
                 Already have an account? 
                 <Link to="/login" state={location.state} className="text-primary font-bold hover:underline transition-colors ml-1">Sign in</Link>
             </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
