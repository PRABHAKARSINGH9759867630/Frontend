import { KeyFeatures } from "../KeyFeatures";

export default function KeyFeaturesExample() {
  const features = [
    {
      id: 1,
      icon: "academic" as const,
      title: "Academic Excellence",
      description: "Rigorous curriculum designed to challenge and inspire students to reach their full potential.",
    },
    {
      id: 2,
      icon: "sports" as const,
      title: "Sports & Fitness",
      description: "World-class sports facilities and training programs for holistic development.",
    },
    {
      id: 3,
      icon: "infrastructure" as const,
      title: "Modern Infrastructure",
      description: "State-of-the-art classrooms, labs, and learning spaces equipped with latest technology.",
    },
    {
      id: 4,
      icon: "faculty" as const,
      title: "Expert Faculty",
      description: "Highly qualified and passionate educators dedicated to student success.",
    },
    {
      id: 5,
      icon: "activities" as const,
      title: "Co-curricular Activities",
      description: "Diverse programs in arts, music, drama, and clubs to nurture talents.",
    },
  ];

  return <KeyFeatures features={features} />;
}
