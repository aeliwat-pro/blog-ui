import { BlogCard } from "@/components/BlogCard";
import { posts } from "@/data/posts";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;