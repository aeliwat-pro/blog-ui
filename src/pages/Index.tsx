import { BlogCard } from "@/components/BlogCard";
import { posts } from "@/data/posts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tag, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get unique tags and categories from all posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags ? post.tags : []))
  );
  
  const allCategories = Array.from(
    new Set(posts.map((post) => post.category))
  );

  // Filter posts based on search query, selected tags, and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      (post.tags && selectedTags.every(tag => post.tags.includes(tag)));
    const matchesCategory = !selectedCategory || post.category === selectedCategory;

    return matchesSearch && matchesTags && matchesCategory;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen">
      <main className="container py-12">
        <div className="space-y-6 mb-8">
          {/* Search input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? "" : category
                  )}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;