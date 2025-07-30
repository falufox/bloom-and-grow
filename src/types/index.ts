export interface Garden {
  id: string;
  name: string;
  type: 'raised-beds' | 'container' | 'rows';
  dimensions: {
    length: number;
    width: number;
    unit: 'feet' | 'meters';
  };
  beds: Bed[];
  climate: {
    hardinessZone: string;
    region: string;
  };
  seasonalGoal: number;
}

export interface Bed {
  id: string;
  name: string;
  dimensions: {
    length: number;
    width: number;
    unit: 'feet' | 'meters';
  };
  soilType: 'potting-mix' | 'raised-bed' | 'amended-soil' | 'native-soil';
  flowers: FlowerPlanting[];
  prepTasks: PrepTask[];
}

export interface FlowerPlanting {
  id: string;
  variety: FlowerVariety;
  plantingDate: string;
  quantity: number;
  spacing: number;
  expectedHarvestDate: string;
  actualPlantingDate?: string;
  notes?: string;
}

export interface FlowerVariety {
  id: string;
  name: string;
  type: string;
  color: string;
  hardinessZones: string[];
  daysToMaturity: number;
  spacing: number;
  height: number;
  sunRequirement: 'full-sun' | 'partial-sun' | 'shade';
  soilPreference: string[];
  image?: string;
  pricePerStem: {
    wholesale: number;
    retail: number;
  };
}

export interface PrepTask {
  id: string;
  task: string;
  completed: boolean;
  dueDate: string;
  notes?: string;
  bedId: string;
}

export interface HarvestEntry {
  id: string;
  date: string;
  flowerVarietyId: string;
  stemCount: number;
  quality: 'premium' | 'good' | 'fair';
  bedId: string;
  notes?: string;
}

export interface BouquetRecipe {
  id: string;
  name: string;
  stemCounts: {
    [flowerVarietyId: string]: number;
  };
  retailPrice: number;
  wholesalePrice: number;
}

export interface Sale {
  id: string;
  date: string;
  customer: string;
  items: SaleItem[];
  total: number;
  paymentMethod: string;
  venue: 'farmers-market' | 'csa' | 'florist' | 'special-event';
}

export interface SaleItem {
  id: string;
  type: 'bouquet' | 'stems' | 'bucket';
  flowerVarietyId?: string;
  bouquetRecipeId?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}