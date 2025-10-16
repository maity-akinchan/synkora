// app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/shared/Layout/MainLayout"; // NEW: Import a new client component
import { Metadata } from "next"; // NEW: Import Metadata type for SEO

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// NEW: Add metadata for SEO and better browser tab information
export const metadata: Metadata = {
  title: "App Dashboard",
  description: "Dashboard for your application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning for theme providers etc. */}
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-0 p-0 w-full h-screen antialiased bg-gray-50 text-gray-900`}
      >
        {/* MODIFIED: Wrap children in the new MainLayout client component */}
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}