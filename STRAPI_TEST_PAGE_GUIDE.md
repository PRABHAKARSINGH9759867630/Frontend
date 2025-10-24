# Strapi Test Page - Complete Usage Guide

Your comprehensive testing tool for Strapi CMS integration is now ready! This guide will help you use the StrapiTestPage to verify all aspects of your Strapi setup.

## 🚀 Access the Test Page

Navigate to: **`http://localhost:3000/strapi-test`**

Or add a link to your navigation:
```tsx
<Link to="/strapi-test">Strapi Test</Link>
```

## 📋 What the Test Page Does

### ✅ **Connection Testing**
- Verifies Strapi URL and API token configuration
- Tests actual connection to your Strapi instance
- Shows connection status with visual indicators

### ✅ **Data Type Testing**
- **Text fields** - Strings, descriptions, titles
- **Rich text** - HTML content with formatting
- **Images** - Media files with automatic URL generation
- **JSON data** - Complex nested objects and arrays
- **Dates** - Automatic date formatting and display
- **Booleans** - True/false values with badges
- **Numbers** - Integer and decimal values
- **Relations** - Connected data from other collections

### ✅ **CRUD Operations**
- **Create** - Add new items to collections
- **Read** - Fetch and display existing data
- **Update** - Modify existing items
- **Delete** - Remove items from collections

### ✅ **Visual Data Display**
- Formatted display of all data types
- Image previews with optimization
- Date formatting
- JSON syntax highlighting
- Error and success indicators

## 🔧 Environment Setup

Make sure your `.env` file contains:

```bash
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=aa423f434f5fa85189863f12b9dd84169f0c792d9b66ff6ac1b946afc9da722008f093a59185ed66f15c53e29f8260c8e4d7ca8795cd31e0bd140a718a9eeb1901ff676484970cd7a7b766d88cc13b19b363260f5c29f667ec84b8a49835ed32f5f049691a2fede78c7333e4a7878dc4929895393fb57c84953e31d82c01461b
VITE_DEBUG_STRAPI=true
```

## 📖 How to Use the Test Page

### Step 1: Check Connection Status

1. **Open the test page** - Navigate to `/strapi-test`
2. **Verify environment variables** - Check the header section
3. **Test connection** - Click "Test Connection" button
4. **Look for success indicators** - Green checkmark means connection is working

### Step 2: Test Data Fetching

1. **Select a collection** from the dropdown (e.g., "Hero Banners")
2. **Click "Fetch Data"** to retrieve data from Strapi
3. **View the results** in three formats:
   - **Raw JSON** - Complete API response
   - **Formatted display** - Human-readable format
   - **Individual items** - Detailed view of each record

### Step 3: Test Data Submission

1. **Switch to "Submit Data" tab**
2. **Select the same collection**
3. **Use sample data buttons**:
   - **"Load Sample"** - Loads predefined test data
   - **"Random Data"** - Generates random test data
   - **"Clear"** - Clears the form
4. **Fill in the form** or edit the JSON directly
5. **Click "Create Data"** to submit
6. **Check the results** in the "Test Results" tab

### Step 4: Test Updates and Deletes

1. **Fetch existing data** first
2. **Click "Edit"** on any item to load it into the form
3. **Modify the data** and click "Update Data"
4. **Click "Delete"** to remove items (with confirmation)

## 🎯 Testing Different Data Types

### Text Data
```json
{
  "title": "Test Title",
  "description": "This is a test description"
}
```

### Rich Text Content
```json
{
  "content": "<p>This is <strong>rich text</strong> with <em>formatting</em>.</p>"
}
```

### Date Fields
```json
{
  "publishedAt": "2025-01-15T10:30:00.000Z",
  "eventDate": "2025-02-15T09:00:00.000Z"
}
```

### Boolean Values
```json
{
  "isActive": true,
  "featured": false
}
```

### JSON Objects
```json
{
  "features": [
    {"title": "Feature 1", "description": "Description 1"},
    {"title": "Feature 2", "description": "Description 2"}
  ],
  "stats": [
    {"number": "100+", "label": "Students"},
    {"number": "25+", "label": "Years"}
  ]
}
```

### Media/Images
```json
{
  "image": {
    "url": "/uploads/image.jpg",
    "name": "test-image.jpg",
    "size": 1024000
  }
}
```

## 🔍 Debugging Features

### Console Logging
- **Open Developer Tools** (F12)
- **Check Console tab** for detailed logs
- **Look for indicators**:
  - ✅ Success operations
  - ❌ Error operations
  - 📊 Data structure information

### Test Results History
- **View all operations** in the "Test Results" tab
- **See timestamps** for each operation
- **Check success/failure status**
- **View error messages** for failed operations

### Data Validation
- **Real-time validation** of form data
- **Required field checking**
- **Data type validation**
- **Visual indicators** for valid/invalid data

## 🛠️ Troubleshooting

### Connection Issues

**Problem**: Connection status shows "error"
**Solutions**:
1. Check your Strapi URL in `.env` file
2. Verify API token is correct
3. Ensure Strapi server is running
4. Check CORS settings in Strapi

**Problem**: API token shows "Missing"
**Solutions**:
1. Add `VITE_STRAPI_API_TOKEN` to your `.env` file
2. Get a valid token from Strapi admin panel
3. Ensure token has proper permissions

### Data Fetching Issues

**Problem**: "Unable to fetch data" error
**Solutions**:
1. Check collection name exists in Strapi
2. Verify collection permissions in Strapi admin
3. Check network tab in DevTools for HTTP errors
4. Ensure collection has data

**Problem**: Empty data returned
**Solutions**:
1. Check if collection exists and has data
2. Verify populate parameter is working
3. Check Strapi permissions for the collection

### Data Submission Issues

**Problem**: "Failed to create/update data"
**Solutions**:
1. Check required fields are filled
2. Verify data format matches collection schema
3. Check permissions for create/update operations
4. Validate JSON syntax if using JSON editor

**Problem**: Validation errors
**Solutions**:
1. Use "Load Sample" button for correct format
2. Check required fields in Strapi collection
3. Verify data types match schema
4. Use data validation indicators

## 📊 Sample Test Scenarios

### Test 1: Basic CRUD Operations
1. Select "Testimonials" collection
2. Load sample data
3. Create new testimonial
4. Fetch data to verify creation
5. Edit the created item
6. Delete the item

### Test 2: Complex Data Types
1. Select "About Section" collection
2. Load sample data with JSON fields
3. Modify the features array
4. Update the data
5. Verify the changes

### Test 3: Media Handling
1. Select "Gallery Images" collection
2. Create item with image reference
3. Check how images are displayed
4. Test image URL generation

### Test 4: Date Handling
1. Select "Events" collection
2. Create event with future date
3. Verify date formatting
4. Check date display in fetched data

## 🎨 Customization

### Adding New Collections
Edit `AVAILABLE_COLLECTIONS` in the test page:

```typescript
const AVAILABLE_COLLECTIONS: TestCollection[] = [
  // ... existing collections
  { name: 'your-new-collection', displayName: 'Your New Collection', isSingleType: false },
];
```

### Adding Sample Data
Edit `testDataSamples` in `testData.ts`:

```typescript
export const testDataSamples = {
  // ... existing samples
  'your-new-collection': {
    title: 'Sample Title',
    description: 'Sample Description',
    // ... other fields
  }
};
```

## 🔒 Security Notes

### API Token Security
- Never commit API tokens to version control
- Use environment variables for all sensitive data
- Rotate API tokens regularly
- Use tokens with minimal required permissions

### Test Data
- Use test data only for development
- Clean up test data before production
- Don't use real user data for testing
- Be careful with delete operations

## 📈 Performance Testing

### Test Large Datasets
1. Create multiple test items
2. Test pagination with large collections
3. Monitor loading times
4. Check memory usage in DevTools

### Test Error Handling
1. Try invalid data formats
2. Test with missing required fields
3. Test network failure scenarios
4. Verify error messages are helpful

## 🎉 Success Indicators

Your Strapi integration is working correctly when:

✅ **Connection test passes**  
✅ **Can fetch data from all collections**  
✅ **Can create new items successfully**  
✅ **Can update existing items**  
✅ **Can delete items**  
✅ **All data types display correctly**  
✅ **Images load and display properly**  
✅ **Dates format correctly**  
✅ **JSON data structures work**  
✅ **Error handling works gracefully**  

## 🚀 Next Steps

Once testing is complete:

1. **Use the dynamic components** in your actual pages
2. **Set up production environment** variables
3. **Configure proper permissions** in Strapi
4. **Deploy your application** with confidence
5. **Monitor performance** in production

Your Strapi test page is now ready to help you build a robust, dynamic school website! 🎓✨
