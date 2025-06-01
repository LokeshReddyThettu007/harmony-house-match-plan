
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Home, MapPin, DollarSign, Calendar } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  location: string;
  rent: number;
  type: string;
  availableFrom: string;
  description: string;
  amenities: string[];
  roommates: number;
  photos: string[];
}

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Cozy Room in Downtown Apartment',
    location: 'Downtown, Seattle',
    rent: 1200,
    type: 'Room',
    availableFrom: '2024-07-01',
    description: 'Beautiful room in a modern 2BR apartment with great city views. Perfect for young professionals.',
    amenities: ['WiFi', 'Laundry', 'Kitchen', 'Parking', 'Gym'],
    roommates: 1,
    photos: ['photo-1721322800607-8c38375eef04'],
  },
];

export const ListingCreator: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState(mockListings);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    rent: '',
    type: 'room',
    availableFrom: '',
    description: '',
    amenities: [] as string[],
    roommates: '1',
  });

  const amenityOptions = [
    'WiFi', 'Laundry', 'Kitchen', 'Parking', 'Gym', 'Pool', 'Balcony', 
    'Air Conditioning', 'Heating', 'Dishwasher', 'Pet Friendly'
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.filter(a => a !== amenity)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: Date.now().toString(),
      title: formData.title,
      location: formData.location,
      rent: parseInt(formData.rent),
      type: formData.type,
      availableFrom: formData.availableFrom,
      description: formData.description,
      amenities: formData.amenities,
      roommates: parseInt(formData.roommates),
      photos: ['photo-1721322800607-8c38375eef04'], // Default photo
    };
    
    setListings([newListing, ...listings]);
    setShowForm(false);
    setFormData({
      title: '',
      location: '',
      rent: '',
      type: 'room',
      availableFrom: '',
      description: '',
      amenities: [],
      roommates: '1',
    });
  };

  if (showForm) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Cozy room in downtown"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="rent">Monthly Rent ($)</Label>
                <Input
                  id="rent"
                  type="number"
                  value={formData.rent}
                  onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                  placeholder="1200"
                  required
                />
              </div>
              <div>
                <Label>Property Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="availableFrom">Available From</Label>
                <Input
                  id="availableFrom"
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="roommates">Looking for # roommates</Label>
                <Input
                  id="roommates"
                  type="number"
                  value={formData.roommates}
                  onChange={(e) => setFormData({ ...formData, roommates: e.target.value })}
                  min="1"
                  max="5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full p-3 border rounded-md resize-none h-24"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your space, neighborhood, and what you're looking for in a roommate..."
                required
              />
            </div>

            <div>
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                    />
                    <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500">
                Create Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Listings</h2>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Listing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-200 to-green-200">
              <img
                src={`https://images.unsplash.com/${listing.photos[0]}?auto=format&fit=crop&w=400&h=300`}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>${listing.rent}/mo</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>

              <div className="flex flex-wrap gap-1">
                {listing.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {listing.amenities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{listing.amenities.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Available {new Date(listing.availableFrom).toLocaleDateString()}</span>
                </div>
                <Badge variant="outline">
                  {listing.roommates} roommate{listing.roommates > 1 ? 's' : ''}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-500 mb-4">Create your first listing to start finding roommates!</p>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-500 to-green-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Listing
          </Button>
        </div>
      )}
    </div>
  );
};
