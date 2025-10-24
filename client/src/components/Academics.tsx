import { motion } from "framer-motion";
import { 
  BookOpen, FlaskConical, Palette, Monitor, Calculator, Globe,
  Building, Library, Laptop, PenTool, Dumbbell, Music, Utensils, Droplet, Sun
} from "lucide-react"; // Added new icons for infrastructure

// Reusable interface for both subjects and facilities
interface ItemProps {
  id: number;
  name: string;
  icon: React.ElementType;
  description: string;
}

// Data for academic subjects (can be moved to a separate file or CMS)
const academicSubjects: ItemProps[] = [
  {
    id: 1,
    name: "English & Literature",
    icon: BookOpen,
    description: "Developing strong communication skills through comprehensive language and literature studies."
  },
  {
    id: 2,
    name: "Science & Technology",
    icon: FlaskConical,
    description: "Hands-on experiments and theoretical knowledge in physics, chemistry, and biology."
  },
  {
    id: 3,
    name: "Arts & Creativity",
    icon: Palette,
    description: "Exploring various art forms including visual arts, music, dance, and theater."
  },
  {
    id: 4,
    name: "Computer Science",
    icon: Monitor,
    description: "Programming, digital literacy, and computational thinking for the digital age."
  },
  {
    id: 5,
    name: "Mathematics",
    icon: Calculator,
    description: "Building strong analytical and problem-solving skills through comprehensive math education."
  },
  {
    id: 6,
    name: "Social Studies",
    icon: Globe,
    description: "Understanding history, geography, civics, and cultures from around the world."
  },
];

// Data for infrastructural facilities (can be moved to a separate file or CMS)
const infrastructuralFacilities: ItemProps[] = [
  {
    id: 1,
    name: "Smart Classrooms",
    icon: Laptop,
    description: "Interactive Whiteboards and digital resources for an engaging learning experience."
  },
  {
    id: 2,
    name: "High-Tech Labs",
    icon: FlaskConical, // Reusing FlaskConical for labs
    description: "Modern science and computer labs for practical learning and innovation."
  },
  {
    id: 3,
    name: "Well-Stocked Library",
    icon: Library,
    description: "A vast collection of books, journals, and digital resources to foster reading and research."
  },
  {
    id: 4,
    name: "Art & Craft Room",
    icon: PenTool,
    description: "Dedicated space for students to explore their creativity through various art forms."
  },
  {
    id: 5,
    name: "Sports Facilities",
    icon: Dumbbell,
    description: "Vast playgrounds and courts for various sports, promoting physical fitness and teamwork."
  },
  {
    id: 6,
    name: "Dance & Yoga Studio",
    icon: Music, // Using Music for dance/yoga as a general creative movement icon
    description: "Calm and spacious studios for dance, yoga, and other recreational activities."
  },
  {
    id: 7,
    name: "Cafeteria",
    icon: Utensils,
    description: "Hygienic and healthy meal options served in a comfortable and spacious environment."
  },
  {
    id: 8,
    name: "Splash Pool",
    icon: Droplet,
    description: "A fun and safe splash pool, maintained with high hygiene standards for recreation."
  },
  {
    id: 9,
    name: "Vast Playgrounds", // Explicitly adding vast playgrounds as a separate point
    icon: Sun, // Representing outdoor play
    description: "Extensive outdoor spaces for sports, free play, and student recreation."
  },
];

// Reusable Card Component for both Academics and Infrastructure
const FeatureCard: React.FC<{ item: ItemProps; index: number; primaryColor: string; secondaryColor: string }> = 
  ({ item, index, primaryColor, secondaryColor }) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: secondaryColor,
      }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}
          style={{ backgroundColor: `${primaryColor}/10` }}
          whileHover={{
            backgroundColor: `${secondaryColor}20`, // Slightly transparent secondary color
            scale: 1.1,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: primaryColor }} />
        </motion.div>
        
        <div>
          <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </div>
      
      <motion.div 
        className="w-0 h-1 mt-4"
        style={{ backgroundColor: secondaryColor }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Academics Component
export function Academics() {
  const primaryColor = "#123985"; // Dark Blue
  const secondaryColor = "#FFD700"; // Gold
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Academic <span style={{ color: secondaryColor }}>Excellence</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our comprehensive curriculum is designed to challenge and inspire students,
            fostering a love for learning and intellectual curiosity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicSubjects.map((subject, index) => (
            <FeatureCard 
              key={subject.id} 
              item={subject} 
              index={index} 
              primaryColor={primaryColor} 
              secondaryColor={secondaryColor} 
            />
          ))}
        </div>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="px-8 py-3 text-white rounded-md transition-colors font-medium" 
                  style={{ backgroundColor: primaryColor, hover: { backgroundColor: `${primaryColor}D0` } }}> {/* Added hover style for button */}
            View Full Curriculum
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Infrastructure Component
export function Infrastructure() {
  const primaryColor = "#007BFF"; // A vibrant blue for infrastructure
  const secondaryColor = "#28A745"; // A green accent for infrastructure
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            State-of-the-Art <span style={{ color: secondaryColor }}>Facilities</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide a nurturing and modern environment with facilities designed to support
            holistic development and enhance every aspect of school life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infrastructuralFacilities.map((facility, index) => (
            <FeatureCard 
              key={facility.id} 
              item={facility} 
              index={index} 
              primaryColor={primaryColor} 
              secondaryColor={secondaryColor} 
            />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="px-8 py-3 text-white rounded-md transition-colors font-medium" 
                  style={{ backgroundColor: primaryColor, hover: { backgroundColor: `${primaryColor}D0` } }}>
            Explore Our Campus
          </button>
        </motion.div>
      </div>
    </section>
  );
}