import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Sports Day",
      date: "2025-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Main Sports Complex",
      category: "Sports",
      description: "Inter-house athletics competition and sports extravaganza",
    },
    {
      id: 2,
      title: "Science Exhibition",
      date: "2025-01-25",
      time: "10:00 AM - 3:00 PM",
      location: "Science Block",
      category: "Academic",
      description: "Students showcase innovative science projects and experiments",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: "2025-02-05",
      time: "2:00 PM - 5:00 PM",
      location: "Auditorium",
      category: "Meeting",
      description: "Semester review and student progress discussion",
    },
    {
      id: 4,
      title: "Cultural Week",
      date: "2025-03-10",
      time: "All Day",
      location: "School Campus",
      category: "Cultural",
      description: "Week-long celebration of diverse cultures and traditions",
    },
    {
      id: 5,
      title: "Art Exhibition",
      date: "2025-03-20",
      time: "11:00 AM - 6:00 PM",
      location: "Art Gallery",
      category: "Arts",
      description: "Display of student artwork and creative projects",
    },
    {
      id: 6,
      title: "Annual Day Celebration",
      date: "2025-04-15",
      time: "6:00 PM - 9:00 PM",
      location: "Main Auditorium",
      category: "Cultural",
      description: "Grand cultural program showcasing student talents",
    },
  ];

  const pastEvents = [
    {
      id: 1,
      title: "Republic Day Celebration",
      date: "2025-01-26",
      category: "National",
      highlights: "Flag hoisting, cultural program, patriotic performances",
    },
    {
      id: 2,
      title: "Winter Carnival",
      date: "2024-12-20",
      category: "Festival",
      highlights: "Games, food stalls, student performances, fun activities",
    },
    {
      id: 3,
      title: "Inter-School Debate Competition",
      date: "2024-12-10",
      category: "Academic",
      highlights: "Students won 2nd position in regional debate championship",
    },
  ];

  const categoryColors: Record<string, string> = {
    Sports: "chart-1",
    Academic: "chart-2",
    Cultural: "accent",
    Meeting: "primary",
    Arts: "chart-3",
    National: "destructive",
    Festival: "chart-2",
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-96 bg-gradient-to-r from-primary to-accent text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            School Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Stay Updated with Our Calendar
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid={`event-${event.id}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-3 text-center min-w-[60px]">
                        <div className="text-2xl font-bold text-primary">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleString("default", { month: "short" })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
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
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Past Events Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate cursor-pointer" data-testid={`past-event-${event.id}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <Badge>{event.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground">{event.highlights}</p>
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
