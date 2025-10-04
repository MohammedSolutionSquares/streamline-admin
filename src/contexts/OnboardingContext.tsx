import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
  companyDetails: {
    companyName: string;
    businessType: string;
    registrationNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    description: string;
  };
  waterJarInventory: Array<{
    id: string;
    size: string;
    quantity: number;
  }>;
  customerDocuments: Array<{
    id: string;
    name: string;
    file: File;
    uploadedAt: Date;
  }>;
}

interface OnboardingContextType {
  onboardingData: OnboardingData | null;
  setOnboardingData: (data: OnboardingData) => void;
  clearOnboardingData: () => void;
  isOnboardingComplete: boolean;
  setIsOnboardingComplete: (complete: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const clearOnboardingData = () => {
    setOnboardingData(null);
    setIsOnboardingComplete(false);
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        setOnboardingData,
        clearOnboardingData,
        isOnboardingComplete,
        setIsOnboardingComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
