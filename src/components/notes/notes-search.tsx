"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = { id: string; name: string };
type Tag = { id: string; name: string };

export function NotesSearch({
  categories,
  tags,
}: {
  categories: Category[];
  tags: Tag[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const q = searchParams.get("q") ?? "";
  const categoryId = searchParams.get("category") ?? "all";
  const tagId = searchParams.get("tag") ?? "all";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") params.set(key, value);
      else params.delete(key);
      startTransition(() => {
        router.push(`/notes?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <div className={`space-y-3 ${pending ? "opacity-70" : ""}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Cari judul, isi, tag, kategori..."
          defaultValue={q}
          onChange={(e) => updateParams("q", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Select value={categoryId} onValueChange={(v) => updateParams("category", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua kategori</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={tagId} onValueChange={(v) => updateParams("tag", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua tag</SelectItem>
            {tags.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                #{t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
