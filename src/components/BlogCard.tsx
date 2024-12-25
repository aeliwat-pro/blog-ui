import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    readTime: string;
    date: string;
    category: string;
    tags?: string[];
  };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/post/${post.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
              {post.category}
            </Badge>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight hover:text-accent transition-colors">
            {post.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <div key={tag} className="flex items-center text-sm text-muted-foreground">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}