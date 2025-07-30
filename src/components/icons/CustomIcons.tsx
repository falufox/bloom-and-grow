import React from 'react';

interface CustomIconProps {
  className?: string;
  isNavigation?: boolean;
}

export const GardenShearsIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src="/icons/gardenshears.png" 
    alt="Garden Shears" 
    className={className}
    style={{ 
      objectFit: 'contain',
      width: '100%',
      height: '100%'
    }}
  />
);

export const MoneyBagsIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src="/icons/moneybags.png" 
    alt="Money Bags" 
    className={className}
    style={{ 
      objectFit: 'contain',
      width: '100%',
      height: '100%'
    }}
  />
);

export const RaisedBedIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src="/icons/raisedbed.png" 
    alt="Raised Bed" 
    className={className}
    style={{ 
      objectFit: 'contain',
      width: '100%',
      height: '100%'
    }}
  />
);