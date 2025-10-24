import { StatsCounter } from "../StatsCounter";

export default function StatsCounterExample() {
  const stats = [
    { id: 1, value: 12, suffix: ":1", label: "Student-Teacher Ratio" },
    { id: 2, value: 9, suffix: "+", label: "Years of Excellence" },
    { id: 3, value: 2500, suffix: "+", label: "Happy Students" },
    { id: 4, value: 50, suffix: "+", label: "Acre Campus" },
  ];

  return <StatsCounter stats={stats} />;
}
