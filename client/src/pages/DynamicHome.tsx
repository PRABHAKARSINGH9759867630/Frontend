/**
 * Dynamic Home Page - Fully powered by Strapi CMS
 * All content is now manageable from Strapi admin panel
 */

import { SearchModal } from "@/components/SearchModal";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

// Import all dynamic components
import {
  DynamicHeroBanner,
  DynamicAboutSection,
  DynamicAcademicPrograms,
  DynamicNewsSection,
  DynamicEventsSection,
  DynamicTestimonials,
  DynamicFooter
} from "@/components/DynamicComponents";

// Import additional components that can be made dynamic later
import { ScrollingNotices } from "@/components/ScrollingNotices";
import { PrincipalMessage } from "@/components/PrincipalMessage";
import { Achievements } from "@/components/Achievements";
import { KeyFeatures } from "@/components/KeyFeatures";
import { StudentSpotlight } from "@/components/StudentSpotlight";
import { VirtualTourSection } from "@/components/VirtualTourSection";
import { BlogPreview } from "@/components/BlogPreview";
import { StatsCounter } from "@/components/StatsCounter";
import { Affiliations } from "@/components/Affiliations";
import { GalleryPreview } from "@/components/GalleryPreview";
import { QuickActions } from "@/components/QuickActions";
import { ContactSection } from "@/components/ContactSection";

// Import images for components that haven't been made dynamic yet
import principalPhoto from "../assets/generated_images/Principal_professional_portrait_d7e8b372.png";
import studentPhoto from "../assets/generated_images/Student_achievement_spotlight_23313d01.png";
import labImage from "../assets/generated_images/Science_lab_campus_tour_9f1f27cd.png";
import sportsImage from "../assets/generated_images/Sports_facilities_image_2ec22754.jpg";
import parentPhoto from "../assets/generated_images/Parent_testimonial_portrait_7c79c4ef.png";

export default function DynamicHome() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Static data for components that haven't been made dynamic yet
  // These will be replaced with Strapi data in future updates
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
    {
      id: 6,
      icon: "activities" as const,
      title: "Co-curricular Activities",
      description: "Diverse programs in arts, music, drama, and clubs to nurture talents.",
    },
  ];

  const spotlights = [
    {
      id: 1,
      name: "Arjun Ranjeet",
      photo: "https://lh3.googleusercontent.com/rd-d/ALs6j_G0XOsWvodJdnGVreG8uGUezZJ4X51ddbjkYWk6tQ516ElBdy7LrTM2GoXlC96A9WBtfbB-RlIQkceM-r5hDo_b25N3zpWp41N--HplFIq0aq1F-wfZmQn41Qac120JN9X2OTiSHEYyKXRtXQeDfim2bCN081OUv5NWEXGXRF_NKL2H9mFAqBIyMluVliyQmuVYNDpq30bDJn9sVcLO4lwUnQbExBsfKc20WobJ3PT1X-i8sDCsfU7LvUJtc2Cvau1dFGxripoJJ_sCSp3DurkhfLkxfDQYoJB7Txu8iJRL4VNCzSsEM5CgZ4JJhNmkmgHrNOBJpeUaKjg5VGFHBe27HGF-USxY6zcgM8ciNivJ28exFBRzyDOIR8bs9VT9h0X3QIMYOdnVJYLtxMOK_zsH0e5SQw6FVZVLB21r5ggGEMW9pLDO5Eom1Z5pFl1KF5-e2apRv18gJy8428dlTzjXAcqmZoOkMTePRY8Uljx_DOjXJnf2sfjB56MoJfpBa0hX_ZtiA3MsakOE-Oc05LnlfVZeJNg6otIfEtszWCO5EFEmCYkkWkJdnz89-MAZwND4CAiSXSL6tuDUxpfy_eiPxQAKOBxVyK647bZursGUVjJQ5FvYt4nXEpA5DKxrVX0Qga5F2kK2uikUmZcPeBgR_ZJkkSOiWvqFPY188Lcs5beUg31cIaD7KtFB8_3sh0l5D_Nz7w8P5siYTO8Pw4bOBiAXbEYQXcFZTpkHzIeNEgBy0uTPWfkVjFCBDJbBgnU29G-MgJ-kh9Rbv3ohb_xvaLzh6Eop0ZLC2STyCa1ruNrQxOKjNyP3GX2pfm4YHlcbfIRLB-hqHYUtzF3B7VKGGFdbZStkOciLC1ptAjSNJFkYQjD27ArdNjdxrryZeKdR5qwJ2A-xoawAi5NsxH0eGx1UQEDbR8d2fnycxRKLs329Cr5oErp1kVZ9gGPth0EGfPebVsKP8_3-MRFDdxwLMvFYIlyDScq7njEJ-8DduaqIFHGNCHBEBNw3Zr9FfGwNt33JVzdxFSTlf4Uqt19eyfnBOf3MJ4yY7aY1yoA40qgtuEKDq7UBAzVaAkdq8dpMYClmgK2SYGBVaAgmg2UkKKlj52fV5Fgn1OuO0EC08UT5cdBx1iM=w1920-h917?auditContext=prefetch",
      achievement: "National Science Olympiad Gold Medalist",
      quote: "Excellence Academy gave me the resources and mentorship to pursue my passion for science.",
      category: "student" as const,
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: "https://lh3.googleusercontent.com/rd-d/ALs6j_HOsK7vArcqKfCBib2a9zxJd2ZeuFQd6mgOZjxlFmBGtTduAKVHgxNu7WBYslDPo3tY2cbwO4I4HPSs853x5F_3e1OLoPvozaWYemOLe0ksd-IcHVE447oq4dlhceQ38JK-XCCs0u1sQRN5iD77JeClN2jUsLkzY-j-Fqrn6fHym72ZgQ46xGcRMyjU10-5Y9TKfIC6LKd2_w0su3w9Kox5230YYvVlnsmsqn67VkGt1ZS-a6BIA3DpIb0rLrLBeIPW0ZaBuYciaHCJIsaIIEmJYM4vxAJJdjdB_15UYpqsuwv-R343UUFDKvsicfWcP4jhMV27RQ3WLMadL3UQTms1IUn4kMUw5LINHjOrC1aWZDYg32QY9jptgQSbGMPkErqxmaqKJRIPb4Bk0ow3HZjEBbzCwZe3VM6xjvmvsX_Q3iU1t7IZEnPSMFabsTeAnu6Y9S16oQfiVQ8Ev-KCqwcS95PZpKheJ4R3qy1MNvErq1Mazj4IFFiEJKHGiKKE24GtQUQ8jQhom2OQ4cdv08yO9HDLNHDGwmbugSMj1S1akVJ8uD99KfanUydR574sYyHvD5-gwQevEk3YSsUBb7aY5tN0FEE-7DSJ5dymbCDk8WGEKGgSoiLk6Uw2fu5hpTw1UUpL7I_nG8oufsMcKQL5hzkX7ElpGKAeSPOSzTnlz520CZMBUHavYkomT811DE5OXv3OnalY9eakHVFSnZebuMjCKAVukZbJc_sIYLqSsnWLNE4yaAk-3Rzk9nBE0GnzbFu68rfI4fADT3FD_MqvbYzG9hqHjH8cqxDCRSfelEqhRSmAhg7Y98GrgT2ppfAVODDAXDH0EX12MHL0PRPQRmIvCWNztdaWVuMGSIOJR9tWaeWGmnfAJUYcjOJjH0lGW5ootLIL1035RvPSFleqI-XffnCLmRwyelrUWVlozYCgmZiQ7znC6BrznT8S3O0jWtE70RDsc2NeAva90GZ6DbtAgAaH8LS5bJPi7Lvy-6YmsDCQody_ZFJLhrC5btgzlWoLnx5dXstd1Wzo-R6mrWIQ-jIfTc51Mi9-kuzwgYByBgRs97JUq4-TatQzF1OwAgKmd8HooSZzuyrzPCzshwUyBFite3NRuqPiCoZ-pSQ4pgEbOVU=w1920-h917?auditContext=prefetch",
      achievement: "Selected for International Mathematics Competition",
      quote: "The supportive environment here helped me develop both academically and personally.",
      category: "student" as const,
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

  const quickActions = [
    {
      id: 1,
      title: "ERP Login",
      icon: "login" as const,
      description: "Access student portal and academic resources",
      link: "https://gdgr.udtweb.com/",
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
      
      {/* Global Search Button */}
      <Button
        size="icon"
        className="fixed top-20 right-6 z-40 shadow-lg"
        onClick={() => setIsSearchOpen(true)}
        data-testid="button-global-search"
      >
        <Search className="w-5 h-5" />
      </Button>

      {/* Dynamic Hero Banner - Content managed in Strapi */}
      <DynamicHeroBanner />
      
      {/* Scrolling Notices - Can be made dynamic later */}
      <ScrollingNotices notices={notices} />
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
      
      {/* Principal Message - Can be made dynamic later */}
      <PrincipalMessage
        name="Dr. Anjali Sharma"
        title="Principal, GD Goenka Public School"
        photo={principalPhoto}
        message="The function of education is to teach one to think intensively and critically. Intelligence plus character – that is the goal of true education. At GD Goenka School, Rudrapur, we believe education is a shared commitment among dedicated teachers, motivated students, and supportive parents. Our aim is not only academic excellence but also the development of moral values, critical thinking, and lifelong learning."
        fullMessageLink="/principal-message"
      />
      
      {/* Dynamic About Section - Content managed in Strapi */}
      <DynamicAboutSection />
      
      {/* Dynamic Academic Programs - Content managed in Strapi */}
      <DynamicAcademicPrograms />
      
      {/* Static components that can be made dynamic later */}
      <Achievements />
      <KeyFeatures features={features} />
      <StudentSpotlight spotlights={spotlights} />
      
      {/* Dynamic News Section - Content managed in Strapi */}
      <DynamicNewsSection />
      
      {/* Dynamic Events Section - Content managed in Strapi */}
      <DynamicEventsSection />
      
      <VirtualTourSection thumbnailImage={labImage} />
      <BlogPreview articles={blogArticles} />
      <StatsCounter stats={stats} />
      <Affiliations affiliations={affiliations} />
      <GalleryPreview items={galleryItems} />
      
      {/* Dynamic Testimonials - Content managed in Strapi */}
      <DynamicTestimonials />
      
      <QuickActions actions={quickActions} />
      <ContactSection />
      
      {/* Dynamic Footer - Content managed in Strapi */}
      <DynamicFooter />
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AccessibilityWidget />
    </div>
  );
}

