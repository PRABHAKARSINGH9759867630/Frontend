import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface VirtualTourSectionProps {
  thumbnailImage?: string; // 👈 custom image (optional)
  tourUrl?: string;       // 👈 YouTube or 360° tour link
}

export function VirtualTourSection({
  thumbnailImage,
  tourUrl = "https://www.youtube.com/embed/lhV67Sufe5o",
}: VirtualTourSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-chart-2 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Explore Our World-Class Campus
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Take a virtual 360° tour of our state-of-the-art facilities, modern classrooms,
            laboratories, and sports arenas.
          </p>

          {/* YouTube Video Thumbnail */}
          <div className="flex justify-center">
            <Card
              className="overflow-hidden cursor-pointer relative max-w-3xl aspect-video group"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${tourUrl.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                alt="YouTube Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to a default thumbnail if YouTube thumbnail fails
                  e.currentTarget.src = `https://img.youtube.com/vi/${tourUrl.split('/').pop()?.split('?')[0]}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play className="w-10 h-10 text-primary ml-1" />
                </div>
              </div>
            </Card>
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            variant="secondary"
            className="mt-8"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Virtual Tour
          </Button>
        </div>
      </section>

      {/* Dialog with embedded video */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-4">
            <DialogTitle>Virtual Campus Tour</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={tourUrl + "?autoplay=1"}
              title="Virtual Campus Tour"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
