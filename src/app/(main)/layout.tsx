import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation/appSidebar"
import Navbar from '@/components/navigation/navbar';
import { verifyToken } from "@/lib/controllers/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen`}
      >
        <div className="md:hidden mb-10 fixed z-10">
          <Navbar />
        </div>
        <div className="w-full">
          <SidebarProvider>
            <AppSidebar />
            {/* <SidebarTrigger className="fixed z-999" /> */}
                  {children}
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
