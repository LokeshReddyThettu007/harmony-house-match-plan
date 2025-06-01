
import React, { useState } from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { Dashboard } from '@/components/Dashboard';
import { UserProvider } from '@/components/UserContext';

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
        {!isOnboarded ? (
          <OnboardingFlow onComplete={() => setIsOnboarded(true)} />
        ) : (
          <Dashboard />
        )}
      </div>
    </UserProvider>
  );
};

export default Index;
