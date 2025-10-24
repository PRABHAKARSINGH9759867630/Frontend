# Strapi Content Types for Dynamic School Website

This document defines all the content types needed to make your school website fully dynamic using Strapi CMS.

## 🏗️ Content Types Setup

### 1. Hero Banners (Collection Type)
```json
{
  "collectionName": "hero-banners",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subtitle": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "backgroundImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "ctaText": {
      "type": "string"
    },
    "ctaLink": {
      "type": "string"
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

### 2. About Section (Single Type)
```json
{
  "collectionName": "about-section",
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
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "features": {
      "type": "json"
    },
    "stats": {
      "type": "json"
    }
  }
}
```

### 3. Academic Programs (Collection Type)
```json
{
  "collectionName": "academic-programs",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "features": {
      "type": "json"
    },
    "gradeLevels": {
      "type": "string"
    },
    "duration": {
      "type": "string"
    },
    "isActive": {
      "type": "boolean",
      "default": true
    }
  }
}
```

### 4. Activities (Collection Type)
```json
{
  "collectionName": "activities",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "category": {
      "type": "enumeration",
      "enum": ["Sports", "Arts", "Music", "Drama", "Debate", "Science", "Technology", "Community Service", "Leadership", "Other"]
    },
    "schedule": {
      "type": "string"
    },
    "location": {
      "type": "string"
    },
    "isActive": {
      "type": "boolean",
      "default": true
    }
  }
}
```

### 5. Gallery Images (Collection Type)
```json
{
  "collectionName": "gallery-images",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "category": {
      "type": "enumeration",
      "enum": ["Campus", "Events", "Sports", "Academics", "Students", "Faculty", "Infrastructure", "Other"]
    },
    "alt": {
      "type": "string"
    }
  }
}
```

### 6. News Articles (Collection Type)
```json
{
  "collectionName": "news-articles",
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
      "allowedTypes": ["images"]
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::author.author"
    },
    "category": {
      "type": "enumeration",
      "enum": ["General", "Academics", "Sports", "Events", "Achievements", "Announcements"]
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

### 7. Events (Collection Type)
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
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "eventDate": {
      "type": "datetime",
      "required": true
    },
    "location": {
      "type": "string"
    },
    "category": {
      "type": "enumeration",
      "enum": ["Academic", "Sports", "Cultural", "Community", "Parent Meeting", "Workshop", "Other"]
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "registrationRequired": {
      "type": "boolean",
      "default": false
    },
    "registrationLink": {
      "type": "string"
    }
  }
}
```

### 8. Testimonials (Collection Type)
```json
{
  "collectionName": "testimonials",
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "role": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "text",
      "required": true
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "rating": {
      "type": "integer",
      "min": 1,
      "max": 5,
      "default": 5
    },
    "isActive": {
      "type": "boolean",
      "default": true
    }
  }
}
```

### 9. Footer Info (Single Type)
```json
{
  "collectionName": "footer-info",
  "attributes": {
    "schoolName": {
      "type": "string",
      "required": true
    },
    "address": {
      "type": "text",
      "required": true
    },
    "phone": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "socialLinks": {
      "type": "json"
    },
    "quickLinks": {
      "type": "json"
    },
    "copyright": {
      "type": "string"
    }
  }
}
```

### 10. Header Info (Single Type)
```json
{
  "collectionName": "header-info",
  "attributes": {
    "logo": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "schoolName": {
      "type": "string",
      "required": true
    },
    "navigation": {
      "type": "json"
    },
    "contactInfo": {
      "type": "json"
    }
  }
}
```

### 11. Authors (Collection Type - for News Articles)
```json
{
  "collectionName": "authors",
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email"
    },
    "bio": {
      "type": "text"
    },
    "avatar": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    }
  }
}
```

### 12. Contact Submissions (Collection Type - for Contact Form)
```json
{
  "collectionName": "contact-submissions",
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "phone": {
      "type": "string"
    },
    "subject": {
      "type": "string",
      "required": true
    },
    "message": {
      "type": "text",
      "required": true
    },
    "status": {
      "type": "enumeration",
      "enum": ["New", "In Progress", "Resolved"],
      "default": "New"
    }
  }
}
```

## 🔧 Setup Instructions

### 1. Create Content Types in Strapi Admin

1. Go to your Strapi admin panel
2. Navigate to **Content-Type Builder**
3. Create each content type using the JSON definitions above
4. Make sure to set proper field validations and requirements

### 2. Set Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Edit the **Public** role
3. Enable **find** and **findOne** permissions for all content types
4. Enable **create** permission for `contact-submissions`

### 3. Create API Token

1. Go to **Settings** → **API Tokens**
2. Create a new token with **Read** permissions for all content types
3. Add **Create** permission for `contact-submissions`
4. Copy the token to your `.env` file

### 4. Sample Data Structure

#### Hero Banner Example:
```json
{
  "title": "Welcome to Our School",
  "subtitle": "Excellence in Education",
  "description": "Providing world-class education for tomorrow's leaders",
  "ctaText": "Learn More",
  "ctaLink": "/about",
  "isActive": true,
  "order": 1
}
```

#### About Section Example:
```json
{
  "title": "About Our School",
  "description": "A brief overview of our institution",
  "content": "<p>Detailed content about the school...</p>",
  "features": [
    {
      "title": "Excellence",
      "description": "Commitment to academic excellence",
      "icon": "star"
    }
  ],
  "stats": [
    {
      "number": "500+",
      "label": "Students"
    }
  ]
}
```

#### Navigation Example (for Header):
```json
{
  "navigation": [
    {
      "title": "About",
      "url": "/about",
      "children": [
        {
          "title": "Our Story",
          "url": "/about/story"
        },
        {
          "title": "Leadership",
          "url": "/about/leadership"
        }
      ]
    },
    {
      "title": "Academics",
      "url": "/academics"
    }
  ]
}
```

#### Social Links Example (for Footer):
```json
{
  "socialLinks": [
    {
      "platform": "Facebook",
      "url": "https://facebook.com/ourschool",
      "icon": "facebook"
    },
    {
      "platform": "Instagram",
      "url": "https://instagram.com/ourschool",
      "icon": "instagram"
    }
  ]
}
```

## 📝 Content Management Tips

1. **Use Rich Text Editor**: For content fields, use the rich text editor for better formatting
2. **Optimize Images**: Upload optimized images for better performance
3. **Set Alt Text**: Always add alt text for images for accessibility
4. **Use Categories**: Categorize content for better organization
5. **Featured Content**: Use the featured flag to highlight important content
6. **Order Fields**: Use order fields to control display sequence
7. **Active Status**: Use isActive fields to control content visibility

## 🔄 Content Updates

Once set up, any changes made in Strapi will automatically reflect on your website:
- Add new hero banners → Website updates immediately
- Publish new news articles → Appears on website instantly
- Update school information → Changes reflect across all pages
- Add new events → Shows up in events section automatically

This makes your website truly dynamic and content-manageable without any code changes!

