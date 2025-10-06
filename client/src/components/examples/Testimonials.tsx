import { Testimonials } from "../Testimonials";
import parentPhoto from "@assets/generated_images/Parent_testimonial_portrait_7c79c4ef.png";

export default function TestimonialsExample() {
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Williams",
      role: "Parent",
      photo: parentPhoto,
      quote: "Excellence Academy has been instrumental in my daughter's development. The caring teachers and excellent facilities have made all the difference.",
      rating: 5,
    },
    {
      id: 2,
      name: "Robert Martinez",
      role: "Parent",
      photo: parentPhoto,
      quote: "The holistic approach to education here is remarkable. My son has grown not just academically but also in confidence and character.",
      rating: 5,
    },
  ];

  return <Testimonials testimonials={testimonials} />;
}
