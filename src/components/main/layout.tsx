// components/layout/main-layout.tsx

"use client"; // This is now a client component

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar, { SidebarItem } from "@/components/navigation/sidebar";
import Header from "@/components/navigation/header";
import { MenuSquare, CheckSquare, Calendar, BarChart2, Users } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse,
  faChartLine, 
  faFolder, 
  faUsers, 
  faGear 
} from '@fortawesome/free-solid-svg-icons';

export const navigationItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: <FontAwesomeIcon icon={faHouse} />,
    navigate: "/dashboard",
    current: false,
  },
  {
    label: "Analytics",
    icon: <FontAwesomeIcon icon={faChartLine} />,
    navigate: "/analytics",
    current: true,
  },
  {
    label: "Projects",
    icon: <FontAwesomeIcon icon={faFolder} />,
    navigate: "/projects",
    current: false,
  },
  {
    label: "Team Members",
    icon: <FontAwesomeIcon icon={faUsers} />,
    navigate: "/team",
    current: false,
  },
  {
    label: "Settings",
    icon: <FontAwesomeIcon icon={faGear} />,
    navigate: "/settings",
    current: false,
  },
];
export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = navigationItems.map((item) => ({
    ...item,
    current: pathname === item.navigate,
  }));

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <Sidebar
        className="h-full w-56 hidden md:flex md:flex-col md:fixed"
        items={sidebarItems}
         logoSrc={"/logo.png"}
         title={"Synkora"}
         tagline={"Synchornize. Simplify. Succeed."}
      />

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
           <Sidebar
             className="h-full w-64 flex flex-col fixed z-50 bg-white"
             items={sidebarItems}
             logoSrc={"/logo.png"}
             title={"Synkora"}
             tagline={"Synchornize. Simplify. Succeed."}
           />
           <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-56">
        {/* NEW: Header for mobile nav toggle and user info */}
        <div className="md:hidden">
            <Header onMenuClick={() => setSidebarOpen(true)} />
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}