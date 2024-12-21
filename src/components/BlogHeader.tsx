import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function BlogHeader() {
  return (
    <header className="border-b">
      <div className="container py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Blog
        </Link>
        <Link to="/create">
          <Button>Create Post</Button>
        </Link>
      </div>
    </header>
  );
}