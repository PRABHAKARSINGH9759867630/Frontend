import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Achievement {
  id: number;
  value: number;
  suffix: string;
  title: string;
  icon: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    value: 9,
    suffix: "+",
    title: "Years of Excellence",
    icon: "🏫"
  },
  {
    id: 2,
    value: 135,
    suffix: "+",
    title: "Alumni Worldwide",
    icon: "🎓"
  },
  {
    id: 3,
    value: 98,
    suffix: "%",
    title: "Board Results",
    icon: "📊"
  },
  {
    id: 4,
    value: 50,
    suffix: "+",
    title: "National Awards",
    icon: "🏆"
  },
];

// Animated counter component
function Counter({ value, suffix, duration = 2 }: { value: number, suffix: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const end = value;
    const incrementTime = duration * 1000 / end;
    
    // Don't run if end is zero
    if (end === 0) return;
    
    // Start the counter
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [inView, value, duration]);
  
  return <span ref={ref}>{inView ? count : 0}{suffix}</span>;
}

// Confetti component for animation
function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#FFD700]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, Math.random() * -100],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating trophy/medal component
function FloatingProps() {
  const props = [
    { emoji: "🏆", delay: 0 },
    { emoji: "🥇", delay: 1.5 },
    { emoji: "🏅", delay: 3 },
    { emoji: "🎖️", delay: 4.5 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {props.map((prop, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-5xl"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, -20, -40, -60],
            rotate: [0, 10, -10, 0],
            scale: [0.8, 1.2, 1, 0.8],
          }}
          transition={{
            duration: 6,
            delay: prop.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          {prop.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export function Achievements() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <section className="py-16 bg-[#123985] text-white relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#123985] via-[#123985] to-[#0c2657] opacity-80" />
      
      {/* Floating medals/trophies */}
      <FloatingProps />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#FFD700]">Achievements</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Celebrating excellence in academics, sports, and extracurricular activities
            through our remarkable accomplishments over the years.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="text-center relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: index * 0.2
                  }
                }
              }}
              initial="hidden"
              animate={controls}
            >
              {/* Confetti animation on counter completion */}
              <Confetti />
              
              <motion.div 
                className="text-5xl md:text-6xl font-bold mb-2 flex justify-center items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl">{achievement.icon}</span>
                <Counter value={achievement.value} suffix={achievement.suffix} duration={3} />
              </motion.div>
              
              <h3 className="text-xl font-medium text-[#FFD700]">{achievement.title}</h3>
              
              {/* Gold underline that animates on hover */}
              <motion.div 
                className="h-1 bg-[#FFD700] w-0 mx-auto mt-3 rounded-full"
                whileHover={{ width: "50%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="px-8 py-3 bg-[#FFD700] text-[#123985] rounded-md hover:bg-[#FFD700]/90 transition-colors font-medium shadow-lg hover:shadow-xl">
            View All Achievements
          </button>
        </motion.div>
      </div>
    </section>
  );
}