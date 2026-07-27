import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'icon' | 'outline';
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  icon,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-tertiary text-on-primary rounded-xl px-6 py-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/40',
    ghost: 'hover:bg-surface-container-high rounded-xl px-4 py-2 text-on-surface',
    danger: 'bg-error/10 hover:bg-error/20 text-error border border-error/20 rounded-xl px-4 py-2',
    icon: 'p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-primary',
    outline: 'border border-outline-variant hover:border-primary/50 text-on-surface hover:bg-surface-container-high rounded-xl px-6 py-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
