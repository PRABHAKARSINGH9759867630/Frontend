import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HamburgerMenu3DProps {
  menuItems: {
    id: number;
    label: string;
    href: string;
  }[];
}

export function HamburgerMenu3D({ menuItems }: HamburgerMenu3DProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Add body class for page rotation effect
    if (!isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Menu item variants for animation
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      {/* Hamburger Button with 3D rotation */}
      <motion.button
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <div className="relative w-6 h-6">
          <motion.span
            className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full -translate-y-1/2"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Overlay with 3D rotation effect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel with 3D effect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 z-40 h-screen w-full sm:w-80 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 shadow-2xl"
            initial={{ x: "100%", rotateY: -30, opacity: 0.5 }}
            animate={{ x: 0, rotateY: 0, opacity: 1 }}
            exit={{ x: "100%", rotateY: -30, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 100,
              duration: 0.5 
            }}
            style={{ 
              transformOrigin: "right center",
              transformStyle: "preserve-3d"
            }}
          >
            <div className="p-8 h-full flex flex-col">
              <motion.div 
                className="text-2xl font-bold text-white mb-8 mt-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                GD Goenka School Rudrapur
              </motion.div>
              
              <nav className="flex-1">
                <ul className="space-y-4">
                  {menuItems.map((item, i) => (
                    <motion.li
                      key={item.id}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a 
                        href={item.href}
                        className={cn(
                          "block py-3 px-4 text-lg text-white/90 rounded-lg",
                          "hover:bg-white/10 hover:text-white hover:translate-x-2",
                          "transition-all duration-300 ease-out",
                          "focus:outline-none focus:ring-2 focus:ring-white/30",
                          "relative overflow-hidden group"
                        )}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Hover gradient effect */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Text with 3D effect */}
                        <span className="relative block transition-transform duration-300 group-hover:translate-y-[-2px]">
                          {item.label}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <motion.div 
                className="mt-auto pt-8 border-t border-white/10 text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p>© 2023 GD Goenka School Rudrapur</p>
                <p className="mt-2">Excellence in Education</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add global styles for page rotation effect */}
      <style jsx global>{`
        body {
          transition: transform 0.5s ease-out;
          transform-origin: center left;
          overflow-x: hidden;
        }
        
        body.menu-open {
          transform: perspective(1200px) rotateY(-5deg) scale(0.95);
        }
        
        @media (max-width: 768px) {
          body.menu-open {
            transform: perspective(1200px) rotateY(-3deg) scale(0.98);
          }
        }
      `}</style>
    </>
  );
}