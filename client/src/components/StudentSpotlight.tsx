import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Spotlight {
  id: number;
  name: string;
  photo: string;
  achievement: string;
  quote: string;
  category: "student" | "alumni";
}

interface StudentSpotlightProps {
  spotlights: Spotlight[];
}

export function StudentSpotlight({ spotlights }: StudentSpotlightProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlights.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlights.length) % spotlights.length);
  };

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const current = spotlights[currentIndex];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-14 text-gray-800">
          Student Spotlight
        </h2>

        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-xl border-0 rounded-3xl">
            <div className="grid md:grid-cols-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6 }}
                  className="relative aspect-video md:aspect-auto"
                >
                  <img
                    src={current.photo}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a default student image if the photo fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{current.name}</h3>
                    <p className="text-sm opacity-90 capitalize">
                      {current.category}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="p-10 flex flex-col justify-center relative">
                <Quote className="absolute top-6 right-6 w-14 h-14 text-primary opacity-15" />
                <motion.div
                  key={current.id + "-text"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl font-semibold mb-4 text-gray-800">
                    {current.achievement}
                  </p>
                  <p className="text-muted-foreground italic mb-6 text-lg leading-relaxed">
                    “{current.quote}”
                  </p>
                </motion.div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="icon" onClick={prev}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={next}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
