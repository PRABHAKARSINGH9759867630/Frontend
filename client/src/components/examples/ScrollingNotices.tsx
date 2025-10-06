import { ScrollingNotices } from "../ScrollingNotices";

export default function ScrollingNoticesExample() {
  const notices = [
    { id: 1, text: "Admissions Open for 2025-26 Academic Year - Apply by March 31st", type: "urgent" as const },
    { id: 2, text: "Annual Sports Day scheduled for February 15th - Parents invited", type: "general" as const },
    { id: 3, text: "Mid-term examinations begin from March 1st - Time Table available", type: "urgent" as const },
    { id: 4, text: "Science Exhibition on January 25th - Register your projects now", type: "general" as const },
  ];

  return <ScrollingNotices notices={notices} />;
}
