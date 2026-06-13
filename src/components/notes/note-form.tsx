"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { createNote, updateNote } from "@/actions/notes";
import { Upload, Trash2, Loader2 } from "lucide-react";

type Category = { id: string; name: string };
type NoteImage = { id: string; imageUrl: string };

export function NoteForm({
  categories,
  note,
}: {
  categories: Category[];
  note?: {
    id: string;
    title: string;
    content: string;
    categoryId: string;
    noteTags: { tag: { name: string } }[];
    images: NoteImage[];
  };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [categoryId, setCategoryId] = useState(
    note?.categoryId ?? categories[0]?.id ?? ""
  );
  const [tags, setTags] = useState(
    note?.noteTags.map((nt) => nt.tag.name).join(", ") ?? ""
  );
  const [images, setImages] = useState<NoteImage[]>(note?.images ?? []);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("categoryId", categoryId);
    formData.set("tags", tags);

    startTransition(async () => {
      const result = note
        ? await updateNote(note.id, formData)
        : await createNote(formData);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(note ? "Catatan diperbarui" : "Catatan dibuat");
      router.push("/notes");
      router.refresh();
    });
  }

  async function handleUpload(file: File) {
    const noteId = note?.id;
    if (!noteId) {
      toast.error("Simpan catatan terlebih dahulu sebelum mengunggah gambar");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("noteId", noteId);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload gagal");
      setImages((prev) => [...prev, data.image]);
      toast.success("Gambar diunggah");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteImage(imageId: string) {
    try {
      const res = await fetch(`/api/upload?imageId=${imageId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menghapus");
      setImages((prev) => prev.filter((i) => i.id !== imageId));
      toast.success("Gambar dihapus");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul catatan"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Kategori</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="bali, latihan, pagi"
        />
      </div>

      <div className="space-y-2">
        <Label>Isi catatan</Label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      {note && (
        <div className="space-y-2">
          <Label>Gambar</Label>
          <div className="flex flex-wrap gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative h-24 w-24 overflow-hidden rounded-lg border">
                <Image src={img.imageUrl} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute right-1 top-1 rounded bg-destructive/90 p-1 text-destructive-foreground"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-primary">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Unggah gambar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
          </label>
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : note ? "Simpan Perubahan" : "Buat Catatan"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Batal
        </Button>
      </div>
    </form>
  );
}
