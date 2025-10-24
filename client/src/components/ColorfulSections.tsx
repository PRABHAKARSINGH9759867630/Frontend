import { motion } from "framer-motion";

export function ColorfulSections() {
  // Array of sections with their colors and content
  const sections = [
    {
      id: 1,
      title: "Academic Excellence",
      description: "Nurturing minds through innovative teaching methodologies and comprehensive curriculum.",
      color: "from-blue-600 to-blue-800",
      icon: "📚"
    },
    {
      id: 2,
      title: "Sports & Athletics",
      description: "Developing physical fitness, teamwork, and sportsmanship through diverse athletic programs.",
      color: "from-green-500 to-emerald-700",
      icon: "🏆"
    },
    {
      id: 3,
      title: "Arts & Culture",
      description: "Fostering creativity and cultural appreciation through music, dance, drama, and visual arts.",
      color: "from-purple-500 to-indigo-700",
      icon: "🎭"
    },
    {
      id: 4,
      title: "Innovation & Technology",
      description: "Preparing students for the future with cutting-edge technology and digital literacy.",
      color: "from-orange-500 to-red-700",
      icon: "💡"
    },
    {
      id: 5,
      title: "Global Citizenship",
      description: "Developing responsible global citizens with strong values and community awareness.",
      color: "from-teal-500 to-cyan-700",
      icon: "🌍"
    }
  ];

  return (
    <div className="w-full">
      {sections.map((section) => (
        <motion.section
          key={section.id}
          className={`min-h-[50vh] w-full bg-gradient-to-r ${section.color} py-16 px-6 md:px-12 lg:px-24`}
          initial={{ opacity: 0.8 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:w-1/2">
                <motion.div 
                  className="text-6xl md:text-8xl mb-4"
                  initial={{ scale: 0.8, rotate: -5 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {section.icon}
                </motion.div>
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ x: -20 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {section.title}
                </motion.h2>
                <motion.p 
                  className="text-lg text-white/90 max-w-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {section.description}
                </motion.p>
              </div>
              
              <motion.div 
                className="w-full md:w-1/2 flex justify-center"
                initial={{ scale: 0.9, opacity: 0.5 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-9xl opacity-30">{section.icon}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}