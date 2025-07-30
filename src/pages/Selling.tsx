import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MoneyBagsIcon } from '../components/icons/CustomIcons';
import { Plus, TrendingUp, MapPin, CreditCard, Trash2, Calculator, Receipt, Smartphone, Wifi, WifiOff } from 'lucide-react';

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
  const [showPOSForm, setShowPOSForm] = useState(false);
  const [posConnected, setPosConnected] = useState(false);
  const [newSale, setNewSale] = useState({
    customer: '',
    venue: 'farmers-market' as Sale['venue'],
    paymentMethod: 'cash',
    items: [{ type: 'bouquet' as SaleItem['type'], name: '', quantity: '1', price: '0.00' }]
  });
  
  const [posIntegrations] = useState({
    square: { connected: false, lastSync: null },
    stripe: { connected: false, lastSync: null },
    paypal: { connected: false, lastSync: null }
  });

  const addSaleItem = () => {
    setNewSale({
      ...newSale,
      items: [...newSale.items, { type: 'bouquet', name: '', quantity: '1', price: '0.00' }]
    });
  };
  
  const removeSaleItem = (index: number) => {
    setNewSale({
      ...newSale,
      items: newSale.items.filter((_, i) => i !== index)
    });
  };
  
  const updateSaleItem = (index: number, field: string, value: string) => {
    const updatedItems = [...newSale.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewSale({ ...newSale, items: updatedItems });
  };
  
  const calculateTotal = () => {
    return newSale.items.reduce((total, item) => {
      const quantity = parseInt(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      return total + (quantity * price);
    }, 0);
  };
  
  const addSale = () => {
    // Implementation for adding a new sale
    console.log('New sale:', { ...newSale, total: calculateTotal() });
    setShowAddForm(false);
    setNewSale({
      customer: '',
      venue: 'farmers-market',
      paymentMethod: 'cash',
      items: [{ type: 'bouquet', name: '', quantity: '1', price: '0.00' }]
    });
  };
  
  const connectPOS = (provider: string) => {
    // Simulate POS connection
    console.log(`Connecting to ${provider}...`);
    setPosConnected(true);
  };
  
  const syncPOSData = () => {
    console.log('Syncing POS data...');
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button onClick={() => setShowAddForm(true)} className="h-16">
          <Plus className="w-5 h-5 mr-2" />
          Manual Sale Entry
        </Button>
        <Button 
          onClick={() => setShowPOSForm(true)} 
          variant="outline" 
          className="h-16"
          disabled={!posConnected}
        >
          <Smartphone className="w-5 h-5 mr-2" />
          Quick POS Sale
        </Button>
        <Button onClick={syncPOSData} variant="outline" className="h-16">
          {posConnected ? <Wifi className="w-5 h-5 mr-2" /> : <WifiOff className="w-5 h-5 mr-2" />}
          Sync POS Data
        </Button>
        <Button variant="outline" className="h-16">
          <Receipt className="w-5 h-5 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MoneyBagsIcon className="w-5 h-5 mr-2" />
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-midnight-blue">Items Sold</label>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calculator className="w-4 h-4" />
                    <span>Total: ${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-3 p-3 bg-white rounded-lg border">
                  {newSale.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-6 gap-2 items-end">
                      <div>
                        <select 
                          value={item.type}
                          onChange={(e) => updateSaleItem(index, 'type', e.target.value)}
                          className="w-full text-sm rounded border-gray-300 px-2 py-1"
                        >
                          <option value="bouquet">Bouquet</option>
                          <option value="stems">Stems</option>
                          <option value="bucket">Bucket</option>
                        </select>
                      </div>
                      <Input 
                        placeholder="Item name" 
                        className="text-sm" 
                        value={item.name}
                        onChange={(e) => updateSaleItem(index, 'name', e.target.value)}
                      />
                      <Input 
                        type="number" 
                        placeholder="Qty" 
                        className="text-sm" 
                        value={item.quantity}
                        onChange={(e) => updateSaleItem(index, 'quantity', e.target.value)}
                      />
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="Price" 
                        className="text-sm" 
                        value={item.price}
                        onChange={(e) => updateSaleItem(index, 'price', e.target.value)}
                      />
                      <div className="text-sm font-medium text-midnight-blue px-2">
                        ${((parseInt(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2)}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSaleItem(index)}
                        disabled={newSale.items.length === 1}
                        className="p-1"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={addSaleItem}>
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
                    <option value="venmo">Venmo</option>
                    <option value="square">Square</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-blue mb-1">Total Amount</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={calculateTotal().toFixed(2)}
                      readOnly
                      className="bg-gray-50"
                    />
                    <span className="text-sm text-gray-500">(auto-calculated)</span>
                  </div>
                </div>
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

      {/* POS Integration & Quick Sale */}
      {showPOSForm && (
        <Card className="border-2 border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Quick POS Sale
              </span>
              <Button variant="ghost" size="sm" onClick={() => setShowPOSForm(false)}>×</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-midnight-blue mb-2">Process Payment</h3>
                <div className="text-3xl font-bold text-midnight-blue mb-2">${calculateTotal().toFixed(2)}</div>
                <p className="text-sm text-gray-600">Tap to charge customer</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-12">💳 Card Payment</Button>
                <Button variant="outline" className="h-12">💵 Cash Payment</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* POS Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              POS System Integration
            </span>
            <div className="flex items-center space-x-2">
              {posConnected ? (
                <><Wifi className="w-4 h-4 text-green-600" /><span className="text-sm text-green-600">Connected</span></>
              ) : (
                <><WifiOff className="w-4 h-4 text-red-600" /><span className="text-sm text-red-600">Disconnected</span></>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 border-2 rounded-lg text-center transition-all ${
              posIntegrations.square.connected 
                ? 'border-green-300 bg-green-50' 
                : 'border-dashed border-gray-300'
            }`}>
              <div className="mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-midnight-blue">Square</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {posIntegrations.square.connected 
                  ? 'Auto-sync sales data from Square terminals'
                  : 'Connect your Square account to automatically import sales'
                }
              </p>
              <Button 
                variant={posIntegrations.square.connected ? "outline" : "primary"} 
                size="sm"
                onClick={() => connectPOS('square')}
              >
                {posIntegrations.square.connected ? 'Disconnect' : 'Connect Square'}
              </Button>
            </div>
            
            <div className={`p-4 border-2 rounded-lg text-center transition-all ${
              posIntegrations.stripe.connected 
                ? 'border-green-300 bg-green-50' 
                : 'border-dashed border-gray-300'
            }`}>
              <div className="mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-midnight-blue">Stripe</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {posIntegrations.stripe.connected 
                  ? 'Tracking online and in-person sales'
                  : 'Connect your Stripe account for online sales tracking'
                }
              </p>
              <Button 
                variant={posIntegrations.stripe.connected ? "outline" : "primary"} 
                size="sm"
                onClick={() => connectPOS('stripe')}
              >
                {posIntegrations.stripe.connected ? 'Disconnect' : 'Connect Stripe'}
              </Button>
            </div>

            <div className={`p-4 border-2 rounded-lg text-center transition-all ${
              posIntegrations.paypal.connected 
                ? 'border-green-300 bg-green-50' 
                : 'border-dashed border-gray-300'
            }`}>
              <div className="mb-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-midnight-blue">PayPal</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {posIntegrations.paypal.connected 
                  ? 'Syncing PayPal transactions'
                  : 'Connect PayPal for mobile payments and online orders'
                }
              </p>
              <Button 
                variant={posIntegrations.paypal.connected ? "outline" : "primary"} 
                size="sm"
                onClick={() => connectPOS('paypal')}
              >
                {posIntegrations.paypal.connected ? 'Disconnect' : 'Connect PayPal'}
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-champagne rounded-lg">
            <h4 className="font-semibold text-midnight-blue mb-2">Integration Benefits</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Automatic sale recording from your POS system</li>
              <li>• Real-time inventory tracking</li>
              <li>• Consolidated reporting across all sales channels</li>
              <li>• Reduced manual data entry and errors</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};