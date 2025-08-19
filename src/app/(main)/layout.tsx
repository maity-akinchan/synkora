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
        <span className="md:hidden mb-10 z-999">
          <Navbar />
        </span>
        <span className="md:w-3/12">
          <SidebarProvider>
            <AppSidebar />
            {/* <SidebarTrigger className="fixed z-999" /> */}
            <main>
              <div
                className="min-h-screen sm:py-12 md:py-0 sm:w-screen md:w-[90%]"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
              >
                <div className="px-10 sm:py-10 md:py-20 z-1">
                  {children}
                </div>
              </div>

            </main>
          </SidebarProvider>
        </span>
      </body>
    </html>
  );
}
