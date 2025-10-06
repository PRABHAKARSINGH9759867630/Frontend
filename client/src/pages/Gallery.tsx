import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion } from "framer-motion";
import sportsImage from "@assets/generated_images/Sports_facilities_image_2ec22754.png";
import labImage from "@assets/generated_images/Science_lab_campus_tour_9f1f27cd.png";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = ["all", "events", "sports", "academics", "cultural", "infrastructure"];

  const photos = [
    { id: 1, image: sportsImage, title: "Sports Day 2024", category: "sports" },
    { id: 2, image: labImage, title: "Science Lab", category: "academics" },
    { id: 3, image: sportsImage, title: "Annual Function", category: "cultural" },
    { id: 4, image: labImage, title: "Smart Classroom", category: "infrastructure" },
    { id: 5, image: sportsImage, title: "Cricket Match", category: "sports" },
    { id: 6, image: labImage, title: "Chemistry Lab", category: "academics" },
    { id: 7, image: sportsImage, title: "Dance Performance", category: "cultural" },
    { id: 8, image: labImage, title: "Library", category: "infrastructure" },
    { id: 9, image: sportsImage, title: "Football Tournament", category: "sports" },
    { id: 10, image: labImage, title: "Computer Lab", category: "academics" },
    { id: 11, image: sportsImage, title: "Drama Festival", category: "cultural" },
    { id: 12, image: labImage, title: "Auditorium", category: "infrastructure" },
  ];

  const videos = [
    { id: 1, title: "School Tour 2024", thumbnail: labImage, duration: "5:30", category: "tour" },
    { id: 2, title: "Annual Day Highlights", thumbnail: sportsImage, duration: "8:45", category: "events" },
    { id: 3, title: "Sports Championship", thumbnail: sportsImage, duration: "6:20", category: "sports" },
  ];

  const filteredPhotos = activeFilter === "all"
    ? photos
    : photos.filter((photo) => photo.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-96 bg-gradient-to-r from-chart-3 to-chart-5 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Photo & Video Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Capturing Moments, Celebrating Memories
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className="capitalize"
                data-testid={`filter-${category}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover-elevate cursor-pointer group" data-testid={`photo-${photo.id}`}>
                  <div className="aspect-square relative">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-semibold">{photo.title}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Video Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover-elevate cursor-pointer group" data-testid={`video-${video.id}`}>
                  <div className="aspect-video relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-4 right-4">{video.duration}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{video.title}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
