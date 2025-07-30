import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, DollarSign, TrendingUp, MapPin, CreditCard } from 'lucide-react';

interface Sale {
  id: string;
  date: string;
  customer: string;
  venue: 'farmers-market' | 'csa' | 'florist' | 'special-event';
  items: SaleItem[];
  total: number;
  paymentMethod: string;
}

interface SaleItem {
  id: string;
  type: 'bouquet' | 'stems' | 'bucket';
  variety?: string;
  bouquetName?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const Selling: React.FC = () => {
  const [sales] = useState<Sale[]>([
    {
      id: '1',
      date: '2024-03-16',
      customer: 'Sarah Johnson',
      venue: 'farmers-market',
      items: [
        { id: '1', type: 'bouquet', bouquetName: 'Summer Sunshine', quantity: 2, unitPrice: 15, total: 30 }
      ],
      total: 30,
      paymentMethod: 'cash'
    },
    {
      id: '2',
      date: '2024-03-16',
      customer: 'Downtown Florist',
      venue: 'florist',
      items: [
        { id: '2', type: 'stems', variety: 'Sunflower - Mammoth', quantity: 24, unitPrice: 1.50, total: 36 }
      ],
      total: 36,
      paymentMethod: 'check'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSale, setNewSale] = useState({
    customer: '',
    venue: 'farmers-market' as Sale['venue'],
    paymentMethod: 'cash',
    items: [{ type: 'bouquet' as SaleItem['type'], name: '', quantity: '', price: '' }]
  });

  const addSale = () => {
    // Implementation for adding a new sale
    setShowAddForm(false);
  };

  const venueLabels = {
    'farmers-market': 'Farmers Market',
    'csa': 'CSA',
    'florist': 'Florist',
    'special-event': 'Special Event'
  };

  const venueColors = {
    'farmers-market': 'bg-green-100 text-green-800',
    'csa': 'bg-blue-100 text-blue-800',
    'florist': 'bg-purple-100 text-purple-800',
    'special-event': 'bg-pink-100 text-pink-800'
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const avgSaleAmount = totalRevenue / sales.length;
  const topVenue = Object.entries(
    sales.reduce((acc, sale) => {
      acc[sale.venue] = (acc[sale.venue] || 0) + sale.total;
      return acc;
    }, {} as Record<string, number>)
  ).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-midnight-blue mb-2">Sales Tracking</h1>
        <p className="text-gray-600">Monitor your sales and track profitability</p>
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">${totalRevenue}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">{sales.length}</div>
            <div className="text-sm text-gray-600">Total Sales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-midnight-blue mb-2">${avgSaleAmount.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Avg Sale</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-xl font-bold text-midnight-blue mb-2">
              {topVenue ? venueLabels[topVenue[0] as keyof typeof venueLabels] : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Top Venue</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button onClick={() => setShowAddForm(true)} className="h-16">
          <Plus className="w-5 h-5 mr-2" />
          Record New Sale
        </Button>
        <Button variant="outline" className="h-16">
          <CreditCard className="w-5 h-5 mr-2" />
          Process Payment
        </Button>
        <Button variant="outline" className="h-16">
          <TrendingUp className="w-5 h-5 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Recent Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 bg-champagne rounded-lg">
              <h3 className="font-semibold text-midnight-blue mb-4">Record New Sale</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Customer Name"
                  value={newSale.customer}
                  onChange={(e) => setNewSale({ ...newSale, customer: e.target.value })}
                  placeholder="Customer or business name"
                />
                <div>
                  <label className="block text-sm font-medium text-midnight-blue mb-1">Venue</label>
                  <select
                    value={newSale.venue}
                    onChange={(e) => setNewSale({ ...newSale, venue: e.target.value as Sale['venue'] })}
                    className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-midnight-blue shadow-sm focus:border-midnight-blue focus:outline-none focus:ring-1 focus:ring-midnight-blue"
                  >
                    <option value="farmers-market">Farmers Market</option>
                    <option value="csa">CSA</option>
                    <option value="florist">Florist</option>
                    <option value="special-event">Special Event</option>
                  </select>
                </div>
              </div>
              
              {/* Sale Items */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-midnight-blue mb-2">Items Sold</label>
                <div className="space-y-3 p-3 bg-white rounded-lg border">
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <select className="w-full text-sm rounded border-gray-300">
                        <option>Bouquet</option>
                        <option>Individual Stems</option>
                        <option>Bucket</option>
                      </select>
                    </div>
                    <Input placeholder="Item name" className="text-sm" />
                    <Input type="number" placeholder="Qty" className="text-sm" />
                    <Input type="number" placeholder="Price" className="text-sm" />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-midnight-blue mb-1">Payment Method</label>
                  <select
                    value={newSale.paymentMethod}
                    onChange={(e) => setNewSale({ ...newSale, paymentMethod: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-midnight-blue shadow-sm focus:border-midnight-blue focus:outline-none focus:ring-1 focus:ring-midnight-blue"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="check">Check</option>
                    <option value="square">Square</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>
                <Input
                  label="Total Amount"
                  type="number"
                  placeholder="0.00"
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={addSale}>Save Sale</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {sales.map(sale => (
              <div key={sale.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-midnight-blue">{sale.customer}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${venueColors[sale.venue]}`}>
                        {venueLabels[sale.venue]}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(sale.date).toLocaleDateString()} • {sale.paymentMethod}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-midnight-blue">${sale.total}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {sale.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm p-2 bg-champagne rounded">
                      <span>
                        {item.bouquetName || item.variety} ({item.type})
                      </span>
                      <span>{item.quantity} × ${item.unitPrice} = ${item.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales by Venue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Sales by Venue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(venueLabels).map(([venue, label]) => {
              const venueRevenue = sales
                .filter(sale => sale.venue === venue)
                .reduce((sum, sale) => sum + sale.total, 0);
              const venueCount = sales.filter(sale => sale.venue === venue).length;
              
              return (
                <div key={venue} className="text-center p-4 bg-champagne rounded-lg">
                  <div className="text-2xl font-bold text-midnight-blue mb-1">${venueRevenue}</div>
                  <div className="text-sm font-medium text-gray-700">{label}</div>
                  <div className="text-xs text-gray-500">{venueCount} sales</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Best Sellers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-champagne rounded-lg">
              <div>
                <div className="font-semibold text-midnight-blue">Summer Sunshine Bouquet</div>
                <div className="text-sm text-gray-600">8 sold • $15 avg price</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-midnight-blue">$120</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-champagne rounded-lg">
              <div>
                <div className="font-semibold text-midnight-blue">Sunflower Stems</div>
                <div className="text-sm text-gray-600">24 sold • $1.50 avg price</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-midnight-blue">$36</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-midnight-blue">Square Integration</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Connect your Square account to automatically import sales</p>
              <Button variant="outline" size="sm">Connect Square</Button>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-midnight-blue">Stripe Integration</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Connect your Stripe account for online sales tracking</p>
              <Button variant="outline" size="sm">Connect Stripe</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};