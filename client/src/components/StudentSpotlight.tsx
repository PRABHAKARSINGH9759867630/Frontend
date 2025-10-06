import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  const current = spotlights[currentIndex];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Student Spotlight</h2>
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                <img
                  src={current.photo}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{current.name}</h3>
                  <p className="text-sm opacity-90">{current.category === "student" ? "Student" : "Alumni"}</p>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center relative">
                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary opacity-20" />
                <p className="text-lg font-semibold mb-4">{current.achievement}</p>
                <p className="text-muted-foreground italic mb-6">"{current.quote}"</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    data-testid="button-spotlight-prev"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    data-testid="button-spotlight-next"
                  >
                    <ChevronRight className="w-4 h-4" />
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
