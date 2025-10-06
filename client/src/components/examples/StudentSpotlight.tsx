import { StudentSpotlight } from "../StudentSpotlight";
import studentPhoto from "@assets/generated_images/Student_achievement_spotlight_23313d01.png";

export default function StudentSpotlightExample() {
  const spotlights = [
    {
      id: 1,
      name: "Emma Rodriguez",
      photo: studentPhoto,
      achievement: "National Science Olympiad Gold Medalist",
      quote: "Excellence Academy gave me the resources and mentorship to pursue my passion for science.",
      category: "student" as const,
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: studentPhoto,
      achievement: "Selected for International Mathematics Competition",
      quote: "The supportive environment here helped me develop both academically and personally.",
      category: "student" as const,
    },
  ];

  return <StudentSpotlight spotlights={spotlights} />;
}
