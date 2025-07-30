import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface GardenSetup {
  gardenType: 'raised-beds' | 'container' | 'rows' | '';
  seasonGoal: string;
  flowerTypes: string[];
  containerSpecs?: {
    type: 'round' | 'rectangular' | 'square';
    diameter?: number;
    length?: number;
    width?: number;
    height?: number;
  };
}

export interface PlantingSpace {
  id: string;
  name: string;
  dimensions: { 
    length?: number; 
    width?: number; 
    diameter?: number;
    height?: number;
  };
  type: 'bed' | 'container';
  containerType?: 'round' | 'rectangular' | 'square';
  flowers: { name: string; variety?: string; color: string; quantity: number }[];
}

interface GardenContextType {
  gardenSetup: GardenSetup;
  setGardenSetup: (setup: GardenSetup) => void;
  plantingSpaces: PlantingSpace[];
  setPlantingSpaces: (spaces: PlantingSpace[]) => void;
}

const GardenContext = createContext<GardenContextType | undefined>(undefined);

export const GardenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gardenSetup, setGardenSetup] = useState<GardenSetup>({
    gardenType: '',
    seasonGoal: '',
    flowerTypes: []
  });

  const [plantingSpaces, setPlantingSpaces] = useState<PlantingSpace[]>([]);

  return (
    <GardenContext.Provider value={{
      gardenSetup,
      setGardenSetup,
      plantingSpaces,
      setPlantingSpaces
    }}>
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (context === undefined) {
    throw new Error('useGarden must be used within a GardenProvider');
  }
  return context;
};