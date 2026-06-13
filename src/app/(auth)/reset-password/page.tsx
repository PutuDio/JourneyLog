import { AuthForm } from "@/components/auth/auth-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Token tidak valid. Minta link reset baru.
      </div>
    );
  }
  return <AuthForm mode="reset" token={token} />;
}
