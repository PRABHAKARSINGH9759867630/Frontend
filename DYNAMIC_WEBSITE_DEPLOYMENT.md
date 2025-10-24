# Dynamic School Website Deployment Guide

Complete guide for deploying your Strapi-powered dynamic school website to various hosting platforms.

## 🚀 Overview

This guide covers deploying both your Strapi CMS backend and React frontend to make your entire school website dynamic and content-manageable.

## 📋 Prerequisites

- Strapi CMS backend with all content types set up
- React frontend with dynamic components
- Environment variables configured
- Domain name (optional but recommended)

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Strapi CMS    │    │   Database      │
│   (React)       │◄───┤   (Backend)     │◄───┤   (PostgreSQL)  │
│   Netlify/Vercel│    │   Railway/Heroku │    │   Supabase/Planet│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Environment Setup

### 1. Environment Variables

Create these environment variables for your frontend:

```bash
# Production Strapi URL
VITE_STRAPI_URL=https://your-strapi-instance.com

# Production API Token
VITE_STRAPI_API_TOKEN=your_production_token_here

# Optional: Debug mode
VITE_DEBUG_STRAPI=false
```

### 2. Strapi Environment Variables

For your Strapi backend:

```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password

# App
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Server
HOST=0.0.0.0
PORT=1337
```

## 🌐 Deployment Options

### Option 1: Netlify + Railway (Recommended)

#### Frontend (Netlify)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Add dynamic Strapi integration"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     ```
     Build command: npm run build
     Publish directory: dist
     ```

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_STRAPI_URL=https://your-strapi-app.railway.app
     VITE_STRAPI_API_TOKEN=your-production-token
     ```

#### Backend (Railway)

1. **Deploy Strapi to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Set Environment Variables**
   ```bash
   railway variables set DATABASE_URL=postgresql://user:pass@host:port/db
   railway variables set APP_KEYS=your-app-keys
   railway variables set API_TOKEN_SALT=your-salt
   railway variables set ADMIN_JWT_SECRET=your-secret
   railway variables set JWT_SECRET=your-jwt-secret
   ```

3. **Add PostgreSQL Database**
   - Add PostgreSQL plugin in Railway dashboard
   - Copy connection string to `DATABASE_URL`

### Option 2: Vercel + PlanetScale

#### Frontend (Vercel)

1. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   ```

2. **Set Environment Variables**
   ```bash
   vercel env add VITE_STRAPI_URL
   vercel env add VITE_STRAPI_API_TOKEN
   ```

#### Backend (Self-hosted with PlanetScale)

1. **Set up PlanetScale Database**
   - Create account at [PlanetScale](https://planetscale.com)
   - Create new database
   - Get connection string

2. **Deploy Strapi to VPS/Cloud**
   ```bash
   # On your server
   git clone your-strapi-repo
   cd your-strapi-repo
   npm install
   npm run build
   npm start
   ```

### Option 3: Full Stack on Railway

Deploy both frontend and backend on Railway:

1. **Create Railway Project**
   ```bash
   railway login
   railway init
   ```

2. **Add Services**
   - Frontend service
   - Backend service
   - PostgreSQL database

3. **Configure Services**
   ```bash
   # Backend service
   railway service create --name strapi-backend
   railway service create --name frontend
   railway service create --name database
   ```

## 🔐 Security Configuration

### 1. CORS Setup in Strapi

Update `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',
        'https://your-frontend-domain.netlify.app',
        'https://your-frontend-domain.vercel.app'
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 2. API Token Permissions

In Strapi admin:
1. Go to Settings → API Tokens
2. Create production token with:
   - **Read** access to all public content types
   - **Create** access to `contact-submissions`
   - Set expiration date (recommended: 1 year)

### 3. Content Security Policy

Update `config/middlewares.js`:

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
  // ... other middlewares
];
```

## 📱 Performance Optimization

### 1. Image Optimization

Enable image optimization in Strapi:

```javascript
// config/plugins.js
module.exports = {
  upload: {
    config: {
      sizeLimit: 10000000, // 10MB
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
    },
  },
};
```

### 2. Frontend Optimization

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          strapi: ['@tanstack/react-query']
        }
      }
    }
  }
})
```

### 3. Caching Strategy

Set up proper caching headers:

```javascript
// config/middlewares.js
module.exports = [
  // ... other middlewares
  {
    name: 'strapi::public',
    config: {
      maxAge: 31536000, // 1 year
    },
  },
];
```

## 🔄 Content Updates Workflow

### 1. Content Management Process

1. **Login to Strapi Admin**
   - Go to your deployed Strapi URL
   - Login with admin credentials

2. **Update Content**
   - Navigate to Content Manager
   - Edit any content (hero banners, news, events, etc.)
   - Save changes

3. **Automatic Updates**
   - Changes reflect immediately on your website
   - No code deployment needed
   - React Query handles caching and updates

### 2. Content Types Management

Add new content types:
1. Go to Content-Type Builder in Strapi
2. Create new collection/single type
3. Define fields and relationships
4. Update frontend to use new content type

## 📊 Monitoring & Analytics

### 1. Error Tracking

Add error tracking to your frontend:

```typescript
// lib/errorTracking.ts
export const trackError = (error: Error, context?: string) => {
  // Send to your error tracking service
  console.error('Error tracked:', { error, context });
};
```

### 2. Performance Monitoring

Monitor your Strapi performance:
- Use Railway/Vercel built-in analytics
- Set up Uptime monitoring
- Monitor database performance

### 3. Content Analytics

Track content performance:
- Monitor which content types are accessed most
- Track user engagement with dynamic content
- Analyze loading times and optimize accordingly

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```bash
   # Check CORS configuration in Strapi
   # Ensure frontend URL is in allowed origins
   ```

2. **API Token Issues**
   ```bash
   # Verify token permissions in Strapi admin
   # Check token expiration date
   ```

3. **Image Loading Issues**
   ```bash
   # Check image URLs in browser dev tools
   # Verify media files are publicly accessible
   ```

4. **Build Failures**
   ```bash
   # Check environment variables are set correctly
   # Verify all dependencies are installed
   ```

### Debug Mode

Enable debug mode for troubleshooting:

```bash
# In your .env file
VITE_DEBUG_STRAPI=true
```

This will log all API requests and responses to the console.

## 📈 Scaling Considerations

### 1. Database Scaling

- Use connection pooling
- Set up read replicas for high traffic
- Monitor database performance

### 2. CDN Setup

- Use Cloudflare or similar for static assets
- Cache API responses at CDN level
- Optimize image delivery

### 3. Caching Strategy

- Implement Redis for Strapi caching
- Use React Query for frontend caching
- Set appropriate cache headers

## 🔄 Backup Strategy

### 1. Database Backups

```bash
# Automated daily backups
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### 2. Content Backups

- Export Strapi content regularly
- Store media files in cloud storage
- Version control your Strapi schema

### 3. Disaster Recovery

- Document your deployment process
- Keep environment variables secure
- Test restore procedures regularly

## 📝 Maintenance

### Regular Tasks

1. **Weekly**
   - Check for Strapi updates
   - Monitor error logs
   - Review content performance

2. **Monthly**
   - Update dependencies
   - Review security settings
   - Backup database and content

3. **Quarterly**
   - Performance optimization
   - Security audit
   - Content strategy review

## 🎯 Success Metrics

Track these metrics to measure success:

- **Performance**: Page load times, API response times
- **Reliability**: Uptime, error rates
- **Content Management**: Time to publish, content updates frequency
- **User Experience**: Bounce rate, engagement metrics

## 📞 Support

For issues with this deployment:

1. Check the troubleshooting section
2. Review Strapi documentation
3. Check hosting platform documentation
4. Monitor error logs and analytics

Your dynamic school website is now fully deployed and content-manageable! 🎉

