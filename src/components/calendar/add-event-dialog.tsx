"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { createTask } from "@/actions/tasks";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export function AddEventDialog({
  lists,
  trigger
}: {
  lists: any[];
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await createTask(formData);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Kegiatan / Tugas berhasil ditambahkan!");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-2 shadow-(--shadow-md)">
            <Plus className="h-4 w-4" /> Tambah Kegiatan
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-110">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Tambah Kegiatan / Tugas Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kegiatan</Label>
            <Input id="title" name="title" required placeholder="Contoh: Rapat Tim, Beli Kebutuhan..." className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi / Catatan Tambahan</Label>
            <Textarea id="description" name="description" placeholder="Catatan singkat..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="startDate">Mulai</Label>
              <Input id="startDate" name="startDate" type="datetime-local" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Selesai / Tenggat</Label>
              <Input id="endDate" name="endDate" type="datetime-local" className="h-11" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Checkbox id="allDay" name="allDay" value="true" />
            <Label htmlFor="allDay" className="text-sm font-normal cursor-pointer">Acara Sepanjang Hari</Label>
          </div>
          <div className="space-y-2">
            <Label>List / Kategori</Label>
            <Select name="listId">
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Pilih list" />
              </SelectTrigger>
              <SelectContent>
                {lists.map((l) => (
                  <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4 flex justify-end gap-2.5">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              Batal
            </Button>
            <Button type="submit" disabled={pending} className="shadow-(--shadow-md)">
              {pending ? "Menyimpan..." : "Simpan Kegiatan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
