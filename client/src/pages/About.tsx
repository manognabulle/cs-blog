import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Terminal, Book, Coffee, CheckCircle2 } from "lucide-react";

export default function About() {
  const skills = [
    "JavaScript/TypeScript", "React & Next.js", "Node.js", "Python", 
    "Database Design", "System Architecture", "UI/UX Design", "Cloud Computing"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-primary/20">
            {/* Unsplash portrait photo */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Hi, I'm a CS Student</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about building software that matters. Sharing my journey in tech, 
            coding tips, and study strategies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card/50 backdrop-blur border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Developer</h3>
              <p className="text-sm text-muted-foreground">
                Building full-stack applications with modern technologies.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 text-accent">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Writer</h3>
              <p className="text-sm text-muted-foreground">
                Documenting complex concepts in simple, understandable terms.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 text-green-500">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Open Source</h3>
              <p className="text-sm text-muted-foreground">
                Contributing to the community and learning from others.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold mb-8">My Mission</h2>
          <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground">
            <p className="mb-6">
              Computer Science can be daunting. My goal with CS Blog is to break down 
              barriers and make tech education accessible to everyone. Whether you're 
              just starting your journey or you're an experienced engineer, there's always 
              something new to learn.
            </p>
            <p>
              I believe in "Learning in Public" - sharing mistakes, successes, and the 
              messy process of understanding how computers work.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold mb-8">Tech Stack & Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-base">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
