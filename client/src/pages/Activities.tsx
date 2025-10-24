import { Card } from "@/components/ui/card";
import { Trophy, Palette, Music, Drama, Code, Globe, Activity, Dumbbell, Volleyball, BadmintonRacket, Table2, PersonStanding, Waves, Puzzle } from "lucide-react";
import { motion } from "framer-motion";
const sportsImage = "http://localhost:1337/uploads/IMG_3418_a3ce719b21.JPG";

export default function Activities() {
  const clubs = [
    { id: 1, name: "Robotics Club", icon: Code, color: "chart-1", description: "Build robots and explore AI & automation" },
    { id: 2, name: "Drama Club", icon: Drama, color: "chart-2", description: "Theater arts and performance skills" },
    { id: 3, name: "Art Club", icon: Palette, color: "accent", description: "Painting, sculpture, and visual arts" },
    { id: 4, name: "Music Club", icon: Music, color: "chart-3", description: "Vocal and instrumental music training" },
    { id: 5, name: "Debate Society", icon: Globe, color: "primary", description: "Public speaking and critical thinking" },
    { id: 6, name: "Environment Club", icon: Globe, color: "chart-2", description: "Sustainability and conservation initiatives" },
  ];

  const sports = [
    { name: "Cricket", icon: Trophy },
    { name: "Football", icon: Activity },
    { name: "Basketball", icon: Dumbbell },
    { name: "Badminton", icon: Volleyball },
    { name: "Table Tennis", icon: Table2 },
    { name: "Athletics", icon: PersonStanding },
    { name: "Swimming", icon: Waves },
    { name: "Chess", icon: Puzzle },
  ];

  const cultural = [
    { id: 1, name: "Annual Day", description: "Grand cultural extravaganza showcasing student talents" },
    { id: 2, name: "Dance Competitions", description: "Classical, contemporary, and folk dance performances" },
    { id: 3, name: "Music Concerts", description: "Vocal and instrumental music showcases" },
    { id: 4, name: "Drama Festival", description: "Theater productions and plays" },
    { id: 5, name: "Art Exhibition", description: "Student artwork and creative projects display" },
    { id: 6, name: "Cultural Week", description: "Celebration of diverse cultures and traditions" },
  ];

  return (
    <div className="min-h-screen">

      <section className="relative h-96 bg-gradient-to-r from-chart-2 to-chart-1 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Co-Curricular Activities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Beyond Academics - Discover, Develop, Excel
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Clubs & Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => {
              const Icon = club.icon;
              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 hover-elevate cursor-pointer h-full" data-testid={`club-${club.id}`}>
                    <div className={`w-16 h-16 rounded-full bg-${club.color}/10 flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 text-${club.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                    <p className="text-muted-foreground">{club.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Sports & Athletics</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Our state-of-the-art sports complex provides world-class facilities for students to excel in various sports. Professional coaches train students in multiple disciplines, preparing them for inter-school and national competitions.
              </p>
              <div className="grid grid-cols-4 gap-4">
                {sports.map((sport) => {
                  const Icon = sport.icon;
                  return (
                    <Card key={sport.name} className="p-4 text-center hover-elevate cursor-pointer" data-testid={`sport-${sport.name.toLowerCase()}`}>
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-xs font-medium">{sport.name}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src={sportsImage} alt="Sports facilities" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Cultural Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultural.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate cursor-pointer" data-testid={`cultural-${program.id}`}>
                  <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                  <p className="text-muted-foreground">{program.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
