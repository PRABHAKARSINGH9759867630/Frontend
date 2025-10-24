/**
 * Simple Strapi Integration Component
 * Replace your existing static content with this to use Strapi CMS
 */

import React from 'react';
import { useStrapiCollection } from '@/hooks/use-strapi';
import { getStrapiImageUrl, formatStrapiDate } from '@/lib/strapi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Replace your existing news/events sections with this
export const DynamicNewsSection = () => {
  const { data, isLoading, error } = useStrapiCollection('news', {
    populate: 'image,author',
    sort: 'createdAt:desc',
    pagination: { pageSize: 3 },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
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
          Unable to load news articles. Please check your Strapi connection.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.data?.length) {
    return (
      <Alert>
        <AlertDescription>
          No news articles available. Add some content in your Strapi CMS.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.data.map((article: any) => (
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
  );
};

// Replace your existing events section with this
export const DynamicEventsSection = () => {
  const { data, isLoading, error } = useStrapiCollection('events', {
    populate: 'image',
    sort: 'eventDate:asc',
    filters: {
      eventDate: {
        $gte: new Date().toISOString(), // Only future events
      },
    },
    pagination: { pageSize: 4 },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-32 w-full" />
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Unable to load events. Please check your Strapi connection.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.data?.length) {
    return (
      <Alert>
        <AlertDescription>
          No upcoming events scheduled. Check back later!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.data.map((event: any) => (
        <Card key={event.id} className="hover:shadow-lg transition-shadow">
          {event.attributes.image && (
            <div className="aspect-video overflow-hidden">
              <img
                src={getStrapiImageUrl(event.attributes.image)}
                alt={event.attributes.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-sm line-clamp-2">{event.attributes.title}</CardTitle>
            <CardDescription className="text-xs">
              📅 {formatStrapiDate(event.attributes.eventDate)}
              {event.attributes.location && (
                <span className="block">📍 {event.attributes.location}</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {event.attributes.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// School information from Strapi
export const DynamicSchoolInfo = () => {
  const { data, isLoading, error } = useStrapiCollection('school-info', {
    populate: 'logo',
    pagination: { pageSize: 1 },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (error || !data?.data?.length) {
    return null; // Fallback to static content
  }

  const schoolInfo = data.data[0];

  return (
    <div className="flex items-center gap-4">
      {schoolInfo.attributes.logo && (
        <img
          src={getStrapiImageUrl(schoolInfo.attributes.logo)}
          alt={schoolInfo.attributes.name}
          className="w-16 h-16 object-contain"
        />
      )}
      <div>
        <h1 className="text-2xl font-bold">{schoolInfo.attributes.name}</h1>
        {schoolInfo.attributes.mission && (
          <p className="text-muted-foreground">{schoolInfo.attributes.mission}</p>
        )}
      </div>
    </div>
  );
};
