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
      toast.success("List baru berhasil dibuat!");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-primary hover:bg-primary-container/40 transition-colors w-full text-left mt-1">
            <Plus className="h-4 w-4" /> Tambah List Baru
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-90">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Buat List Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nama List</Label>
            <Input id="name" name="name" required placeholder="Contoh: Pekerjaan, Olahraga" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Warna (Tailwind Class)</Label>
            <Input id="color" name="color" placeholder="misal: bg-teal-500, bg-rose-500" defaultValue="bg-teal-600" className="h-11" />
          </div>
          <div className="pt-4 flex justify-end gap-2.5">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              Batal
            </Button>
            <Button type="submit" disabled={pending} className="shadow-(--shadow-md)">
              {pending ? "Menyimpan..." : "Simpan List"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
