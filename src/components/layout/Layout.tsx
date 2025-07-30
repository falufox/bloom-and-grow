import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100/50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        {children}
      </main>
    </div>
  );
};