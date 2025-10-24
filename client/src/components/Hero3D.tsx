import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen, Users, Award, GraduationCap, Globe, Star, Pencil, ArrowRight } from "lucide-react";

interface Hero3DProps {
  slides: {
    id: number;
    tagline: string;
    subtitle: string;
    cta1Text: string;
    cta2Text: string;
    image: string;
  }[];
}

export function Hero3D({ slides }: Hero3DProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Campus life photos for rotating gallery
  const campusPhotos = [
    {
      id: 1,
      src: "/src/assets/school_images/campus_aerial.png",
      alt: "GD Goenka Campus Aerial View",
      category: "Campus"
    },
    {
      id: 2,
      src: slides[0]?.image || "/api/placeholder/400/300",
      alt: "Academic Excellence", 
      category: "Academics"
    },
    {
      id: 3,
      src: "https://supportive-actor-3fc59b236e.media.strapiapp.com/Logo_61b44da040.png",
      alt: "Sports Activities",
      category: "Sports"
    },
    {
      id: 4,
      src: "/api/placeholder/400/300",
      alt: "Cultural Events",
      category: "Culture"
    }
  ];

  // 3D floating props with low opacity
  const floatingProps = [
    { icon: BookOpen, x: 10, y: 20, delay: 0, size: 40, rotation: 15 },
    { icon: GraduationCap, x: 85, y: 15, delay: 1, size: 35, rotation: -10 },
    { icon: Globe, x: 15, y: 70, delay: 2, size: 45, rotation: 20 },
    { icon: Star, x: 80, y: 65, delay: 0.5, size: 30, rotation: -15 },
    { icon: Pencil, x: 50, y: 25, delay: 1.5, size: 25, rotation: 25 },
    { icon: Award, x: 70, y: 80, delay: 3, size: 40, rotation: -20 },
    { icon: Users, x: 25, y: 45, delay: 2.5, size: 35, rotation: 10 },
  ];

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Auto-slide functionality for campus photos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [campusPhotos.length]);

  // 3D Floating Props Component
  const FloatingProp = ({ 
    icon: Icon, 
    x, 
    y, 
    delay, 
    size, 
    rotation 
  }: {
    icon: any;
    x: number;
    y: number;
    delay: number;
    size: number;
    rotation: number;
  }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          opacity: isMobile ? 0.1 : 0.2,
          filter: "blur(0.5px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isMobile ? {
          opacity: 0.1,
          scale: 1,
        } : {
          opacity: 0.2,
          scale: [1, 1.1, 1],
          rotate: [rotation, rotation + 10, rotation - 10, rotation],
          y: [0, -15, 0],
        }}
        transition={isMobile ? {
          duration: 2,
          delay,
        } : {
          duration: 8 + Math.random() * 4,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="text-blue-400/30"
          style={{
            width: isMobile ? size * 0.7 : size,
            height: isMobile ? size * 0.7 : size,
            transform: `translateZ(${size / 2}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          <Icon className="w-full h-full" />
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-screen max-h-[900px] overflow-hidden z-0"
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Main Background with School Building GIF */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
        style={{
          transform: `translateZ(-100px) scale(1.1)`,
        }}
      >
        {/* School Campus Background with 3D depth */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/src/assets/school_images/campus_aerial.png")`,
            transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px) translateZ(-50px)`,
            filter: "brightness(0.6) contrast(1.3) saturate(1.2) blur(1px)",
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Light reflections overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            transform: `translateX(${mousePosition.x * 30}px) translateY(${mousePosition.y * 30}px)`,
            background: `linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Rotating Campus Photos Gallery */}
      <div className="absolute top-20 right-4 md:right-10 w-60 h-45 md:w-80 md:h-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${campusPhotos[currentSlide].src})`,
            }}
            initial={{ opacity: 0, scale: 1.1, rotateY: 90 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              transform: `translateZ(20px) translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`
            }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        {/* Photo category overlay */}
        <motion.div
          className="absolute bottom-4 left-4 bg-blue-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {campusPhotos[currentSlide].category}
        </motion.div>
      </div>

      {/* Floating 3D Props */}
      {floatingProps.map((prop, index) => (
        <FloatingProp key={index} {...prop} />
      ))}

      {/* Cinematic lighting effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-indigo-900/50"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          
          {/* 3D Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transform: `translateZ(30px) translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)`
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              transformStyle: "preserve-3d",
              filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
            }}
          >
            {/* Text shadow for 3D effect */}
            <div
              className="absolute inset-0 text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              style={{
                transform: "translateZ(-10px) translate(2px, 2px)",
                filter: "blur(2px)",
                opacity: 0.3,
              }}
            >
              G.D. Goenka School, Rudrapur
            </div>
            
            {/* Main text with glow */}
            <h1
              className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6"
              style={{
                textShadow: "0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 165, 0, 0.3)",
                transform: "translateZ(20px)",
              }}
            >
              G.D. Goenka School, Rudrapur
            </h1>
          </motion.div>

          {/* 3D Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transform: `translateZ(20px) translateX(${mousePosition.x * 3}px) translateY(${mousePosition.y * 3}px)`
            }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <p
              className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto text-white/95 font-light"
              style={{
                textShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
                transform: "translateZ(15px)",
              }}
            >
              Where Learning Meets Innovation
            </p>
          </motion.div>

          {/* Glowing CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transform: `translateZ(25px) translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`
            }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 165, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="group relative rounded-full px-12 py-6 text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-2xl border-2 border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 overflow-hidden"
                style={{
                  transform: "translateZ(20px)",
                  background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #312e81 100%)",
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  Admissions Open 2025
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating stats with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "9+", label: "Years Excellence" },
              { number: "1500+", label: "Students" },
              { number: "18:1", label: "Student Ratio" },
              { number: "5+", label: "Acres Campus" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  transform: "translateZ(15px)",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2"
                  style={{
                    transform: "translateZ(10px)",
                    textShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-sm text-white/80"
                  style={{
                    transform: "translateZ(5px)",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Campus photo navigation dots */}
      <div className="absolute top-32 right-6 md:right-12 flex flex-col gap-2">
        {campusPhotos.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-yellow-400 shadow-lg scale-125" 
                : "bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll indicator with 3D effect */}
      <motion.div
        className="absolute bottom-8 right-8 text-white/60"
        animate={{ 
          y: [0, 10, 0],
          rotateZ: [0, 5, 0],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          transform: "translateZ(10px)",
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))",
        }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>

      {/* Soft blur overlay for cinematic effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.1) 70%)",
          filter: "blur(0.5px)",
        }}
      />
    </div>
  );
}