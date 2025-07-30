import React from 'react';

interface CustomIconProps {
  className?: string;
}

export const GardenShearsIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src="/icons/gardenshears.png" 
    alt="Garden Shears" 
    className={className}
    style={{ filter: 'brightness(0) invert(1)' }} // Make white for dark nav
  />
);

export const MoneyBagsIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src="/icons/moneybags.png" 
    alt="Money Bags" 
    className={className}
    style={{ filter: 'brightness(0) invert(1)' }} // Make white for dark nav
  />
);

export const RaisedBedIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src="/icons/raisedbed.png" 
    alt="Raised Bed" 
    className={className}
    style={{ filter: 'brightness(0) invert(1)' }} // Make white for dark nav
  />
);