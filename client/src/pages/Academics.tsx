import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Beaker, Calculator, Globe, Palette, Music, FlaskConical, Languages, Trophy, Code, Laptop } from "lucide-react";
import { motion } from "framer-motion";

export default function Academics() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const grades = [
    { level: "Pre-Primary", grades: "Nursery - KG", focus: "Play-based learning, foundational skills", color: "from-pink-500 to-purple-500" },
    { level: "Primary", grades: "Grade 1-5", focus: "Core subjects, holistic development", color: "from-blue-500 to-cyan-500" },
    { level: "Middle School", grades: "Grade 6-8", focus: "Conceptual learning, critical thinking", color: "from-green-500 to-teal-500" },
    { level: "Secondary", grades: "Grade 9-10", focus: "CBSE Board preparation, skill development", color: "from-orange-500 to-red-500" },
    { level: "Senior Secondary", grades: "Grade 11-12", focus: "Stream specialization, career readiness", color: "from-indigo-500 to-purple-500" },
  ];

  const streams = [
    {
      id: 1,
      name: "Science",
      icon: Beaker,
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Computer Science"],
      color: "chart-1"
    },
    {
      id: 2,
      name: "Commerce",
      icon: Calculator,
      subjects: ["Accountancy", "Business Studies", "Economics", "English", "Mathematics", "Informatics"],
      color: "chart-2"
    },
    {
      id: 3,
      name: "Humanities",
      icon: Globe,
      subjects: ["History", "Political Science", "Geography", "Economics", "English", "Psychology"],
      color: "accent"
    },
  ];

  const specialPrograms = [
    { id: 1, name: "STEM Lab", icon: FlaskConical, description: "Robotics, AI, and advanced scientific research" },
    { id: 2, name: "Language Lab", icon: Languages, description: "Multilingual proficiency development" },
    { id: 3, name: "Art & Design Studio", icon: Palette, description: "Creative arts and visual design" },
    { id: 4, name: "Music Academy", icon: Music, description: "Vocal and instrumental training" },
    { id: 5, name: "Sports Excellence", icon: Trophy, description: "Professional sports coaching" },
    { id: 6, name: "Coding & Tech", icon: Code, description: "Programming and technology skills" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-96 bg-gradient-to-r from-chart-1 to-chart-2 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1 {...fadeIn} className="text-5xl md:text-6xl font-bold mb-4">
            Academic Excellence
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.2 }} className="text-xl md:text-2xl opacity-90">
            Comprehensive Curriculum from Pre-Primary to Grade 12
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Curriculum Overview</h2>
          <div className="space-y-6">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate" data-testid={`grade-${index}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="text-2xl font-bold mb-2">{grade.level}</h3>
                      <Badge variant="secondary" className="mb-2">{grade.grades}</Badge>
                      <p className="text-muted-foreground">{grade.focus}</p>
                    </div>
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${grade.color} opacity-20`} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Senior Secondary Streams</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {streams.map((stream, index) => {
              const Icon = stream.icon;
              return (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 hover-elevate h-full" data-testid={`stream-${stream.id}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-full bg-${stream.color}/10 flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 text-${stream.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold">{stream.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-sm mb-3">Core Subjects:</p>
                      {stream.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="mr-2 mb-2">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Special Programs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover-elevate cursor-pointer h-full" data-testid={`program-${program.id}`}>
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 text-sm">{program.name}</h3>
                  <p className="text-xs text-muted-foreground">{program.description}</p>
                </Card>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-chart-2 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Academic Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div>
              <div className="text-5xl font-bold font-accent mb-2">98%</div>
              <p className="text-lg opacity-90">Board Pass Rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold font-accent mb-2">150+</div>
              <p className="text-lg opacity-90">Olympiad Winners</p>
            </div>
            <div>
              <div className="text-5xl font-bold font-accent mb-2">20+</div>
              <p className="text-lg opacity-90">Subject Experts</p>
            </div>
            <div>
              <div className="text-5xl font-bold font-accent mb-2">95%</div>
              <p className="text-lg opacity-90">Higher Education Admission</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
