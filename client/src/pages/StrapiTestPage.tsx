/**
 * Strapi Test Page - Comprehensive testing tool for Strapi CMS integration
 * Tests all data types, CRUD operations, and displays clear results
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Loader2, 
  RefreshCw, 
  Send, 
  CheckCircle, 
  XCircle, 
  Info, 
  Database, 
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { strapiService, getStrapiImageUrl, handleStrapiError } from '@/lib/strapiService';
import { getTestData, generateRandomTestData, validateTestData } from '@/lib/testData';

// Types for test data
interface TestCollection {
  name: string;
  displayName: string;
  isSingleType: boolean;
}

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
  operation: string;
}

interface FormData {
  [key: string]: any;
}

// Available collections for testing
const AVAILABLE_COLLECTIONS: TestCollection[] = [
  { name: 'hero-banners', displayName: 'Hero Banners', isSingleType: false },
  { name: 'about-section', displayName: 'About Section', isSingleType: true },
  { name: 'academic-programs', displayName: 'Academic Programs', isSingleType: false },
  { name: 'activities', displayName: 'Activities', isSingleType: false },
  { name: 'gallery-images', displayName: 'Gallery Images', isSingleType: false },
  { name: 'news-articles', displayName: 'News Articles', isSingleType: false },
  { name: 'events', displayName: 'Events', isSingleType: false },
  { name: 'testimonials', displayName: 'Testimonials', isSingleType: false },
  { name: 'footer-info', displayName: 'Footer Info', isSingleType: true },
  { name: 'header-info', displayName: 'Header Info', isSingleType: true },
  { name: 'authors', displayName: 'Authors', isSingleType: false },
  { name: 'contact-submissions', displayName: 'Contact Submissions', isSingleType: false },
];

export default function StrapiTestPage() {
  // State management
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [collectionData, setCollectionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Environment variables display
  const strapiUrl = import.meta.env.VITE_STRAPI_URL || 'Not set';
  const hasApiToken = !!import.meta.env.VITE_STRAPI_API_TOKEN;

  // Test connection on component mount
  useEffect(() => {
    testConnection();
  }, []);

  // Test Strapi connection
  const testConnection = async () => {
    setConnectionStatus('checking');
    try {
      // Try to fetch a simple endpoint to test connection
      const response = await fetch(`${strapiUrl}/api`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setConnectionStatus('connected');
        addTestResult({
          success: true,
          data: { message: 'Connection successful' },
          operation: 'Connection Test',
        });
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setConnectionStatus('error');
      addTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        operation: 'Connection Test',
      });
    }
  };

  // Add test result to history
  const addTestResult = (result: Omit<TestResult, 'timestamp'>) => {
    const newResult: TestResult = {
      ...result,
      timestamp: new Date().toLocaleTimeString(),
    };
    setTestResults(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  // Fetch data from selected collection
  const fetchCollectionData = async () => {
    if (!selectedCollection) return;
    
    setIsLoading(true);
    try {
      let data;
      const collection = AVAILABLE_COLLECTIONS.find(c => c.name === selectedCollection);
      
      if (collection?.isSingleType) {
        // Fetch single type
        data = await strapiService.getCollection(selectedCollection, { populate: '*' });
      } else {
        // Fetch collection type
        data = await strapiService.getCollection(selectedCollection, { populate: '*', pagination: { pageSize: 10 } });
      }
      
      setCollectionData(data);
      addTestResult({
        success: true,
        data: { count: data.data?.length || 1, collection: selectedCollection },
        operation: 'Fetch Data',
      });
      
      console.log(`✅ Fetched ${selectedCollection}:`, data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addTestResult({
        success: false,
        error: errorMessage,
        operation: 'Fetch Data',
      });
      console.error(`❌ Error fetching ${selectedCollection}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit test data
  const submitTestData = async () => {
    if (!selectedCollection || !formData) return;
    
    setIsSubmitting(true);
    try {
      const collection = AVAILABLE_COLLECTIONS.find(c => c.name === selectedCollection);
      let result;
      
      if (selectedItemId && !collection?.isSingleType) {
        // Update existing item
        result = await strapiService.update(selectedCollection, selectedItemId, formData);
      } else {
        // Create new item
        result = await strapiService.create(selectedCollection, formData);
      }
      
      addTestResult({
        success: true,
        data: { id: result.data?.id, collection: selectedCollection },
        operation: selectedItemId ? 'Update Data' : 'Create Data',
      });
      
      console.log(`✅ ${selectedItemId ? 'Updated' : 'Created'} ${selectedCollection}:`, result);
      
      // Refresh data
      fetchCollectionData();
      
      // Clear form
      setFormData({});
      setSelectedItemId('');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addTestResult({
        success: false,
        error: errorMessage,
        operation: selectedItemId ? 'Update Data' : 'Create Data',
      });
      console.error(`❌ Error ${selectedItemId ? 'updating' : 'creating'} ${selectedCollection}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!selectedCollection || !confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await strapiService.delete(selectedCollection, id);
      addTestResult({
        success: true,
        data: { id, collection: selectedCollection },
        operation: 'Delete Data',
      });
      console.log(`✅ Deleted ${selectedCollection} item ${id}`);
      fetchCollectionData();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addTestResult({
        success: false,
        error: errorMessage,
        operation: 'Delete Data',
      });
      console.error(`❌ Error deleting ${selectedCollection} item ${id}:`, error);
    }
  };

  // Handle form input changes
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Render data value with proper formatting
  const renderDataValue = (key: string, value: any, level: number = 0) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">null</span>;
    }

    if (typeof value === 'string') {
      // Check if it's a date
      if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        return <Badge variant="outline">{new Date(value).toLocaleString()}</Badge>;
      }
      // Check if it's a URL
      if (value.startsWith('http')) {
        return <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{value}</a>;
      }
      return <span className="font-mono text-sm">{value}</span>;
    }

    if (typeof value === 'number') {
      return <Badge variant="secondary">{value}</Badge>;
    }

    if (typeof value === 'boolean') {
      return <Badge variant={value ? "default" : "outline"}>{value.toString()}</Badge>;
    }

    if (Array.isArray(value)) {
      return (
        <div className="space-y-1">
          <Badge variant="outline">Array ({value.length})</Badge>
          {value.slice(0, 3).map((item, index) => (
            <div key={index} className="ml-4">
              {renderDataValue(`${index}`, item, level + 1)}
            </div>
          ))}
          {value.length > 3 && <div className="ml-4 text-gray-500">... and {value.length - 3} more</div>}
        </div>
      );
    }

    if (typeof value === 'object') {
      // Handle Strapi media objects
      if (value.url || value.data) {
        const imageUrl = getStrapiImageUrl(value);
        return (
          <div className="space-y-2">
            <img src={imageUrl} alt="Strapi media" className="w-32 h-32 object-cover rounded border" />
            <div className="text-xs text-gray-500">{value.name || 'Media file'}</div>
          </div>
        );
      }
      
      // Handle nested objects
      return (
        <div className="space-y-1">
          <Badge variant="outline">Object</Badge>
          {Object.entries(value).slice(0, 3).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey} className="ml-4">
              <span className="font-medium">{nestedKey}:</span> {renderDataValue(nestedKey, nestedValue, level + 1)}
            </div>
          ))}
          {Object.keys(value).length > 3 && (
            <div className="ml-4 text-gray-500">... and {Object.keys(value).length - 3} more fields</div>
          )}
        </div>
      );
    }

    return <span className="text-gray-600">{String(value)}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6" />
                Strapi CMS Test Page
              </CardTitle>
              <CardDescription>
                Test all data types, CRUD operations, and verify Strapi integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Strapi URL</Label>
                  <div className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                    {strapiUrl}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">API Token</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant={hasApiToken ? "default" : "destructive"}>
                      {hasApiToken ? "Configured" : "Missing"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Connection Status</Label>
                  <div className="flex items-center gap-2">
                    {connectionStatus === 'checking' && <Loader2 className="w-4 h-4 animate-spin" />}
                    {connectionStatus === 'connected' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {connectionStatus === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
                    <Badge variant={connectionStatus === 'connected' ? "default" : "destructive"}>
                      {connectionStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button onClick={testConnection} variant="outline" className="mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="fetch" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="fetch">Fetch Data</TabsTrigger>
              <TabsTrigger value="submit">Submit Data</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
            </TabsList>

            {/* Fetch Data Tab */}
            <TabsContent value="fetch" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fetch Collection Data</CardTitle>
                  <CardDescription>
                    Select a collection and fetch its data to verify Strapi integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select a collection" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_COLLECTIONS.map((collection) => (
                          <SelectItem key={collection.name} value={collection.name}>
                            {collection.displayName} {collection.isSingleType && '(Single Type)'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={fetchCollectionData} 
                      disabled={!selectedCollection || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Fetch Data
                    </Button>
                  </div>

                  {/* Display fetched data */}
                  {collectionData && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          Data from {selectedCollection} 
                          {Array.isArray(collectionData.data) && (
                            <Badge variant="outline" className="ml-2">
                              {collectionData.data.length} items
                            </Badge>
                          )}
                        </h3>
                        <Button variant="outline" size="sm" onClick={fetchCollectionData}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh
                        </Button>
                      </div>
                      
                      <div className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto">
                        <pre className="text-sm">
                          {JSON.stringify(collectionData, null, 2)}
                        </pre>
                      </div>

                      {/* Detailed data display */}
                      <div className="space-y-4">
                        {Array.isArray(collectionData.data) ? (
                          collectionData.data.map((item: any, index: number) => (
                            <Card key={item.id || index}>
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base">
                                    {item.attributes?.title || item.attributes?.name || `Item ${item.id}`}
                                  </CardTitle>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedItemId(item.id);
                                        setFormData(item.attributes || {});
                                      }}
                                    >
                                      <Edit className="w-4 h-4 mr-1" />
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => deleteItem(item.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {Object.entries(item.attributes || {}).map(([key, value]) => (
                                    <div key={key} className="space-y-1">
                                      <Label className="text-sm font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1')}:
                                      </Label>
                                      <div>{renderDataValue(key, value)}</div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card>
                            <CardContent className="pt-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(collectionData.data?.attributes || {}).map(([key, value]) => (
                                  <div key={key} className="space-y-1">
                                    <Label className="text-sm font-medium capitalize">
                                      {key.replace(/([A-Z])/g, ' $1')}:
                                    </Label>
                                    <div>{renderDataValue(key, value)}</div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Submit Data Tab */}
            <TabsContent value="submit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Test Data</CardTitle>
                  <CardDescription>
                    Create or update data in Strapi collections
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select a collection" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_COLLECTIONS.map((collection) => (
                          <SelectItem key={collection.name} value={collection.name}>
                            {collection.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCollection && (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Input
                          placeholder="Item ID (leave empty to create new)"
                          value={selectedItemId}
                          onChange={(e) => setSelectedItemId(e.target.value)}
                        />
                        <Button
                          onClick={submitTestData}
                          disabled={isSubmitting || !formData || Object.keys(formData).length === 0}
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4 mr-2" />
                          )}
                          {selectedItemId ? 'Update' : 'Create'} Data
                        </Button>
                      </div>

                      {/* Dynamic form fields */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Form Data:</h4>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(getTestData(selectedCollection))}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Load Sample
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(generateRandomTestData(selectedCollection))}
                            >
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Random Data
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData({})}
                            >
                              Clear
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={formData.title || ''}
                              onChange={(e) => handleFormChange('title', e.target.value)}
                              placeholder="Enter title"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              value={formData.description || ''}
                              onChange={(e) => handleFormChange('description', e.target.value)}
                              placeholder="Enter description"
                            />
                          </div>
                          <div>
                            <Label htmlFor="content">Content (Rich Text)</Label>
                            <Textarea
                              id="content"
                              value={formData.content || ''}
                              onChange={(e) => handleFormChange('content', e.target.value)}
                              placeholder="Enter rich text content"
                              rows={4}
                            />
                          </div>
                          <div>
                            <Label htmlFor="isActive">Is Active</Label>
                            <Select 
                              value={formData.isActive?.toString() || ''} 
                              onValueChange={(value) => handleFormChange('isActive', value === 'true')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Data Validation */}
                        {formData && Object.keys(formData).length > 0 && (
                          <div className="space-y-2">
                            <Label>Data Validation:</Label>
                            {(() => {
                              const validation = validateTestData(formData, selectedCollection);
                              return (
                                <div className={`p-3 rounded border ${validation.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                  <div className="flex items-center gap-2">
                                    {validation.isValid ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-red-600" />
                                    )}
                                    <span className={`text-sm font-medium ${validation.isValid ? 'text-green-800' : 'text-red-800'}`}>
                                      {validation.isValid ? 'Data is valid' : 'Data validation failed'}
                                    </span>
                                  </div>
                                  {validation.errors.length > 0 && (
                                    <ul className="mt-2 text-sm text-red-700">
                                      {validation.errors.map((error, index) => (
                                        <li key={index}>• {error}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        )}

                        {/* JSON Editor for complex data */}
                        <div>
                          <Label htmlFor="jsonData">JSON Data (Advanced)</Label>
                          <Textarea
                            id="jsonData"
                            value={JSON.stringify(formData, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                setFormData(parsed);
                              } catch (error) {
                                // Invalid JSON, don't update
                              }
                            }}
                            placeholder="Enter JSON data"
                            rows={6}
                            className="font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Test Results Tab */}
            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Results History</CardTitle>
                  <CardDescription>
                    View the results of all test operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {testResults.length === 0 ? (
                    <Alert>
                      <Info className="w-4 h-4" />
                      <AlertDescription>
                        No test results yet. Perform some operations to see results here.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {result.success ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                              <span className="font-medium">{result.operation}</span>
                              <Badge variant="outline">{result.timestamp}</Badge>
                            </div>
                          </div>
                          {result.data && (
                            <div className="mb-2">
                              <Label className="text-sm font-medium">Data:</Label>
                              <pre className="text-xs bg-white p-2 rounded border mt-1 overflow-auto">
                                {JSON.stringify(result.data, null, 2)}
                              </pre>
                            </div>
                          )}
                          {result.error && (
                            <div>
                              <Label className="text-sm font-medium text-red-600">Error:</Label>
                              <div className="text-sm text-red-600 mt-1">{result.error}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Console Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Console Logging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  Open your browser's Developer Tools (F12) and check the Console tab to see detailed logs of all Strapi operations.
                  Look for ✅ (success) and ❌ (error) indicators in the console output.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
