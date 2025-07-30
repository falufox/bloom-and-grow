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
    <nav className="bg-white/95 backdrop-blur-apple border-b border-neutral-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                Bloom & Grow
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out',
                      isActive
                        ? 'bg-primary-500 text-white shadow-apple'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
                    )
                  }
                >
                  <item.icon className="w-4 h-4 mr-2.5" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-4 pt-2 pb-3 space-y-1 border-t border-neutral-200/60 bg-white/98">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-500 text-white shadow-apple'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
                )
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};