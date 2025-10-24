import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SimpleImage {
  id: string;
  src: string;
  alt: string;
}

interface SimpleBannerPopupProps {
  images: SimpleImage[];
  isVisible: boolean;
  onClose: () => void;
  imageDuration?: number; // seconds per image
  totalDuration?: number; // total seconds before auto-hide
}

export const SimpleBannerPopup: React.FC<SimpleBannerPopupProps> = ({
  images,
  isVisible,
  onClose,
  imageDuration = 3,
  totalDuration = 10
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Handle image transitions
  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Progress tracking
  useEffect(() => {
    if (!isVisible) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = (100 / totalDuration) * 0.1; // Update every 100ms
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          onClose();
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isVisible, totalDuration, onClose]);

  // Image rotation
  useEffect(() => {
    if (!isVisible || images.length <= 1) return;

    const imageInterval = setInterval(() => {
      nextImage();
    }, imageDuration * 1000);

    return () => clearInterval(imageInterval);
  }, [isVisible, images.length, imageDuration, nextImage]);

  // Keyboard close
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, onClose]);

  if (!isVisible || images.length === 0) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Banner Content */}
      <div className="fixed inset-4 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-6 h-6 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full">
            <img
              key={`${images[currentImageIndex].id}-${currentImageIndex}`}
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300",
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-blue-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Simple hook for the banner
export const useSimpleBanner = (images: SimpleImage[], delay = 2000) => {
  const [isVisible, setIsVisible] = useState(false);

  const showBanner = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideBanner = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    
    const timer = setTimeout(() => {
      showBanner();
    }, delay);

    return () => clearTimeout(timer);
  }, [images.length, delay, showBanner]);

  return {
    isVisible,
    showBanner,
    hideBanner
  };
};
