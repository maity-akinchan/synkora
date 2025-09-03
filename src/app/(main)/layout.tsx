import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar, {SidebarProps} from "@/components/navigation/sidebar";
import { verifyToken } from "@/lib/controllers/auth";
import { MenuSquare, CheckSquare, Calendar, BarChart2, Users } from "lucide-react";

const sidebarItems: SidebarProps["items"] = [
  { label: "Dashboard", icon: <MenuSquare className="w-5 h-5" />, navigate: "/dashboard", current: true },
  { label: "Task", icon: <CheckSquare className="w-5 h-5" />, navigate: "/task", current: false },
  { label: "Calendar", icon: <Calendar className="w-5 h-5" />, navigate: "/calendar", current: false },
  { label: "Analytics", icon: <BarChart2 className="w-5 h-5" />, navigate: "/analytics", current: false },
  { label: "Team", icon: <Users className="w-5 h-5" />, navigate: "/team", current: false },
];

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
        className={`${geistSans.variable} ${geistMono.variable} m-0 p-0 w-full h-screen antialiased`}
      >
        <div className="flex">
        <Sidebar className="fixed h-screen w-3/20" items={sidebarItems}/>
        <div className="ml-[16%] w-17/20">
          {children}
        </div>
        </div>
      </body>
    </html>
  );
}
