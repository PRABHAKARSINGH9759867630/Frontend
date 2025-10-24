# Dynamic Website Integration Example

This guide shows you exactly how to make your school website fully dynamic using Strapi CMS.

## 🎯 Quick Start

### 1. Update Your App.tsx

Replace your current routing to use the dynamic home page:

```tsx
// client/src/App.tsx
import DynamicHome from "@/pages/DynamicHome";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DynamicHome} /> {/* Use DynamicHome instead of Home */}
      <Route path="/about" component={About} />
      <Route path="/academics" component={Academics} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/activities" component={Activities} />
      <Route path="/events" component={Events} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

### 2. Set Up Environment Variables

Create a `.env` file in your project root:

```bash
# Replace with your actual Strapi instance
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_actual_token_here
VITE_DEBUG_STRAPI=true
```

### 3. Create Strapi Backend

Follow the content types setup in `STRAPI_CONTENT_TYPES.md` to create all necessary content types.

## 🔄 Step-by-Step Integration

### Step 1: Test the Dynamic Components

Start by testing individual components:

```tsx
// Test in any component
import { DynamicHeroBanner } from '@/components/DynamicComponents';

function TestPage() {
  return (
    <div>
      <DynamicHeroBanner />
    </div>
  );
}
```

### Step 2: Replace Static Content Gradually

Replace sections one by one:

```tsx
// Before (Static)
<NewsSection articles={staticNewsArticles} />

// After (Dynamic)
<DynamicNewsSection />
```

### Step 3: Add Error Boundaries

Wrap dynamic components with error boundaries:

```tsx
import { DynamicNewsSection } from '@/components/DynamicComponents';
import { Alert, AlertDescription } from '@/components/ui/alert';

function NewsWithFallback() {
  return (
    <ErrorBoundary
      fallback={
        <Alert>
          <AlertDescription>
            Unable to load news. Please check your Strapi connection.
          </AlertDescription>
        </Alert>
      }
    >
      <DynamicNewsSection />
    </ErrorBoundary>
  );
}
```

## 📊 Content Management Examples

### Adding a New Hero Banner

1. **In Strapi Admin:**
   - Go to Content Manager → Hero Banners
   - Click "Create new entry"
   - Fill in the details:
     ```
     Title: "Welcome to Our School"
     Subtitle: "Excellence in Education"
     Description: "Providing world-class education..."
     Background Image: [Upload image]
     CTA Text: "Learn More"
     CTA Link: "/about"
     Is Active: ✓
     Order: 1
     ```
   - Save and publish

2. **Result:**
   - Banner appears immediately on your website
   - No code changes needed
   - Automatically responsive and optimized

### Adding a News Article

1. **In Strapi Admin:**
   - Go to Content Manager → News Articles
   - Create new entry:
     ```
     Title: "Students Win Science Competition"
     Content: [Rich text editor with full article]
     Excerpt: "Brief summary of the achievement..."
     Image: [Upload photo]
     Category: "Achievement"
     Featured: ✓ (for homepage display)
     Published At: [Current date]
     ```
   - Save and publish

2. **Result:**
   - Article appears in news section
   - Featured articles show on homepage
   - Automatic SEO optimization
   - Social sharing ready

### Managing Events

1. **In Strapi Admin:**
   - Go to Content Manager → Events
   - Create new event:
     ```
     Title: "Annual Sports Day"
     Description: "Join us for exciting sports competitions..."
     Event Date: 2025-02-15 09:00:00
     Location: "Main Sports Complex"
     Category: "Sports"
     Featured: ✓
     Registration Required: ✓
     Registration Link: "/sports-day-registration"
     ```
   - Save and publish

2. **Result:**
   - Event appears in events section
   - Shows in upcoming events
   - Registration button appears automatically
   - Date formatting handled automatically

## 🎨 Customization Examples

### Custom Styling

You can customize the dynamic components:

```tsx
// Custom styled news section
<div className="custom-news-container">
  <DynamicNewsSection />
</div>

<style jsx>{`
  .custom-news-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 4rem 0;
  }
`}</style>
```

### Filtering Content

Filter content by category or other criteria:

```tsx
import { useNewsArticles } from '@/hooks/useDynamicContent';

function FeaturedNews() {
  const { data, isLoading } = useNewsArticles(6, true); // Only featured articles
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.data?.map(article => (
        <div key={article.id}>
          <h3>{article.attributes.title}</h3>
          <p>{article.attributes.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### Custom Loading States

Create custom loading components:

```tsx
function CustomNewsLoading() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

// Use with dynamic component
function NewsWithCustomLoading() {
  return (
    <Suspense fallback={<CustomNewsLoading />}>
      <DynamicNewsSection />
    </Suspense>
  );
}
```

## 🔧 Advanced Features

### Search Functionality

Add search to your website:

```tsx
import { useSearchContent } from '@/hooks/useDynamicContent';

function SearchResults({ query }: { query: string }) {
  const { data, isLoading } = useSearchContent(query);
  
  if (isLoading) return <div>Searching...</div>;
  
  return (
    <div>
      {data?.data?.map(item => (
        <div key={item.id}>
          <h3>{item.attributes.title}</h3>
          <p>{item.attributes.content || item.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Contact Form Integration

Handle contact form submissions:

```tsx
import { useContactFormSubmission } from '@/hooks/useDynamicContent';

function ContactForm() {
  const submitForm = useContactFormSubmission();
  
  const handleSubmit = async (formData) => {
    try {
      await submitForm.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
}
```

### Real-time Updates

Enable real-time content updates:

```tsx
import { useNewsArticles } from '@/hooks/useDynamicContent';

function LiveNews() {
  const { data, refetch } = useNewsArticles();
  
  // Refetch every 5 minutes
  useEffect(() => {
    const interval = setInterval(refetch, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch]);
  
  return <DynamicNewsSection />;
}
```

## 📱 Mobile Optimization

The dynamic components are automatically responsive:

```tsx
// Components automatically adapt to screen size
<DynamicHeroBanner /> // Responsive carousel
<DynamicNewsSection /> // Responsive grid
<DynamicEventsSection /> // Mobile-friendly cards
```

## 🚀 Performance Tips

### 1. Prefetch Content

Prefetch content for better performance:

```tsx
import { usePrefetchContent } from '@/hooks/useDynamicContent';

function App() {
  const { prefetchHeroBanners, prefetchAboutSection } = usePrefetchContent();
  
  useEffect(() => {
    // Prefetch critical content
    prefetchHeroBanners();
    prefetchAboutSection();
  }, []);
  
  return (
    // Your app content
  );
}
```

### 2. Optimize Images

Images are automatically optimized:

```tsx
// Automatically serves optimized images
<img src={getStrapiImageUrl(image, 400, 300)} alt="..." />
// Generates: https://strapi.com/uploads/image.jpg?width=400&height=300&quality=80&format=webp
```

### 3. Caching Strategy

React Query handles caching automatically:

```tsx
// News articles cached for 2 minutes
// Footer info cached for 30 minutes
// Hero banners cached for 5 minutes
```

## 🔍 Debugging

### Enable Debug Mode

```bash
# In your .env file
VITE_DEBUG_STRAPI=true
```

This logs all API requests and responses to the console.

### Common Issues

1. **Content Not Loading**
   - Check environment variables
   - Verify API token permissions
   - Check CORS settings in Strapi

2. **Images Not Showing**
   - Verify media files are publicly accessible
   - Check image URLs in browser dev tools

3. **Slow Loading**
   - Check network tab for slow requests
   - Verify image optimization is working
   - Check database performance

## 🎉 Success!

Once integrated, your website will be:

✅ **Fully Dynamic** - All content manageable from Strapi  
✅ **Real-time Updates** - Changes reflect immediately  
✅ **SEO Optimized** - Proper meta tags and structure  
✅ **Performance Optimized** - Fast loading and caching  
✅ **Mobile Responsive** - Works on all devices  
✅ **Accessible** - Proper alt tags and structure  

Your school website is now a modern, content-manageable platform! 🚀

