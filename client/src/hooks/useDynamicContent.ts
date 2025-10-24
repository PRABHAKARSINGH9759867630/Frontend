/**
 * React Query hooks for all dynamic website content
 * These hooks make your entire website dynamic and content-manageable
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  strapiService, 
  HeroBanner, 
  AboutSection, 
  AcademicProgram, 
  Activity, 
  GalleryImage, 
  NewsArticle, 
  Event, 
  Testimonial, 
  FooterInfo, 
  HeaderInfo 
} from '@/lib/strapiService';

// Query keys for React Query
export const contentKeys = {
  all: ['dynamic-content'] as const,
  heroBanners: () => [...contentKeys.all, 'hero-banners'] as const,
  aboutSection: () => [...contentKeys.all, 'about-section'] as const,
  academicPrograms: () => [...contentKeys.all, 'academic-programs'] as const,
  activities: () => [...contentKeys.all, 'activities'] as const,
  galleryImages: (category?: string) => [...contentKeys.all, 'gallery-images', category] as const,
  newsArticles: (limit?: number, featured?: boolean) => [...contentKeys.all, 'news-articles', limit, featured] as const,
  events: (limit?: number, featured?: boolean) => [...contentKeys.all, 'events', limit, featured] as const,
  upcomingEvents: (limit?: number) => [...contentKeys.all, 'upcoming-events', limit] as const,
  testimonials: () => [...contentKeys.all, 'testimonials'] as const,
  footerInfo: () => [...contentKeys.all, 'footer-info'] as const,
  headerInfo: () => [...contentKeys.all, 'header-info'] as const,
  newsArticle: (id: number) => [...contentKeys.all, 'news-article', id] as const,
  event: (id: number) => [...contentKeys.all, 'event', id] as const,
};

// Hero Banners
export const useHeroBanners = () => {
  return useQuery({
    queryKey: contentKeys.heroBanners(),
    queryFn: () => strapiService.getHeroBanners(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// About Section
export const useAboutSection = () => {
  return useQuery({
    queryKey: contentKeys.aboutSection(),
    queryFn: () => strapiService.getAboutSection(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

// Academic Programs
export const useAcademicPrograms = () => {
  return useQuery({
    queryKey: contentKeys.academicPrograms(),
    queryFn: () => strapiService.getAcademicPrograms(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

// Activities
export const useActivities = () => {
  return useQuery({
    queryKey: contentKeys.activities(),
    queryFn: () => strapiService.getActivities(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

// Gallery Images
export const useGalleryImages = (category?: string) => {
  return useQuery({
    queryKey: contentKeys.galleryImages(category),
    queryFn: () => strapiService.getGalleryImages(category),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

// News Articles
export const useNewsArticles = (limit: number = 10, featured?: boolean) => {
  return useQuery({
    queryKey: contentKeys.newsArticles(limit, featured),
    queryFn: () => strapiService.getNewsArticles(limit, featured),
    staleTime: 2 * 60 * 1000, // 2 minutes (news changes frequently)
    retry: 3,
  });
};

// Single News Article
export const useNewsArticle = (id: number) => {
  return useQuery({
    queryKey: contentKeys.newsArticle(id),
    queryFn: () => strapiService.getNewsArticle(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Events
export const useEvents = (limit: number = 10, featured?: boolean) => {
  return useQuery({
    queryKey: contentKeys.events(limit, featured),
    queryFn: () => strapiService.getEvents(limit, featured),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Upcoming Events
export const useUpcomingEvents = (limit: number = 5) => {
  return useQuery({
    queryKey: contentKeys.upcomingEvents(limit),
    queryFn: () => strapiService.getUpcomingEvents(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Single Event
export const useEvent = (id: number) => {
  return useQuery({
    queryKey: contentKeys.event(id),
    queryFn: () => strapiService.getEvent(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Testimonials
export const useTestimonials = () => {
  return useQuery({
    queryKey: contentKeys.testimonials(),
    queryFn: () => strapiService.getTestimonials(),
    staleTime: 15 * 60 * 1000, // 15 minutes (testimonials change less frequently)
    retry: 3,
  });
};

// Footer Info
export const useFooterInfo = () => {
  return useQuery({
    queryKey: contentKeys.footerInfo(),
    queryFn: () => strapiService.getFooterInfo(),
    staleTime: 30 * 60 * 1000, // 30 minutes (footer info rarely changes)
    retry: 3,
  });
};

// Header Info
export const useHeaderInfo = () => {
  return useQuery({
    queryKey: contentKeys.headerInfo(),
    queryFn: () => strapiService.getHeaderInfo(),
    staleTime: 30 * 60 * 1000, // 30 minutes (header info rarely changes)
    retry: 3,
  });
};

// Contact Form Submission
export const useContactFormSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    }) => strapiService.submitContactForm(data),
    onSuccess: () => {
      // Optionally invalidate queries or show success message
      console.log('Contact form submitted successfully');
    },
    onError: (error) => {
      console.error('Contact form submission failed:', error);
    },
  });
};

// Search Content
export const useSearchContent = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...contentKeys.all, 'search', query],
    queryFn: () => strapiService.searchContent(query),
    enabled: enabled && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
};

// Prefetch hooks for performance optimization
export const usePrefetchContent = () => {
  const queryClient = useQueryClient();

  const prefetchHeroBanners = () => {
    queryClient.prefetchQuery({
      queryKey: contentKeys.heroBanners(),
      queryFn: () => strapiService.getHeroBanners(),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchAboutSection = () => {
    queryClient.prefetchQuery({
      queryKey: contentKeys.aboutSection(),
      queryFn: () => strapiService.getAboutSection(),
      staleTime: 10 * 60 * 1000,
    });
  };

  const prefetchFooterInfo = () => {
    queryClient.prefetchQuery({
      queryKey: contentKeys.footerInfo(),
      queryFn: () => strapiService.getFooterInfo(),
      staleTime: 30 * 60 * 1000,
    });
  };

  const prefetchHeaderInfo = () => {
    queryClient.prefetchQuery({
      queryKey: contentKeys.headerInfo(),
      queryFn: () => strapiService.getHeaderInfo(),
      staleTime: 30 * 60 * 1000,
    });
  };

  return {
    prefetchHeroBanners,
    prefetchAboutSection,
    prefetchFooterInfo,
    prefetchHeaderInfo,
  };
};

// Utility hook for loading states
export const useContentLoadingStates = () => {
  const heroBanners = useHeroBanners();
  const aboutSection = useAboutSection();
  const footerInfo = useFooterInfo();
  const headerInfo = useHeaderInfo();

  const isLoading = heroBanners.isLoading || aboutSection.isLoading || footerInfo.isLoading || headerInfo.isLoading;
  const hasError = heroBanners.error || aboutSection.error || footerInfo.error || headerInfo.error;

  return {
    isLoading,
    hasError,
    errors: {
      heroBanners: heroBanners.error,
      aboutSection: aboutSection.error,
      footerInfo: footerInfo.error,
      headerInfo: headerInfo.error,
    },
  };
};

