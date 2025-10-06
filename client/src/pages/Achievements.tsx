import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Achievements() {
  const studentAchievements = [
    {
      id: 1,
      name: "Aarav Sharma",
      achievement: "National Science Olympiad Gold Medal",
      year: "2024",
      grade: "Grade 10",
      category: "Academic",
    },
    {
      id: 2,
      name: "Priya Patel",
      achievement: "State Level Mathematics Competition Winner",
      year: "2024",
      grade: "Grade 9",
      category: "Academic",
    },
    {
      id: 3,
      name: "Rohan Verma",
      achievement: "Inter-School Cricket Tournament - Best Player",
      year: "2024",
      grade: "Grade 11",
      category: "Sports",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      achievement: "Classical Dance Competition National Champion",
      year: "2024",
      grade: "Grade 8",
      category: "Cultural",
    },
    {
      id: 5,
      name: "Arjun Singh",
      achievement: "International Robotics Championship Silver Medal",
      year: "2024",
      grade: "Grade 12",
      category: "Technology",
    },
    {
      id: 6,
      name: "Ananya Gupta",
      achievement: "State Art Competition First Prize",
      year: "2024",
      grade: "Grade 7",
      category: "Arts",
    },
  ];

  const teacherAchievements = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      achievement: "Best Teacher Award - State Level",
      year: "2024",
      subject: "Physics",
    },
    {
      id: 2,
      name: "Ms. Priya Singh",
      achievement: "National Excellence in Science Teaching",
      year: "2024",
      subject: "Chemistry",
    },
    {
      id: 3,
      name: "Mr. Amit Patel",
      achievement: "Mathematics Educator of the Year",
      year: "2023",
      subject: "Mathematics",
    },
  ];

  const schoolRankings = [
    { id: 1, title: "Top 10 Schools in State", organization: "Education Today", year: "2024" },
    { id: 2, title: "Best Infrastructure - Regional Award", organization: "School Excellence Board", year: "2024" },
    { id: 3, title: "Academic Excellence Award", organization: "CBSE", year: "2023" },
    { id: 4, title: "Green School Certification", organization: "Environment Ministry", year: "2024" },
    { id: 5, title: "Digital Learning Innovation Award", organization: "EdTech Association", year: "2024" },
  ];

  const categoryIcons: Record<string, any> = {
    Academic: Trophy,
    Sports: Medal,
    Cultural: Star,
    Technology: Award,
    Arts: Award,
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-96 bg-gradient-to-r from-accent to-chart-3 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Our Achievements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Celebrating Excellence & Success
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Student Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentAchievements.map((achievement, index) => {
              const Icon = categoryIcons[achievement.category] || Trophy;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid={`student-achievement-${achievement.id}`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                        <Badge variant="secondary">{achievement.grade}</Badge>
                      </div>
                    </div>
                    <p className="text-sm font-semibold mb-2">{achievement.achievement}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{achievement.category}</span>
                      <span>{achievement.year}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Teacher Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teacherAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate cursor-pointer" data-testid={`teacher-achievement-${achievement.id}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{achievement.name}</h3>
                      <p className="text-xs text-muted-foreground">{achievement.subject}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-2">{achievement.achievement}</p>
                  <p className="text-xs text-muted-foreground">{achievement.year}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">School Rankings & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schoolRankings.map((ranking, index) => (
              <motion.div
                key={ranking.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 border-l-4 border-l-accent hover-elevate cursor-pointer" data-testid={`ranking-${ranking.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{ranking.title}</h3>
                      <p className="text-sm text-muted-foreground">{ranking.organization}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">{ranking.year}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-chart-2 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Track Record</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div>
              <div className="text-5xl font-bold font-accent mb-2">500+</div>
              <p className="text-lg opacity-90">Awards Won</p>
            </div>
            <div>
              <div className="text-5xl font-bold font-accent mb-2">98%</div>
              <p className="text-lg opacity-90">Board Results</p>
            </div>
            <div>
              <div className="text-5xl font-bold font-accent mb-2">150+</div>
              <p className="text-lg opacity-90">Olympiad Medals</p>
            </div>
            <div>
              <div className="text-5xl font-bold font-accent mb-2">25+</div>
              <p className="text-lg opacity-90">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
