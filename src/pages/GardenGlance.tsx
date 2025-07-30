import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TrendingUp, Calendar, Scissors, DollarSign, MapPin, Thermometer } from 'lucide-react';

export const GardenGlance: React.FC = () => {
  const currentWeek = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-midnight-blue mb-2">Garden at a Glance</h1>
        <p className="text-gray-600">Week of {currentWeek}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full bg-blush p-3 mr-4">
              <MapPin className="w-6 h-6 text-midnight-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight-blue">8</div>
              <div className="text-sm text-gray-600">Active Beds</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full bg-blush p-3 mr-4">
              <Calendar className="w-6 h-6 text-midnight-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight-blue">12</div>
              <div className="text-sm text-gray-600">Plants Ready</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full bg-blush p-3 mr-4">
              <Scissors className="w-6 h-6 text-midnight-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight-blue">247</div>
              <div className="text-sm text-gray-600">Stems Cut</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full bg-blush p-3 mr-4">
              <DollarSign className="w-6 h-6 text-midnight-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight-blue">$432</div>
              <div className="text-sm text-gray-600">Weekly Revenue</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* This Week's Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              This Week's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 rounded border-gray-300" />
                <div>
                  <div className="font-medium text-midnight-blue">Prep Bed 3 for dahlia planting</div>
                  <div className="text-sm text-gray-600">Due Tuesday</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 rounded border-gray-300" />
                <div>
                  <div className="font-medium text-midnight-blue">Start zinnia seeds in greenhouse</div>
                  <div className="text-sm text-gray-600">Due Wednesday</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 rounded border-gray-300" defaultChecked />
                <div>
                  <div className="font-medium text-gray-500 line-through">Harvest sunflowers from Bed 1</div>
                  <div className="text-sm text-gray-400">Completed Monday</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Season Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-midnight-blue">Season Goal: $3,000</span>
                  <span className="text-sm text-gray-600">$1,247 (42%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-midnight-blue h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-midnight-blue">Best Seller</div>
                  <div className="text-gray-600">Sunflowers</div>
                </div>
                <div>
                  <div className="font-medium text-midnight-blue">Next Harvest</div>
                  <div className="text-gray-600">3 days</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather & Planting Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="w-5 h-5 mr-2" />
              Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-midnight-blue mb-2">72°F</div>
              <div className="text-gray-600 mb-4">Partly Cloudy</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="font-medium">High</div>
                  <div>78°F</div>
                </div>
                <div>
                  <div className="font-medium">Low</div>
                  <div>65°F</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Plantings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-champagne rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-midnight-blue rounded-full"></div>
                  <div>
                    <div className="font-medium text-midnight-blue">Cosmos - Sensation Mix</div>
                    <div className="text-sm text-gray-600">Bed 4 • 48 plants</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">March 15</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-champagne rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blush rounded-full"></div>
                  <div>
                    <div className="font-medium text-midnight-blue">Dahlia - Cafe au Lait</div>
                    <div className="text-sm text-gray-600">Bed 3 • 12 tubers</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">March 20</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};