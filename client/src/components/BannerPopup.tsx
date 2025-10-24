import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BannerImage {
  id: string;
  src: string;
  alt: string;
  description?: string;
}

export interface BannerConfig {
  title: string;
  images: BannerImage[];
  imageTransition: 'slide' | 'fade' | 'scale' | 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down';
  displayDuration: {
    perImage: number; // seconds per individual image
    totalDisplay: number; // total seconds before auto-hide
  };
  callToAction?: {
    text: string;
    url: string;
    openInNewTab?: boolean;
  };
  placement: 'center' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  background: {
    overlayOpacity: number; // 0-100
    overlayColor: string; // hex color
  };
  animation: {
    entrance: 'fade-in' | 'slide-in-top' | 'slide-in-bottom' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
    exit: 'fade-out' | 'slide-out-top' | 'slide-out-bottom' | 'slide-out-left' | 'slide-out-right' | 'scale-out';
  };
  autoHide: boolean;
  showProgressBar: boolean;
  showNavigation: boolean;
  closeButton: boolean;
}

interface BannerPopupProps {
  config: BannerConfig;
  isVisible: boolean;
  onClose: () => void;
  onActionClick?: (url: string) => void;
}

export const BannerPopup: React.FC<BannerPopupProps> = ({
  config,
  isVisible,
  onClose,
  onActionClick
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const {
    title,
    images,
    imageTransition,
    displayDuration,
    callToAction,
    placement,
    background,
    animation,
    autoHide,
    showProgressBar,
    showNavigation,
    closeButton
  } = config;

  // Handle image transitions
  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setProgress(0);
      setIsAnimating(false);
    }, 300); // Half of transition duration
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setProgress(0);
      setIsAnimating(false);
    }, 300);
  }, [images.length]);

  // Progress tracking
  useEffect(() => {
    if (!isVisible || !autoHide) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = (100 / displayDuration.totalDisplay) * 0.1; // Update every 100ms
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          handleClose();
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isVisible, autoHide, displayDuration.totalDisplay]);

  // Image rotation
  useEffect(() => {
    if (!isVisible || images.length <= 1) return;

    const imageInterval = setInterval(() => {
      nextImage();
    }, displayDuration.perImage * 1000);

    return () => clearInterval(imageInterval);
  }, [isVisible, images.length, displayDuration.perImage, nextImage]);

  // Handle close
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
      setCurrentImageIndex(0);
      setProgress(0);
    }, 500); // Match animation duration
  }, [onClose]);

  // Handle action click
  const handleActionClick = useCallback(() => {
    if (callToAction?.url && onActionClick) {
      onActionClick(callToAction.url);
    }
  }, [callToAction?.url, onActionClick]);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, handleClose, prevImage, nextImage]);

  if (!isVisible) return null;

  const getPlacementClasses = () => {
    const baseClasses = "fixed z-50 max-w-4xl mx-auto";
    
    switch (placement) {
      case 'top':
        return `${baseClasses} top-8 left-1/2 transform -translate-x-1/2`;
      case 'bottom':
        return `${baseClasses} bottom-8 left-1/2 transform -translate-x-1/2`;
      case 'top-left':
        return `${baseClasses} top-8 left-8`;
      case 'top-right':
        return `${baseClasses} top-8 right-8`;
      case 'bottom-left':
        return `${baseClasses} bottom-8 left-8`;
      case 'bottom-right':
        return `${baseClasses} bottom-8 right-8`;
      default: // center
        return `${baseClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
    }
  };

  const getEntranceAnimation = () => {
    if (isExiting) return '';
    
    switch (animation.entrance) {
      case 'slide-in-top':
        return 'animate-slide-in-top';
      case 'slide-in-bottom':
        return 'animate-slide-in-bottom';
      case 'slide-in-left':
        return 'animate-slide-in-left';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      case 'scale-in':
        return 'animate-scale-in';
      default:
        return 'animate-fade-in';
    }
  };

  const getExitAnimation = () => {
    if (!isExiting) return '';
    
    switch (animation.exit) {
      case 'slide-out-top':
        return 'animate-slide-out-top';
      case 'slide-out-bottom':
        return 'animate-slide-out-bottom';
      case 'slide-out-left':
        return 'animate-slide-out-left';
      case 'slide-out-right':
        return 'animate-slide-out-right';
      case 'scale-out':
        return 'animate-scale-out';
      default:
        return 'animate-fade-out';
    }
  };

  const getImageTransitionClasses = () => {
    const baseClasses = "transition-all duration-600 ease-in-out";
    
    if (isAnimating) {
      switch (imageTransition) {
        case 'slide':
          return `${baseClasses} transform translate-x-full opacity-0`;
        case 'slide-right':
          return `${baseClasses} transform translate-x-full opacity-0`;
        case 'slide-left':
          return `${baseClasses} transform -translate-x-full opacity-0`;
        case 'slide-up':
          return `${baseClasses} transform -translate-y-full opacity-0`;
        case 'slide-down':
          return `${baseClasses} transform translate-y-full opacity-0`;
        case 'scale':
          return `${baseClasses} transform scale-0 opacity-0`;
        default: // fade
          return `${baseClasses} opacity-0`;
      }
    }
    
    switch (imageTransition) {
      case 'slide':
      case 'slide-right':
      case 'slide-left':
      case 'slide-up':
      case 'slide-down':
        return `${baseClasses} transform translate-x-0 translate-y-0 opacity-100`;
      case 'scale':
        return `${baseClasses} transform scale-100 opacity-100`;
      default:
        return `${baseClasses} opacity-100`;
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-500",
          isExiting ? "opacity-0" : "opacity-100"
        )}
        style={{
          backgroundColor: `${background.overlayColor}${Math.round(background.overlayOpacity * 2.55).toString(16).padStart(2, '0')}`,
        }}
        onClick={handleClose}
      />

      {/* Banner Content */}
      <div
        className={cn(
          getPlacementClasses(),
          getEntranceAnimation(),
          getExitAnimation(),
          "bg-white rounded-2xl shadow-2xl overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          
          {closeButton && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={handleClose}
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Image Container */}
        <div className="relative bg-gray-100 min-h-[300px] overflow-hidden">
          {images.length > 0 && (
            <div className="relative w-full h-full">
              <img
                key={`${images[currentImageIndex].id}-${currentImageIndex}`}
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className={cn(
                  "w-full h-[300px] object-cover",
                  getImageTransitionClasses()
                )}
              />
              
              {/* Image Description */}
              {images[currentImageIndex].description && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                  <p className="text-sm">{images[currentImageIndex].description}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          {showNavigation && images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800"
                onClick={prevImage}
                disabled={isAnimating}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800"
                onClick={nextImage}
                disabled={isAnimating}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setProgress(0);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {showProgressBar && autoHide && (
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Footer with CTA */}
        {callToAction && (
          <div className="p-6 text-center">
            <Button
              onClick={handleActionClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {callToAction.text}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

// Default configuration for easy setup
export const defaultBannerConfig: BannerConfig = {
  title: "Welcome to GD Goenka Public School!",
  images: [
    {
      id: "campus",
      src: "/assets/campus_aerial-C6u-hgAX.png",
      alt: "Beautiful campus view",
      description: "Our state-of-the-art campus provides the perfect learning environment"
    },
    {
      id: "science-lab",
      src: "/assets/Science_lab_campus_tour_9f1f27cd-rt7CpexB.png",
      alt: "Modern science laboratory",
      description: "Cutting-edge laboratories for hands-on learning experiences"
    },
    {
      id: "sports",
      src: "/assets/Sports_facilities_image_2ec22754-Q-LCzr41.png",
      alt: "Sports facilities",
      description: "World-class sports facilities for holistic development"
    }
  ],
  imageTransition: 'slide',
  displayDuration: {
    perImage: 3,
    totalDisplay: 10
  },
  callToAction: {
    text: "Explore Our School",
    url: "/about",
    openInNewTab: false
  },
  placement: 'center',
  background: {
    overlayOpacity: 50,
    overlayColor: '#000000'
  },
  animation: {
    entrance: 'slide-in-top',
    exit: 'slide-out-top'
  },
  autoHide: true,
  showProgressBar: true,
  showNavigation: true,
  closeButton: true
};


