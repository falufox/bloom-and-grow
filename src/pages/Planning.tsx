import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Edit3, Camera, Grid } from 'lucide-react';

interface Bed {
  id: string;
  name: string;
  dimensions: { length: number; width: number };
  flowers: { name: string; color: string; quantity: number }[];
}

export const Planning: React.FC = () => {
  const [beds, setBeds] = useState<Bed[]>([
    {
      id: '1',
      name: 'Bed 1',
      dimensions: { length: 8, width: 4 },
      flowers: [
        { name: 'Sunflowers', color: '#FFD700', quantity: 12 },
        { name: 'Zinnias', color: '#FF6B6B', quantity: 24 }
      ]
    },
    {
      id: '2',
      name: 'Bed 2',
      dimensions: { length: 6, width: 4 },
      flowers: [
        { name: 'Cosmos', color: '#FF69B4', quantity: 18 }
      ]
    }
  ]);

  const [newBed, setNewBed] = useState({ name: '', length: '', width: '' });
  const [showAddBed, setShowAddBed] = useState(false);

  const addBed = () => {
    if (newBed.name && newBed.length && newBed.width) {
      const bed: Bed = {
        id: Date.now().toString(),
        name: newBed.name,
        dimensions: { length: parseFloat(newBed.length), width: parseFloat(newBed.width) },
        flowers: []
      };
      setBeds([...beds, bed]);
      setNewBed({ name: '', length: '', width: '' });
      setShowAddBed(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-midnight-blue mb-2">Garden Planning</h1>
        <p className="text-gray-600">Visualize and organize your flower beds</p>
      </div>

      {/* Garden Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Grid className="w-5 h-5 mr-2" />
              Garden Layout
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddBed(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Bed
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Garden visualization */}
          <div className="bg-green-50 p-8 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beds.map((bed) => (
                <div key={bed.id} className="relative">
                  <div
                    className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-32 relative overflow-hidden"
                    style={{
                      aspectRatio: `${bed.dimensions.length}/${bed.dimensions.width}`
                    }}
                  >
                    {/* Bed background with flower visualization */}
                    <div className="absolute inset-0 flex flex-wrap items-center justify-center p-2">
                      {bed.flowers.map((flower, index) => (
                        <div key={index} className="flex flex-wrap">
                          {Array.from({ length: Math.min(flower.quantity, 20) }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full m-0.5 opacity-70"
                              style={{ backgroundColor: flower.color }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    {/* Bed label */}
                    <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium text-midnight-blue shadow-sm">
                      {bed.name}
                    </div>
                    
                    {/* Dimensions */}
                    <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600 shadow-sm">
                      {bed.dimensions.length}' × {bed.dimensions.width}'
                    </div>
                    
                    {/* Edit button */}
                    <button className="absolute top-2 right-2 p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                      <Edit3 className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add bed form */}
          {showAddBed && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Bed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    label="Bed Name"
                    value={newBed.name}
                    onChange={(e) => setNewBed({ ...newBed, name: e.target.value })}
                    placeholder="e.g., Bed 3"
                  />
                  <Input
                    label="Length (feet)"
                    type="number"
                    value={newBed.length}
                    onChange={(e) => setNewBed({ ...newBed, length: e.target.value })}
                    placeholder="8"
                  />
                  <Input
                    label="Width (feet)"
                    type="number"
                    value={newBed.width}
                    onChange={(e) => setNewBed({ ...newBed, width: e.target.value })}
                    placeholder="4"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addBed}>Add Bed</Button>
                  <Button variant="ghost" onClick={() => setShowAddBed(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Bed Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {beds.map((bed) => (
          <Card key={bed.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{bed.name} Details</span>
                <Button variant="ghost" size="sm">
                  <Camera className="w-4 h-4 mr-1" />
                  Add Photo
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-midnight-blue">Dimensions:</span>
                    <div className="text-gray-600">{bed.dimensions.length}' × {bed.dimensions.width}'</div>
                  </div>
                  <div>
                    <span className="font-medium text-midnight-blue">Area:</span>
                    <div className="text-gray-600">{bed.dimensions.length * bed.dimensions.width} sq ft</div>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-midnight-blue">Planned Flowers:</span>
                  <div className="mt-2 space-y-2">
                    {bed.flowers.length > 0 ? (
                      bed.flowers.map((flower, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-champagne rounded">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: flower.color }}
                            />
                            <span className="text-sm">{flower.name}</span>
                          </div>
                          <span className="text-sm text-gray-600">{flower.quantity} plants</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm italic">No flowers planned yet</div>
                    )}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Flowers
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Planning Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Planning Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-midnight-blue">{beds.length}</div>
              <div className="text-sm text-gray-600">Total Beds</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-midnight-blue">
                {beds.reduce((total, bed) => total + (bed.dimensions.length * bed.dimensions.width), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Square Feet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-midnight-blue">
                {beds.reduce((total, bed) => total + bed.flowers.reduce((sum, flower) => sum + flower.quantity, 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Plants Planned</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};