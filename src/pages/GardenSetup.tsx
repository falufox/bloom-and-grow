import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useGarden } from '../contexts/GardenContext';
import { Settings, MapPin, Target, Flower, Package } from 'lucide-react';

export const GardenSetup: React.FC = () => {
  const { gardenSetup, setGardenSetup } = useGarden();
  const navigate = useNavigate();
  const [containerSpecs, setContainerSpecs] = useState({
    type: 'round' as 'round' | 'rectangular' | 'square',
    diameter: '',
    length: '',
    width: '',
    height: ''
  });

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
    const newFlowerTypes = gardenSetup.flowerTypes.includes(flower) 
      ? gardenSetup.flowerTypes.filter(f => f !== flower)
      : [...gardenSetup.flowerTypes, flower];
    
    setGardenSetup({ ...gardenSetup, flowerTypes: newFlowerTypes });
  };

  const handleGardenTypeChange = (type: string) => {
    setGardenSetup({ ...gardenSetup, gardenType: type as any });
  };

  const handleSeasonGoalChange = (goal: string) => {
    setGardenSetup({ ...gardenSetup, seasonGoal: goal });
  };

  const saveContainerSpecs = () => {
    const specs = {
      type: containerSpecs.type,
      ...(containerSpecs.type === 'round' 
        ? { diameter: parseFloat(containerSpecs.diameter) }
        : { 
            length: parseFloat(containerSpecs.length), 
            width: parseFloat(containerSpecs.width) 
          }
      ),
      height: parseFloat(containerSpecs.height)
    };
    
    setGardenSetup({ ...gardenSetup, containerSpecs: specs });
  };

  const saveDraft = () => {
    // Save current setup to local storage or backend
    localStorage.setItem('garden-setup-draft', JSON.stringify(gardenSetup));
    alert('Garden setup saved as draft! You can continue later.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-light text-midnight-900 mb-2 sm:mb-3 tracking-tight">Garden Setup</h1>
        <p className="text-cool-600 text-base sm:text-lg font-serif">Let's design your perfect flower farm</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {gardenTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  gardenSetup.gardenType === type.id
                    ? 'border-midnight-800 bg-midnight-50/80'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleGardenTypeChange(type.id)}
              >
                <h3 className="font-semibold text-midnight-900 mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Container Specifications - Only show if container gardening is selected */}
      {gardenSetup.gardenType === 'container' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Container Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-midnight-900 mb-3">Container Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { id: 'round', name: 'Round Pots', description: 'Traditional circular containers' },
                    { id: 'rectangular', name: 'Rectangular Planters', description: 'Efficient space usage' },
                    { id: 'square', name: 'Square Containers', description: 'Easy to arrange in grids' }
                  ].map((type) => (
                    <div
                      key={type.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        containerSpecs.type === type.id
                          ? 'border-midnight-800 bg-midnight-50/80'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setContainerSpecs({ ...containerSpecs, type: type.id as any })}
                    >
                      <h4 className="font-medium text-midnight-900 mb-1">{type.name}</h4>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {containerSpecs.type === 'round' ? (
                  <Input
                    label="Diameter (inches)"
                    type="number"
                    value={containerSpecs.diameter}
                    onChange={(e) => setContainerSpecs({ ...containerSpecs, diameter: e.target.value })}
                    placeholder="12"
                  />
                ) : (
                  <>
                    <Input
                      label="Length (inches)"
                      type="number"
                      value={containerSpecs.length}
                      onChange={(e) => setContainerSpecs({ ...containerSpecs, length: e.target.value })}
                      placeholder="18"
                    />
                    <Input
                      label="Width (inches)"
                      type="number"
                      value={containerSpecs.width}
                      onChange={(e) => setContainerSpecs({ ...containerSpecs, width: e.target.value })}
                      placeholder="12"
                    />
                  </>
                )}
                <Input
                  label="Height (inches)"
                  type="number"
                  value={containerSpecs.height}
                  onChange={(e) => setContainerSpecs({ ...containerSpecs, height: e.target.value })}
                  placeholder="10"
                />
              </div>
              
              <Button onClick={saveContainerSpecs} variant="outline" size="sm">
                Save Container Specs
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                  gardenSetup.flowerTypes.includes(flower)
                    ? 'border-midnight-800 bg-midnight-50/80 text-midnight-900'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button
                onClick={() => handleSeasonGoalChange('1000')}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  gardenSetup.seasonGoal === '1000'
                    ? 'border-midnight-800 bg-midnight-50/80'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl font-display font-semibold text-midnight-900">$1,000</div>
                <div className="text-sm text-gray-600">Hobby Scale</div>
              </button>
              <button
                onClick={() => handleSeasonGoalChange('5000')}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  gardenSetup.seasonGoal === '5000'
                    ? 'border-midnight-800 bg-midnight-50/80'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl font-display font-semibold text-midnight-900">$5,000</div>
                <div className="text-sm text-gray-600">Side Business</div>
              </button>
              <button
                onClick={() => handleSeasonGoalChange('15000')}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  gardenSetup.seasonGoal === '15000'
                    ? 'border-midnight-800 bg-midnight-50/80'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl font-display font-semibold text-midnight-900">$15,000+</div>
                <div className="text-sm text-gray-600">Full Business</div>
              </button>
            </div>
            <div className="max-w-md">
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={gardenSetup.seasonGoal}
                onChange={(e) => handleSeasonGoalChange(e.target.value)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <Button onClick={saveDraft} variant="outline" className="w-full sm:w-auto">Save Draft</Button>
        <Button onClick={() => navigate('/planning')} className="w-full sm:w-auto">Continue to Planning</Button>
      </div>
    </div>
  );
};