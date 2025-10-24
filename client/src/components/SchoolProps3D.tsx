import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SchoolProp {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'book' | 'graduationCap' | 'schoolBell' | 'microscope' | 'globe' | 'football' | 'lightBulb';
  pathColor: string;
}

export function SchoolProps3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate school props with golden motion paths
  const schoolProps: SchoolProp[] = [
    {
      id: 1,
      x: 15,
      y: 20,
      size: 80,
      rotation: 15,
      type: 'book',
      pathColor: 'rgba(255, 215, 0, 0.3)', // golden path
    },
    {
      id: 2,
      x: 75,
      y: 30,
      size: 70,
      rotation: -10,
      type: 'graduationCap',
      pathColor: 'rgba(255, 215, 0, 0.3)',
    },
    {
      id: 3,
      x: 25,
      y: 65,
      size: 60,
      rotation: 5,
      type: 'schoolBell',
      pathColor: 'rgba(255, 215, 0, 0.3)',
    },
    {
      id: 4,
      x: 65,
      y: 70,
      size: 75,
      rotation: -5,
      type: 'microscope',
      pathColor: 'rgba(255, 215, 0, 0.3)',
    },
    {
      id: 5,
      x: 40,
      y: 25,
      size: 90,
      rotation: 8,
      type: 'globe',
      pathColor: 'rgba(255, 215, 0, 0.3)',
    },
    {
      id: 6,
      x: 85,
      y: 55,
      size: 65,
      rotation: -12,
      type: 'football',
      pathColor: 'rgba(255, 215, 0, 0.3)',
    },
    {
      id: 7,
      x: 50,
      y: 80,
      size: 70,
      rotation: 20,
      type: 'lightBulb',
      pathColor: 'rgba(255, 215, 0, 0.3)',
    },
  ];

  // SVG paths for each school prop
  const renderSchoolProp = (prop: SchoolProp) => {
    // Create a motion path for the prop to follow (curved golden path)
    const pathVariants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: { 
        pathLength: 1, 
        opacity: 0.6,
        transition: { 
          duration: 2, 
          ease: "easeInOut"
        }
      }
    };

    // Animation variants for the props
    const propVariants = {
      hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      visible: { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        transition: { 
          duration: 1.5,
          delay: 0.5,
          ease: "easeOut"
        }
      }
    };

    // Define the SVG for each prop type
    const renderPropSvg = () => {
      switch (prop.type) {
        case 'book':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" 
                stroke="#123985" 
                fill="rgba(255, 215, 0, 0.2)"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
            </svg>
          );
        case 'graduationCap':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M22 10V16" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M2 10L12 5L22 10L12 15L2 10Z" 
                stroke="#123985" 
                fill="rgba(255, 215, 0, 0.2)"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M6 12V17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V12" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
            </svg>
          );
        case 'schoolBell':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M12 2V4" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M12 22V20" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M18 6L16.59 7.41" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M6 6L7.41 7.41" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M16 16.59L17.41 18" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M7.41 16.59L6 18" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.circle 
                cx="12" 
                cy="12" 
                r="8" 
                stroke="#123985" 
                fill="rgba(255, 215, 0, 0.2)"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
            </svg>
          );
        case 'microscope':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M6 18H18" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M6 14H18" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M6 22H18" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M10 10H14" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M12 10V14" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M9 2H15" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M12 2V6" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M10 6H14V10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12C11.4696 12 10.9609 11.7893 10.5858 11.4142C10.2107 11.0391 10 10.5304 10 10V6Z" 
                stroke="#123985" 
                fill="rgba(255, 215, 0, 0.2)"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
            </svg>
          );
        case 'globe':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="#123985" 
                fill="rgba(255, 215, 0, 0.2)"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M2 12H22" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
            </svg>
          );
        case 'football':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="#123985" 
                fill="rgba(255, 215, 0, 0.2)"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M12 2C13.3132 3.25575 14.3169 4.81575 14.9289 6.52254C15.5409 8.22933 15.7424 10.0557 15.5177 11.8541C15.293 13.6525 14.6488 15.3635 13.6394 16.8392C12.6299 18.3148 11.2829 19.5062 9.70711 20.2929" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M2 12C3.25575 10.6868 4.81575 9.68312 6.52254 9.07105C8.22933 8.45897 10.0557 8.25763 11.8541 8.48236C13.6525 8.7071 15.3635 9.35124 16.8392 10.3607C18.3148 11.3701 19.5062 12.7171 20.2929 14.2929" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
            </svg>
          );
        case 'lightBulb':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M9 18H15" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M10 22H14" 
                stroke="#123985" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
              <motion.path 
                d="M15.09 14C15.7 13.4 16.18 12.65 16.5 11.79C16.82 10.93 16.95 10 16.95 9C16.95 7.67392 16.4205 6.40215 15.4767 5.46447C14.533 4.52678 13.2513 4 11.91 4C10.5687 4 9.28695 4.52678 8.34327 5.46447C7.39959 6.40215 6.87 7.67392 6.87 9C6.87 10 7 10.93 7.33 11.79C7.66 12.65 8.14 13.4 8.75 14C8.75 14 9.5 15 9.5 16C9.5 17 10.12 18 11.95 18C13.78 18 14.5 17 14.5 16C14.5 15 15.09 14 15.09 14Z" 
                stroke="#123985" 
                fill="rgba(255, 215, 0, 0.2)"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={propVariants}
              />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div key={prop.id} className="absolute" style={{ left: `${prop.x}%`, top: `${prop.y}%` }}>
        {/* Golden motion path (curved) */}
        <svg 
          className="absolute w-full h-full -z-10" 
          viewBox="0 0 100 100" 
          style={{ 
            width: `${prop.size * 1.5}px`, 
            height: `${prop.size * 1.5}px`,
            transform: `translate(-25%, -25%)` 
          }}
        >
          <motion.path
            d="M20,50 C20,20 80,20 80,50 C80,80 20,80 20,50"
            stroke={prop.pathColor}
            strokeWidth="2"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={pathVariants}
          />
        </svg>
        
        {/* School prop with animation */}
        <motion.div
          className="relative"
          style={{ 
            width: `${prop.size}px`, 
            height: `${prop.size}px`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: [prop.rotation, prop.rotation + 10, prop.rotation - 10, prop.rotation],
          }}
          transition={{ 
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            opacity: { duration: 1.5 },
            scale: { duration: 1.5 },
          }}
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
          whileHover={{ 
            scale: 1.1,
            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))'
          }}
        >
          {renderPropSvg()}
        </motion.div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {schoolProps.map(renderSchoolProp)}
    </div>
  );
}