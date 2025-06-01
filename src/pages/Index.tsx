
import React, { useState } from 'react';
import { AuthPage } from '@/components/AuthPage';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { VibeQuestionnaire } from '@/components/VibeQuestionnaire';
import { Dashboard } from '@/components/Dashboard';
import { UserProvider } from '@/components/UserContext';

const Index = () => {
  const [authStep, setAuthStep] = useState<'auth' | 'onboarding' | 'vibe' | 'dashboard'>('auth');

  const handleAuthSuccess = () => {
    setAuthStep('onboarding');
  };

  const handleOnboardingComplete = () => {
    setAuthStep('vibe');
  };

  const handleVibeComplete = (vibeData: any) => {
    console.log('Vibe profile completed:', vibeData);
    setAuthStep('dashboard');
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
        {authStep === 'auth' && (
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        )}
        {authStep === 'onboarding' && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}
        {authStep === 'vibe' && (
          <VibeQuestionnaire onComplete={handleVibeComplete} />
        )}
        {authStep === 'dashboard' && (
          <Dashboard />
        )}
      </div>
    </UserProvider>
  );
};

export default Index;
