import { usePost } from "@/hooks/use-posts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { Calendar, Clock, User, Share2, MessageCircle, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function PostDetail() {
  const [match, params] = useRoute("/post/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading, error } = usePost(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <Skeleton className="w-full h-[400px] rounded-2xl mb-8" />
          <Skeleton className="w-3/4 h-12 mb-4" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="space-y-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground">Article not found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pb-20">
        {/* Header Image */}
        <div className="w-full h-[40vh] md:h-[60vh] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          {/* Unsplash image from post data */}
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <article className="container max-w-4xl mx-auto px-4 -mt-20 md:-mt-32 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border rounded-2xl shadow-xl p-6 md:p-12 mb-12"
          >
            <div className="flex gap-2 mb-6">
              <Badge>{post.category}</Badge>
              {post.isFeatured && (
                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">Featured</Badge>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b pb-8 mb-8">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {post.author[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.createdAt && format(new Date(post.createdAt), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground mb-8 font-light">
                {post.excerpt}
              </p>
              <div className="whitespace-pre-wrap font-sans">
                {post.content}
              </div>
            </div>

            <Separator className="my-12" />

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" /> Save
                </Button>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                Tags: 
                <span className="text-primary hover:underline cursor-pointer">#{post.category.toLowerCase()}</span>
                <span className="text-primary hover:underline cursor-pointer">#programming</span>
              </div>
            </div>
          </motion.div>

          {/* Comments Section (Static UI) */}
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" /> Comments (3)
            </h3>
            
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">User {i}</span>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm">Great article! Really helped me understand the concepts better. Keep up the good work!</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
