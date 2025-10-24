# Banner Popup Component Guide

A comprehensive, customizable banner popup system for the GD Goenka Public School website with smooth animations, image transitions, and flexible configuration options.

## 🚀 Features

- **Multiple Image Support**: Display multiple images with smooth transitions
- **Flexible Animations**: Fade, slide, and scale animations for entrance/exit
- **Customizable Timing**: Control display duration per image and total banner time
- **Call-to-Action**: Optional buttons with custom links
- **Keyboard Navigation**: Arrow keys for image navigation, Escape to close
- **Auto-Hide**: Automatic banner dismissal with progress indicator
- **Show Once**: Option to show banner only once per session using localStorage
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard support

## 📦 Installation

The banner popup is already integrated into the project. To use it in a new component:

```typescript
import { BannerPopup } from '@/components/BannerPopup';
import { useBannerPopup, bannerConfigs } from '@/hooks/useBannerPopup';
```

## 🎯 Quick Start

### Basic Usage

```typescript
import React from 'react';
import { BannerPopup } from '@/components/BannerPopup';
import { useBannerPopup, bannerConfigs } from '@/hooks/useBannerPopup';

function MyComponent() {
  const bannerPopup = useBannerPopup({
    config: bannerConfigs.welcome,
    delay: 2000, // Show after 2 seconds
    showOnce: true,
    localStorageKey: 'my-banner-key'
  });

  return (
    <BannerPopup
      config={bannerConfigs.welcome}
      isVisible={bannerPopup.isVisible}
      onClose={bannerPopup.hideBanner}
      onActionClick={bannerPopup.handleActionClick}
    />
  );
}
```

## ⚙️ Configuration Options

### BannerConfig Interface

```typescript
interface BannerConfig {
  title: string;                    // Banner title
  images: BannerImage[];           // Array of images to display
  imageTransition: 'slide' | 'fade' | 'scale' | 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down';
  displayDuration: {
    perImage: number;              // Seconds per individual image
    totalDisplay: number;          // Total seconds before auto-hide
  };
  callToAction?: {
    text: string;                  // Button text
    url: string;                   // Link URL
    openInNewTab?: boolean;        // Open in new tab
  };
  placement: 'center' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  background: {
    overlayOpacity: number;        // 0-100
    overlayColor: string;          // Hex color
  };
  animation: {
    entrance: 'fade-in' | 'slide-in-top' | 'slide-in-bottom' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
    exit: 'fade-out' | 'slide-out-top' | 'slide-out-bottom' | 'slide-out-left' | 'slide-out-right' | 'scale-out';
  };
  autoHide: boolean;               // Auto-hide after duration
  showProgressBar: boolean;        // Show progress indicator
  showNavigation: boolean;         // Show arrow navigation
  closeButton: boolean;            // Show close button
}
```

### BannerImage Interface

```typescript
interface BannerImage {
  id: string;                      // Unique identifier
  src: string;                     // Image source URL
  alt: string;                     // Alt text for accessibility
  description?: string;            // Optional description overlay
}
```

## 🎨 Pre-configured Banner Types

### Welcome Banner
Perfect for greeting new visitors:

```typescript
const welcomeBanner = bannerConfigs.welcome;
```

### Special Offer Banner
Great for promotions and announcements:

```typescript
const offerBanner = bannerConfigs.offer;
```

### Event Announcement Banner
Ideal for upcoming events:

```typescript
const eventBanner = bannerConfigs.event;
```

### Quick Notice Banner
Simple banner for brief announcements:

```typescript
const quickBanner = bannerConfigs.quick;
```

## 🛠️ Custom Configuration Examples

### Example 1: Tech Gadgets Store Banner

```typescript
const techGadgetsBanner = {
  title: "Welcome to TechGadgets!",
  images: [
    {
      id: "smartphone",
      src: "/images/smartphone.jpg",
      alt: "New smartphone model",
      description: "Latest smartphone with sleek design"
    },
    {
      id: "smartwatch",
      src: "/images/smartwatch.jpg",
      alt: "Smartwatch display",
      description: "Smartwatch with notification features"
    },
    {
      id: "headphones",
      src: "/images/headphones.jpg",
      alt: "Noise-cancelling headphones",
      description: "Premium headphones with active noise cancellation"
    }
  ],
  imageTransition: 'slide-right',
  displayDuration: {
    perImage: 2,
    totalDisplay: 7
  },
  callToAction: {
    text: "Explore Our Deals",
    url: "/deals",
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
```

### Example 2: School Event Banner

```typescript
const schoolEventBanner = {
  title: "Annual Science Fair - March 15th!",
  images: [
    {
      id: "science-fair",
      src: "/images/science-fair.jpg",
      alt: "Science fair exhibition",
      description: "Students showcase innovative science projects"
    }
  ],
  imageTransition: 'fade',
  displayDuration: {
    perImage: 4,
    totalDisplay: 12
  },
  callToAction: {
    text: "Register Now",
    url: "/events/science-fair",
    openInNewTab: false
  },
  placement: 'top',
  background: {
    overlayOpacity: 60,
    overlayColor: '#1a365d'
  },
  animation: {
    entrance: 'scale-in',
    exit: 'scale-out'
  },
  autoHide: true,
  showProgressBar: true,
  showNavigation: false,
  closeButton: true
};
```

## 🎮 User Interactions

### Keyboard Controls
- **Arrow Left/Right**: Navigate between images
- **Escape**: Close the banner
- **Enter**: Activate call-to-action button (when focused)

### Mouse/Touch Controls
- **Navigation Arrows**: Click to navigate between images
- **Image Indicators**: Click dots to jump to specific image
- **Close Button**: Click X to close manually
- **Call-to-Action Button**: Click to navigate to specified URL
- **Background Overlay**: Click outside banner to close

## 🎯 Best Practices

### Timing Recommendations
- **Per Image Duration**: 2-4 seconds for optimal viewing
- **Total Display Time**: 6-15 seconds depending on content
- **Delay Before Show**: 1-3 seconds to let page load

### Content Guidelines
- **Title**: Keep concise (under 50 characters)
- **Images**: Use high-quality images (min 800x600px)
- **Descriptions**: Brief and engaging (under 100 characters)
- **Call-to-Action**: Clear and action-oriented

### Accessibility
- Always provide meaningful alt text for images
- Ensure sufficient color contrast
- Test with keyboard navigation
- Consider screen reader users

## 🔧 Advanced Usage

### Multiple Banners
To show different banners based on conditions:

```typescript
const [bannerType, setBannerType] = useState('welcome');

const getBannerConfig = () => {
  switch (bannerType) {
    case 'offer': return bannerConfigs.offer;
    case 'event': return bannerConfigs.event;
    default: return bannerConfigs.welcome;
  }
};

const bannerPopup = useBannerPopup({
  config: getBannerConfig(),
  delay: 1000,
  showOnce: false // Allow multiple shows
});
```

### Dynamic Content
Load banner content from an API:

```typescript
const [bannerConfig, setBannerConfig] = useState(null);

useEffect(() => {
  fetchBannerContent().then(config => {
    setBannerConfig(config);
  });
}, []);

const bannerPopup = useBannerPopup({
  config: bannerConfig || bannerConfigs.welcome,
  delay: 2000,
  showOnce: true
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Banner not showing**: Check if `isVisible` is true and images are loaded
2. **Images not loading**: Verify image paths are correct and accessible
3. **Animations not working**: Ensure CSS animations are properly loaded
4. **Auto-hide not working**: Check `autoHide` setting and timing values

### Debug Mode
Add console logs to track banner state:

```typescript
const bannerPopup = useBannerPopup({
  config: bannerConfigs.welcome,
  delay: 2000,
  showOnce: true
});

console.log('Banner visible:', bannerPopup.isVisible);
```

## 📱 Demo

Visit `/banner-demo` to see all banner types in action and test different configurations.

## 🎨 Styling Customization

The banner uses Tailwind CSS classes and can be customized by modifying the component or extending the CSS classes. Key classes to customize:

- `.banner-popup`: Main container
- `.banner-header`: Title section
- `.banner-image`: Image container
- `.banner-controls`: Navigation elements
- `.banner-footer`: Call-to-action section

## 📄 License

This component is part of the GD Goenka Public School website project.


