import { useState } from "react";
import { usePosts } from "@/hooks/use-posts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/PostCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { motion } from "framer-motion";
import { ArrowDown, Loader2 } from "lucide-react";

export default function Home() {
  const { data: posts, isLoading, error } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = posts?.filter(post => 
    selectedCategory ? post.category === selectedCategory : true
  );

  const featuredPost = posts?.find(p => p.isFeatured) || posts?.[0];
  const remainingPosts = filteredPosts?.filter(p => p.id !== featuredPost?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive">
        Error loading posts. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          
          <div className="container px-4 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6">
                CS <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
                Tech • Study • Code • Build
              </p>
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowDown className="h-6 w-6 text-muted-foreground/50" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container px-4 mx-auto pb-20">
          <CategoryFilter 
            currentCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />

          {/* Featured Section */}
          {!selectedCategory && featuredPost && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 h-[500px]"
            >
              <h2 className="font-display text-2xl font-bold mb-6">Featured Story</h2>
              <PostCard post={featuredPost} featured={true} />
            </motion.section>
          )}

          {/* Recent Posts Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold">
                {selectedCategory ? `${selectedCategory} Articles` : "Recent Articles"}
              </h2>
            </div>
            
            {remainingPosts && remainingPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                No posts found in this category.
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
