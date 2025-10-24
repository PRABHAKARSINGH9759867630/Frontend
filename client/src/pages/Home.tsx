import { Hero3D } from "@/components/Hero3D";
import { ScrollingNotices } from "@/components/ScrollingNotices";
import { PrincipalMessage } from "@/components/PrincipalMessage";
import { AboutSchool } from "@/components/AboutSchool";
import { Academics } from "@/components/Academics";
import { ActivitiesEvents } from "@/components/ActivitiesEvents";
import { Achievements } from "@/components/Achievements";
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
import { SearchModal } from "@/components/SearchModal";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";


import heroImage from "../assets/school_images/campus_aerial.png";
import principalPhoto from "../assets/generated_images/Principal_professional_portrait_d7e8b372.png";
import studentPhoto from "../assets/generated_images/Student_achievement_spotlight_23313d01.png";
import labImage from "../assets/generated_images/Science_lab_campus_tour_9f1f27cd.png";
import sportsImage from "../assets/generated_images/Sports_facilities_image_2ec22754.jpg";
import parentPhoto from "../assets/generated_images/Parent_testimonial_portrait_7c79c4ef.png";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const heroSlides = [
    {
      id: 1,
      tagline: "Empowering Young Minds with Knowledge and Values",
      subtitle: "Discover a world of learning in motion at GD Goenka Public School",
      image: heroImage,
      cta1Text: "Explore Admissions",
      cta2Text: "Virtual Campus Tour",
    },
    {
      id: 2,
      tagline: "The World of Learning in Motion",
      subtitle: "Building tomorrow's leaders with excellence in education since 1994",
      image: heroImage,
      cta1Text: "Start Your Journey",
      cta2Text: "Learn More",
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
      name: "Arjun Ranjeet",
      photo: "https://lh3.googleusercontent.com/rd-d/ALs6j_FJ6SoTseNF1KNTSfM87d4TzBCwMJB3o1iqxaQgI46gkvkHH9rUSHed0LYY33ACDhi4UsmWlh7xFn32xEG214T1TZnzQsaNwKFnDa3tjkEx1cxW-kJ-ELxvGBUohfua2NpFbcuBlVwPyCBYw0L0JbZcpBQ52KdyPlYrgr5skNQAdK1v7alo-mDRLkSjNCbJTwy0H_KbQJkKcLxex2KzpQGVvczZ0cVeKxPP6O4X-k-t9HamhNA6wpcOE9s9xqvKcZITGgDHReC2-_FWZvoUMsjmPI5Gjldk4j5Vu2Zmuz3khtbKKRs0TRQQQV1mXcmObnfbgqHCnSXT1B-G48Il_QolJIuJ5fm_3h6hD1srbz9NVc_LiTHbrQaH2LOrdLcesS6eHt2uIGRuFkP9Bb5QiZwGMjfWc9ZdG7ktLojJWIW0cc-wzcaOB_16d6eWZoVCyqDVRC-lBGbL5bytrX0-2g2DnlWt2CjIwdKukBQAPcjx6Vy9azQbORNUNTcbk44IzjZgqPp-tmI3-D68B8E7ISbvFsV7CwX9oVi2TnGG5BKLddhO3sJQEk27SKIV6ogDhtczBcnglzyYacBfLCooRLZwFyI7b-A7EMGxHzyhPzPTh-E8MgjSIVXpff83fpB1XU_BsnC_L5PspHLnmYaNkY4b5-tq51xx69vKzbGJ4ZBrw-yAsswLvXz5El-xAapqFbR9QXaqm4VLKdv_A2a1FyM92rQUcwCHbcHY7bQJmSgqXZE3Yjtet12oaNXT4QoDpoIPfHvACNjgTch8lNh_ef5uQIY4SdBM_7h_Q-9-HhuqLMghUSwQWLbDBkAqSzoJjcHitR57ctB8aNtT6eoMbmfhkLLOIp4sBj_7XGrQNzVdMluex6SxaXHxO5PG-BM3RgKWQ9mB6A-qqu4n4qs4PqKZyJPAKdT9tWfxeKGAFe-iT0m9dVQhgLSEC-wFBjbJyV5jiXz-n-38DlvKpfAgKqisJHjQ8QO9CIryxthP1X5wAI8MJli-qkyQBn8Ywaft3fOTusKb63t84I_qV0OVhv2BHOksUINs8G7RUQOkpExhcOI4OMzR23u4Y6D9FUAMiTZmA1B06n-zhYAHmabC4DNYzeCn5pHrBf4fAPuTz8aL5FUq5LMMtg=w1920-h917?auditContext=prefetchhttps://lh3.googleusercontent.com/rd-d/ALs6j_HOsK7vArcqKfCBib2a9zxJd2ZeuFQd6mgOZjxlFmBGtTduAKVHgxNu7WBYslDPo3tY2cbwO4I4HPSs853x5F_3e1OLoPvozaWYemOLe0ksd-IcHVE447oq4dlhceQ38JK-XCCs0u1sQRN5iD77JeClN2jUsLkzY-j-Fqrn6fHym72ZgQ46xGcRMyjU10-5Y9TKfIC6LKd2_w0su3w9Kox5230YYvVlnsmsqn67VkGt1ZS-a6BIA3DpIb0rLrLBeIPW0ZaBuYciaHCJIsaIIEmJYM4vxAJJdjdB_15UYpqsuwv-R343UUFDKvsicfWcP4jhMV27RQ3WLMadL3UQTms1IUn4kMUw5LINHjOrC1aWZDYg32QY9jptgQSbGMPkErqxmaqKJRIPb4Bk0ow3HZjEBbzCwZe3VM6xjvmvsX_Q3iU1t7IZEnPSMFabsTeAnu6Y9S16oQfiVQ8Ev-KCqwcS95PZpKheJ4R3qy1MNvErq1Mazj4IFFiEJKHGiKKE24GtQUQ8jQhom2OQ4cdv08yO9HDLNHDGwmbugSMj1S1akVJ8uD99KfanUydR574sYyHvD5-gwQevEk3YSsUBb7aY5tN0FEE-7DSJ5dymbCDk8WGEKGgSoiLk6Uw2fu5hpTw1UUpL7I_nG8oufsMcKQL5hzkX7ElpGKAeSPOSzTnlz520CZMBUHavYkomT811DE5OXv3OnalY9eakHVFSnZebuMjCKAVukZbJc_sIYLqSsnWLNE4yaAk-3Rzk9nBE0GnzbFu68rfI4fADT3FD_MqvbYzG9hqHjH8cqxDCRSfelEqhRSmAhg7Y98GrgT2ppfAVODDAXDH0EX12MHL0PRPQRmIvCWNztdaWVuMGSIOJR9tWaeWGmnfAJUYcjOJjH0lGW5ootLIL1035RvPSFleqI-XffnCLmRwyelrUWVlozYCgmZiQ7znC6BrznT8S3O0jWtE70RDsc2NeAva90GZ6DbtAgAaH8LS5bJPi7Lvy-6YmsDCQody_ZFJLhrC5btgzlWoLnx5dXstd1Wzo-R6mrWIQ-jIfTc51Mi9-kuzwgYByBgRs97JUq4-TatQzF1OwAgKmd8HooSZzuyrzPCzshwUyBFite3NRuqPiCoZ-pSQ4pgEbOVU=w1920-h917?auditContext=prefetch",
      achievement: "National Science Olympiad Gold Medalist",
      quote: "Excellence Academy gave me the resources and mentorship to pursue my passion for science.",
      category: "student" as const,
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: "https://lh3.googleusercontent.com/rd-d/ALs6j_EvfOBLHzwiBlAAOTWv1suWzRvPy9_ZNDRQp5sKqcxAQC-aiOZvxnyW_p634xJQaNU0yrVoRG-TBgf4AnsUHH3cO1q2nr6-8h6hF8oxPWf2bUcg9DxOa2rhIdp-hLwE4v_EUW82lCIy59UnP5tfA-ZqgdLd26J6iDiPv6TyNRJXIIqFtpV2daGc8rkxg4TpPTxtehL0eBYys5qx4fp817meLqmplzWDFO9EIBNa-wmkNpZbtwstGbOU9I6JAh9n7HJ6BAGJN1dIktmoWNl9RnZnt75p6ELbArQsZCfBXDzv2m0sZwKTsk1RYyCcpzPUUKAiqOBfQ_zJAXO-DvN7ZW3xhKu0RLF5W9wmocp7iqk2yZAeVGALyHjIAlsKfSsyF2hjsuSCf6gsy95Cl-BiSq-2BaH24_MfhRccborfRELRv4W4OJPTMXU4lyoRkcZXaLyP5KVIBubOmmFj1A6xNC_xwvE6tmknOiy04z8wnVQi1_KHznVjplk5vQnIh6FdZvfrf_WcO6e1pNqrT5bA9mHE_wkJcL930FSHzH65pJb88UvFCnumW8-ar8VQSoU9fKa2g4oI5jDmzA8RKlIN69fGxzgZ_B06Y8gOCWnVj7mY4gY7-aEOUdiLSijTaJ7Z0r_QQr8b8ycRDWFtdE6wvu8EFJvsSRNm69zlpELm4QKn1aVv0QshyuBOAvmWTBfqVPn7V4HFLzsJmH1JiARk4_hS4czTDpvuiBMbHI3JE-yduWpivSR9___qDyEggCqbJqnXKu6V9s--DT-qwSWgJ5UskedKpvej6aolYG7WCPJTz6he1iN7CQlJndNk0mMA0RPOdSLAVJPtJExbV_rF220TNfhtICvdK5dTZZcVWK9j6-0qNZJiAr01ElY3dAdmJU5AsY1S-GJQeoPLhn72Fem_3zpnm7QOtTZrP_a19OA-dOtE57dgofHAcXASbgtJKIAEbiI7wtWQbekEd2jjv7MCNj1nq17Rnl6LmnNTKnXjIryvq2CMzKYmEMK3aeeUQGiuEkIJElj1mS_0lWhb62DYKP4KS2X3dmUJtU1Q3frkSFDqUTq5lwGiPMo17j60sjhQmjGwKEqNfGvRXrvQnoYin3kS4kEX115KwB2sxqoHcT2P58mrNQ=w1920-h917?auditContext=prefetch",
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
    { id: 1, name: "CBSE", logo: "https://upload.wikimedia.org/wikipedia/en/9/95/CBSE_new_logo.svg" },
    { id: 2, name: "Rotary Club", logo: "https://upload.wikimedia.org/wikipedia/en/9/95/CBSE_new_logo.svg" },
    { id: 3, name: "Astropathshala ", logo: "https://upload.wikimedia.org/wikipedia/en/9/95/CBSE_new_logo.svg" },
    { id: 4, name: "NCERT", logo: "https://upload.wikimedia.org/wikipedia/en/9/95/CBSE_new_logo.svg" },
    { id: 5, name: "ISO 9001", logo: "https://upload.wikimedia.org/wikipedia/en/9/95/CBSE_new_logo.svg" },
    { id: 6, name: "UNESCO", logo: "https://upload.wikimedia.org/wikipedia/en/9/95/CBSE_new_logo.svg" },
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
      <Button
        size="icon"
        className="fixed top-20 right-6 z-40 shadow-lg"
        onClick={() => setIsSearchOpen(true)}
        data-testid="button-global-search"
      >
        <Search className="w-5 h-5" />
      </Button>

      <Hero3D slides={heroSlides} />
      <ScrollingNotices notices={notices} />
      <AIChatAssistant />
      <PrincipalMessage
        name="Dr. Anjali Sharma"
        title="Principal, GD Goenka Public School"
        photo={principalPhoto}
        message="The function of education is to teach one to think intensively and critically. Intelligence plus character – that is the goal of true education. At GD Goenka School, Rudrapur, we believe education is a shared commitment among dedicated teachers, motivated students, and supportive parents. Our aim is not only academic excellence but also the development of moral values, critical thinking, and lifelong learning."
        fullMessageLink="/principal-message"
      />
      <AboutSchool />
      <Academics />
      <ActivitiesEvents />
      <Achievements />
      <KeyFeatures features={features} />
      <StudentSpotlight spotlights={spotlights} />
      {/* <NewsSection articles={newsArticles} /> */}
      <EventsPreview events={events} />
      <VirtualTourSection />
      <BlogPreview articles={blogArticles} />
      <StatsCounter stats={stats} />
      <Affiliations affiliations={affiliations} />
      {/* <GalleryPreview items={galleryItems} /> */}
      <Testimonials testimonials={testimonials} />
      {/* <QuickActions actions={quickActions} /> */}
      <ContactSection />
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
    </div>
  );
}
