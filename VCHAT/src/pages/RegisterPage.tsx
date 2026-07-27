import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen relative flex flex-col justify-center items-center overflow-x-hidden pt-20 pb-10">
      <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px]" 
      />
      
      <main className="relative z-10 w-full max-w-[480px] px-6">
        <div className="text-center mb-8">
          <h1 className="font-display-lg text-display-lg text-primary tracking-tighter mb-2">VWatch</h1>
          <p className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Join the Platform</p>
        </div>

        <GlassCard withLuminousBorder className="p-8 md:p-10">
          <div className="mb-8">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">Create Account</h2>
            <p className="font-body-md text-on-surface-variant">Sign up to host your own watch parties</p>
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
             <p className="font-body-md text-on-surface-variant">
                 Already have an account? 
                 <Link to="/login" state={location.state} className="text-primary font-bold hover:text-tertiary transition-colors ml-1">Sign in</Link>
             </p>
          </div>
        </GlassCard>
      </main>
    </div>
  );
};
