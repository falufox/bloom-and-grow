import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Calendar, 
  Wrench, 
  Flower2, 
  Scissors, 
  DollarSign 
} from 'lucide-react';
import { clsx } from 'clsx';

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
  return (
    <nav className="bg-midnight-50/90 backdrop-blur-apple border-b border-cool-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-display font-light text-midnight-900 tracking-tight">
                Bloom & Grow
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out',
                      isActive
                        ? 'bg-midnight-800 text-white shadow-apple-lg'
                        : 'text-cool-600 hover:text-midnight-800 hover:bg-cool-50/80'
                    )
                  }
                >
                  <item.icon className="w-3.5 h-3.5 mr-2 stroke-current" strokeWidth={1.5} />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-6 pt-3 pb-4 space-y-2 border-t border-cool-200/50 bg-midnight-50/95">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300',
                  isActive
                    ? 'bg-midnight-800 text-white shadow-apple'
                    : 'text-cool-600 hover:text-midnight-800 hover:bg-cool-50/80'
                )
              }
            >
              <item.icon className="w-3.5 h-3.5 mr-3 stroke-current" strokeWidth={1.5} />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};