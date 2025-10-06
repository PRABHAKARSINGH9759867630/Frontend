import { EventsPreview } from "../EventsPreview";

export default function EventsPreviewExample() {
  const events = [
    {
      id: 1,
      name: "Annual Sports Day",
      date: "2025-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Main Sports Complex",
      description: "Join us for our annual sports day featuring athletics, team games, and award ceremonies.",
    },
    {
      id: 2,
      name: "Science Exhibition",
      date: "2025-01-25",
      time: "10:00 AM - 3:00 PM",
      location: "Science Block",
      description: "Students showcase their innovative science projects and experiments.",
    },
    {
      id: 3,
      name: "Parent-Teacher Meeting",
      date: "2025-02-05",
      time: "2:00 PM - 5:00 PM",
      location: "Auditorium",
      description: "Semester review and discussion of student progress with parents.",
    },
  ];

  return <EventsPreview events={events} />;
}
