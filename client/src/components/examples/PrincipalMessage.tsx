import { PrincipalMessage } from "../PrincipalMessage";
import principalPhoto from "@assets/generated_images/Principal_professional_portrait_d7e8b372.png";

export default function PrincipalMessageExample() {
  return (
    <PrincipalMessage
      name="Dr. Sarah Johnson"
      title="Principal, Excellence Academy"
      photo={principalPhoto}
      message="Welcome to Excellence Academy, where we believe every child has the potential to achieve greatness. Our commitment to academic excellence, combined with holistic development, ensures that our students are well-prepared for the challenges of tomorrow. Together, we create a nurturing environment where curiosity thrives and dreams take flight."
      fullMessageLink="/principal-message"
    />
  );
}
