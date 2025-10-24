import React, { useState } from 'react';
import { BannerPopup } from '@/components/BannerPopup';
import { bannerConfigs, createBannerConfig } from '@/hooks/useBannerPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Settings, Palette, Clock, Image } from 'lucide-react';

export default function BannerDemo() {
  const [activeBanner, setActiveBanner] = useState<string | null>(null);
  const [customConfig, setCustomConfig] = useState(createBannerConfig());

  const bannerTypes = [
    {
      id: 'welcome',
      name: 'Welcome Banner',
      description: 'Perfect for greeting new visitors',
      config: bannerConfigs.welcome,
      icon: <Play className="w-5 h-5" />
    },
    {
      id: 'offer',
      name: 'Special Offer',
      description: 'Great for promotions and announcements',
      config: bannerConfigs.offer,
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 'event',
      name: 'Event Announcement',
      description: 'Ideal for upcoming events and activities',
      config: bannerConfigs.event,
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'quick',
      name: 'Quick Notice',
      description: 'Simple banner for brief announcements',
      config: bannerConfigs.quick,
      icon: <Image className="w-5 h-5" />
    }
  ];

  const handleShowBanner = (type: string) => {
    setActiveBanner(type);
  };

  const handleHideBanner = () => {
    setActiveBanner(null);
  };

  const handleActionClick = (url: string) => {
    console.log('Action clicked:', url);
    // You can implement navigation logic here
  };

  const currentConfig = activeBanner ? bannerTypes.find(b => b.id === activeBanner)?.config || customConfig : customConfig;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Banner Popup Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore different banner configurations and see how they look and behave. 
            Each banner type is designed for specific use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {bannerTypes.map((banner) => (
            <Card key={banner.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {banner.icon}
                  </div>
                  <CardTitle className="text-lg">{banner.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{banner.description}</p>
                <Button 
                  onClick={() => handleShowBanner(banner.id)}
                  className="w-full"
                  variant="outline"
                >
                  Show Banner
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Banner Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Animations</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Fade in/out</li>
                  <li>• Slide from all directions</li>
                  <li>• Scale in/out</li>
                  <li>• Smooth image transitions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Customization</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Multiple placement options</li>
                  <li>• Customizable timing</li>
                  <li>• Flexible image transitions</li>
                  <li>• Call-to-action buttons</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">User Experience</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Keyboard navigation</li>
                  <li>• Progress indicators</li>
                  <li>• Auto-hide functionality</li>
                  <li>• Show once per session</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Basic Implementation</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { BannerPopup, useBannerPopup, bannerConfigs } from '@/hooks/useBannerPopup';

function MyComponent() {
  const bannerPopup = useBannerPopup({
    config: bannerConfigs.welcome,
    delay: 2000,
    showOnce: true
  });

  return (
    <BannerPopup
      config={bannerConfigs.welcome}
      isVisible={bannerPopup.isVisible}
      onClose={bannerPopup.hideBanner}
      onActionClick={bannerPopup.handleActionClick}
    />
  );
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Custom Configuration</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const customConfig = {
  title: "Your Custom Banner",
  images: [
    {
      id: "custom1",
      src: "/path/to/image.jpg",
      alt: "Custom image",
      description: "Your description"
    }
  ],
  imageTransition: 'slide',
  displayDuration: {
    perImage: 3,
    totalDisplay: 10
  },
  callToAction: {
    text: "Learn More",
    url: "/about",
    openInNewTab: false
  },
  placement: 'center',
  animation: {
    entrance: 'slide-in-top',
    exit: 'slide-out-top'
  }
};`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Render the active banner */}
      {activeBanner && (
        <BannerPopup
          config={currentConfig}
          isVisible={true}
          onClose={handleHideBanner}
          onActionClick={handleActionClick}
        />
      )}
    </div>
  );
}


