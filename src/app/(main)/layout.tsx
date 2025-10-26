// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/shared/Layout/MainLayout";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-0 p-0 w-full h-screen antialiased bg-gray-50 text-gray-900`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
