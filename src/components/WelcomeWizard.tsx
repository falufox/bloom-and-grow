import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Calendar, 
  Wrench, 
  Flower2, 
  Scissors, 
  DollarSign,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface WelcomeWizardProps {
  onComplete: () => void;
  onSkip: () => void;
}

const workflowSteps = [
  {
    icon: Settings,
    title: 'Garden Setup',
    description: 'Choose your garden type, select flowers, and set goals',
    color: 'bg-midnight-800/10 text-midnight-800'
  },
  {
    icon: Calendar,
    title: 'Planning',
    description: 'Design your garden layout and plan planting schedules',
    color: 'bg-gold-500/10 text-gold-600'
  },
  {
    icon: Wrench,
    title: 'Prepping',
    description: 'Prepare your soil and beds for optimal growing',
    color: 'bg-primary-500/10 text-primary-600'
  },
  {
    icon: Flower2,
    title: 'Planting',
    description: 'Track plantings and monitor growth progress',
    color: 'bg-purple-500/10 text-purple-600'
  },
  {
    icon: Scissors,
    title: 'Cutting',
    description: 'Harvest flowers and track your yield',
    color: 'bg-emerald-500/10 text-emerald-600'
  },
  {
    icon: DollarSign,
    title: 'Selling',
    description: 'Record sales and track your revenue',
    color: 'bg-gold-500/15 text-gold-600'
  }
];

export const WelcomeWizard: React.FC<WelcomeWizardProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onComplete();
    navigate('/setup');
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const wizardSteps = [
    // Step 1: Welcome
    {
      title: 'Welcome to Bloom & Grow',
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-primary-500 to-gold-500 p-4">
              <Sparkles className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-midnight-900 mb-3">
              Your Flower Farm Management System
            </h2>
            <p className="text-cool-600 text-base sm:text-lg max-w-md mx-auto">
              From seed to sale, we'll help you manage every aspect of your flower farming journey with confidence and ease.
            </p>
          </div>
        </div>
      )
    },
    // Step 2: Workflow Overview
    {
      title: 'Your Flower Farm Journey',
      content: (
        <div className="space-y-4 sm:space-y-6">
          <p className="text-cool-600 text-center mb-6">
            Follow our proven 6-step workflow for successful flower farming:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 rounded-xl bg-midnight-50/50 border border-cool-200/40">
                <div className={`rounded-lg p-2 ${step.color} flex-shrink-0`}>
                  <step.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-midnight-900 text-sm">{step.title}</h3>
                  <p className="text-xs text-cool-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Step 3: Getting Started
    {
      title: 'Ready to Get Started?',
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-midnight-800/10 p-4">
              <Settings className="w-12 h-12 text-midnight-800" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-midnight-900 mb-3">
              Let's Set Up Your Garden
            </h2>
            <p className="text-cool-600 text-base sm:text-lg max-w-md mx-auto">
              We'll start with Garden Setup to define your space, choose your flowers, and set your goals. This will personalize the entire app for your unique farming operation.
            </p>
          </div>
          <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
            <p className="text-sm text-gold-800">
              <strong>Tip:</strong> Don't worry about getting everything perfect! You can always come back and adjust your setup later.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-midnight-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {wizardSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-midnight-800' : 
                      index < currentStep ? 'bg-primary-500' : 'bg-cool-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-cool-600">
                {currentStep + 1} of {wizardSteps.length}
              </span>
            </div>
            <button
              onClick={onSkip}
              className="p-2 rounded-lg text-cool-600 hover:text-midnight-800 hover:bg-cool-50 transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Content */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-xl sm:text-2xl font-display font-light text-midnight-900 mb-6 text-center">
              {wizardSteps[currentStep].title}
            </h1>
            {wizardSteps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button onClick={prevStep} variant="outline" className="flex-1 sm:flex-initial">
                  <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Back
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={onSkip} variant="ghost" className="flex-1 sm:flex-initial">
                Skip Tour
              </Button>
              {currentStep < wizardSteps.length - 1 ? (
                <Button onClick={nextStep} className="flex-1 sm:flex-initial">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
                </Button>
              ) : (
                <Button onClick={handleGetStarted} className="flex-1 sm:flex-initial">
                  Start Garden Setup
                  <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};