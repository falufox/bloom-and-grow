import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useGarden } from '../contexts/GardenContext';
import { Plus, Scissors, Package, DollarSign } from 'lucide-react';

interface HarvestEntry {
  id: string;
  date: string;
  variety: string;
  stemCount: number;
  quality: 'premium' | 'good' | 'fair';
  spaceId: string;
  notes: string;
}

interface BouquetRecipe {
  id: string;
  name: string;
  stemCounts: { [variety: string]: number };
  retailPrice: number;
  wholesalePrice: number;
}

export const Cutting: React.FC = () => {
  const [harvests, setHarvests] = useState<HarvestEntry[]>([
    {
      id: '1',
      date: '2024-03-18',
      variety: 'Sunflower - Mammoth',
      stemCount: 15,
      quality: 'premium',
      spaceId: 'space-1',
      notes: 'Perfect timing, long stems'
    },
    {
      id: '2',
      date: '2024-03-18',
      variety: 'Zinnia - State Fair Mix',
      stemCount: 32,
      quality: 'good',
      spaceId: 'space-1',
      notes: 'Mixed colors, some smaller stems'
    }
  ]);

  const [bouquetRecipes] = useState<BouquetRecipe[]>([
    {
      id: '1',
      name: 'Summer Sunshine',
      stemCounts: {
        'Sunflower - Mammoth': 3,
        'Zinnia - State Fair Mix': 5,
        'Cosmos - Sensation Mix': 4
      },
      retailPrice: 15,
      wholesalePrice: 8
    },
    {
      id: '2',
      name: 'Garden Mix',
      stemCounts: {
        'Zinnia - State Fair Mix': 8,
        'Cosmos - Sensation Mix': 6,
        'Marigold - African': 4
      },
      retailPrice: 12,
      wholesalePrice: 6
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newHarvest, setNewHarvest] = useState({
    variety: '',
    stemCount: '0',
    quality: 'good' as 'premium' | 'good' | 'fair',
    spaceId: '',
    notes: ''
  });

  const { plantingSpaces, gardenSetup } = useGarden();
  const isContainerGardening = gardenSetup.gardenType === 'container';
  const spaceLabel = isContainerGardening ? 'Container' : 'Bed';

  const addHarvest = () => {
    if (newHarvest.variety && newHarvest.stemCount) {
      const harvest: HarvestEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        variety: newHarvest.variety,
        stemCount: parseInt(newHarvest.stemCount) || 0,
        quality: newHarvest.quality,
        spaceId: newHarvest.spaceId,
        notes: newHarvest.notes
      };
      setHarvests([...harvests, harvest]);
      setNewHarvest({ variety: '', stemCount: '0', quality: 'good', spaceId: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const qualityColors = {
    premium: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    fair: 'bg-yellow-100 text-yellow-800'
  };

  // Calculate potential bouquets
  const calculateBouquets = (recipe: BouquetRecipe) => {
    const availableStems: { [variety: string]: number } = {};
    
    harvests.forEach(harvest => {
      if (!availableStems[harvest.variety]) {
        availableStems[harvest.variety] = 0;
      }
      availableStems[harvest.variety] += harvest.stemCount;
    });

    let maxBouquets = Infinity;
    Object.entries(recipe.stemCounts).forEach(([variety, needed]) => {
      const available = availableStems[variety] || 0;
      const possible = Math.floor(available / needed);
      maxBouquets = Math.min(maxBouquets, possible);
    });

    return maxBouquets === Infinity ? 0 : maxBouquets;
  };

  const totalStems = harvests.reduce((sum, harvest) => sum + harvest.stemCount, 0);
  const totalValue = harvests.reduce((sum, harvest) => {
    const basePrice = harvest.quality === 'premium' ? 1.5 : harvest.quality === 'good' ? 1.0 : 0.7;
    return sum + (harvest.stemCount * basePrice);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-midnight-blue mb-2">Cutting & Harvest</h1>
        <p className="text-gray-600">Track your flower harvests and plan bouquets</p>
      </div>

      {/* Harvest Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">{totalStems}</div>
            <div className="text-sm text-gray-600">Total Stems</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">
              {harvests.filter(h => h.quality === 'premium').reduce((sum, h) => sum + h.stemCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Premium Stems</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">${totalValue.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Estimated Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">
              {Math.max(...bouquetRecipes.map(recipe => calculateBouquets(recipe)))}
            </div>
            <div className="text-sm text-gray-600">Max Bouquets</div>
          </CardContent>
        </Card>
      </div>

      {/* Log New Harvest */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Scissors className="w-5 h-5 mr-2" />
              Harvest Log
            </span>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Log Harvest
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 bg-champagne rounded-lg">
              <h3 className="font-semibold text-midnight-blue mb-4">Record New Harvest</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Flower Variety"
                  value={newHarvest.variety}
                  onChange={(e) => setNewHarvest({ ...newHarvest, variety: e.target.value })}
                  placeholder="e.g., Sunflower - Mammoth"
                />
                <Input
                  label="Stem Count"
                  type="number"
                  value={newHarvest.stemCount}
                  onChange={(e) => setNewHarvest({ ...newHarvest, stemCount: e.target.value })}
                  placeholder="15"
                />
                <div>
                  <label className="block text-sm font-medium text-midnight-blue mb-1">Quality</label>
                  <select
                    value={newHarvest.quality}
                    onChange={(e) => setNewHarvest({ ...newHarvest, quality: e.target.value as any })}
                    className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-midnight-blue shadow-sm focus:border-midnight-blue focus:outline-none focus:ring-1 focus:ring-midnight-blue"
                  >
                    <option value="premium">Premium</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-blue mb-1">{spaceLabel}</label>
                  <select
                    value={newHarvest.spaceId}
                    onChange={(e) => setNewHarvest({ ...newHarvest, spaceId: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-midnight-blue shadow-sm focus:border-midnight-blue focus:outline-none focus:ring-1 focus:ring-midnight-blue"
                  >
                    <option value="">Select a {spaceLabel.toLowerCase()}</option>
                    {plantingSpaces.map(space => (
                      <option key={space.id} value={space.id}>{space.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Input
                label="Notes"
                value={newHarvest.notes}
                onChange={(e) => setNewHarvest({ ...newHarvest, notes: e.target.value })}
                placeholder="Condition, timing, observations..."
                className="mb-4"
              />
              <div className="flex space-x-2">
                <Button onClick={addHarvest}>Save Harvest</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {/* Recent Harvests */}
          <div className="space-y-4">
            {harvests.map(harvest => (
              <div key={harvest.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-midnight-blue">{harvest.variety}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${qualityColors[harvest.quality]}`}>
                        {harvest.quality}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Date:</span> {new Date(harvest.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Stems:</span> {harvest.stemCount}
                      </div>
                      <div>
                        <span className="font-medium">{spaceLabel}:</span> {plantingSpaces.find(s => s.id === harvest.spaceId)?.name}
                      </div>
                      <div>
                        <span className="font-medium">Value:</span> $
                        {(harvest.stemCount * (harvest.quality === 'premium' ? 1.5 : harvest.quality === 'good' ? 1.0 : 0.7)).toFixed(2)}
                      </div>
                    </div>
                    {harvest.notes && (
                      <p className="text-sm text-gray-600 italic">{harvest.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bouquet Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Bouquet Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bouquetRecipes.map(recipe => {
              const possibleBouquets = calculateBouquets(recipe);
              const retailValue = possibleBouquets * recipe.retailPrice;
              const wholesaleValue = possibleBouquets * recipe.wholesalePrice;
              
              return (
                <div key={recipe.id} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-midnight-blue mb-3">{recipe.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium text-gray-700">Recipe:</div>
                    {Object.entries(recipe.stemCounts).map(([variety, count]) => (
                      <div key={variety} className="text-sm text-gray-600 flex justify-between">
                        <span>{variety}</span>
                        <span>{count} stems</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-midnight-blue">{possibleBouquets}</div>
                        <div className="text-xs text-gray-600">Possible Bouquets</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-midnight-blue">${retailValue}</div>
                        <div className="text-xs text-gray-600">Retail Value</div>
                        <div className="text-sm text-gray-500">${wholesaleValue} wholesale</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Pricing Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-champagne rounded-lg">
              <h4 className="font-semibold text-midnight-blue mb-2">Individual Stems</h4>
              <div className="space-y-1 text-sm">
                <div>Premium: $1.50-2.00</div>
                <div>Good: $1.00-1.50</div>
                <div>Fair: $0.70-1.00</div>
              </div>
            </div>
            <div className="text-center p-4 bg-champagne rounded-lg">
              <h4 className="font-semibold text-midnight-blue mb-2">Farmers Market</h4>
              <div className="space-y-1 text-sm">
                <div>Small bouquet: $8-12</div>
                <div>Large bouquet: $15-25</div>
                <div>Specialty: $20-35</div>
              </div>
            </div>
            <div className="text-center p-4 bg-champagne rounded-lg">
              <h4 className="font-semibold text-midnight-blue mb-2">Wholesale</h4>
              <div className="space-y-1 text-sm">
                <div>Buckets: $15-30</div>
                <div>Arranged: 50-60% retail</div>
                <div>Volume discount: 15-25%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};