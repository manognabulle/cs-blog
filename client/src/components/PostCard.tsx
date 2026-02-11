import { Link } from "wouter";
import { type Post } from "@shared/schema";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block h-full">
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-full overflow-hidden rounded-2xl bg-card border shadow-lg transition-all hover:shadow-xl dark:shadow-none"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Unsplash image with fallback */}
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
            <Badge className="mb-4 bg-primary text-primary-foreground border-none hover:bg-primary/90">
              {post.category}
            </Badge>
            <h2 className="mb-2 font-display text-2xl md:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h2>
            <p className="mb-4 text-gray-200 line-clamp-2 md:text-lg">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.createdAt && format(new Date(post.createdAt), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <motion.div 
        whileHover={{ y: -5 }}
        className="flex flex-col h-full overflow-hidden rounded-xl bg-card border shadow-sm transition-all hover:shadow-md hover:border-primary/50"
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="backdrop-blur-md bg-white/90 dark:bg-black/70">
              {post.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col flex-grow p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.createdAt && format(new Date(post.createdAt), 'MMM d, yyyy')}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
          
          <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {post.excerpt}
          </p>
          
          <div className="flex items-center text-sm font-semibold text-primary group-hover:underline">
            Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
