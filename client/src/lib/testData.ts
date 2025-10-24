/**
 * Test Data Utilities for Strapi Testing
 * Provides sample data for testing different content types
 */

// Sample data for different content types
export const testDataSamples = {
  'hero-banners': {
    title: 'Test Hero Banner',
    subtitle: 'This is a test subtitle',
    description: 'This is a test description for the hero banner',
    ctaText: 'Learn More',
    ctaLink: '/test',
    isActive: true,
    order: 1,
  },
  
  'about-section': {
    title: 'Test About Section',
    description: 'This is a test description for the about section',
    content: '<p>This is <strong>rich text content</strong> for testing.</p>',
    features: [
      {
        title: 'Test Feature 1',
        description: 'Description for test feature 1',
        icon: 'star'
      },
      {
        title: 'Test Feature 2', 
        description: 'Description for test feature 2',
        icon: 'heart'
      }
    ],
    stats: [
      {
        number: '100+',
        label: 'Test Students'
      },
      {
        number: '10+',
        label: 'Test Years'
      }
    ]
  },
  
  'academic-programs': {
    title: 'Test Academic Program',
    description: 'This is a test academic program description',
    gradeLevels: 'Grades 1-5',
    duration: '5 years',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    isActive: true,
  },
  
  'activities': {
    title: 'Test Activity',
    description: 'This is a test activity description',
    category: 'Sports',
    schedule: 'Monday 3:00 PM',
    location: 'Main Hall',
    isActive: true,
  },
  
  'gallery-images': {
    title: 'Test Gallery Image',
    description: 'This is a test gallery image description',
    category: 'Events',
    alt: 'Test image alt text',
  },
  
  'news-articles': {
    title: 'Test News Article',
    content: '<p>This is a <em>test news article</em> content with <strong>rich text formatting</strong>.</p>',
    excerpt: 'This is a test excerpt for the news article',
    category: 'General',
    featured: false,
    publishedAt: new Date().toISOString(),
  },
  
  'events': {
    title: 'Test Event',
    description: 'This is a test event description',
    content: '<p>This is the full content for the <strong>test event</strong>.</p>',
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    location: 'Test Location',
    category: 'Academic',
    featured: false,
    registrationRequired: false,
    registrationLink: '',
  },
  
  'testimonials': {
    name: 'Test User',
    role: 'Parent',
    content: 'This is a test testimonial content from a parent.',
    rating: 5,
    isActive: true,
  },
  
  'footer-info': {
    schoolName: 'Test School Name',
    address: '123 Test Street, Test City, Test State 12345',
    phone: '+1 (555) 123-4567',
    email: 'test@school.com',
    socialLinks: [
      {
        platform: 'Facebook',
        url: 'https://facebook.com/testschool',
        icon: 'facebook'
      },
      {
        platform: 'Twitter',
        url: 'https://twitter.com/testschool',
        icon: 'twitter'
      }
    ],
    quickLinks: [
      {
        title: 'About Us',
        url: '/about'
      },
      {
        title: 'Contact',
        url: '/contact'
      }
    ],
    copyright: '© 2025 Test School. All rights reserved.',
  },
  
  'header-info': {
    schoolName: 'Test School',
    navigation: [
      {
        title: 'Home',
        url: '/'
      },
      {
        title: 'About',
        url: '/about'
      },
      {
        title: 'Academics',
        url: '/academics',
        children: [
          {
            title: 'Programs',
            url: '/academics/programs'
          },
          {
            title: 'Faculty',
            url: '/academics/faculty'
          }
        ]
      }
    ],
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'info@testschool.com'
    }
  },
  
  'authors': {
    name: 'Test Author',
    email: 'author@testschool.com',
    bio: 'This is a test author bio with some information about the author.',
  },
  
  'contact-submissions': {
    name: 'Test User',
    email: 'testuser@example.com',
    phone: '+1 (555) 987-6543',
    subject: 'Test Contact Form Submission',
    message: 'This is a test message from the contact form to verify that submissions are working correctly.',
  }
};

// Function to get test data for a specific collection
export const getTestData = (collectionName: string): any => {
  return testDataSamples[collectionName as keyof typeof testDataSamples] || {};
};

// Function to generate random test data
export const generateRandomTestData = (collectionName: string): any => {
  const baseData = getTestData(collectionName);
  const randomSuffix = Math.floor(Math.random() * 1000);
  
  // Add random suffix to make data unique
  if (typeof baseData === 'object' && baseData !== null) {
    const randomData = { ...baseData };
    
    // Add random suffix to title/name fields
    if (randomData.title) {
      randomData.title = `${randomData.title} ${randomSuffix}`;
    }
    if (randomData.name) {
      randomData.name = `${randomData.name} ${randomSuffix}`;
    }
    if (randomData.schoolName) {
      randomData.schoolName = `${randomData.schoolName} ${randomSuffix}`;
    }
    
    // Add random suffix to description fields
    if (randomData.description) {
      randomData.description = `${randomData.description} (Test ${randomSuffix})`;
    }
    
    // Add random suffix to email fields
    if (randomData.email) {
      randomData.email = randomData.email.replace('@', `${randomSuffix}@`);
    }
    
    return randomData;
  }
  
  return baseData;
};

// Function to validate test data structure
export const validateTestData = (data: any, collectionName: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const sampleData = getTestData(collectionName);
  
  if (!sampleData || Object.keys(sampleData).length === 0) {
    errors.push(`No sample data available for collection: ${collectionName}`);
    return { isValid: false, errors };
  }
  
  // Check if required fields are present
  const requiredFields = ['title', 'name', 'schoolName'].filter(field => sampleData[field]);
  for (const field of requiredFields) {
    if (!data[field] || data[field].toString().trim() === '') {
      errors.push(`Required field '${field}' is missing or empty`);
    }
  }
  
  return { isValid: errors.length === 0, errors };
};

// Function to format data for display
export const formatDataForDisplay = (data: any): string => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return 'Invalid JSON data';
  }
};

// Function to clean test data (remove test entries)
export const cleanTestData = async (collectionName: string, strapiService: any): Promise<void> => {
  try {
    // This would need to be implemented based on your specific needs
    // For now, it's a placeholder
    console.log(`Cleaning test data for ${collectionName}`);
  } catch (error) {
    console.error(`Error cleaning test data for ${collectionName}:`, error);
  }
};

