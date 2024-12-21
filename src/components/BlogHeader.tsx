import { Button } from "@/components/ui/button";

export function BlogHeader() {
  return (
    <header className="py-20 text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Welcome to Our Blog
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Discover stories, thinking, and expertise from writers on any topic.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="default" size="lg">
          Start Reading
        </Button>
        <Button variant="outline" size="lg">
          Subscribe
        </Button>
      </div>
    </header>
  );
}