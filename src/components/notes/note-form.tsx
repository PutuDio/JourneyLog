"use client";

import { useState, useTransition, useEffect } from "react";
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
import {
  Trash2,
  Loader2,
  ImagePlus,
  MapPin,
  LocateFixed,
  ExternalLink,
  Navigation,
} from "lucide-react";

type Category = { id: string; name: string };
type NoteImage = { id: string; imageUrl: string };

type PendingFile = {
  id: string;
  file: File;
  previewUrl: string;
};

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
    locationName?: string | null;
    locationAddress?: string | null;
    latitude?: number | null;
    longitude?: number | null;
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

  // Location states
  const [locationName, setLocationName] = useState(note?.locationName ?? "");
  const [locationAddress, setLocationAddress] = useState(note?.locationAddress ?? "");
  const [latitude, setLatitude] = useState<number | undefined>(note?.latitude ?? undefined);
  const [longitude, setLongitude] = useState<number | undefined>(note?.longitude ?? undefined);
  const [locating, setLocating] = useState(false);

  // Images states
  const [existingImages, setExistingImages] = useState<NoteImage[]>(note?.images ?? []);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [uploadingSingle, setUploadingSingle] = useState(false);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
  }, [pendingFiles]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems: PendingFile[] = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setPendingFiles((prev) => [...prev, ...newItems]);
    e.target.value = "";
  }

  function handleRemovePendingFile(id: string) {
    setPendingFiles((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  async function handleDeleteExistingImage(imageId: string) {
    try {
      const res = await fetch(`/api/upload?imageId=${imageId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menghapus gambar");
      setExistingImages((prev) => prev.filter((i) => i.id !== imageId));
      toast.success("Foto dihapus");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus");
    }
  }

  function handleGetCurrentLocation() {
    if (typeof window === "undefined" || !navigator.geolocation) {
      toast.error("Geolokasi tidak didukung oleh browser Anda");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);

        try {
          // Free reverse geocoding from OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            {
              headers: {
                "Accept-Language": "id,en",
              },
            }
          );
          const data = await res.json();
          if (data && data.address) {
            const suggestedName =
              data.address.tourism ||
              data.address.leisure ||
              data.address.amenity ||
              data.address.building ||
              data.address.suburb ||
              data.address.city ||
              data.address.town ||
              data.name ||
              "Lokasi Saat Ini";

            if (!locationName) setLocationName(suggestedName);
            if (!locationAddress) setLocationAddress(data.display_name);
          }
          toast.success("Lokasi terdeteksi!");
        } catch {
          toast.success("Koordinat GPS berhasil diperoleh!");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        toast.error("Gagal mendeteksi lokasi: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("categoryId", categoryId);
    formData.set("tags", tags);
    formData.set("locationName", locationName);
    formData.set("locationAddress", locationAddress);
    if (latitude !== undefined) formData.set("latitude", String(latitude));
    if (longitude !== undefined) formData.set("longitude", String(longitude));

    // Append all selected pending photos
    pendingFiles.forEach(({ file }) => {
      formData.append("images", file);
    });

    startTransition(async () => {
      const result = note
        ? await updateNote(note.id, formData)
        : await createNote(formData);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(note ? "Catatan berhasil diperbarui" : "Catatan dan kenangan berhasil disimpan");
      router.push("/notes");
      router.refresh();
    });
  }

  const mapsQuery =
    locationName ||
    locationAddress ||
    (latitude && longitude ? `${latitude},${longitude}` : "");
  const mapsUrl = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-outline-variant/30 bg-card p-6 md:p-8 shadow-(--shadow-md) space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-foreground">
            Judul Catatan
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tulis judul cerita atau momenmu..."
            className="text-base font-medium h-12"
            required
          />
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-foreground">Kategori</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="h-11">
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
            <Label htmlFor="tags" className="text-foreground">
              Tag (pisahkan dengan koma)
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="misal: kenangan, liburan, santai"
              className="h-11"
            />
          </div>
        </div>

        {/* Location / Tempat Kenangan */}
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low/50 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                Lokasi & Tempat Kenangan
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGetCurrentLocation}
                disabled={locating}
                className="h-8 gap-1.5 rounded-full text-xs"
              >
                {locating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <LocateFixed className="h-3.5 w-3.5 text-primary" />
                )}
                <span>Deteksi Lokasi Saya</span>
              </Button>

              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline px-2 py-1"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Lihat di Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="locationName" className="text-xs text-muted-foreground">
                Nama Tempat / Destinasi
              </Label>
              <Input
                id="locationName"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="misal: Pantai Kuta, Bromo, Kafe Senja..."
                className="h-10 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="locationAddress" className="text-xs text-muted-foreground">
                Alamat / Keterangan Lokasi
              </Label>
              <Input
                id="locationAddress"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                placeholder="misal: Jl. Pantai Kuta, Badung, Bali"
                className="h-10 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Note Content (Rich Text) */}
        <div className="space-y-2">
          <Label className="text-foreground">Isi Catatan</Label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* Photos & Memories (Available directly for new notes & edit!) */}
        <div className="space-y-3 pt-4 border-t border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground text-sm font-bold">
                Foto Kenangan ({existingImages.length + pendingFiles.length})
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tambahkan foto momen atau pemandangan di tempat tersebut
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
            {/* Existing uploaded images */}
            {existingImages.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square overflow-hidden rounded-xl border border-outline-variant/30 group bg-surface-container"
              >
                <Image
                  src={img.imageUrl}
                  alt="Foto kenangan"
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExistingImage(img.id)}
                  className="absolute right-2 top-2 rounded-full bg-destructive/90 p-1.5 text-destructive-foreground opacity-90 transition-opacity hover:opacity-100 shadow-sm"
                  aria-label="Hapus gambar"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {/* Pending newly selected images */}
            {pendingFiles.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-xl border-2 border-primary/40 group bg-surface-container"
              >
                <Image
                  src={item.previewUrl}
                  alt="Preview foto"
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <span className="absolute left-2 bottom-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white font-medium">
                  Baru
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePendingFile(item.id)}
                  className="absolute right-2 top-2 rounded-full bg-destructive/90 p-1.5 text-destructive-foreground opacity-90 transition-opacity hover:opacity-100 shadow-sm"
                  aria-label="Batalkan foto"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {/* Upload slot button */}
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant/60 bg-surface-container-low text-muted-foreground transition-all hover:border-primary/60 hover:bg-surface-container hover:text-foreground">
              <ImagePlus className="h-6 w-6 text-primary" />
              <div className="text-center px-2">
                <span className="text-xs font-bold block text-primary">Pilih Foto</span>
                <span className="text-[10px] text-muted-foreground block">Bisa lebih dari 1</span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={pending}
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={pending}
          className="px-8 shadow-(--shadow-md) gap-2"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending
            ? "Menyimpan Catatan & Foto..."
            : note
            ? "Simpan Perubahan"
            : "Simpan Catatan"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="px-6"
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
