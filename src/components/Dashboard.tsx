
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from './UserContext';
import { MatchingInterface } from './MatchingInterface';
import { BillSplitter } from './BillSplitter';
import { ListingCreator } from './ListingCreator';
import { Home, Heart, Receipt, Plus, User, MessageSquare } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('discover');

  const tabs = [
    { id: 'discover', label: 'Discover', icon: Heart },
    { id: 'listings', label: 'Listings', icon: Home },
    { id: 'bills', label: 'Bills & Splits', icon: Receipt },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (!user) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'discover':
        return <MatchingInterface />;
      case 'listings':
        return <ListingCreator />;
      case 'bills':
        return <BillSplitter />;
      case 'messages':
        return <MessagesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <MatchingInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">RoomieMatch</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}! 🏠</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

const MessagesView: React.FC = () => (
  <div className="text-center py-12">
    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
    <p className="text-gray-500">Start matching with roommates to begin conversations!</p>
  </div>
);

const ProfileView: React.FC = () => {
  const { user } = useUser();
  
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-medium">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.age} years old • {user.occupation}</p>
              <p className="text-gray-600">{user.location}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">About Me</h4>
            <p className="text-gray-600">{user.bio}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Living Style</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Cleanliness</span>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${user.personality.cleanliness * 10}%` }}
                    />
                  </div>
                  <span className="text-sm">{user.personality.cleanliness}/10</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Social Level</span>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${user.personality.socialLevel * 10}%` }}
                    />
                  </div>
                  <span className="text-sm">{user.personality.socialLevel}/10</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Preferences</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                Budget: ${user.budget.min} - ${user.budget.max}
              </Badge>
              <Badge variant="secondary">
                {user.personality.sleepSchedule} sleeper
              </Badge>
              {user.personality.pets && <Badge variant="secondary">Pet friendly</Badge>}
              {user.personality.smoking && <Badge variant="secondary">Smoking OK</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
