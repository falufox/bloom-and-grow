import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useGarden } from '../contexts/GardenContext';
import type { PlantingSpace } from '../contexts/GardenContext';
import { RaisedBedIcon } from '../components/icons/CustomIcons';
import { Plus, Edit3, Camera, Package } from 'lucide-react';


export const Planning: React.FC = () => {
  const { gardenSetup, plantingSpaces, setPlantingSpaces } = useGarden();
  const [newSpace, setNewSpace] = useState({ name: '', length: '', width: '', diameter: '' });
  const [showAddSpace, setShowAddSpace] = useState(false);
  
  const isContainerGardening = gardenSetup.gardenType === 'container';
  const spaceType = isContainerGardening ? 'container' : 'bed';
  const spaceLabel = isContainerGardening ? 'Container' : 'Bed';
  
  // Generate flowers from garden setup selections
  const generateFlowersFromSetup = () => {
    const flowerColors: { [key: string]: string } = {
      'Sunflowers': '#FFD700',
      'Zinnias': '#FF6B6B', 
      'Cosmos': '#FF69B4',
      'Marigolds': '#FFA500',
      'Celosia': '#DC143C',
      'Dahlias': '#9932CC',
      'Rudbeckia': '#FFD700',
      'Delphiniums': '#4169E1',
      'Larkspur': '#6495ED',
      'Sweet Peas': '#DDA0DD'
    };
    
    return gardenSetup.flowerTypes.map(flowerName => ({
      name: flowerName,
      color: flowerColors[flowerName] || '#10b981',
      quantity: isContainerGardening ? Math.floor(Math.random() * 6) + 2 : Math.floor(Math.random() * 20) + 8
    }));
  };
  
  // Initialize with data based on garden setup
  useEffect(() => {
    if (plantingSpaces.length === 0 && gardenSetup.flowerTypes.length > 0) {
      const setupFlowers = generateFlowersFromSetup();
      const numSpaces = isContainerGardening ? 2 : 2; // Start with 2 spaces
      
      const sampleSpaces: PlantingSpace[] = Array.from({ length: numSpaces }, (_, index) => {
        const spaceNumber = index + 1;
        // Distribute flowers across spaces
        const flowersForSpace = setupFlowers.filter((_, flowerIndex) => flowerIndex % numSpaces === index);
        
        return {
          id: spaceNumber.toString(),
          name: `${spaceLabel} ${spaceNumber}`,
          type: spaceType,
          ...(isContainerGardening && {
            containerType: gardenSetup.containerSpecs?.type || 'round'
          }),
          dimensions: isContainerGardening 
            ? gardenSetup.containerSpecs?.diameter 
              ? { diameter: gardenSetup.containerSpecs.diameter, height: gardenSetup.containerSpecs.height || 12 }
              : { length: gardenSetup.containerSpecs?.length || 18, width: gardenSetup.containerSpecs?.width || 12, height: gardenSetup.containerSpecs?.height || 10 }
            : { length: 8, width: 4 },
          flowers: flowersForSpace.length > 0 ? flowersForSpace : setupFlowers.slice(0, 2) // Fallback
        };
      });
      
      setPlantingSpaces(sampleSpaces);
    }
  }, [gardenSetup, plantingSpaces.length, setPlantingSpaces, isContainerGardening, spaceLabel, spaceType]);

  const addSpace = () => {
    if (newSpace.name && (isContainerGardening ? newSpace.diameter || (newSpace.length && newSpace.width) : (newSpace.length && newSpace.width))) {
      const space: PlantingSpace = {
        id: Date.now().toString(),
        name: newSpace.name,
        type: spaceType,
        ...(isContainerGardening && { containerType: gardenSetup.containerSpecs?.type || 'round' }),
        dimensions: isContainerGardening && gardenSetup.containerSpecs?.type === 'round'
          ? { diameter: parseFloat(newSpace.diameter), height: gardenSetup.containerSpecs?.height || 10 }
          : { length: parseFloat(newSpace.length), width: parseFloat(newSpace.width), ...(isContainerGardening && { height: gardenSetup.containerSpecs?.height || 10 }) },
        flowers: []
      };
      setPlantingSpaces([...plantingSpaces, space]);
      setNewSpace({ name: '', length: '', width: '', diameter: '' });
      setShowAddSpace(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-display font-light text-midnight-900 mb-2">Garden Planning</h1>
        <p className="text-cool-600">Visualize and organize your flower {isContainerGardening ? 'containers' : 'beds'}</p>
      </div>

      {/* Garden Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              {isContainerGardening ? <Package className="w-3.5 h-3.5 mr-2" strokeWidth={1.5} /> : <RaisedBedIcon className="w-3.5 h-3.5 mr-2" />}
              {spaceLabel} Layout
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddSpace(true)}
            >
              <Plus className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
              Add {spaceLabel}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Garden visualization */}
          <div className="bg-green-50 p-8 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plantingSpaces.map((space) => (
                <div key={space.id} className="relative">
                  <div
                    className={`bg-white border-2 border-dashed border-gray-300 p-4 min-h-32 relative overflow-hidden ${
                      space.type === 'container' && space.containerType === 'round' 
                        ? 'rounded-full aspect-square' 
                        : 'rounded-lg'
                    }`}
                    style={{
                      ...(space.type === 'container' && space.containerType === 'round'
                        ? { width: '120px', height: '120px' }
                        : {
                            aspectRatio: space.dimensions.length && space.dimensions.width 
                              ? `${space.dimensions.length}/${space.dimensions.width}` 
                              : '1'
                          }
                      )
                    }}
                  >
                    {/* Space background with flower visualization */}
                    <div className="absolute inset-0 flex flex-wrap items-center justify-center p-2">
                      {space.flowers.map((flower, index) => (
                        <div key={index} className="flex flex-wrap">
                          {Array.from({ length: Math.min(flower.quantity, space.type === 'container' ? 8 : 20) }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full m-0.5 opacity-70"
                              style={{ backgroundColor: flower.color }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    {/* Space label */}
                    <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium text-midnight-900 shadow-sm">
                      {space.name}
                    </div>
                    
                    {/* Dimensions */}
                    <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-cool-600 shadow-sm">
                      {space.type === 'container' && space.containerType === 'round'
                        ? `⌀${space.dimensions.diameter}"`
                        : `${space.dimensions.length}" × ${space.dimensions.width}"`
                      }
                    </div>
                    
                    {/* Edit button */}
                    <button className="absolute top-2 right-2 p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                      <Edit3 className="w-3 h-3 text-cool-600" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add space form */}
          {showAddSpace && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New {spaceLabel}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    label="{spaceLabel} Name"
                    value={newSpace.name}
                    onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                    placeholder={`e.g., ${spaceLabel} 3`}
                  />
                  {isContainerGardening && gardenSetup.containerSpecs?.type === 'round' ? (
                    <Input
                      label="Diameter (inches)"
                      type="number"
                      value={newSpace.diameter}
                      onChange={(e) => setNewSpace({ ...newSpace, diameter: e.target.value })}
                      placeholder="12"
                    />
                  ) : (
                    <>
                      <Input
                        label={`Length (${isContainerGardening ? 'inches' : 'feet'})`}
                        type="number"
                        value={newSpace.length}
                        onChange={(e) => setNewSpace({ ...newSpace, length: e.target.value })}
                        placeholder={isContainerGardening ? "18" : "8"}
                      />
                      <Input
                        label={`Width (${isContainerGardening ? 'inches' : 'feet'})`}
                        type="number"
                        value={newSpace.width}
                        onChange={(e) => setNewSpace({ ...newSpace, width: e.target.value })}
                        placeholder={isContainerGardening ? "12" : "4"}
                      />
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addSpace}>Add {spaceLabel}</Button>
                  <Button variant="ghost" onClick={() => setShowAddSpace(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Space Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plantingSpaces.map((space) => (
          <Card key={space.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{space.name} Details</span>
                <Button variant="ghost" size="sm">
                  <Camera className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
                  Add Photo
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-midnight-900">Dimensions:</span>
                    <div className="text-cool-600">
                      {space.type === 'container' && space.containerType === 'round'
                        ? `⌀${space.dimensions.diameter}" × ${space.dimensions.height}"H`
                        : `${space.dimensions.length}" × ${space.dimensions.width}"${space.type === 'container' ? ` × ${space.dimensions.height}"H` : ''}`
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-midnight-900">{space.type === 'container' ? 'Volume:' : 'Area:'}</span>
                    <div className="text-cool-600">
                      {space.type === 'container' && space.containerType === 'round'
                        ? `${Math.round(Math.PI * Math.pow(space.dimensions.diameter! / 2, 2) * space.dimensions.height! / 231)} gal`
                        : space.type === 'container'
                        ? `${Math.round(space.dimensions.length! * space.dimensions.width! * space.dimensions.height! / 231)} gal`
                        : `${space.dimensions.length! * space.dimensions.width!} sq ft`
                      }
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-midnight-900">Planned Flowers:</span>
                  <div className="mt-2 space-y-2">
                    {space.flowers.length > 0 ? (
                      space.flowers.map((flower, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-midnight-50/70 rounded">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3.5 h-3.5 rounded-full"
                              style={{ backgroundColor: flower.color }}
                            />
                            <span className="text-sm">{flower.name}</span>
                            {flower.variety && <span className="text-xs text-cool-500">({flower.variety})</span>}
                          </div>
                          <span className="text-sm text-cool-600">{flower.quantity} plants</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-cool-500 text-sm italic">No flowers planned yet</div>
                    )}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
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
              <div className="text-2xl font-display font-semibold text-midnight-900">{plantingSpaces.length}</div>
              <div className="text-sm text-cool-600">Total {spaceLabel}s</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-semibold text-midnight-900">
                {isContainerGardening 
                  ? plantingSpaces.reduce((total, space) => 
                      total + (space.containerType === 'round' 
                        ? Math.round(Math.PI * Math.pow(space.dimensions.diameter! / 2, 2) * space.dimensions.height! / 231)
                        : Math.round(space.dimensions.length! * space.dimensions.width! * space.dimensions.height! / 231)
                      ), 0
                    )
                  : plantingSpaces.reduce((total, space) => total + (space.dimensions.length! * space.dimensions.width!), 0)
                }
              </div>
              <div className="text-sm text-cool-600">Total {isContainerGardening ? 'Gallons' : 'Square Feet'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-semibold text-midnight-900">
                {plantingSpaces.reduce((total, space) => total + space.flowers.reduce((sum, flower) => sum + flower.quantity, 0), 0)}
              </div>
              <div className="text-sm text-cool-600">Total Plants Planned</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};