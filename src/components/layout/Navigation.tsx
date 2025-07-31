import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Calendar, 
  Wrench, 
  Flower2, 
  Scissors, 
  DollarSign,
  Menu,
  X,
  HelpCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { useWelcome } from '../../contexts/WelcomeContext';

const navigationItems = [
  { name: 'Garden at a Glance', href: '/', icon: LayoutDashboard },
  { name: 'Garden Setup', href: '/setup', icon: Settings },
  { name: 'Planning', href: '/planning', icon: Calendar },
  { name: 'Prepping', href: '/prepping', icon: Wrench },
  { name: 'Planting', href: '/planting', icon: Flower2 },
  { name: 'Cutting', href: '/cutting', icon: Scissors },
  { name: 'Selling', href: '/selling', icon: DollarSign },
];

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resetWelcome } = useWelcome();
  
  return (
    <nav className="bg-midnight-50/90 backdrop-blur-apple border-b border-cool-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-display font-light text-midnight-900 tracking-tight">
                Bloom & Grow
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center px-3 lg:px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out',
                      isActive
                        ? 'bg-midnight-800 text-white shadow-apple-lg'
                        : 'text-cool-600 hover:text-midnight-800 hover:bg-cool-50/80'
                    )
                  }
                >
                  <item.icon className="w-3.5 h-3.5 mr-1.5 lg:mr-2 stroke-current" strokeWidth={1.5} />
                  <span className="hidden lg:inline">{item.name}</span>
                  <span className="lg:hidden">{item.name.split(' ')[0]}</span>
                </NavLink>
              ))}
              
              {/* Help/Welcome Tour Button - Desktop */}
              <button
                onClick={resetWelcome}
                className="flex items-center px-3 lg:px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out text-cool-600 hover:text-midnight-800 hover:bg-cool-50/80"
                title="Show Welcome Tour"
              >
                <HelpCircle className="w-3.5 h-3.5 lg:mr-2 stroke-current" strokeWidth={1.5} />
                <span className="hidden lg:inline">Help</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cool-600 hover:text-midnight-800 hover:bg-cool-50/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-midnight-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" strokeWidth={1.5} />
              ) : (
                <Menu className="block h-6 w-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-4 space-y-1 border-t border-cool-200/50 bg-midnight-50/95">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300',
                    isActive
                      ? 'bg-midnight-800 text-white shadow-apple'
                      : 'text-cool-600 hover:text-midnight-800 hover:bg-cool-50/80'
                  )
                }
              >
                <item.icon className="w-4 h-4 mr-3 stroke-current" strokeWidth={1.5} />
                {item.name}
              </NavLink>
            ))}
            
            {/* Help/Welcome Tour Button - Mobile */}
            <button
              onClick={() => {
                resetWelcome();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 text-cool-600 hover:text-midnight-800 hover:bg-cool-50/80 w-full text-left"
            >
              <HelpCircle className="w-4 h-4 mr-3 stroke-current" strokeWidth={1.5} />
              Show Welcome Tour
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};