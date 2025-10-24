/**
 * Strapi CMS API Client
 * Handles authentication and data fetching from Strapi backend
 */

// Configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

// Types for Strapi responses
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

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
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
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred while fetching from Strapi');
  }
};

// API methods
export const strapiApi = {
  // Fetch all items from a collection
  async getCollection<T>(
    collectionName: string,
    params: {
      populate?: string;
      sort?: string;
      filters?: Record<string, any>;
      pagination?: {
        page?: number;
        pageSize?: number;
      };
    } = {}
  ): Promise<StrapiResponse<T[]>> {
    const searchParams = new URLSearchParams();
    
    if (params.populate) {
      searchParams.append('populate', params.populate);
    }
    
    if (params.sort) {
      searchParams.append('sort', params.sort);
    }
    
    if (params.pagination?.page) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
    }
    
    if (params.pagination?.pageSize) {
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value);
      });
    }

    const queryString = searchParams.toString();
    const endpoint = `/${collectionName}${queryString ? `?${queryString}` : ''}`;
    
    return strapiFetch<T[]>(endpoint);
  },

  // Fetch a single item by ID
  async getById<T>(
    collectionName: string,
    id: number | string,
    params: {
      populate?: string;
    } = {}
  ): Promise<StrapiResponse<T>> {
    const searchParams = new URLSearchParams();
    
    if (params.populate) {
      searchParams.append('populate', params.populate);
    }

    const queryString = searchParams.toString();
    const endpoint = `/${collectionName}/${id}${queryString ? `?${queryString}` : ''}`;
    
    return strapiFetch<T>(endpoint);
  },

  // Create a new item
  async create<T>(
    collectionName: string,
    data: Record<string, any>
  ): Promise<StrapiResponse<T>> {
    return strapiFetch<T>(`/${collectionName}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  },

  // Update an item
  async update<T>(
    collectionName: string,
    id: number | string,
    data: Record<string, any>
  ): Promise<StrapiResponse<T>> {
    return strapiFetch<T>(`/${collectionName}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  },

  // Delete an item
  async delete<T>(
    collectionName: string,
    id: number | string
  ): Promise<StrapiResponse<T>> {
    return strapiFetch<T>(`/${collectionName}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Utility function to get image URL from Strapi
export const getStrapiImageUrl = (image: any): string => {
  if (!image) return '';
  
  // Handle different image formats from Strapi
  if (typeof image === 'string') {
    return image.startsWith('http') ? image : `${STRAPI_URL}${image}`;
  }
  
  if (image.data) {
    const url = image.data.attributes?.url || image.data.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  const url = image.attributes?.url || image.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

// Utility function to format Strapi date
export const formatStrapiDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};
