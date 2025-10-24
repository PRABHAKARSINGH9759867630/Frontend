import { useState, useEffect, useCallback } from 'react';
import { BannerConfig } from '@/components/BannerPopup';

interface UseBannerPopupOptions {
  config: BannerConfig;
  delay?: number; // Delay before showing banner (in milliseconds)
  showOnce?: boolean; // Whether to show banner only once per session
  localStorageKey?: string; // Key for localStorage to track if shown
}

export const useBannerPopup = ({
  config,
  delay = 1000, // Default 1 second delay
  showOnce = true,
  localStorageKey = 'banner-popup-shown'
}: UseBannerPopupOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const showBanner = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideBanner = useCallback(() => {
    setIsVisible(false);
    
    // Mark as shown in localStorage if showOnce is enabled
    if (showOnce && localStorageKey) {
      localStorage.setItem(localStorageKey, 'true');
    }
  }, [showOnce, localStorageKey]);

  const handleActionClick = useCallback((url: string) => {
    // Handle the action click (e.g., navigation, external link)
    if (config.callToAction?.openInNewTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  }, [config.callToAction]);

  // Initialize banner visibility
  useEffect(() => {
    if (isInitialized) return;

    // Check if banner should be shown
    const shouldShow = !showOnce || !localStorage.getItem(localStorageKey);
    
    if (shouldShow) {
      const timer = setTimeout(() => {
        showBanner();
      }, delay);

      return () => clearTimeout(timer);
    }

    setIsInitialized(true);
  }, [delay, showOnce, localStorageKey, showBanner, isInitialized]);

  return {
    isVisible,
    showBanner,
    hideBanner,
    handleActionClick,
    isInitialized
  };
};

// Helper function to create banner configs for common use cases
export const createBannerConfig = (overrides: Partial<BannerConfig> = {}): BannerConfig => {
  return {
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
    closeButton: true,
    ...overrides
  };
};

// Pre-configured banner configs for different scenarios
export const bannerConfigs = {
  // Welcome banner for new visitors
  welcome: createBannerConfig({
    title: "Welcome to GD Goenka Public School!",
    callToAction: {
      text: "Start Your Journey",
      url: "/admissions",
      openInNewTab: false
    }
  }),

  // Special offer banner
  offer: createBannerConfig({
    title: "Special Admission Offer!",
    images: [
      {
        id: "offer",
        src: "/assets/campus_aerial-C6u-hgAX.png",
        alt: "Special offer announcement",
        description: "Limited time offer - Early bird discounts available!"
      }
    ],
    callToAction: {
      text: "Claim Offer",
      url: "/admissions",
      openInNewTab: false
    },
    animation: {
      entrance: 'scale-in',
      exit: 'scale-out'
    }
  }),

  // Event announcement banner
  event: createBannerConfig({
    title: "Annual Sports Day - February 15th!",
    images: [
      {
        id: "sports-day",
        src: "/assets/Sports_facilities_image_2ec22754-Q-LCzr41.png",
        alt: "Sports day announcement",
        description: "Join us for our annual sports day featuring athletics and team games"
      }
    ],
    callToAction: {
      text: "Learn More",
      url: "/events",
      openInNewTab: false
    },
    placement: 'top',
    displayDuration: {
      perImage: 4,
      totalDisplay: 12
    }
  }),

  // Quick announcement (minimal)
  quick: createBannerConfig({
    title: "Important Notice",
    images: [
      {
        id: "notice",
        src: "/assets/Science_lab_campus_tour_9f1f27cd-rt7CpexB.png",
        alt: "Important notice",
        description: "Please check the latest updates on our website"
      }
    ],
    callToAction: undefined, // No CTA for quick notices
    showNavigation: false,
    displayDuration: {
      perImage: 2,
      totalDisplay: 6
    }
  })
};


