import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, DollarSign, TrendingUp, Users, Calendar, Receipt } from 'lucide-react';

interface Bill {
  id: string;
  description: string;
  amount: number;
  category: string;
  paidBy: string;
  splitWith: string[];
  date: string;
  settled: boolean;
}

const mockBills: Bill[] = [
  {
    id: '1',
    description: 'Monthly Rent - July',
    amount: 2400,
    category: 'rent',
    paidBy: 'You',
    splitWith: ['Sarah Chen'],
    date: '2024-07-01',
    settled: true,
  },
  {
    id: '2',
    description: 'Electricity Bill',
    amount: 120,
    category: 'utilities',
    paidBy: 'Sarah Chen',
    splitWith: ['You'],
    date: '2024-07-05',
    settled: false,
  },
  {
    id: '3',
    description: 'Groceries - Week 1',
    amount: 85,
    category: 'groceries',
    paidBy: 'You',
    splitWith: ['Sarah Chen'],
    date: '2024-07-08',
    settled: false,
  },
];

const categories = [
  { value: 'rent', label: 'Rent', color: 'bg-blue-500' },
  { value: 'utilities', label: 'Utilities', color: 'bg-yellow-500' },
  { value: 'groceries', label: 'Groceries', color: 'bg-green-500' },
  { value: 'maintenance', label: 'Maintenance', color: 'bg-red-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' },
];

export const BillSplitter: React.FC = () => {
  const [bills, setBills] = useState(mockBills);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'other',
    paidBy: 'You',
    splitWith: ['Sarah Chen'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBill: Bill = {
      id: Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      paidBy: formData.paidBy,
      splitWith: formData.splitWith,
      date: new Date().toISOString().split('T')[0],
      settled: false,
    };
    
    setBills([newBill, ...bills]);
    setShowForm(false);
    setFormData({
      description: '',
      amount: '',
      category: 'other',
      paidBy: 'You',
      splitWith: ['Sarah Chen'],
    });
  };

  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const yourBalance = bills.reduce((balance, bill) => {
    const splitAmount = bill.amount / (bill.splitWith.length + 1);
    if (bill.paidBy === 'You') {
      return balance + (bill.amount - splitAmount);
    } else {
      return balance - splitAmount;
    }
  }, 0);

  const unsettledBills = bills.filter(bill => !bill.settled);

  const getCategoryColor = (category: string) => {
    return categories.find(cat => cat.value === category)?.color || 'bg-gray-500';
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || 'Other';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bills</p>
                <p className="text-2xl font-bold text-gray-900">${totalBills.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Your Balance</p>
                <p className={`text-2xl font-bold ${yourBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {yourBalance >= 0 ? '+' : ''}${yourBalance.toFixed(2)}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                yourBalance >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <DollarSign className={`w-6 h-6 ${yourBalance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Splits</p>
                <p className="text-2xl font-bold text-gray-900">{unsettledBills.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Bill Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Recent Bills & Splits</h2>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Bill
        </Button>
      </div>

      {/* Add Bill Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Split a New Bill</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g., Groceries, Utilities"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Paid By</Label>
                  <Select value={formData.paidBy} onValueChange={(value) => setFormData({ ...formData, paidBy: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="You">You</SelectItem>
                      <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500">
                  Split Bill
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Bills List */}
      <div className="space-y-4">
        {bills.map((bill) => (
          <Card key={bill.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(bill.category)}`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{bill.description}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Paid by {bill.paidBy}</span>
                      <span>•</span>
                      <span>Split with {bill.splitWith.join(', ')}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(bill.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${bill.amount.toFixed(2)}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{getCategoryLabel(bill.category)}</Badge>
                    <Badge variant={bill.settled ? "default" : "secondary"}>
                      {bill.settled ? 'Settled' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
