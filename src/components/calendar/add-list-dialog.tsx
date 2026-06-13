"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createTaskList } from "@/actions/tasks";
import { toast } from "sonner";

export function AddListDialog({
  trigger
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await createTaskList(formData);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("List berhasil dibuat!");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full text-left">
            <Plus className="h-4 w-4" /> Add New List
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>Add New List</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">List Name</Label>
            <Input id="name" name="name" required placeholder="e.g. Work, Personal" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color (Tailwind Class)</Label>
            <Input id="color" name="color" placeholder="e.g. bg-red-500" defaultValue="bg-blue-500" />
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
