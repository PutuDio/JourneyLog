"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  registerAction,
  loginAction,
  forgotPasswordAction,
  resetPasswordAction,
} from "@/actions/auth";

type AuthMode = "login" | "register" | "forgot" | "reset";

export function AuthForm({ mode, token }: { mode: AuthMode; token?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const titles: Record<AuthMode, string> = {
    login: "Masuk ke JourneyLog",
    register: "Buat akun baru",
    forgot: "Lupa kata sandi",
    reset: "Reset kata sandi",
  };

  const subtitles: Record<AuthMode, string> = {
    login: "Masuk untuk melanjutkan catatanmu.",
    register: "Daftar dan dapatkan kategori Travel, Daily, Gym.",
    forgot: "Masukkan email untuk menerima link reset.",
    reset: "Masukkan password baru.",
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      let result: { error?: string; success?: boolean; message?: string } = {};

      if (mode === "register") result = await registerAction(formData);
      else if (mode === "login") result = await loginAction(formData);
      else if (mode === "forgot") result = await forgotPasswordAction(formData);
      else if (mode === "reset") result = await resetPasswordAction(formData);

      if (result.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      if (result.message) toast.success(result.message);

      if (mode === "forgot") return;

      if (mode === "reset") {
        toast.success("Password berhasil diubah");
        router.push("/login");
        return;
      }

      toast.success(mode === "register" ? "Akun berhasil dibuat" : "Selamat datang!");
      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-card p-8 shadow-(--shadow-lg)">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <Link href="/" className="group flex flex-col items-center gap-2">
          <Image
            src="/logo.png"
            alt="JourneyLog Logo"
            width={48}
            height={48}
            className="h-12 w-12 rounded-2xl shadow-xs transition-transform duration-200 group-hover:scale-105"
            priority
          />
          <span className="text-2xl font-bold text-primary tracking-tight">JourneyLog</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-center">{titles[mode]}</h1>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        {subtitles[mode]}
      </p>

      <form action={handleSubmit} className="mt-8 space-y-5">
        {mode === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" required placeholder="Putu Dio" />
          </div>
        )}

        {(mode === "login" || mode === "register" || mode === "forgot") && (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="nama@email.com" />
          </div>
        )}

        {(mode === "login" || mode === "register" || mode === "reset") && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>
        )}

        {mode === "reset" && token && (
          <input type="hidden" name="token" value={token} />
        )}

        {error && (
          <div className="rounded-xl bg-[#f9dedc] px-4 py-3 text-sm text-[#410e0b]">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending
            ? "Memproses..."
            : mode === "login"
              ? "Masuk"
              : mode === "register"
                ? "Daftar"
                : mode === "forgot"
                  ? "Kirim Link"
                  : "Simpan Password"}
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm">
        {mode === "login" && (
          <>
            <Link href="/forgot-password" className="text-primary font-medium hover:underline">
              Lupa password?
            </Link>
            <p className="text-muted-foreground">
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline">
                Daftar
              </Link>
            </p>
          </>
        )}
        {mode === "register" && (
          <p className="text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Masuk
            </Link>
          </p>
        )}
        {(mode === "forgot" || mode === "reset") && (
          <Link href="/login" className="text-primary font-medium hover:underline">
            Kembali ke login
          </Link>
        )}
      </div>
    </div>
  );
}
