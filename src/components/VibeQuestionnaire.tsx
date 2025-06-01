
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Music, Film, Users, Coffee, Gamepad2, Book, Dumbbell, Plane } from 'lucide-react';

interface VibeQuestionnaireProps {
  onComplete: (vibeData: any) => void;
}

export const VibeQuestionnaire: React.FC<VibeQuestionnaireProps> = ({ onComplete }) => {
  const [vibeData, setVibeData] = useState({
    socialStyle: 5,
    partyLevel: 3,
    musicTaste: [] as string[],
    movieGenres: [] as string[],
    hobbies: [] as string[],
    lifestyle: [] as string[],
    workSchedule: 'flexible',
    guestPolicy: 5,
    noiseLevel: 5,
    cleaningStyle: 5,
  });

  const musicGenres = [
    'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Classical', 'Jazz', 
    'Country', 'R&B', 'Indie', 'Reggae', 'Metal', 'Folk'
  ];

  const movieGenres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi',
    'Documentary', 'Thriller', 'Animation', 'Musical', 'Fantasy', 'Crime'
  ];

  const hobbies = [
    'Reading', 'Gaming', 'Cooking', 'Fitness', 'Photography', 'Travel',
    'Art', 'Music', 'Sports', 'Dancing', 'Writing', 'Gardening'
  ];

  const lifestyleChoices = [
    'Early Bird', 'Night Owl', 'Homebody', 'Social Butterfly', 
    'Minimalist', 'Maximalist', 'Health Conscious', 'Foodie',
    'Tech Enthusiast', 'Nature Lover', 'City Explorer', 'Quiet Type'
  ];

  const handleArrayToggle = (array: string[], item: string, field: string) => {
    const newArray = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    setVibeData({ ...vibeData, [field]: newArray });
  };

  const handleSubmit = () => {
    console.log('Vibe data collected:', vibeData);
    onComplete(vibeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Tell Us Your Vibe! 🎵
            </CardTitle>
            <p className="text-gray-600">
              Help us understand your lifestyle to find your perfect roommate match
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Social Style */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <Label className="text-lg font-semibold">Social Style</Label>
              </div>
              <Slider
                value={[vibeData.socialStyle]}
                onValueChange={(value) => setVibeData({ ...vibeData, socialStyle: value[0] })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Introvert</span>
                <span>Ambivert</span>
                <span>Extrovert</span>
              </div>
            </div>

            {/* Party Level */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-green-600" />
                <Label className="text-lg font-semibold">Party Vibes</Label>
              </div>
              <Slider
                value={[vibeData.partyLevel]}
                onValueChange={(value) => setVibeData({ ...vibeData, partyLevel: value[0] })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Quiet nights in</span>
                <span>Occasional parties</span>
                <span>Party every weekend</span>
              </div>
            </div>

            {/* Music Taste */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-purple-600" />
                <Label className="text-lg font-semibold">Music You Love</Label>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {musicGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`music-${genre}`}
                      checked={vibeData.musicTaste.includes(genre)}
                      onCheckedChange={() => handleArrayToggle(vibeData.musicTaste, genre, 'musicTaste')}
                    />
                    <Label htmlFor={`music-${genre}`} className="text-sm">{genre}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Movie Preferences */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Film className="w-5 h-5 text-red-600" />
                <Label className="text-lg font-semibold">Movie Night Preferences</Label>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {movieGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`movie-${genre}`}
                      checked={vibeData.movieGenres.includes(genre)}
                      onCheckedChange={() => handleArrayToggle(vibeData.movieGenres, genre, 'movieGenres')}
                    />
                    <Label htmlFor={`movie-${genre}`} className="text-sm">{genre}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-5 h-5 text-orange-600" />
                <Label className="text-lg font-semibold">Your Hobbies</Label>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {hobbies.map((hobby) => (
                  <div key={hobby} className="flex items-center space-x-2">
                    <Checkbox
                      id={`hobby-${hobby}`}
                      checked={vibeData.hobbies.includes(hobby)}
                      onCheckedChange={() => handleArrayToggle(vibeData.hobbies, hobby, 'hobbies')}
                    />
                    <Label htmlFor={`hobby-${hobby}`} className="text-sm">{hobby}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-yellow-600" />
                <Label className="text-lg font-semibold">Lifestyle Vibe</Label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lifestyleChoices.map((choice) => (
                  <div key={choice} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lifestyle-${choice}`}
                      checked={vibeData.lifestyle.includes(choice)}
                      onCheckedChange={() => handleArrayToggle(vibeData.lifestyle, choice, 'lifestyle')}
                    />
                    <Label htmlFor={`lifestyle-${choice}`} className="text-sm">{choice}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Policy */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Comfort with Guests</Label>
              <Slider
                value={[vibeData.guestPolicy]}
                onValueChange={(value) => setVibeData({ ...vibeData, guestPolicy: value[0] })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>No guests</span>
                <span>Occasional guests</span>
                <span>Guests welcome anytime</span>
              </div>
            </div>

            {/* Noise Level */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Noise Comfort Level</Label>
              <Slider
                value={[vibeData.noiseLevel]}
                onValueChange={(value) => setVibeData({ ...vibeData, noiseLevel: value[0] })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Library quiet</span>
                <span>Normal conversation</span>
                <span>Music & TV okay</span>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg py-6"
            >
              Complete My Vibe Profile ✨
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
