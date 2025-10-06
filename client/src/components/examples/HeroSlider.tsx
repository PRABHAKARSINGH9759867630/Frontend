import { HeroSlider } from "../HeroSlider";
import heroImage from "@assets/generated_images/School_campus_hero_image_574848a6.png";

export default function HeroSliderExample() {
  const slides = [
    {
      id: 1,
      image: heroImage,
      tagline: "Welcome to Excellence Academy",
      subtitle: "Where Learning Meets Innovation and Every Student Achieves Their Full Potential",
      cta1Text: "Apply Now",
      cta2Text: "Virtual Tour",
    },
    {
      id: 2,
      image: heroImage,
      tagline: "Shaping Future Leaders",
      subtitle: "Empowering Students Through Quality Education and Character Development",
      cta1Text: "Learn More",
      cta2Text: "Schedule Visit",
    },
  ];

  return <HeroSlider slides={slides} />;
}
