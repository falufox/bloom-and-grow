import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transform-gpu';
  
  const variantClasses = {
    primary: 'bg-midnight-800 text-white hover:bg-midnight-900 focus:ring-midnight-500/30 shadow-apple-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-apple-xl',
    secondary: 'bg-cool-100 text-midnight-800 hover:bg-cool-200 focus:ring-cool-500/30 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border border-cool-300 text-cool-700 hover:bg-cool-50 hover:border-cool-400 focus:ring-cool-500/30 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-cool-600 hover:bg-cool-100/60 hover:text-midnight-800 focus:ring-cool-500/30 disabled:opacity-50 disabled:cursor-not-allowed'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm font-semibold',
    lg: 'px-6 py-3 text-base font-semibold'
  };
  
  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};