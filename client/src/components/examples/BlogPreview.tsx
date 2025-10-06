import { BlogPreview } from "../BlogPreview";
import labImage from "@assets/generated_images/Science_lab_campus_tour_9f1f27cd.png";

export default function BlogPreviewExample() {
  const articles = [
    {
      id: 1,
      title: "The Future of Education: Blending Technology with Traditional Learning",
      excerpt: "Exploring how modern educational technology enhances traditional teaching methods for better student outcomes.",
      category: "Educational Technology",
      image: labImage,
      featured: true,
    },
    {
      id: 2,
      title: "Nurturing Emotional Intelligence in Students",
      excerpt: "Understanding the importance of emotional development alongside academic achievement.",
      category: "Student Well-being",
    },
    {
      id: 3,
      title: "STEM Education: Preparing Students for Tomorrow",
      excerpt: "How our STEM programs equip students with critical skills for future careers.",
      category: "STEM",
    },
  ];

  return <BlogPreview articles={articles} />;
}
