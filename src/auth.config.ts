// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt", // WAJIB pakai JWT agar bisa dibaca oleh Middleware di Vercel Edge
  },
  pages: {
    signIn: "/login",
  },
  providers: [], // Biarkan kosong di sini, akan kita isi di file utama
} satisfies NextAuthConfig;
