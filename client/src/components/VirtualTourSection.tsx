import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface VirtualTourSectionProps {
  thumbnailImage: string;
  tourUrl?: string;
}

export function VirtualTourSection({ thumbnailImage, tourUrl }: VirtualTourSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-chart-2 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Explore Our World-Class Campus
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Take a virtual 360° tour of our state-of-the-art facilities, modern classrooms,
                well-equipped laboratories, and expansive sports complex.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsOpen(true)}
                data-testid="button-virtual-tour"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Virtual Tour
              </Button>
            </div>
            <Card className="overflow-hidden hover-elevate cursor-pointer" onClick={() => setIsOpen(true)}>
              <div className="relative aspect-video">
                <img
                  src={thumbnailImage}
                  alt="Campus tour preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-10 h-10 text-primary ml-1" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Virtual Campus Tour</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            {tourUrl ? (
              <iframe
                src={tourUrl}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            ) : (
              <p className="text-muted-foreground">
                360° virtual tour will be embedded here (Matterport/Kuula integration)
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
