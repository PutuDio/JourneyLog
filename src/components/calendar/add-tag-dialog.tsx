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
    
    startTransition(async () => {
      await new Promise(r => setTimeout(r, 400));
      toast.success(`Tag "${tagName}" ditambahkan!`);
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container hover:bg-surface-container-high text-foreground rounded-full text-xs font-semibold transition-colors">
            <Plus className="h-3 w-3" /> Tambah
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-85">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Tambah Tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Tag</Label>
            <Input id="name" name="name" required placeholder="Contoh: penting, liburan" className="h-11" />
          </div>
          <div className="pt-4 flex justify-end gap-2.5">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              Batal
            </Button>
            <Button type="submit" disabled={pending} className="shadow-(--shadow-md)">
              {pending ? "Menyimpan..." : "Simpan Tag"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
