import React from 'react';
import gardenshearsIcon from '../../assets/gardenshears.png';
import moneybagsIcon from '../../assets/moneybags.png';
import raisedbedIcon from '../../assets/raisedbed.png';

interface CustomIconProps {
  className?: string;
}

export const GardenShearsIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src={gardenshearsIcon} 
    alt="Garden Shears" 
    className={className}
  />
);

export const MoneyBagsIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src={moneybagsIcon} 
    alt="Money Bags" 
    className={className}
  />
);

export const RaisedBedIcon: React.FC<CustomIconProps> = ({ className }) => (
  <img 
    src={raisedbedIcon} 
    alt="Raised Bed" 
    className={className}
  />
);