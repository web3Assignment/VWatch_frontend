import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useThemeStore } from '../../store/useThemeStore';
import { Button } from './Button';
import { Sun, Moon, Menu, LogOut, LogIn, UserPlus } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Explore', path: '/explore' },
    { name: 'Premium', path: '/premium' },
    { name: 'Showcase', path: '/showcase' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-xs h-16">
      <div className="flex items-center justify-between px-6 lg:px-10 h-full w-full">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-display-lg text-[30px] text-primary tracking-tighter hover:opacity-90 transition-opacity flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg">V</span>
            VWatch
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full font-label-mono text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold shadow-xs border border-primary/20'
                      : 'text-on-surface-variant font-medium hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant hover:text-on-surface flex items-center justify-center border border-outline-variant/30"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="font-label-mono text-xs text-on-surface font-semibold bg-surface-container-high hover:bg-primary/10 hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-outline-variant/30 flex items-center gap-1.5">
                  @{user.username}
                </Link>
                <Button variant="ghost" onClick={handleLogout} icon={<LogOut className="w-4 h-4" />}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" icon={<LogIn className="w-4 h-4" />}>Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" icon={<UserPlus className="w-4 h-4" />}>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-on-surface hover:bg-surface-container-high rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-outline-variant/30 p-4 flex flex-col gap-2 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`p-3 rounded-xl font-label-mono text-sm ${
                location.pathname === link.path ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-high'
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button 
              className="p-3 text-left text-error hover:bg-surface-container-high rounded-xl font-label-mono text-sm mt-2 flex items-center gap-2" 
              onClick={() => { handleLogout(); setIsMenuOpen(false); }}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <Link to="/login" className="p-3 text-on-surface hover:bg-surface-container-high rounded-xl font-label-mono text-sm flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link to="/register" className="p-3 text-primary bg-primary/10 rounded-xl font-bold font-label-mono text-sm flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <UserPlus className="w-4 h-4" /> Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
