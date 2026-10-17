import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppToaster } from "@/components/providers/app-toaster";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "JourneyLog",
    template: "%s | JourneyLog",
  },
  description: "Catat perjalanan, aktivitas harian, dan progres gym dalam satu aplikasi.",
  icons: {
    icon: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${roboto.variable} antialiased`}
        style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
