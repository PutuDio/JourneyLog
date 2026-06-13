"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddTagDialog({
  trigger
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tagName = formData.get("name") as string;
    
    // Todo: Impelement server action for tags if needed. Currently we just show a toast
    // The Tag model already exists in Prisma. Let's assume we create it here or just fake it for now.
    startTransition(async () => {
      // Simulate API call
      await new Promise(r => setTimeout(r, 500));
      toast.success(`Tag "${tagName}" ditambahkan!`);
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-md text-xs hover:bg-muted/80 transition-colors">
            <Plus className="h-3 w-3" /> Add Tag
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>Add New Tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tag Name</Label>
            <Input id="name" name="name" required placeholder="e.g. Urgent, Ideas" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>Cancel</Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
