import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryItem {
  id: number;
  image: string;
  caption: string;
}

interface GalleryPreviewProps {
  items: GalleryItem[];
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  const displayItems = items.slice(0, 8);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">Photo Gallery</h2>
          <Button variant="outline" data-testid="button-view-full-gallery">
            View Full Gallery
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayItems.map((item, index) => (
            <Card
              key={item.id}
              className={`overflow-hidden hover-elevate cursor-pointer ${
                index === displayItems.length - 1 ? "relative" : ""
              }`}
              onClick={() => console.log("Gallery item clicked:", item.caption)}
              data-testid={`gallery-${item.id}`}
            >
              <div className="aspect-square relative">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
                {index === displayItems.length - 1 && (
                  <div className="absolute inset-0 bg-primary/90 flex items-center justify-center">
                    <div className="text-white text-center">
                      <ArrowRight className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">View All</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
