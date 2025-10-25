import { useEffect, useState } from 'react';

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
}

export function AccessibilityEnhancer({ children }: AccessibilityEnhancerProps) {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check if user has high contrast preference
    const preferHighContrast = localStorage.getItem('high-contrast') === 'true';
    if (preferHighContrast) {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }

    // Add keyboard shortcut for toggling high contrast mode (Alt+C)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'c') {
        toggleHighContrast();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('high-contrast', 'false');
    }
  };

  return (
    <>
      {children}
      <button
        onClick={toggleHighContrast}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
        aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
        title={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20Z"></path>
        </svg>
      </button>
    </>
  );
}