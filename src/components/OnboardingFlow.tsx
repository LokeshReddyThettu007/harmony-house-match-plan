
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useUser } from './UserContext';
import { Home, Users, Heart, DollarSign } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { setUser } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    occupation: '',
    bio: '',
    location: '',
    housingType: 'room' as const,
    budget: { min: 500, max: 1500 },
    personality: {
      cleanliness: 5,
      socialLevel: 5,
      sleepSchedule: 'flexible' as const,
      pets: false,
      smoking: false,
      cooking: 5,
    },
    preferences: {
      genderPreference: 'any' as const,
      ageRange: { min: 20, max: 35 },
      lifestyle: [] as string[],
    },
    photos: [],
  });

  const steps = [
    { title: 'Welcome', icon: Home },
    { title: 'Basic Info', icon: Users },
    { title: 'Personality', icon: Heart },
    { title: 'Preferences', icon: DollarSign },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      });
      onComplete();
    }
  };

  const renderWelcome = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
        <Home className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800">Welcome to RoomieMatch</h1>
      <p className="text-xl text-gray-600 max-w-md mx-auto">
        Find your perfect roommate and create a harmonious living experience
      </p>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-blue-100 p-4 rounded-lg">
          <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-blue-800">Smart Matching</h3>
          <p className="text-sm text-blue-600">Find compatible roommates</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-800">Expense Tracking</h3>
          <p className="text-sm text-green-600">Manage shared costs easily</p>
        </div>
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Tell us about yourself</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            placeholder="Your job or studies"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, State"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="bio">About Me</Label>
        <textarea
          id="bio"
          className="w-full p-3 border rounded-md resize-none h-24"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Tell potential roommates about yourself..."
        />
      </div>
      <div>
        <Label>Housing Type</Label>
        <Select value={formData.housingType} onValueChange={(value: any) => setFormData({ ...formData, housingType: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="room">Room in shared house/apartment</SelectItem>
            <SelectItem value="apartment">Entire apartment</SelectItem>
            <SelectItem value="studio">Studio apartment</SelectItem>
            <SelectItem value="house">Entire house</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderPersonality = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Living Style</h2>
      <p className="text-center text-gray-600">Help us find your perfect match</p>
      
      <div className="space-y-6">
        <div>
          <Label>Cleanliness Level (1-10)</Label>
          <Slider
            value={[formData.personality.cleanliness]}
            onValueChange={(value) => setFormData({
              ...formData,
              personality: { ...formData.personality, cleanliness: value[0] }
            })}
            max={10}
            min={1}
            step={1}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Messy</span>
            <span>Very Clean</span>
          </div>
        </div>

        <div>
          <Label>Social Level (1-10)</Label>
          <Slider
            value={[formData.personality.socialLevel]}
            onValueChange={(value) => setFormData({
              ...formData,
              personality: { ...formData.personality, socialLevel: value[0] }
            })}
            max={10}
            min={1}
            step={1}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Introvert</span>
            <span>Extrovert</span>
          </div>
        </div>

        <div>
          <Label>Cooking Frequency (1-10)</Label>
          <Slider
            value={[formData.personality.cooking]}
            onValueChange={(value) => setFormData({
              ...formData,
              personality: { ...formData.personality, cooking: value[0] }
            })}
            max={10}
            min={1}
            step={1}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Rarely</span>
            <span>Daily</span>
          </div>
        </div>

        <div>
          <Label>Sleep Schedule</Label>
          <Select 
            value={formData.personality.sleepSchedule} 
            onValueChange={(value: any) => setFormData({
              ...formData,
              personality: { ...formData.personality, sleepSchedule: value }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="early">Early Bird (sleep before 10pm)</SelectItem>
              <SelectItem value="night">Night Owl (sleep after midnight)</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pets"
              checked={formData.personality.pets}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                personality: { ...formData.personality, pets: checked as boolean }
              })}
            />
            <Label htmlFor="pets">Pet Friendly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="smoking"
              checked={formData.personality.smoking}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                personality: { ...formData.personality, smoking: checked as boolean }
              })}
            />
            <Label htmlFor="smoking">Smoking OK</Label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <Label>Budget Range (Monthly)</Label>
          <div className="flex items-center space-x-4 mt-2">
            <Input
              type="number"
              value={formData.budget.min}
              onChange={(e) => setFormData({
                ...formData,
                budget: { ...formData.budget, min: parseInt(e.target.value) }
              })}
              placeholder="Min"
            />
            <span>to</span>
            <Input
              type="number"
              value={formData.budget.max}
              onChange={(e) => setFormData({
                ...formData,
                budget: { ...formData.budget, max: parseInt(e.target.value) }
              })}
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <Label>Roommate Gender Preference</Label>
          <Select 
            value={formData.preferences.genderPreference} 
            onValueChange={(value: any) => setFormData({
              ...formData,
              preferences: { ...formData.preferences, genderPreference: value }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">No preference</SelectItem>
              <SelectItem value="same">Same gender</SelectItem>
              <SelectItem value="different">Different gender</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Preferred Age Range</Label>
          <div className="flex items-center space-x-4 mt-2">
            <Input
              type="number"
              value={formData.preferences.ageRange.min}
              onChange={(e) => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  ageRange: { ...formData.preferences.ageRange, min: parseInt(e.target.value) }
                }
              })}
              placeholder="Min age"
            />
            <span>to</span>
            <Input
              type="number"
              value={formData.preferences.ageRange.max}
              onChange={(e) => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  ageRange: { ...formData.preferences.ageRange, max: parseInt(e.target.value) }
                }
              })}
              placeholder="Max age"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const stepComponents = [renderWelcome, renderBasicInfo, renderPersonality, renderPreferences];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((stepInfo, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= step ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          {step > 0 && (
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <steps[step].icon className="w-6 h-6" />
              <span>{steps[step].title}</span>
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {stepComponents[step]()}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className="ml-auto bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              disabled={step === 1 && !formData.name}
            >
              {step === steps.length - 1 ? 'Complete Profile' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
