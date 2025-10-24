import { useEffect, useState } from 'react';

export function AccessibilityEnhancer() {
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

  // Remove the button from UI
  return null;
}