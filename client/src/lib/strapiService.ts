/**
 * Central Strapi Service - Handles all API calls for dynamic website content
 * This service makes your entire website dynamic and content-manageable
 */

// Configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';
const DEBUG_MODE = import.meta.env.VITE_DEBUG_STRAPI === 'true';

// Types for all website content
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
  meta?: Record<string, any>;
}

// Website Content Types
export interface HeroBanner {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: any;
    ctaText: string;
    ctaLink: string;
    isActive: boolean;
    order: number;
  };
}

export interface AboutSection {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    image: any;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
}

export interface AcademicProgram {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: any;
    features: string[];
    gradeLevels: string;
    duration: string;
    isActive: boolean;
  };
}

export interface Activity {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: any;
    category: string;
    schedule: string;
    location: string;
    isActive: boolean;
  };
}

export interface GalleryImage {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: any;
    category: string;
    alt: string;
  };
}

export interface NewsArticle {
  id: number;
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    image: any;
    author: any;
    category: string;
    featured: boolean;
    publishedAt: string;
  };
}

export interface Event {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    image: any;
    eventDate: string;
    location: string;
    category: string;
    featured: boolean;
    registrationRequired: boolean;
    registrationLink: string;
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    role: string;
    content: string;
    image: any;
    rating: number;
    isActive: boolean;
  };
}

export interface FooterInfo {
  id: number;
  attributes: {
    schoolName: string;
    address: string;
    phone: string;
    email: string;
    socialLinks: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    quickLinks: Array<{
      title: string;
      url: string;
    }>;
    copyright: string;
  };
}

export interface HeaderInfo {
  id: number;
  attributes: {
    logo: any;
    schoolName: string;
    navigation: Array<{
      title: string;
      url: string;
      children?: Array<{
        title: string;
        url: string;
      }>;
    }>;
    contactInfo: {
      phone: string;
      email: string;
    };
  };
}

// Authentication headers
const getAuthHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return headers;
};

// Generic fetch function with error handling
const strapiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> => {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  if (DEBUG_MODE) {
    console.log(`[Strapi] Fetching: ${url}`, config);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Strapi API Error: ${response.status} ${response.statusText}. ${
          errorData.error?.message || 'Unknown error'
        }`
      );
    }

    const data = await response.json();
    
    if (DEBUG_MODE) {
      console.log(`[Strapi] Response:`, data);
    }
    
    return data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error(`[Strapi] Error:`, error);
    }
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred while fetching from Strapi');
  }
};

// Central Strapi Service
export const strapiService = {
  // Hero Banners
  async getHeroBanners(): Promise<StrapiResponse<HeroBanner[]>> {
    return strapiFetch<HeroBanner[]>('/hero-banners?populate=*&sort=order:asc&filters[isActive][$eq]=true');
  },

  // About Section
  async getAboutSection(): Promise<StrapiResponse<AboutSection>> {
    return strapiFetch<AboutSection>('/about-section?populate=*');
  },

  // Academic Programs
  async getAcademicPrograms(): Promise<StrapiResponse<AcademicProgram[]>> {
    return strapiFetch<AcademicProgram[]>('/academic-programs?populate=*&sort=createdAt:desc&filters[isActive][$eq]=true');
  },

  // Activities
  async getActivities(): Promise<StrapiResponse<Activity[]>> {
    return strapiFetch<Activity[]>('/activities?populate=*&sort=createdAt:desc&filters[isActive][$eq]=true');
  },

  // Gallery Images
  async getGalleryImages(category?: string): Promise<StrapiResponse<GalleryImage[]>> {
    const filters = category ? `&filters[category][$eq]=${category}` : '';
    return strapiFetch<GalleryImage[]>(`/gallery-images?populate=*&sort=createdAt:desc${filters}`);
  },

  // News Articles
  async getNewsArticles(limit: number = 10, featured?: boolean): Promise<StrapiResponse<NewsArticle[]>> {
    const filters = featured ? '&filters[featured][$eq]=true' : '';
    return strapiFetch<NewsArticle[]>(`/news-articles?populate=*&sort=publishedAt:desc&pagination[pageSize]=${limit}${filters}`);
  },

  // Events
  async getEvents(limit: number = 10, featured?: boolean): Promise<StrapiResponse<Event[]>> {
    const filters = featured ? '&filters[featured][$eq]=true' : '';
    return strapiFetch<Event[]>(`/events?populate=*&sort=eventDate:asc&pagination[pageSize]=${limit}${filters}`);
  },

  // Upcoming Events
  async getUpcomingEvents(limit: number = 5): Promise<StrapiResponse<Event[]>> {
    const today = new Date().toISOString();
    return strapiFetch<Event[]>(`/events?populate=*&sort=eventDate:asc&filters[eventDate][$gte]=${today}&pagination[pageSize]=${limit}`);
  },

  // Testimonials
  async getTestimonials(): Promise<StrapiResponse<Testimonial[]>> {
    return strapiFetch<Testimonial[]>('/testimonials?populate=*&sort=createdAt:desc&filters[isActive][$eq]=true');
  },

  // Footer Info
  async getFooterInfo(): Promise<StrapiResponse<FooterInfo>> {
    return strapiFetch<FooterInfo>('/footer-info?populate=*');
  },

  // Header Info
  async getHeaderInfo(): Promise<StrapiResponse<HeaderInfo>> {
    return strapiFetch<HeaderInfo>('/header-info?populate=*');
  },

  // Single News Article
  async getNewsArticle(id: number): Promise<StrapiResponse<NewsArticle>> {
    return strapiFetch<NewsArticle>(`/news-articles/${id}?populate=*`);
  },

  // Single Event
  async getEvent(id: number): Promise<StrapiResponse<Event>> {
    return strapiFetch<Event>(`/events/${id}?populate=*`);
  },

  // Search Content
  async searchContent(query: string): Promise<StrapiResponse<any[]>> {
    return strapiFetch<any[]>(`/search?q=${encodeURIComponent(query)}&populate=*`);
  },

  // Contact Form Submission
  async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<StrapiResponse<any>> {
    return strapiFetch<any>('/contact-submissions', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  },
};

// Utility functions
export const getStrapiImageUrl = (image: any, width?: number, height?: number): string => {
  if (!image) return '';
  
  let url = '';
  if (typeof image === 'string') {
    url = image.startsWith('http') ? image : `${STRAPI_URL}${image}`;
  } else if (image.data) {
    url = image.data.attributes?.url || image.data.url;
    url = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  } else {
    url = image.attributes?.url || image.url;
    url = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  // Add image optimization parameters if width/height provided
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.set('width', width.toString());
    if (height) params.set('height', height.toString());
    params.set('quality', '80');
    params.set('format', 'webp');
    url += `?${params.toString()}`;
  }
  
  return url;
};

export const formatStrapiDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Error handling utility
export const handleStrapiError = (error: Error): { message: string; isNetworkError: boolean } => {
  const isNetworkError = error.message.includes('Network error') || error.message.includes('fetch');
  return {
    message: isNetworkError 
      ? 'Unable to connect to the server. Please check your internet connection.'
      : error.message,
    isNetworkError,
  };
};
