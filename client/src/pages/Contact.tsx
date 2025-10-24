import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <section className="relative h-96 bg-gradient-to-r from-chart-2 to-primary text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90"
          >
            We're Here to Help - Get in Touch
          </motion.p>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
