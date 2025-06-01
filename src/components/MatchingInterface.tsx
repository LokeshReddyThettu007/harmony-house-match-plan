
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, X, MapPin, DollarSign, Home, User, MessageSquare } from 'lucide-react';

interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  location: string;
  budget: number;
  compatibility: number;
  photos: string[];
  personality: {
    cleanliness: number;
    socialLevel: number;
    sleepSchedule: string;
    pets: boolean;
    smoking: boolean;
  };
  housingType: string;
}

const mockProfiles: RoommateProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 26,
    occupation: 'Software Developer',
    bio: 'Love cooking, hiking, and cozy movie nights. Looking for a clean, friendly roommate to share a beautiful apartment downtown.',
    location: 'Downtown, Seattle',
    budget: 1200,
    compatibility: 92,
    photos: ['photo-1649972904349-6e44c42644a7'],
    personality: {
      cleanliness: 8,
      socialLevel: 6,
      sleepSchedule: 'flexible',
      pets: true,
      smoking: false,
    },
    housingType: '2BR Apartment',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    age: 24,
    occupation: 'Graduate Student',
    bio: 'Quiet, studious, but enjoy good conversations. Looking for someone who appreciates a peaceful living environment.',
    location: 'University District',
    budget: 800,
    compatibility: 87,
    photos: ['photo-1721322800607-8c38375eef04'],
    personality: {
      cleanliness: 9,
      socialLevel: 4,
      sleepSchedule: 'early',
      pets: false,
      smoking: false,
    },
    housingType: 'Shared House',
  },
];

export const MatchingInterface: React.FC = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles] = useState(mockProfiles);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (liked: boolean) => {
    console.log(`${liked ? 'Liked' : 'Passed'} on ${currentProfile.name}`);
    
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0); // Reset for demo
    }
  };

  if (!currentProfile) {
    return (
      <div className="text-center py-12">
        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No more profiles</h3>
        <p className="text-gray-500">Check back later for new potential roommates!</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden shadow-lg">
        {/* Profile Image */}
        <div className="relative h-96 bg-gradient-to-br from-blue-200 to-green-200">
          <img
            src={`https://images.unsplash.com/${currentProfile.photos[0]}?auto=format&fit=crop&w=400&h=400`}
            alt={currentProfile.name}
            className="w-full h-full object-cover"
          />
          
          {/* Compatibility Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500 text-white font-bold text-lg px-3 py-1">
              {currentProfile.compatibility}% Match
            </Badge>
          </div>

          {/* Quick Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h2 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
            <p className="text-lg opacity-90">{currentProfile.occupation}</p>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{currentProfile.location}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Bio */}
          <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>

          {/* Housing & Budget */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{currentProfile.housingType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="font-medium">${currentProfile.budget}/month</span>
            </div>
          </div>

          {/* Personality Traits */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Living Style</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Cleanliness</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${currentProfile.personality.cleanliness * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{currentProfile.personality.cleanliness}/10</span>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-600 mb-1">Social Level</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${currentProfile.personality.socialLevel * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{currentProfile.personality.socialLevel}/10</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{currentProfile.personality.sleepSchedule} sleeper</Badge>
              {currentProfile.personality.pets && <Badge variant="outline">Pet friendly</Badge>}
              {!currentProfile.personality.smoking && <Badge variant="outline">Non-smoker</Badge>}
            </div>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <div className="p-6 pt-0">
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSwipe(false)}
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
            >
              <X className="w-5 h-5 mr-2" />
              Pass
            </Button>
            <Button
              size="lg"
              onClick={() => handleSwipe(true)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Heart className="w-5 h-5 mr-2" />
              Like
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-blue-600"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </Card>

      {/* Profile Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500">
          {currentProfileIndex + 1} of {profiles.length}
        </span>
      </div>
    </div>
  );
};
