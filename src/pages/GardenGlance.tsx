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
    <div className="space-y-12 lg:space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-display font-light text-midnight-900 mb-3 tracking-tight">Garden at a Glance</h1>
        <p className="text-cool-600 text-lg font-serif">Week of {currentWeek}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-2xl bg-midnight-800/10 p-3 mr-4">
              <MapPin className="w-5 h-5 text-midnight-800" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-2xl font-display font-semibold text-midnight-900">8</div>
              <div className="text-sm text-cool-600">Active Beds</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-2xl bg-gold-500/10 p-3 mr-4">
              <Calendar className="w-5 h-5 text-gold-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-2xl font-display font-semibold text-midnight-900">12</div>
              <div className="text-sm text-cool-600">Plants Ready</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-2xl bg-primary-500/10 p-3 mr-4">
              <Scissors className="w-5 h-5 text-primary-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-2xl font-display font-semibold text-midnight-900">247</div>
              <div className="text-sm text-cool-600">Stems Cut</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-2xl bg-gold-500/15 p-3 mr-4">
              <DollarSign className="w-5 h-5 text-gold-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-2xl font-display font-semibold text-midnight-900">$432</div>
              <div className="text-sm text-cool-600">Weekly Revenue</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* This Week's Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
              This Week's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 rounded border-gray-300" />
                <div>
                  <div className="font-medium text-midnight-900">Prep Bed 3 for dahlia planting</div>
                  <div className="text-sm text-cool-600">Due Tuesday</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 rounded border-gray-300" />
                <div>
                  <div className="font-medium text-midnight-900">Start zinnia seeds in greenhouse</div>
                  <div className="text-sm text-cool-600">Due Wednesday</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 rounded border-gray-300" defaultChecked />
                <div>
                  <div className="font-medium text-cool-500 line-through">Harvest sunflowers from Bed 1</div>
                  <div className="text-sm text-cool-400">Completed Monday</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Season Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-midnight-900">Season Goal: $3,000</span>
                  <span className="text-sm text-cool-600">$1,247 (42%)</span>
                </div>
                <div className="w-full bg-cool-200 rounded-full h-2.5">
                  <div className="bg-gold-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-midnight-900">Best Seller</div>
                  <div className="text-cool-600">Sunflowers</div>
                </div>
                <div>
                  <div className="font-medium text-midnight-900">Next Harvest</div>
                  <div className="text-cool-600">3 days</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather & Planting Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-display font-semibold text-midnight-900 mb-2">72°F</div>
              <div className="text-cool-600 mb-4">Partly Cloudy</div>
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
              <div className="flex items-center justify-between p-4 bg-midnight-50/70 rounded-xl border border-cool-200/40">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-midnight-800 rounded-full"></div>
                  <div>
                    <div className="font-medium text-midnight-900">Cosmos - Sensation Mix</div>
                    <div className="text-sm text-cool-600">Bed 4 • 48 plants</div>
                  </div>
                </div>
                <div className="text-sm text-cool-600 font-medium">March 15</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-midnight-50/70 rounded-xl border border-cool-200/40">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-midnight-900">Dahlia - Cafe au Lait</div>
                    <div className="text-sm text-cool-600">Bed 3 • 12 tubers</div>
                  </div>
                </div>
                <div className="text-sm text-cool-600 font-medium">March 20</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};