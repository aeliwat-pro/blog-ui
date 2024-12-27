import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}


export function TagInput({ tags, onAddTag, onRemoveTag }: TagInputProps) {
    const [tagInput, setTagInput] = React.useState("");

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            onAddTag(tagInput.trim()); // Adds tag to form state
            setTagInput(""); // Clear the input field after adding tag
        }
    };

    return (
        <div className="space-y-2">
            <FormLabel>Tags</FormLabel>
            <div className="flex gap-2">
                <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tags"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                        }
                    }}
                />
                <Button type="button" onClick={handleAddTag}>
                    Add Tag
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                    <div
                        key={tag}
                        className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => onRemoveTag(tag)} // Removes tag from form state
                            className="text-secondary-foreground/50 hover:text-secondary-foreground"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}