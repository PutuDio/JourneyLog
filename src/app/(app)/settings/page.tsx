"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/actions/categories";
import { createTag } from "@/actions/tags";

export default function SettingsPage() {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-sm text-muted-foreground">
          Kelola kategori kustom dan tag
        </p>
      </div>

      <section className="space-y-3 rounded-xl border p-4">
        <h2 className="font-semibold">Kategori Kustom</h2>
        <form
          action={(formData) => {
            startTransition(async () => {
              const result = await createCategory(formData);
              if (result.error) toast.error(result.error);
              else toast.success("Kategori ditambahkan");
            });
          }}
          className="flex gap-2"
        >
          <div className="flex-1 space-y-2">
            <Label htmlFor="cat-name">Nama kategori</Label>
            <Input id="cat-name" name="name" placeholder="Work, Study..." required />
          </div>
          <Button type="submit" className="mt-8" disabled={pending}>
            Tambah
          </Button>
        </form>
      </section>

      <section className="space-y-3 rounded-xl border p-4">
        <h2 className="font-semibold">Tag Baru</h2>
        <form
          action={(formData) => {
            startTransition(async () => {
              const result = await createTag(formData);
              if (result.error) toast.error(result.error);
              else toast.success("Tag ditambahkan");
            });
          }}
          className="flex gap-2"
        >
          <div className="flex-1 space-y-2">
            <Label htmlFor="tag-name">Nama tag</Label>
            <Input id="tag-name" name="name" placeholder="weekend" required />
          </div>
          <Button type="submit" className="mt-8" disabled={pending}>
            Tambah
          </Button>
        </form>
      </section>
    </div>
  );
}
