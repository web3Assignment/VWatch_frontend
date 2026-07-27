import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/shared/GlassCard';
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/shared/Toast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const redirectTo = (location.state as { from?: { pathname?: string; search?: string } } | null)?.from;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    setIsLoading(true);
    try {
      await login({ emailAddress: email, password });
      showToast('Welcome back!', 'success');
      navigate(`${redirectTo?.pathname || '/dashboard'}${redirectTo?.search || ''}`, { replace: true });
    } catch (err: any) {
      showToast(err?.message || 'Invalid credentials', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center overflow-x-hidden pt-20">
      {/* Background blobs */}
      <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" 
      />
      
      <main className="relative z-10 w-full max-w-[480px] px-6">
        <div className="text-center mb-10">
          <h1 className="font-display-lg text-display-lg text-primary tracking-tighter mb-2">VWatch</h1>
          <p className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Real-time Cinematic Synchronization</p>
        </div>

        <GlassCard withLuminousBorder className="p-8 md:p-10">
          <div className="mb-8">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">Welcome back</h2>
            <p className="font-body-md text-on-surface-variant">Enter your credentials to access your room</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <Button type="submit" fullWidth disabled={isLoading} icon={<span className="material-symbols-outlined">arrow_forward</span>}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
             <p className="font-body-md text-on-surface-variant">
                 Don't have an account? 
                 <Link to="/register" state={location.state} className="text-primary font-bold hover:text-tertiary transition-colors ml-1">Sign up</Link>
             </p>
          </div>
        </GlassCard>
      </main>
    </div>
  );
};
