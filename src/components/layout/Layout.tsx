import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-50 to-cool-100/30">
      <Navigation />
      <main className="max-w-7xl mx-auto px-8 lg:px-12 py-12 lg:py-16">
        {children}
      </main>
    </div>
  );
};