import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Settings, MapPin, Target, Flower } from 'lucide-react';

export const GardenSetup: React.FC = () => {
  const [gardenType, setGardenType] = useState<string>('');
  const [seasonGoal, setSeasonGoal] = useState<string>('');
  const [flowerTypes, setFlowerTypes] = useState<string[]>([]);

  const gardenTypes = [
    { id: 'raised-beds', name: 'Raised Beds', description: 'Perfect for controlled soil and drainage' },
    { id: 'container', name: 'Container Growing', description: 'Great for small spaces and mobility' },
    { id: 'rows', name: 'Row Planting', description: 'Traditional field-style growing' }
  ];

  const popularFlowers = [
    'Sunflowers', 'Zinnias', 'Cosmos', 'Marigolds', 'Celosia',
    'Dahlias', 'Rudbeckia', 'Delphiniums', 'Larkspur', 'Sweet Peas'
  ];

  const toggleFlowerType = (flower: string) => {
    setFlowerTypes(prev => 
      prev.includes(flower) 
        ? prev.filter(f => f !== flower)
        : [...prev, flower]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-midnight-blue mb-2">Garden Setup</h1>
        <p className="text-gray-600">Let's design your perfect flower farm</p>
      </div>

      {/* Garden Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            What type of garden do you want?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gardenTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  gardenType === type.id
                    ? 'border-midnight-blue bg-blush bg-opacity-20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setGardenType(type.id)}
              >
                <h3 className="font-semibold text-midnight-blue mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Flower Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flower className="w-5 h-5 mr-2" />
            What flowers would you like to grow?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {popularFlowers.map((flower) => (
              <button
                key={flower}
                onClick={() => toggleFlowerType(flower)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                  flowerTypes.includes(flower)
                    ? 'border-midnight-blue bg-blush bg-opacity-20 text-midnight-blue'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {flower}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <Input
              placeholder="Add custom flower varieties..."
              className="max-w-md"
            />
          </div>
        </CardContent>
      </Card>

      {/* Season Goal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            What's your revenue goal for this season?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSeasonGoal('1000')}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  seasonGoal === '1000'
                    ? 'border-midnight-blue bg-blush bg-opacity-20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl font-bold text-midnight-blue">$1,000</div>
                <div className="text-sm text-gray-600">Hobby Scale</div>
              </button>
              <button
                onClick={() => setSeasonGoal('5000')}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  seasonGoal === '5000'
                    ? 'border-midnight-blue bg-blush bg-opacity-20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl font-bold text-midnight-blue">$5,000</div>
                <div className="text-sm text-gray-600">Side Business</div>
              </button>
              <button
                onClick={() => setSeasonGoal('15000')}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  seasonGoal === '15000'
                    ? 'border-midnight-blue bg-blush bg-opacity-20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl font-bold text-midnight-blue">$15,000+</div>
                <div className="text-sm text-gray-600">Full Business</div>
              </button>
            </div>
            <div className="max-w-md">
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={seasonGoal}
                onChange={(e) => setSeasonGoal(e.target.value)}
                label="Custom Goal ($)"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location & Climate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Location & Climate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              placeholder="Enter your ZIP code"
              helpText="We'll use this to determine your hardiness zone"
            />
            <Input
              label="Hardiness Zone (Optional)"
              placeholder="e.g., 6b"
              helpText="Leave blank to auto-detect"
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">Save Draft</Button>
        <Button>Continue to Planning</Button>
      </div>
    </div>
  );
};