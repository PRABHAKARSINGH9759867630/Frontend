import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

// Animated chalk doodles component
function ChalkDoodles() {
  const doodles = [
    { id: 1, path: "M10,10 Q30,30 50,10 T90,10", delay: 0 },
    { id: 2, path: "M20,40 C40,20 60,60 80,40", delay: 0.5 },
    { id: 3, path: "M10,70 Q30,90 50,70 T90,70", delay: 1 },
    { id: 4, path: "M60,20 C70,40 80,10 90,30", delay: 1.5 },
    { id: 5, path: "M30,50 C40,70 60,30 70,50", delay: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="opacity-10">
        {doodles.map((doodle) => (
          <motion.path
            key={doodle.id}
            d={doodle.path}
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: doodle.delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}

        {/* Book doodle */}
        <motion.path
          d="M20,30 L80,30 L80,70 L20,70 Z M20,30 L20,70 M50,30 L50,70"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 3,
            delay: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 4,
          }}
        />

        {/* Star doodle */}
        <motion.path
          d="M150,30 L160,50 L180,55 L165,70 L170,90 L150,80 L130,90 L135,70 L120,55 L140,50 Z"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3,
          }}
        />

        {/* Pencil doodle */}
        <motion.path
          d="M200,40 L240,40 L245,45 L240,50 L200,50 Z M240,40 L240,50 M200,40 L200,50"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2,
            delay: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 5,
          }}
        />

        {/* Compass doodle */}
        <motion.path
          d="M280,50 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0 M280,30 L280,70 M260,50 L300,50"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 3.5,
            delay: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 4.5,
          }}
        />
      </svg>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [currentYear] = useState(new Date().getFullYear());
  const controls = useAnimation();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    controls.start({
      width: ["0%", "100%", "0%"],
      left: ["0%", "0%", "100%"],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <footer className="relative bg-[#123985] py-16 text-white overflow-hidden">
      {/* Animated chalk doodles */}
      <ChalkDoodles />

      {/* Grid lines background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-[#FFD700]">Quick Links</h3>
            <div className="space-y-3">
              <a href="/about" className="text-gray-300 hover:text-[#FFD700] transition-colors relative group block">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/admissions" className="text-gray-300 hover:text-[#FFD700] transition-colors relative group block">
                Admissions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/academics" className="text-gray-300 hover:text-[#FFD700] transition-colors relative group block">
                Academics
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/contact" className="text-gray-300 hover:text-[#FFD700] transition-colors relative group block">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-[#FFD700]">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on events, news, and announcements.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#123985]/50 border-[#FFD700]/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
              />
              <Button type="submit" className="bg-[#FFD700] text-[#123985] hover:bg-[#FFD700]/90">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-[#FFD700]">Follow Us</h3>
            <div className="flex gap-3">
              <motion.a
                href="https://www.facebook.com/GDGPSRudrapur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 215, 0, 0.2)",
                  rotateY: 180,
                  transition: { duration: 0.3 },
                }}
              >
                <Facebook className="w-5 h-5 text-[#FFD700]" />
              </motion.a>

              <motion.a
                href="https://twitter.com/GDGoenkaRudrapur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 215, 0, 0.2)",
                  rotateY: 180,
                  transition: { duration: 0.3 },
                }}
              >
                <Twitter className="w-5 h-5 text-[#FFD700]" />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/gdgoenkarudrapur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 215, 0, 0.2)",
                  rotateY: 180,
                  transition: { duration: 0.3 },
                }}
              >
                <Instagram className="w-5 h-5 text-[#FFD700]" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/company/gdgoenkarudrapur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 215, 0, 0.2)",
                  rotateY: 180,
                  transition: { duration: 0.3 },
                }}
              >
                <Linkedin className="w-5 h-5 text-[#FFD700]" />
              </motion.a>

              <motion.a
                href="https://www.youtube.com/@gdgoenkarudrapur8342"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 215, 0, 0.2)",
                  rotateY: 180,
                  transition: { duration: 0.3 },
                }}
              >
                <Youtube className="w-5 h-5 text-[#FFD700]" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="relative border-t border-[#FFD700]/20 mt-8 pt-8 text-center text-sm text-gray-300">
          <motion.div className="absolute top-0 h-[2px] bg-[#FFD700]/60" animate={controls} />
          <p>
            &copy; {currentYear} GD Goenka Public School. All rights reserved.
            <br />
            Designed By Prabhakar Singh
          </p>

          <motion.button
            onClick={scrollToTop}
            className="absolute right-0 top-8 w-10 h-10 rounded-full bg-[#123985] border border-[#FFD700]/30 flex items-center justify-center"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-[#FFD700]" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
