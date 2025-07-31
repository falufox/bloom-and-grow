import React, { createContext, useContext, useState, useEffect } from 'react';

interface WelcomeContextType {
  showWelcomeWizard: boolean;
  completeWelcome: () => void;
  skipWelcome: () => void;
  resetWelcome: () => void; // For testing/demo purposes
}

const WelcomeContext = createContext<WelcomeContextType | undefined>(undefined);

const WELCOME_STORAGE_KEY = 'bloom-and-grow-welcome-completed';

interface WelcomeProviderProps {
  children: React.ReactNode;
}

export const WelcomeProvider: React.FC<WelcomeProviderProps> = ({ children }) => {
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false);

  useEffect(() => {
    // Check if user has completed welcome wizard before
    const hasCompletedWelcome = localStorage.getItem(WELCOME_STORAGE_KEY);
    
    if (!hasCompletedWelcome) {
      // Add a small delay to ensure the app has loaded
      const timer = setTimeout(() => {
        setShowWelcomeWizard(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const completeWelcome = () => {
    localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
    setShowWelcomeWizard(false);
  };

  const skipWelcome = () => {
    localStorage.setItem(WELCOME_STORAGE_KEY, 'skipped');
    setShowWelcomeWizard(false);
  };

  const resetWelcome = () => {
    localStorage.removeItem(WELCOME_STORAGE_KEY);
    setShowWelcomeWizard(true);
  };

  return (
    <WelcomeContext.Provider
      value={{
        showWelcomeWizard,
        completeWelcome,
        skipWelcome,
        resetWelcome
      }}
    >
      {children}
    </WelcomeContext.Provider>
  );
};

export const useWelcome = (): WelcomeContextType => {
  const context = useContext(WelcomeContext);
  if (context === undefined) {
    throw new Error('useWelcome must be used within a WelcomeProvider');
  }
  return context;
};