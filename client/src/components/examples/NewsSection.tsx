import { NewsSection } from "../NewsSection";
import sportsImage from "@assets/generated_images/Sports_facilities_image_2ec22754.png";

export default function NewsSectionExample() {
  const articles = [
    {
      id: 1,
      title: "Students Win State Science Fair",
      excerpt: "Our brilliant students secured top positions at the State Science Fair with innovative projects.",
      category: "Achievement",
      date: "Jan 15, 2025",
      image: sportsImage,
    },
    {
      id: 2,
      title: "New STEM Lab Inaugurated",
      excerpt: "State-of-the-art STEM laboratory opens, providing students with cutting-edge learning facilities.",
      category: "Infrastructure",
      date: "Jan 10, 2025",
    },
    {
      id: 3,
      title: "International Exchange Program",
      excerpt: "Selected students to participate in international cultural exchange program this summer.",
      category: "Programs",
      date: "Jan 5, 2025",
    },
  ];

  return <NewsSection articles={articles} />;
}
