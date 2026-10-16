export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-dim px-6 py-16">
      {children}
    </div>
  );
}
