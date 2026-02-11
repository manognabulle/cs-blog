import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const requireAdmin = (req: any, res: any, next: any) => {
  if (!(req.session as any)?.isAdmin) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

  // LOGIN
app.post("/api/login", (req, res) => {
  const { password } = req.body;

  if (password === "admin123") {
    (req.session as any).isAdmin = true;
    return res.json({ success: true });
  }

  res.status(401).json({ error: "Invalid password" });
});

// LOGOUT
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// CHECK AUTH
app.get("/api/check-auth", (req, res) => {
  if ((req.session as any).isAdmin) {
    return res.json({ authenticated: true });
  }
  res.json({ authenticated: false });
});

  
  // Get all posts
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  // Get single post
  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  });
    // Create Post
app.post("/api/posts", requireAdmin, async (req, res) => {
  const post = await storage.createPost(req.body);
  res.json(post);
});

// Update Post
app.put("/api/posts/:id", requireAdmin, async (req, res) => {

  const updated = await storage.updatePost(
    Number(req.params.id),
    req.body
  );
  res.json(updated);
});

// Delete Post
app.delete("/api/posts/:id", requireAdmin, async (req, res) => {

  await storage.deletePost(Number(req.params.id));
  res.json({ success: true });
});
  // Create message (Contact form)
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Initial Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    const samplePosts = [
      {
        title: "Mastering Data Structures & Algorithms",
        slug: "mastering-dsa",
        excerpt: "A comprehensive guide to starting your journey with DSA for technical interviews.",
        content: `
# Mastering Data Structures & Algorithms

Data Structures and Algorithms (DSA) are the building blocks of efficient software development. Whether you're preparing for technical interviews or aiming to become a better programmer, mastering DSA is essential.

## Why Learn DSA?
- **Problem Solving**: It enhances your ability to solve complex problems efficiently.
- **Performance**: Writing optimized code reduces execution time and memory usage.
- **Interviews**: Most top tech companies focus heavily on DSA during interviews.

## Where to Start?
1. **Big O Notation**: Understand time and space complexity.
2. **Arrays & Strings**: The basics of data manipulation.
3. **Linked Lists**: Understanding pointers and dynamic memory.
4. **Stacks & Queues**: LIFO and FIFO principles.
5. **Trees & Graphs**: Hierarchical data structures.

Start small, practice daily on platforms like LeetCode or HackerRank, and visualize the algorithms to understand them better.
        `,
        author: "Alex Chen",
        category: "Coding",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        readTime: "5 min read",
        isFeatured: true
      },
      {
        title: "Productivity Hacks for Developers",
        slug: "productivity-hacks",
        excerpt: "Stay focused and efficient with these proven productivity techniques for coders.",
        content: `
# Productivity Hacks for Developers

Coding requires deep focus, but distractions are everywhere. Here are some strategies to maximize your productivity.

## 1. The Pomodoro Technique
Work for 25 minutes, break for 5. This keeps your mind fresh and prevents burnout.

## 2. Time Blocking
Allocate specific blocks of time for deep work, meetings, and emails. Don't context switch.

## 3. Keyboard Shortcuts
Mastering your IDE's shortcuts can save you hours every week. Learn to navigate without the mouse.

## 4. Automate Repetitive Tasks
If you do it more than twice, write a script for it.

## 5. Take Care of Your Health
Sleep, exercise, and hydration directly impact your cognitive abilities. Don't neglect them.
        `,
        author: "Sarah Johnson",
        category: "Productivity",
        imageUrl: "https://images.unsplash.com/photo-1499750310159-529800cf2c5a?auto=format&fit=crop&w=800&q=80",
        readTime: "4 min read",
        isFeatured: false
      },
      {
        title: "How to Avoid Burnout in Tech",
        slug: "avoid-burnout",
        excerpt: "Recognize the signs of burnout and learn strategies to maintain a healthy work-life balance.",
        content: `
# How to Avoid Burnout in Tech

Burnout is real, and it hits hard in the tech industry. Long hours, constant learning, and imposter syndrome can take a toll.

## Signs of Burnout
- Chronic fatigue
- Lack of motivation
- Cynicism towards work
- Reduced professional efficacy

## Prevention Strategies
- **Set Boundaries**: Learn to say no. Don't check emails after work hours.
- **Hobbies**: Have interests outside of coding.
- **Community**: Talk to peers. You're not alone.
- **Rest**: Take vacations. Unplug completely.

Remember, coding is a marathon, not a sprint. Pace yourself.
        `,
        author: "Mike Ross",
        category: "Tech Life",
        imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
        readTime: "6 min read",
        isFeatured: true
      },
      {
        title: "Best Programming Languages in 2026",
        slug: "best-languages-2026",
        excerpt: "An analysis of the most in-demand programming languages to learn this year.",
        content: `
# Best Programming Languages in 2026

The tech landscape changes rapidly. Here are the top languages to focus on in 2026.

## 1. JavaScript / TypeScript
Still the king of the web. Essential for full-stack development.

## 2. Python
Dominates AI, Machine Learning, and Data Science.

## 3. Rust
Gaining massive traction for systems programming due to its memory safety and performance.

## 4. Go (Golang)
Excellent for cloud-native applications and microservices.

## 5. Swift & Kotlin
The standards for iOS and Android mobile development respectively.

Choose a language based on what you want to build, not just what's popular.
        `,
        author: "Emily Davis",
        category: "Tech",
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
        readTime: "5 min read",
        isFeatured: false
      },
      {
        title: "Study Routine for CS Students",
        slug: "study-routine",
        excerpt: "Optimize your study habits to ace your exams and retain knowledge effectively.",
        content: `
# Study Routine for CS Students

Computer Science is challenging. A good study routine is your best weapon.

## Morning (Deep Work)
- Tackle the hardest concepts first when your brain is fresh.
- Code implementation of algorithms.

## Afternoon (Lectures & Review)
- Attend classes.
- Review notes immediately after.
- Work on group projects.

## Evening (Practice & Relax)
- LeetCode practice (1 hour).
- Read tech blogs or documentation.
- Relax and recharge.

## Tips
- **Active Recall**: Test yourself instead of re-reading notes.
- **Spaced Repetition**: Review topics at increasing intervals.
- **Build Projects**: Apply what you learn.
        `,
        author: "David Lee",
        category: "Study",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
        readTime: "7 min read",
        isFeatured: false
      },
      {
        title: "Building Projects as a Beginner",
        slug: "building-projects",
        excerpt: "Why tutorial hell is dangerous and how to start building your own applications.",
        content: `
# Building Projects as a Beginner

Watching tutorials is easy. Building from scratch is hard. But that's where the learning happens.

## The Problem with Tutorial Hell
You follow along, everything works, but you can't build anything on your own. This is because you're mimicking, not solving problems.

## How to Break Free
1. **Start Small**: Build a To-Do list, a Weather app, or a simple Calculator.
2. **Don't Copy-Paste**: Type every line of code. Understand what it does.
3. **Add Features**: Take a tutorial project and add a new feature to it on your own.
4. **Google is Your Friend**: Learning to search for solutions is a skill in itself.

Just start building. It doesn't have to be perfect.
        `,
        author: "Jessica Wong",
        category: "Coding",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        readTime: "4 min read",
        isFeatured: true
      }
    ];

    for (const post of samplePosts) {
      await storage.createPost(post);
    }
    console.log("Database seeded with sample posts");
  }
}


