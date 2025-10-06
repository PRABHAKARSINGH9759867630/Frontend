import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { ScrollingNotices } from "@/components/ScrollingNotices";
import { PrincipalMessage } from "@/components/PrincipalMessage";
import { WelcomeSection } from "@/components/WelcomeSection";
import { KeyFeatures } from "@/components/KeyFeatures";
import { StudentSpotlight } from "@/components/StudentSpotlight";
import { NewsSection } from "@/components/NewsSection";
import { EventsPreview } from "@/components/EventsPreview";
import { VirtualTourSection } from "@/components/VirtualTourSection";
import { BlogPreview } from "@/components/BlogPreview";
import { StatsCounter } from "@/components/StatsCounter";
import { Affiliations } from "@/components/Affiliations";
import { GalleryPreview } from "@/components/GalleryPreview";
import { Testimonials } from "@/components/Testimonials";
import { QuickActions } from "@/components/QuickActions";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

import heroImage from "@assets/generated_images/School_campus_hero_image_574848a6.png";
import principalPhoto from "@assets/generated_images/Principal_professional_portrait_d7e8b372.png";
import studentPhoto from "@assets/generated_images/Student_achievement_spotlight_23313d01.png";
import labImage from "@assets/generated_images/Science_lab_campus_tour_9f1f27cd.png";
import sportsImage from "@assets/generated_images/Sports_facilities_image_2ec22754.png";
import parentPhoto from "@assets/generated_images/Parent_testimonial_portrait_7c79c4ef.png";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const heroSlides = [
    {
      id: 1,
      image: heroImage,
      tagline: "Welcome to Excellence Academy",
      subtitle: "Where Learning Meets Innovation and Every Student Achieves Their Full Potential",
      cta1Text: "Apply Now",
      cta2Text: "Virtual Tour",
    },
    {
      id: 2,
      image: heroImage,
      tagline: "Shaping Future Leaders",
      subtitle: "Empowering Students Through Quality Education and Character Development",
      cta1Text: "Learn More",
      cta2Text: "Schedule Visit",
    },
  ];

  const notices = [
    { id: 1, text: "Admissions Open for 2025-26 Academic Year - Apply by March 31st", type: "urgent" as const },
    { id: 2, text: "Annual Sports Day scheduled for February 15th - Parents invited", type: "general" as const },
    { id: 3, text: "Mid-term examinations begin from March 1st - Time Table available", type: "urgent" as const },
    { id: 4, text: "Science Exhibition on January 25th - Register your projects now", type: "general" as const },
  ];

  const features = [
    {
      id: 1,
      icon: "academic" as const,
      title: "Academic Excellence",
      description: "Rigorous curriculum designed to challenge and inspire students to reach their full potential.",
    },
    {
      id: 2,
      icon: "sports" as const,
      title: "Sports & Fitness",
      description: "World-class sports facilities and training programs for holistic development.",
    },
    {
      id: 3,
      icon: "infrastructure" as const,
      title: "Modern Infrastructure",
      description: "State-of-the-art classrooms, labs, and learning spaces equipped with latest technology.",
    },
    {
      id: 4,
      icon: "faculty" as const,
      title: "Expert Faculty",
      description: "Highly qualified and passionate educators dedicated to student success.",
    },
    {
      id: 5,
      icon: "activities" as const,
      title: "Co-curricular Activities",
      description: "Diverse programs in arts, music, drama, and clubs to nurture talents.",
    },
  ];

  const spotlights = [
    {
      id: 1,
      name: "Emma Rodriguez",
      photo: studentPhoto,
      achievement: "National Science Olympiad Gold Medalist",
      quote: "Excellence Academy gave me the resources and mentorship to pursue my passion for science.",
      category: "student" as const,
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: studentPhoto,
      achievement: "Selected for International Mathematics Competition",
      quote: "The supportive environment here helped me develop both academically and personally.",
      category: "student" as const,
    },
  ];

  const newsArticles = [
    {
      id: 1,
      title: "Students Win State Science Fair",
      excerpt: "Our brilliant students secured top positions at the State Science Fair with innovative projects.",
      category: "Achievement",
      date: "Jan 15, 2025",
      image: sportsImage,
    },
    {
      id: 2,
      title: "New STEM Lab Inaugurated",
      excerpt: "State-of-the-art STEM laboratory opens, providing students with cutting-edge learning facilities.",
      category: "Infrastructure",
      date: "Jan 10, 2025",
    },
    {
      id: 3,
      title: "International Exchange Program",
      excerpt: "Selected students to participate in international cultural exchange program this summer.",
      category: "Programs",
      date: "Jan 5, 2025",
    },
  ];

  const events = [
    {
      id: 1,
      name: "Annual Sports Day",
      date: "2025-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Main Sports Complex",
      description: "Join us for our annual sports day featuring athletics, team games, and award ceremonies.",
    },
    {
      id: 2,
      name: "Science Exhibition",
      date: "2025-01-25",
      time: "10:00 AM - 3:00 PM",
      location: "Science Block",
      description: "Students showcase their innovative science projects and experiments.",
    },
    {
      id: 3,
      name: "Parent-Teacher Meeting",
      date: "2025-02-05",
      time: "2:00 PM - 5:00 PM",
      location: "Auditorium",
      description: "Semester review and discussion of student progress with parents.",
    },
  ];

  const blogArticles = [
    {
      id: 1,
      title: "The Future of Education: Blending Technology with Traditional Learning",
      excerpt: "Exploring how modern educational technology enhances traditional teaching methods for better student outcomes.",
      category: "Educational Technology",
      image: labImage,
      featured: true,
    },
    {
      id: 2,
      title: "Nurturing Emotional Intelligence in Students",
      excerpt: "Understanding the importance of emotional development alongside academic achievement.",
      category: "Student Well-being",
    },
    {
      id: 3,
      title: "STEM Education: Preparing Students for Tomorrow",
      excerpt: "How our STEM programs equip students with critical skills for future careers.",
      category: "STEM",
    },
  ];

  const stats = [
    { id: 1, value: 12, suffix: ":1", label: "Student-Teacher Ratio" },
    { id: 2, value: 25, suffix: "+", label: "Years of Excellence" },
    { id: 3, value: 2500, suffix: "+", label: "Happy Students" },
    { id: 4, value: 50, suffix: "+", label: "Acre Campus" },
  ];

  const affiliations = [
    { id: 1, name: "CBSE", logo: "" },
    { id: 2, name: "IB", logo: "" },
    { id: 3, name: "British Council", logo: "" },
    { id: 4, name: "NABET", logo: "" },
    { id: 5, name: "ISO 9001", logo: "" },
    { id: 6, name: "UNESCO", logo: "" },
  ];

  const galleryItems = [
    { id: 1, image: sportsImage, caption: "Sports Day 2024" },
    { id: 2, image: labImage, caption: "Science Lab" },
    { id: 3, image: sportsImage, caption: "Annual Function" },
    { id: 4, image: labImage, caption: "Classroom" },
    { id: 5, image: sportsImage, caption: "Art Exhibition" },
    { id: 6, image: labImage, caption: "Library" },
    { id: 7, image: sportsImage, caption: "Music Room" },
    { id: 8, image: labImage, caption: "Campus" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Williams",
      role: "Parent",
      photo: parentPhoto,
      quote: "Excellence Academy has been instrumental in my daughter's development. The caring teachers and excellent facilities have made all the difference.",
      rating: 5,
    },
    {
      id: 2,
      name: "Robert Martinez",
      role: "Parent",
      photo: parentPhoto,
      quote: "The holistic approach to education here is remarkable. My son has grown not just academically but also in confidence and character.",
      rating: 5,
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "ERP Login",
      icon: "login" as const,
      description: "Access student portal and academic resources",
    },
    {
      id: 2,
      title: "Fee Payment",
      icon: "payment" as const,
      description: "Pay school fees securely online",
    },
    {
      id: 3,
      title: "Download Prospectus",
      icon: "download" as const,
      description: "Get detailed information about our programs",
    },
    {
      id: 4,
      title: "Career Opportunities",
      icon: "careers" as const,
      description: "Join our team of dedicated educators",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <Button
        size="icon"
        className="fixed top-20 right-6 z-40 shadow-lg"
        onClick={() => setIsSearchOpen(true)}
        data-testid="button-global-search"
      >
        <Search className="w-5 h-5" />
      </Button>

      <HeroSlider slides={heroSlides} />
      <ScrollingNotices notices={notices} />
      <PrincipalMessage
        name="Dr. Sarah Johnson"
        title="Principal, Excellence Academy"
        photo={principalPhoto}
        message="Welcome to Excellence Academy, where we believe every child has the potential to achieve greatness. Our commitment to academic excellence, combined with holistic development, ensures that our students are well-prepared for the challenges of tomorrow. Together, we create a nurturing environment where curiosity thrives and dreams take flight."
        fullMessageLink="/principal-message"
      />
      <WelcomeSection
        title="Building Tomorrow's Leaders Today"
        description="At Excellence Academy, we are dedicated to providing world-class education that nurtures young minds, fosters creativity, and builds character. Our state-of-the-art facilities, experienced faculty, and innovative curriculum create the perfect environment for students to excel academically and personally."
      />
      <KeyFeatures features={features} />
      <StudentSpotlight spotlights={spotlights} />
      <NewsSection articles={newsArticles} />
      <EventsPreview events={events} />
      <VirtualTourSection thumbnailImage={labImage} />
      <BlogPreview articles={blogArticles} />
      <StatsCounter stats={stats} />
      <Affiliations affiliations={affiliations} />
      <GalleryPreview items={galleryItems} />
      <Testimonials testimonials={testimonials} />
      <QuickActions actions={quickActions} />
      <ContactSection />
      <Footer />
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AccessibilityWidget />
    </div>
  );
}
