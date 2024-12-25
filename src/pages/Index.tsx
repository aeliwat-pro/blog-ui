import { BlogCard } from "@/components/BlogCard";
import { posts } from "@/data/posts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";

const Index = () => {
  const [searchTag, setSearchTag] = useState("");

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(
      posts.flatMap((post) => 
        post.tags ? post.tags : []
      )
    )
  );

  // Filter posts based on tag search
  const filteredPosts = posts.filter((post) => {
    if (!searchTag) return true;
    return post.tags?.some(tag => 
      tag.toLowerCase().includes(searchTag.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen">
      <main className="container py-12">
        <div className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by tag..."
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              className="pl-10"
            />
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
          {allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    searchTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
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