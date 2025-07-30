import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Calendar, 
  Wrench, 
  Flower2 
} from 'lucide-react';
import { GardenShearsIcon, MoneyBagsIcon, RaisedBedIcon } from '../icons/CustomIcons';
import { clsx } from 'clsx';

const navigationItems = [
  { name: 'Garden at a Glance', href: '/', icon: LayoutDashboard },
  { name: 'Garden Setup', href: '/setup', icon: Settings },
  { name: 'Planning', href: '/planning', icon: RaisedBedIcon },
  { name: 'Prepping', href: '/prepping', icon: Wrench },
  { name: 'Planting', href: '/planting', icon: Flower2 },
  { name: 'Cutting', href: '/cutting', icon: GardenShearsIcon },
  { name: 'Selling', href: '/selling', icon: MoneyBagsIcon },
];

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-midnight-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">Bloom & Grow</h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-blush bg-opacity-20 text-white'
                        : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
                    )
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                  isActive
                    ? 'bg-blush bg-opacity-20 text-white'
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
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