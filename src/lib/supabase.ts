import { createClient, SupabaseClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(raw: string) {
  return raw.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

export function getSupabaseAdmin(): SupabaseClient {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!rawUrl || !key) {
    throw new Error(
      "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env"
    );
  }

  if (key.startsWith("sb_publishable_") || key.includes("publishable")) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY salah: gunakan service_role (secret) dari Supabase Dashboard → Settings → API, bukan publishable key"
    );
  }

  const url = normalizeSupabaseUrl(rawUrl);

  if (!url.includes(".supabase.co")) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL salah: gunakan Project URL seperti https://xxxxx.supabase.co (tanpa /rest/v1/)"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getStorageBucket() {
  return process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? "journeylog-images";
}
