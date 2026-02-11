import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code2, BookOpen, Laptop, Clock } from "lucide-react";

interface CategoryFilterProps {
  currentCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({ currentCategory, onSelect }: CategoryFilterProps) {
  const categories = [
    { id: "Tech", label: "Tech", icon: Laptop },
    { id: "Study", label: "Study", icon: BookOpen },
    { id: "Coding", label: "Coding", icon: Code2 },
    { id: "Productivity", label: "Productivity", icon: Clock },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center py-8">
      <Button
        variant={currentCategory === null ? "default" : "outline"}
        onClick={() => onSelect(null)}
        className="rounded-full px-6"
      >
        All Posts
      </Button>
      
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = currentCategory === cat.id;
        
        return (
          <Button
            key={cat.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => onSelect(isActive ? null : cat.id)}
            className={cn(
              "rounded-full px-6 gap-2",
              isActive ? "" : "hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            <Icon className="h-4 w-4" />
            {cat.label}
          </Button>
        );
      })}
    </div>
  );
}
