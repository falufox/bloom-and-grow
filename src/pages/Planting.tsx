import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Calendar, Thermometer, Cloud, CheckCircle } from 'lucide-react';

interface PlantingEntry {
  id: string;
  date: string;
  variety: string;
  bedId: string;
  quantity: number;
  spacing: string;
  notes: string;
  status: 'planted' | 'germinated' | 'established';
}

export const Planting: React.FC = () => {
  const [plantings, setPlantings] = useState<PlantingEntry[]>([
    {
      id: '1',
      date: '2024-03-15',
      variety: 'Sunflower - Mammoth',
      bedId: 'bed-1',
      quantity: 12,
      spacing: '12 inches',
      notes: 'Direct seeded in prepared rows',
      status: 'established'
    },
    {
      id: '2',
      date: '2024-03-20',
      variety: 'Zinnia - State Fair Mix',
      bedId: 'bed-1',
      quantity: 24,
      spacing: '6 inches',
      notes: 'Started from transplants',
      status: 'germinated'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlanting, setNewPlanting] = useState({
    variety: '',
    bedId: '',
    quantity: '',
    spacing: '',
    notes: ''
  });

  const beds = [
    { id: 'bed-1', name: 'Bed 1 - Sunflowers & Zinnias' },
    { id: 'bed-2', name: 'Bed 2 - Cosmos' },
    { id: 'bed-3', name: 'Bed 3 - Dahlias' }
  ];

  const addPlanting = () => {
    if (newPlanting.variety && newPlanting.bedId && newPlanting.quantity) {
      const planting: PlantingEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        variety: newPlanting.variety,
        bedId: newPlanting.bedId,
        quantity: parseInt(newPlanting.quantity),
        spacing: newPlanting.spacing,
        notes: newPlanting.notes,
        status: 'planted'
      };
      setPlantings([...plantings, planting]);
      setNewPlanting({ variety: '', bedId: '', quantity: '', spacing: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const statusColors = {
    planted: 'bg-yellow-100 text-yellow-800',
    germinated: 'bg-blue-100 text-blue-800',
    established: 'bg-green-100 text-green-800'
  };

  const currentWeather = {
    temp: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    soilTemp: 58
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-midnight-blue mb-2">Planting Tracker</h1>
        <p className="text-gray-600">Record and monitor your plantings</p>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Thermometer className="w-8 h-8 text-midnight-blue mx-auto mb-2" />
            <div className="text-xl font-bold text-midnight-blue">{currentWeather.temp}°F</div>
            <div className="text-sm text-gray-600">Air Temp</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Cloud className="w-8 h-8 text-midnight-blue mx-auto mb-2" />
            <div className="text-xl font-bold text-midnight-blue">{currentWeather.soilTemp}°F</div>
            <div className="text-sm text-gray-600">Soil Temp</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-midnight-blue">{currentWeather.humidity}%</div>
            <div className="text-sm text-gray-600">Humidity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-midnight-blue">{currentWeather.condition}</div>
            <div className="text-xs text-gray-600">Conditions</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Planting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Planting Log</span>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Log Planting
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 bg-champagne rounded-lg">
              <h3 className="font-semibold text-midnight-blue mb-4">Record New Planting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Flower Variety"
                  value={newPlanting.variety}
                  onChange={(e) => setNewPlanting({ ...newPlanting, variety: e.target.value })}
                  placeholder="e.g., Sunflower - Mammoth"
                />
                <div>
                  <label className="block text-sm font-medium text-midnight-blue mb-1">Bed</label>
                  <select
                    value={newPlanting.bedId}
                    onChange={(e) => setNewPlanting({ ...newPlanting, bedId: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-midnight-blue shadow-sm focus:border-midnight-blue focus:outline-none focus:ring-1 focus:ring-midnight-blue"
                  >
                    <option value="">Select a bed</option>
                    {beds.map(bed => (
                      <option key={bed.id} value={bed.id}>{bed.name}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Quantity"
                  type="number"
                  value={newPlanting.quantity}
                  onChange={(e) => setNewPlanting({ ...newPlanting, quantity: e.target.value })}
                  placeholder="24"
                />
                <Input
                  label="Spacing"
                  value={newPlanting.spacing}
                  onChange={(e) => setNewPlanting({ ...newPlanting, spacing: e.target.value })}
                  placeholder="6 inches"
                />
              </div>
              <Input
                label="Notes"
                value={newPlanting.notes}
                onChange={(e) => setNewPlanting({ ...newPlanting, notes: e.target.value })}
                placeholder="Direct seeded, transplants, etc."
                className="mb-4"
              />
              <div className="flex space-x-2">
                <Button onClick={addPlanting}>Save Planting</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {/* Planting History */}
          <div className="space-y-4">
            {plantings.map(planting => (
              <div key={planting.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-midnight-blue">{planting.variety}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[planting.status]}`}>
                        {planting.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Date:</span> {new Date(planting.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Bed:</span> {beds.find(b => b.id === planting.bedId)?.name}
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span> {planting.quantity}
                      </div>
                      <div>
                        <span className="font-medium">Spacing:</span> {planting.spacing}
                      </div>
                    </div>
                    {planting.notes && (
                      <p className="text-sm text-gray-600 italic">{planting.notes}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    <Button variant="ghost" size="sm">Update Status</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planting Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Plantings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-champagne rounded-lg">
              <div>
                <div className="font-medium text-midnight-blue">Cosmos - Sensation Mix</div>
                <div className="text-sm text-gray-600">Bed 2 • 36 plants • 8 inch spacing</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-midnight-blue">March 25</div>
                <div className="text-xs text-gray-600">5 days</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-champagne rounded-lg">
              <div>
                <div className="font-medium text-midnight-blue">Dahlia - Cafe au Lait</div>
                <div className="text-sm text-gray-600">Bed 3 • 12 tubers • 18 inch spacing</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-midnight-blue">April 1</div>
                <div className="text-xs text-gray-600">12 days</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planting Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Today's Planting Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-midnight-blue mb-3">Ideal for Planting:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Cool season crops (soil temp 45-65°F)
                </li>
                <li className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Transplants (protected from frost)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-midnight-blue mb-3">Wait to Plant:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-amber-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Warm season crops (wait 2+ weeks)
                </li>
                <li className="flex items-center text-amber-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Direct seeding tender varieties
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};