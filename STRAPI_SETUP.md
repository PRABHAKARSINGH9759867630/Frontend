# Strapi CMS Integration Setup Guide

This guide will help you connect your school website to a Strapi CMS backend for dynamic content management.

## 🚀 Quick Start

### 1. Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```bash
# Strapi CMS Configuration
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=aa423f434f5fa85189863f12b9dd84169f0c792d9b66ff6ac1b946afc9da722008f093a59185ed66f15c53e29f8260c8e4d7ca8795cd31e0bd140a718a9eeb1901ff676484970cd7a7b766d88cc13b19b363260f5c29f667ec84b8a49835ed32f5f049691a2fede78c7333e4a7878dc4929895393fb57c84953e31d82c01461b

# For production
# VITE_STRAPI_URL=https://your-strapi-instance.com
# VITE_STRAPI_API_TOKEN=your_production_token_here
```

### 2. Strapi Backend Setup

If you don't have Strapi set up yet, here's how to create one:

```bash
# Install Strapi globally
npm install -g @strapi/strapi

# Create new Strapi project
npx create-strapi-app@latest my-school-cms --quickstart

# Navigate to your CMS
cd my-school-cms

# Start development server
npm run develop
```

### 3. Strapi Content Types

Create the following content types in your Strapi admin panel:

#### News Articles
```json
{
  "collectionName": "news",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "excerpt": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::author.author"
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "publishedAt": {
      "type": "datetime"
    }
  }
}
```

#### Events
```json
{
  "collectionName": "events",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "content": {
      "type": "richtext"
    },
    "eventDate": {
      "type": "datetime",
      "required": true
    },
    "location": {
      "type": "string"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "speakers": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::speaker.speaker"
    }
  }
}
```

#### School Information (Single Type)
```json
{
  "collectionName": "school-info",
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "address": {
      "type": "text"
    },
    "phone": {
      "type": "string"
    },
    "email": {
      "type": "email"
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "about": {
      "type": "richtext"
    },
    "mission": {
      "type": "text"
    },
    "vision": {
      "type": "text"
    }
  }
}
```

### 4. API Token Setup

1. Go to your Strapi admin panel
2. Navigate to **Settings** → **API Tokens**
3. Create a new token with **Read** permissions for public content
4. Copy the token and add it to your `.env` file

### 5. Permissions Setup

In Strapi admin panel:
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Edit the **Public** role
3. Enable **find** and **findOne** permissions for your content types

## 📖 Usage Examples

### Basic Collection Fetching

```tsx
import { useStrapiCollection } from '@/hooks/use-strapi';

function NewsList() {
  const { data, isLoading, error } = useStrapiCollection('news', {
    populate: 'image,author',
    sort: 'createdAt:desc',
    pagination: { pageSize: 10 }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data?.map((article) => (
        <div key={article.id}>
          <h3>{article.attributes.title}</h3>
          <p>{article.attributes.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### Single Item Fetching

```tsx
import { useStrapiItem } from '@/hooks/use-strapi';

function EventDetail({ eventId }) {
  const { data, isLoading } = useStrapiItem('events', eventId, {
    populate: 'image,speakers'
  });

  if (isLoading) return <div>Loading...</div>;
  
  const event = data?.data;
  return (
    <div>
      <h1>{event.attributes.title}</h1>
      <p>{event.attributes.description}</p>
    </div>
  );
}
```

### Featured Content

```tsx
import { useStrapiFeatured } from '@/hooks/use-strapi';

function FeaturedEvents() {
  const { data } = useStrapiFeatured('events', 'featured', {
    populate: 'image',
    sort: 'eventDate:asc'
  });

  return (
    <div>
      {data?.data?.map((event) => (
        <div key={event.id}>
          <h3>{event.attributes.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

### CRUD Operations (Admin)

```tsx
import { useCreateStrapiItem, useUpdateStrapiItem, useDeleteStrapiItem } from '@/hooks/use-strapi';

function EventAdmin() {
  const createEvent = useCreateStrapiItem('events');
  const updateEvent = useUpdateStrapiItem('events');
  const deleteEvent = useDeleteStrapiItem('events');

  const handleCreate = async () => {
    await createEvent.mutateAsync({
      title: 'New Event',
      description: 'Event description',
      eventDate: new Date().toISOString()
    });
  };

  return (
    <button onClick={handleCreate}>
      Create Event
    </button>
  );
}
```

## 🔧 Advanced Configuration

### Custom API Endpoints

If you need custom API endpoints, you can extend the `strapiApi` object:

```tsx
// In lib/strapi.ts
export const strapiApi = {
  // ... existing methods

  // Custom method for complex queries
  async searchContent<T>(
    query: string,
    collections: string[] = ['news', 'events']
  ): Promise<StrapiResponse<T[]>> {
    const searchParams = new URLSearchParams({
      _q: query,
      _where: `_or[0][title_contains]=${query}&_or[1][content_contains]=${query}`,
      _sort: 'createdAt:desc'
    });

    return strapiFetch<T[]>(`/search?${searchParams.toString()}`);
  }
};
```

### Image Optimization

```tsx
import { getStrapiImageUrl } from '@/lib/strapi';

// Get optimized image URL with size parameters
const getOptimizedImageUrl = (image: any, width: number = 800, height?: number) => {
  const baseUrl = getStrapiImageUrl(image);
  if (!baseUrl) return '';
  
  const params = new URLSearchParams({
    width: width.toString(),
    quality: '80',
    format: 'webp'
  });
  
  if (height) params.set('height', height.toString());
  
  return `${baseUrl}?${params.toString()}`;
};
```

### Error Handling

```tsx
import { StrapiErrorBoundary } from '@/components/StrapiExamples';

function MyComponent() {
  const { data, error, refetch } = useStrapiCollection('news');

  if (error) {
    return <StrapiErrorBoundary error={error} retry={refetch} />;
  }

  // ... rest of component
}
```

## 🚀 Production Deployment

### Environment Variables

For production, set these environment variables:

```bash
# Production Strapi URL
VITE_STRAPI_URL=https://your-production-strapi.com

# Production API Token (with appropriate permissions)
VITE_STRAPI_API_TOKEN=your_production_token
```

### CORS Configuration

In your Strapi `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### CORS Settings

In `config/middlewares.js`, configure CORS for your domain:

```javascript
module.exports = [
  // ... other middlewares
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'https://yourdomain.com']
    }
  }
];
```

## 📚 Available Hooks

- `useStrapiCollection()` - Fetch collections with filtering, sorting, pagination
- `useStrapiItem()` - Fetch single items by ID
- `useStrapiFeatured()` - Fetch featured items from collections
- `useStrapiPaginatedCollection()` - Fetch paginated collections
- `useCreateStrapiItem()` - Create new items
- `useUpdateStrapiItem()` - Update existing items
- `useDeleteStrapiItem()` - Delete items

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure CORS is configured in Strapi
2. **Authentication Errors**: Verify your API token has correct permissions
3. **Image Loading**: Check if media files are publicly accessible
4. **Build Errors**: Ensure environment variables are prefixed with `VITE_`

### Debug Mode

Enable debug logging by adding to your `.env`:

```bash
VITE_DEBUG_STRAPI=true
```

This will log all API requests and responses to the console.

## 📝 Next Steps

1. Set up your Strapi backend with the content types above
2. Configure permissions and API tokens
3. Update your environment variables
4. Start using the provided hooks in your components
5. Customize the examples to match your specific needs

For more advanced usage, refer to the [Strapi Documentation](https://docs.strapi.io/) and the example components in `StrapiExamples.tsx`.
