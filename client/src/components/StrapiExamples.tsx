/**
 * Example components demonstrating Strapi CMS integration
 * These show various patterns for fetching and displaying Strapi data
 */

import React from 'react';
import { useStrapiCollection, useStrapiItem, useCreateStrapiItem, useUpdateStrapiItem, useDeleteStrapiItem, useStrapiFeatured } from '@/hooks/use-strapi';
import { getStrapiImageUrl, formatStrapiDate } from '@/lib/strapi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

// Example 1: Fetching and displaying a collection of news articles
export const NewsFromStrapi = () => {
  const { data, isLoading, error, refetch } = useStrapiCollection('news', {
    populate: 'image,author',
    sort: 'createdAt:desc',
    pagination: { pageSize: 6 },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load news articles. {error.message}
          <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-2">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((article: any) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            {article.attributes.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={getStrapiImageUrl(article.attributes.image)}
                  alt={article.attributes.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{article.attributes.title}</CardTitle>
              <CardDescription>
                By {article.attributes.author?.data?.attributes?.name || 'Admin'} • {' '}
                {formatStrapiDate(article.attributes.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {article.attributes.excerpt || article.attributes.content?.substring(0, 150) + '...'}
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Example 2: Fetching featured content
export const FeaturedEvents = () => {
  const { data, isLoading, error } = useStrapiFeatured('events', 'featured', {
    populate: 'image,location',
    sort: 'eventDate:asc',
  });

  if (isLoading) return <Skeleton className="h-32 w-full" />;
  if (error) return <Alert variant="destructive">Error loading events: {error.message}</Alert>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Featured Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.data?.map((event: any) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{event.attributes.title}</CardTitle>
                  <CardDescription>
                    {formatStrapiDate(event.attributes.eventDate)}
                  </CardDescription>
                </div>
                <Badge variant="secondary">Featured</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {event.attributes.description}
              </p>
              {event.attributes.location && (
                <p className="text-xs text-muted-foreground mt-2">
                  📍 {event.attributes.location}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Example 3: Single item fetch (e.g., for a detail page)
export const EventDetail = ({ eventId }: { eventId: string }) => {
  const { data, isLoading, error } = useStrapiItem('events', eventId, {
    populate: 'image,location,speakers',
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  if (error) return <Alert variant="destructive">Error loading event: {error.message}</Alert>;
  if (!data?.data) return <Alert>Event not found</Alert>;

  const event = data.data;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="aspect-video overflow-hidden rounded-lg">
        {event.attributes.image && (
          <img
            src={getStrapiImageUrl(event.attributes.image)}
            alt={event.attributes.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{event.attributes.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>📅 {formatStrapiDate(event.attributes.eventDate)}</span>
          {event.attributes.location && (
            <span>📍 {event.attributes.location}</span>
          )}
        </div>
        
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: event.attributes.content }} />
        </div>
        
        {event.attributes.speakers && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Speakers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.attributes.speakers.data.map((speaker: any) => (
                <Card key={speaker.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      {speaker.attributes.avatar && (
                        <img
                          src={getStrapiImageUrl(speaker.attributes.avatar)}
                          alt={speaker.attributes.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">{speaker.attributes.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {speaker.attributes.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Example 4: CRUD operations (for admin interfaces)
export const EventManagement = () => {
  const { data: events, isLoading } = useStrapiCollection('events');
  const createEvent = useCreateStrapiItem('events');
  const updateEvent = useUpdateStrapiItem('events');
  const deleteEvent = useDeleteStrapiItem('events');

  const handleCreate = async () => {
    try {
      await createEvent.mutateAsync({
        title: 'New Event',
        description: 'Event description',
        eventDate: new Date().toISOString(),
        featured: false,
      });
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateEvent.mutateAsync({
        id,
        data: {
          title: 'Updated Event Title',
          featured: true,
        },
      });
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  if (isLoading) return <Skeleton className="h-32 w-full" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Event Management</h3>
        <Button onClick={handleCreate} disabled={createEvent.isPending}>
          {createEvent.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {events?.data?.map((event: any) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{event.attributes.title}</CardTitle>
                  <CardDescription>
                    {formatStrapiDate(event.attributes.eventDate)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdate(event.id)}
                    disabled={updateEvent.isPending}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                    disabled={deleteEvent.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {event.attributes.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Example 5: Error boundary component for Strapi errors
export const StrapiErrorBoundary = ({ 
  error, 
  retry 
}: { 
  error: Error; 
  retry?: () => void; 
}) => {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        <div className="space-y-2">
          <p>Failed to load content from CMS:</p>
          <p className="text-sm font-mono bg-muted p-2 rounded">
            {error.message}
          </p>
          {retry && (
            <Button variant="outline" size="sm" onClick={retry}>
              Try Again
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
