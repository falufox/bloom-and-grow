import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  onShowWelcome?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onShowWelcome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-50 to-cool-100/30">
      <Navigation onShowWelcome={onShowWelcome} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12 xl:py-16">
        {children}
      </main>
    </div>
  );
};