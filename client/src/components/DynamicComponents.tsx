/**
 * Dynamic Components - Replace all static content with Strapi-powered components
 * These components make your entire website content-manageable
 */

import React from 'react';
import { 
  useHeroBanners, 
  useAboutSection, 
  useAcademicPrograms, 
  useActivities, 
  useGalleryImages,
  useNewsArticles,
  useEvents,
  useTestimonials,
  useFooterInfo,
  useHeaderInfo,
  useUpcomingEvents
} from '@/hooks/useDynamicContent';
import { getStrapiImageUrl, formatStrapiDate, handleStrapiError } from '@/lib/strapiService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Calendar, User, Mail, Phone } from 'lucide-react';

// Loading Components
const HeroBannerSkeleton = () => (
  <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600">
    <Skeleton className="absolute inset-0" />
    <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  </div>
);

const NewsCardSkeleton = () => (
  <Card>
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
);

// Error Components
const ContentError = ({ error, retry }: { error: Error; retry?: () => void }) => {
  const { message, isNetworkError } = handleStrapiError(error);
  
  return (
    <Alert variant="destructive">
      <AlertDescription>
        <div className="space-y-2">
          <p>{message}</p>
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

// Dynamic Hero Banner Component
export const DynamicHeroBanner = () => {
  const { data, isLoading, error, refetch } = useHeroBanners();

  if (isLoading) return <HeroBannerSkeleton />;
  if (error) return <ContentError error={error} retry={refetch} />;
  if (!data?.data?.length) return null;

  const banners = data.data;

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div 
              className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 flex items-center"
              style={{
                backgroundImage: banner.attributes.backgroundImage 
                  ? `url(${getStrapiImageUrl(banner.attributes.backgroundImage, 1920, 600)})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-3xl space-y-6">
                  <h1 className="text-5xl font-bold text-white">
                    {banner.attributes.title}
                  </h1>
                  {banner.attributes.subtitle && (
                    <h2 className="text-2xl text-blue-100">
                      {banner.attributes.subtitle}
                    </h2>
                  )}
                  {banner.attributes.description && (
                    <p className="text-lg text-white/90 max-w-2xl">
                      {banner.attributes.description}
                    </p>
                  )}
                  {banner.attributes.ctaText && banner.attributes.ctaLink && (
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      {banner.attributes.ctaText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

// Dynamic About Section
export const DynamicAboutSection = () => {
  const { data, isLoading, error } = useAboutSection();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-64" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) return <ContentError error={error} />;
  if (!data?.data) return null;

  const about = data.data.attributes;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{about.title}</h2>
          {about.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {about.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {about.image && (
            <div className="relative">
              <img
                src={getStrapiImageUrl(about.image, 600, 400)}
                alt={about.title}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="space-y-6">
            {about.content && (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
            )}

            {about.features && about.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {about.features.map((feature: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {about.stats && about.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {about.stats.map((stat: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Dynamic Academic Programs
export const DynamicAcademicPrograms = () => {
  const { data, isLoading, error } = useAcademicPrograms();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <ContentError error={error} />;
  if (!data?.data?.length) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Academic Programs</h2>
          <p className="text-xl text-gray-600">Excellence in education across all levels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.data.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              {program.attributes.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={getStrapiImageUrl(program.attributes.image, 400, 225)}
                    alt={program.attributes.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{program.attributes.title}</CardTitle>
                <CardDescription>
                  {program.attributes.gradeLevels} • {program.attributes.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {program.attributes.description}
                </p>
                {program.attributes.features && program.attributes.features.length > 0 && (
                  <ul className="space-y-2">
                    {program.attributes.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="text-sm flex items-center">
                        <Star className="w-3 h-3 text-blue-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dynamic News Section
export const DynamicNewsSection = () => {
  const { data, isLoading, error } = useNewsArticles(6);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <ContentError error={error} />;
  if (!data?.data?.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest News</h2>
          <p className="text-xl text-gray-600">Stay updated with our latest announcements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.data.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              {article.attributes.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={getStrapiImageUrl(article.attributes.image, 400, 225)}
                    alt={article.attributes.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  {article.attributes.category && (
                    <Badge variant="secondary">{article.attributes.category}</Badge>
                  )}
                  {article.attributes.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{article.attributes.title}</CardTitle>
                <CardDescription>
                  {formatStrapiDate(article.attributes.publishedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">
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
    </section>
  );
};

// Dynamic Events Section
export const DynamicEventsSection = () => {
  const { data, isLoading, error } = useUpcomingEvents(4);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </section>
    );
  }

  if (error) return <ContentError error={error} />;
  if (!data?.data?.length) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-xl text-gray-600">Don't miss out on these exciting events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.data.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              {event.attributes.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={getStrapiImageUrl(event.attributes.image, 600, 300)}
                    alt={event.attributes.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  {event.attributes.category && (
                    <Badge variant="outline">{event.attributes.category}</Badge>
                  )}
                  {event.attributes.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
                <CardTitle>{event.attributes.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatStrapiDate(event.attributes.eventDate)}
                    </div>
                    {event.attributes.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.attributes.location}
                      </div>
                    )}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {event.attributes.description}
                </p>
                {event.attributes.registrationRequired && (
                  <Button className="w-full">
                    Register Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dynamic Testimonials
export const DynamicTestimonials = () => {
  const { data, isLoading, error } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16 mt-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <ContentError error={error} />;
  if (!data?.data?.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-xl text-gray-600">Testimonials from our community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.data.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage 
                      src={testimonial.attributes.image ? getStrapiImageUrl(testimonial.attributes.image, 48, 48) : undefined} 
                    />
                    <AvatarFallback>
                      {testimonial.attributes.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.attributes.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.attributes.role}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.attributes.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill={i < testimonial.attributes.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">"{testimonial.attributes.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dynamic Footer
export const DynamicFooter = () => {
  const { data, isLoading, error } = useFooterInfo();

  if (isLoading) {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-28" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  if (error) return null; // Fallback to static footer

  if (!data?.data) return null;

  const footer = data.data.attributes;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{footer.schoolName}</h3>
            <p className="text-gray-300">{footer.address}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {footer.phone}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {footer.email}
              </div>
            </div>
          </div>

          {footer.quickLinks && footer.quickLinks.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footer.quickLinks.map((link: any, index: number) => (
                  <li key={index}>
                    <a href={link.url} className="text-gray-300 hover:text-white transition-colors">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold mb-4">Social Media</h4>
            <div className="flex space-x-4">
              {footer.socialLinks?.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-gray-300">{footer.address}</p>
            <p className="text-gray-300 mt-2">{footer.phone}</p>
            <p className="text-gray-300">{footer.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

