import { Geist, Geist_Mono } from "next/font/google";
import "./mains.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation/appSidebar"
import Navbar from '@/components/navigation/navbar';

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="fixed z-999" />
                  {children}
          </SidebarProvider>
      </body>
    </html>
  );
}
