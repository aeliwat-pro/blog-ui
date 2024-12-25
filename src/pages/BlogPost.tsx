import { useParams, useNavigate } from "react-router-dom";
import { posts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <div className="container py-12">Post not found</div>;
  }

  return (
    <article className="min-h-screen relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-50"
        onClick={() => navigate('/')}
      >
        <X className="h-6 w-6" />
      </Button>
      <div className="h-[60vh] relative overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-3xl px-4">
            <Badge variant="secondary" className="bg-accent/10 text-white hover:bg-accent/20">
              {post.category}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold">{post.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-12">
        <div className="prose-custom">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;