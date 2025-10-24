import { motion } from "framer-motion";
import { Dumbbell, Palette, Bot, Music, Camera } from "lucide-react";
import { useState } from "react";

interface Activity {
  id: number;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
}

// This data would ideally come from CMS (Strapi)
const activities: Activity[] = [
  {
    id: 1,
    name: "Sports",
    icon: Dumbbell,
    description: "Competitive sports including football, cricket, basketball, and athletics.",
    color: "#4285F4"
  },
  {
    id: 2,
    name: "Arts",
    icon: Palette,
    description: "Express creativity through painting, sculpture, pottery, and handicrafts.",
    color: "#EA4335"
  },
  {
    id: 3,
    name: "Robotics",
    icon: Bot,
    description: "Learn programming, engineering, and problem-solving through robotics.",
    color: "#34A853"
  },
  {
    id: 4,
    name: "Music",
    icon: Music,
    description: "Vocal and instrumental music training with regular performances.",
    color: "#FBBC05"
  },
  {
    id: 5,
    name: "AI",
    icon: Camera,
    description: "Capture moments and learn the art of visual storytelling.",
    color: "#9C27B0"
  },
];

// This data would ideally come from CMS (Strapi)
const events: Event[] = [
  {
    id: 1,
    title: "VIBRATION 3.0",
    date: "NOV 22, 2025",
    image: "http://localhost:1337/uploads/DSC_4798_5f226c167a.JPG",
    description: "GD Goenka Public School is all set to host Vibration 3.0 on 22nd November, an inter-school cultural fest celebrating art, music, dance, and innovation."
  },
  {
    id: 2,
    title: "Investiture Ceremony",
    date: "April 10, 2023",
    image: "http://localhost:1337/uploads/DSC_0722_6d582965a4.JPG",
    description: "GD Goenka Public School proudly held its Investiture Ceremony, conferring badges of leadership and responsibility to the newly appointed student council."
  },
  {
    id: 3,
    title: "Aquatic Meet 5.0",
    date: "May 5, 2023",
    image: "http://localhost:1337/uploads/2_2cc039b19a.png",
    description: "GD Goenka Public School hosted Aquatic Meet 5.0, celebrating students’ swimming talent, sportsmanship, and spirit through thrilling and competitive water events."
  },
];

export function ActivitiesEvents() {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#123985]">
            Activities & <span className="text-[#FFD700]">Events</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of extracurricular activities and events to enrich the educational experience
            and develop well-rounded individuals.
          </p>
        </motion.div>

        {/* Activities with 3D props */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-[#123985]">Featured Activities</h3>
          
          <div className="flex flex-wrap justify-center gap-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              
              return (
                <motion.div
                  key={activity.id}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                      z: 20
                    }}
                    style={{ zIndex: 10 }}
                  >
                    <motion.div
                      whileHover={{ 
                        rotate: 360,
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }}
                    >
                      <Icon className="w-10 h-10 text-[#123985]" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-2 w-full text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  >
                    <span className="bg-[#123985] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {activity.name}
                    </span>
                  </motion.div>
                  
                  {/* Golden glow effect on hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[#FFD700] opacity-0"
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: "blur(10px)" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Events from CMS */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-[#123985]">Upcoming Events</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setActiveEvent(event)}
                onHoverEnd={() => setActiveEvent(null)}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{
                      transform: activeEvent?.id === event.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123985]/80 to-transparent flex items-end p-4">
                    <div>
                      <h4 className="text-white text-xl font-bold">{event.title}</h4>
                      <p className="text-[#FFD700] font-medium">{event.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600">{event.description}</p>
                  
                  <motion.button 
                    className="mt-4 text-[#123985] font-medium flex items-center gap-1"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="px-8 py-3 bg-[#FFD700] text-[#123985] rounded-md hover:bg-[#FFD700]/90 transition-colors font-medium shadow-md hover:shadow-lg">
              View All Events
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}