import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TagInput } from "@/components/TagInput";
import { blogFormSchema, type BlogFormValues } from "@/schemas/blogSchema";

const CreateBlog = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      tags: [],
    },
  });

  // const onSubmit = (values: BlogFormValues) => {
  //   console.log(values);
  //   toast({
  //     title: "Blog post created!",
  //     description: "Your blog post has been successfully created.",
  //   });
  //   navigate("/");
  // };

    const onSubmit = async (values: BlogFormValues) => {

        // Convert the tags array into a comma-separated string
        const tagsString = values.tags.join(",");

        // Construct the blog data object to send to the Spring backend
        const blogData = {
            title: values.title,
            excerpt: values.excerpt,
            content: values.content,
            coverImage: values.coverImage,
            category: values.category,
            tags: tagsString,
        };


        console.log(blogData)
        try {
            // Send a POST request to your Spring backend
            const response = await fetch(`/api/blog/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });

            if (response.ok) {
                toast({
                    title: "Blog post created!",
                    description: "Your blog post has been successfully created.",
                });
                navigate("/"); // Navigate to the home page or any desired page
            } else {
                throw new Error("Failed to create blog post");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an issue creating the blog post. Please try again.",
                variant: "destructive",
            });
            console.error(error);
        }
    };

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter a brief description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your blog content here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Accessibility">Accessibility</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <TagInput
                tags={field.value}
                onAddTag={(tag) => field.onChange([...field.value, tag])}
                onRemoveTag={(tagToRemove) =>
                  field.onChange(field.value.filter((tag) => tag !== tagToRemove))
                }
              />
            )}
          />

          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlog;