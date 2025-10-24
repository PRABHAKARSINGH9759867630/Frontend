import { useState, useEffect } from 'react';

export interface HeroImage {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrincipalMessage {
  id: string;
  name: string;
  title: string;
  message: string;
  heroImageId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrincipalMessageWithHero extends PrincipalMessage {
  heroImage?: HeroImage;
}

export function usePrincipalMessage() {
  const [principalMessage, setPrincipalMessage] = useState<PrincipalMessageWithHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrincipalMessage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch principal message
        const messageResponse = await fetch('/api/principal-message');
        if (!messageResponse.ok) {
          throw new Error('Failed to fetch principal message');
        }
        const message: PrincipalMessage = await messageResponse.json();

        // If there's a hero image ID, fetch the hero image
        let heroImage: HeroImage | undefined;
        if (message.heroImageId) {
          const heroImagesResponse = await fetch('/api/hero-images');
          if (heroImagesResponse.ok) {
            const heroImages: HeroImage[] = await heroImagesResponse.json();
            heroImage = heroImages.find(img => img.id === message.heroImageId);
          }
        }

        setPrincipalMessage({
          ...message,
          heroImage
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipalMessage();
  }, []);

  return { principalMessage, loading, error };
}

