import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface EventsPreviewProps {
  events: Event[];
}

export function EventsPreview({ events }: EventsPreviewProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">Upcoming Events</h2>
          <Button variant="outline" data-testid="button-view-all-events">
            View All Events
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="p-6 border-l-4 border-l-primary hover-elevate"
              data-testid={`event-${event.id}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="rounded-lg bg-primary/10 p-3 text-center min-w-[60px]">
                  <div className="text-2xl font-bold text-primary">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleString("default", { month: "short" })}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
