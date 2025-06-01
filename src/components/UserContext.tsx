
import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  location: string;
  housingType: 'room' | 'apartment' | 'studio' | 'house';
  budget: { min: number; max: number };
  personality: {
    cleanliness: number;
    socialLevel: number;
    sleepSchedule: 'early' | 'night' | 'flexible';
    pets: boolean;
    smoking: boolean;
    cooking: number;
  };
  preferences: {
    genderPreference: 'any' | 'same' | 'different';
    ageRange: { min: number; max: number };
    lifestyle: string[];
  };
  photos: string[];
}

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);

  const setUser = (user: UserProfile) => {
    setUserState(user);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      setUserState({ ...user, ...updates });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
