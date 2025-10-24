import { Card } from "@/components/ui/card";
import {
  Target,
  Eye,
  Award,
  BookOpen,
  Laptop,
  FlaskConical,
  Dumbbell,
  Library,
  Palette,
  Theater,
  Star,
  Handshake,
  Lightbulb,
  Globe,
  Heart,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // ✅ World-Class Facilities
  const facilities = [
    { id: 1, name: "Smart Classrooms", icon: Laptop, description: "Technology-enabled learning spaces" },
    { id: 2, name: "Science Labs", icon: FlaskConical, description: "State-of-the-art laboratory facilities" },
    { id: 3, name: "Sports Complex", icon: Dumbbell, description: "Multi-sport athletic facilities" },
    { id: 4, name: "Library", icon: Library, description: "Extensive digital and physical resources" },
    { id: 5, name: "Art Studios", icon: Palette, description: "Creative spaces for artistic expression" },
    { id: 6, name: "Auditorium", icon: Theater, description: "200-seat modern auditorium" },
  ];

  // ✅ Faculty with Photos
  const faculty = [
    {
      id: 1,
      name: "Aman Gupta",
      role: "Cultural Coordinator",
      qualification: "B.com , M.B.A , B.ED, M.A",
      avatar: "https://images.unsplash.com/photo-1603415526960-f8f0b0b4d1a5?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Dr. Barsha ",
      role: "Day Boarding Incharge",
      qualification: "PhD in Psychology",
      avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Harleen Kaur",
      role: "Pre-Primary Coordinator",
      qualification: "B.COM",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Manpreet Kaur",
      role: "Primary Coordinator",
      qualification: "B.Com , B.ed , Diploma in Finance managment",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Amandeep Kaur",
      role: "Middle Coordinator",
      qualification: "B.Com Honours",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Zuhaib Hasan Zaidi",
      role: "Senior Coordinator",
      qualification: "B.SC ,M.A , B.ED",
      avatar: "https://images.unsplash.com/photo-1614281780934-9e1a3e7c7880?auto=format&fit=crop&w=400&q=80",
    },
  ];

  // ✅ Affiliations
  const affiliations = [
    { id: 1, name: "CBSE", description: "Central Board of Secondary Education" },
    { id: 2, name: "Astropathshala", description: "International Baccalaureate" },
    { id: 3, name: "British Council & Rotary Club", description: "International School Award" },
    { id: 4, name: "NABET", description: "Quality Standards Accreditation" },
    { id: 5, name: "ISO 9001:2015", description: "Quality Management Certified" },
    { id: 6, name: "UNESCO", description: "Associated School Project Network" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-primary to-chart-2 text-white flex items-center">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h1 {...fadeIn} className="text-5xl md:text-6xl font-bold mb-4">
            About GD Goenka Public School
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.2 }} className="text-xl md:text-2xl opacity-90">
            Inspiring Excellence, Nurturing Leaders Since 1999
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div {...fadeIn}>
              <Card className="p-8 h-full border-l-4 border-l-primary">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Education is the apprentice of life. Our vision is to provide value-based education with new innovations and ideas so that our pupils grow into aesthetically rich, intellectually aware and integrated young people, capable of fulfilling their dreams and aspirations.
                  <br />
                  <br />
                  Our vision is to strengthen the basic foundation and thereafter allow the latent talent to fully develop. Creative energies need a caring & nurturing environment and this is what we endeavour to provide.
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <Card className="p-8 h-full border-l-4 border-l-chart-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-chart-2/10 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-chart-2" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  We embark on the mission of creating individuals who are confident about their potential and are goal-oriented, sensitive to their environment, and above all, co-creators of their own destiny. Our aim is to help a child realize his/her inner strength and give a conducive environment to grow & evolve as a global citizen.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="bg-gradient-to-r from-primary/5 to-chart-2/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-6">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { Icon: Star, title: "Excellence", desc: "Pursuit of the highest standards in all endeavors" },
                { Icon: Handshake, title: "Integrity", desc: "Honesty and strong moral principles in every action" },
                { Icon: Lightbulb, title: "Innovation", desc: "Embracing creativity and forward-thinking approaches" },
                { Icon: Globe, title: "Inclusivity", desc: "Respecting diversity and fostering belonging" },
                { Icon: Heart, title: "Compassion", desc: "Caring for others and our community" },
                { Icon: TrendingUp, title: "Growth", desc: "Continuous learning and personal development" },
              ].map((value, index) => {
                const IconComponent = value.Icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">World-Class Infrastructure</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover-elevate cursor-pointer h-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <facility.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{facility.name}</h3>
                  <p className="text-xs text-muted-foreground">{facility.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Our Expert Faculty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.qualification}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Accreditations & Affiliations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliations.map((affiliation, index) => (
              <motion.div
                key={affiliation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{affiliation.name}</h3>
                      <p className="text-sm text-muted-foreground">{affiliation.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
