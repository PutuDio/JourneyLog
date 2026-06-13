"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    <div className="mx-auto w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{titles[mode]}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {mode === "login" && "Masuk untuk melanjutkan catatanmu."}
        {mode === "register" && "Daftar dan dapatkan kategori Travel, Daily, Gym."}
        {mode === "forgot" && "Masukkan email untuk menerima link reset."}
        {mode === "reset" && "Masukkan password baru."}
      </p>

      <form action={handleSubmit} className="mt-6 space-y-4">
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

        {error && <p className="text-sm text-destructive">{error}</p>}

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

      <div className="mt-4 space-y-2 text-center text-sm">
        {mode === "login" && (
          <>
            <Link href="/forgot-password" className="text-primary hover:underline">
              Lupa password?
            </Link>
            <p>
              Belum punya akun?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Daftar
              </Link>
            </p>
          </>
        )}
        {mode === "register" && (
          <p>
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Masuk
            </Link>
          </p>
        )}
        {(mode === "forgot" || mode === "reset") && (
          <Link href="/login" className="text-primary hover:underline">
            Kembali ke login
          </Link>
        )}
      </div>
    </div>
  );
}
