"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/actions/categories";
import { createTag } from "@/actions/tags";
import { FolderPlus, Tag, Plus } from "lucide-react";

export default function SettingsPage() {
  const [pendingCategory, startCategoryTransition] = useTransition();
  const [pendingTag, startTagTransition] = useTransition();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Pengaturan
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola kategori kustom dan tag untuk merapikan koleksi jurnalmu
        </p>
      </div>

      <div className="space-y-6">
        {/* Kategori Kustom */}
        <section className="rounded-2xl border border-outline-variant/30 bg-card p-6 md:p-8 shadow-(--shadow-md) space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-primary">
              <FolderPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Kategori Kustom</h2>
              <p className="text-xs text-muted-foreground">
                Tambahkan kategori baru untuk mengelompokkan catatanmu
              </p>
            </div>
          </div>

          <form
            action={(formData) => {
              startCategoryTransition(async () => {
                const result = await createCategory(formData);
                if (result.error) toast.error(result.error);
                else {
                  toast.success("Kategori baru berhasil ditambahkan!");
                  const input = document.getElementById("cat-name") as HTMLInputElement;
                  if (input) input.value = "";
                }
              });
            }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="cat-name">Nama Kategori</Label>
              <Input
                id="cat-name"
                name="name"
                placeholder="Contoh: Pekerjaan, Ide Buku, Kuliah..."
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="sm:self-end h-11 px-6 gap-2 shadow-(--shadow-md)"
              disabled={pendingCategory}
            >
              <Plus className="h-4 w-4" />
              {pendingCategory ? "Menambahkan..." : "Tambah Kategori"}
            </Button>
          </form>
        </section>

        {/* Tag Baru */}
        <section className="rounded-2xl border border-outline-variant/30 bg-card p-6 md:p-8 shadow-(--shadow-md) space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-container text-on-tertiary-container">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Tag Baru</h2>
              <p className="text-xs text-muted-foreground">
                Buat kata kunci spesifik untuk memudahkan pencarian
              </p>
            </div>
          </div>

          <form
            action={(formData) => {
              startTagTransition(async () => {
                const result = await createTag(formData);
                if (result.error) toast.error(result.error);
                else {
                  toast.success("Tag baru berhasil ditambahkan!");
                  const input = document.getElementById("tag-name") as HTMLInputElement;
                  if (input) input.value = "";
                }
              });
            }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="tag-name">Nama Tag</Label>
              <Input
                id="tag-name"
                name="name"
                placeholder="Contoh: weekend, refleksi, rencana"
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="sm:self-end h-11 px-6 gap-2 shadow-(--shadow-md)"
              disabled={pendingTag}
            >
              <Plus className="h-4 w-4" />
              {pendingTag ? "Menambahkan..." : "Tambah Tag"}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
