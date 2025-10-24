import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2018,
    title: "School Journey Began",
    description: "Established with a vision to nurture excellence and values."
  },
  {
    year: 2019,
    title: "First Annual Function",
    description: "Celebrated creativity, confidence, and teamwork on stage."
  },
  {
    year: 2020,
    title: "Digital Learning Introduced",
    description: "Seamless transition to online platforms ensuring learning never stopped."
  },
  {
    year: 2021,
    title: "Academic & Sports Achievements",
    description: "Goenkans excelled in scholastic and co-scholastic domains."
  },
  {
    year: 2022,
    title: "First Graduating Class",
    description: "Our pioneer batch graduated with flying colours."
  },
  {
    year: 2023,
    title: "Campus Expansion",
    description: "Enhanced infrastructure with new Astro-Pathshala labs and sports arenas."
  },
  {
    year: 2024,
    title: "Recognition for Innovation",
    description: "Honoured for excellence in holistic and value-based education."
  },
   {
    year: 2025,
    title: "Future Endeavors",
    description: "Looking forward to more achievements and innovations."
  },
];

export function AboutSchool() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: false, amount: 0.2 });

  // --- MODIFICATION START ---
  // Split the timeline events before the year 2022
  const splitIndex = timelineEvents.findIndex(event => event.year === 2022);
  const timelinePart1 = timelineEvents.slice(0, splitIndex);
  const timelinePart2 = timelineEvents.slice(splitIndex);
  // --- MODIFICATION END ---

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#123985]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          A Journey of <span className="text-[#FFD700]">Growth, Grace and Greatness</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Animated school building (No changes here) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square relative">
              <svg 
                viewBox="0 0 500 500" 
                className="w-full h-full"
                style={{ filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1))" }}
              >
                {/* SVG paths for the school building... */}
                <motion.path d="M50,400 L450,400 L430,380 L70,380 Z" fill="#e0e0e0" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />
                <motion.path d="M150,380 L350,380 L350,200 L250,150 L150,200 Z" fill="#123985" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                <motion.path d="M140,200 L250,130 L360,200" stroke="#FFD700" strokeWidth="10" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 1 }} />
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }}>
                  <rect x="180" y="220" width="30" height="40" fill="#FFD700" opacity="0.8" />
                  <rect x="240" y="220" width="30" height="40" fill="#FFD700" opacity="0.8" />
                  <rect x="300" y="220" width="30" height="40" fill="#FFD700" opacity="0.8" />
                  <rect x="180" y="280" width="30" height="40" fill="#FFD700" opacity="0.8" />
                  <rect x="240" y="280" width="30" height="40" fill="#FFD700" opacity="0.8" />
                  <rect x="300" y="280" width="30" height="40" fill="#FFD700" opacity="0.8" />
                </motion.g>
                <motion.rect x="230" y="320" width="40" height="60" fill="#FFD700" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 2 }} style={{ transformOrigin: '230px 380px' }} />
                <motion.g initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }}>
                  <rect x="250" y="100" width="5" height="30" fill="#555" />
                  <motion.rect x="255" y="100" width="25" height="15" fill="#FFD700" animate={{ skewX: [0, 5, 0, -5, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }} />
                </motion.g>
                <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 2.8 }} style={{ transformOrigin: '100px 380px' }}>
                  <rect x="95" y="330" width="10" height="50" fill="#8B4513" />
                  <circle cx="100" cy="310" r="30" fill="#228B22" />
                </motion.g>
                <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 3 }} style={{ transformOrigin: '400px 380px' }}>
                  <rect x="395" y="330" width="10" height="50" fill="#8B4513" />
                  <circle cx="400" cy="310" r="30" fill="#228B22" />
                </motion.g>
              </svg>
              
              {/* Floating particles */}
              <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.5 }}>
                {[...Array(10)].map((_, i) => (
                  <motion.div key={i} className="absolute rounded-full bg-[#FFD700] opacity-70" style={{ width: Math.random() * 10 + 5, height: Math.random() * 10 + 5, left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 80 + 10}%`, }} animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1], }} transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: Math.random() * 2, }} />
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column */}
          <div>
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-4 text-[#123985]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              A Legacy of <span className="text-[#FFD700]">Excellence</span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              GD Goenka Public School has been on a remarkable journey since its establishment, growing each year with a strong focus on values, innovation, and excellence.
            </motion.p>

            {/* --- MODIFICATION START --- */}
            {/* Timeline - Updated with a two-row structure */}
            <motion.div 
              ref={timelineRef}
              className="pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h4 className="text-xl font-bold mb-6 text-[#123985]">Our Journey Through Time</h4>
              
              <div className="flex flex-col gap-y-16"> {/* Container for both rows with vertical gap */}
                
                {/* Row 1 (Events before 2022) */}
                <div className="relative">
                  <div className="absolute left-0 top-6 w-full h-1 bg-gray-200 -z-10"></div>
                  <div className="flex justify-between relative">
                    {timelinePart1.map((event, index) => (
                      <motion.div 
                        key={event.year}
                        className="flex flex-col items-center w-1/4 px-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <div className="text-sm font-bold text-[#123985] bg-white px-1">{event.year}</div>
                        <motion.div 
                          className="w-5 h-5 rounded-full bg-[#FFD700] my-2 relative z-10"
                          whileHover={{ scale: 1.2 }}
                          animate={isTimelineInView ? {
                            boxShadow: ['0 0 0 0 rgba(255, 215, 0, 0)', '0 0 0 10px rgba(255, 215, 0, 0.3)', '0 0 0 0 rgba(255, 215, 0, 0)'],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.25 }}
                        />
                        <div className="text-center">
                          <h5 className="text-sm font-semibold text-[#123985]">{event.title}</h5>
                          <p className="text-xs text-gray-600 mt-1 hidden md:block">{event.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Row 2 (Events from 2022 onwards) */}
                <div className="relative">
                  <div className="absolute left-0 top-6 w-full h-1 bg-gray-200 -z-10"></div>
                  <div className="flex justify-between relative">
                    {timelinePart2.map((event, index) => (
                      <motion.div 
                        key={event.year}
                        className="flex flex-col items-center w-1/4 px-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: (index + timelinePart1.length) * 0.2 }} // Continuous delay
                      >
                        <div className="text-sm font-bold text-[#123985] bg-white px-1">{event.year}</div>
                        <motion.div 
                          className="w-5 h-5 rounded-full bg-[#FFD700] my-2 relative z-10"
                          whileHover={{ scale: 1.2 }}
                          animate={isTimelineInView ? {
                            boxShadow: ['0 0 0 0 rgba(255, 215, 0, 0)', '0 0 0 10px rgba(255, 215, 0, 0.3)', '0 0 0 0 rgba(255, 215, 0, 0)'],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity, delay: (index + timelinePart1.length) * 0.25 }}
                        />
                        <div className="text-center">
                          <h5 className="text-sm font-semibold text-[#123985]">{event.title}</h5>
                          <p className="text-xs text-gray-600 mt-1 hidden md:block">{event.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
            {/* --- MODIFICATION END --- */}
          </div>
        </div>
      </div>
    </section>
  );
}