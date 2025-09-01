import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Link from 'next/link';
import {
    HomeIcon,
    ClipboardIcon,
    ChartBarIcon,
    UsersIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    ArrowRightOnRectangleIcon,
    BookmarkSquareIcon
} from '@heroicons/react/24/outline';
import { DrawingPinIcon, PersonIcon } from "@radix-ui/react-icons";
import { CircuitBoardIcon } from "lucide-react";

export function AppSidebar() {
    const menuItems = [
        { name: 'Home', icon: HomeIcon, href: '/home' },
        { name: 'New Project', icon: BookmarkSquareIcon, href: '/new'},
        { name: 'Dashboard', icon: CircuitBoardIcon, href: '/dashboard' },
        { name: 'Designs', icon: DrawingPinIcon, href: '/designs' },
        { name: 'Tasks', icon: ClipboardIcon, href: '/tasks' },
        { name: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
        { name: 'Team', icon: UsersIcon, href: '/teams' },
        { name: 'User', icon: PersonIcon, href: '/logout' },
        
    ];

    return (
        <Sidebar >
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <div className="mx-auto flex items-center font-bold text-xl text-[var(--color-success)]">
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    Synkora
                </div>
                <SidebarGroup />
                <nav className="flex flex-col gap-2 flex-1">
                    {menuItems.map(({ name, icon: Icon, href }) => (
                        <Link
                            key={name}
                            href={href}
                            className="flex items-center gap-3 p-3 rounded-md text-[var(--color-foreground-muted)] hover:bg-[var(--color-success-bg-hover)] hover:text-[var(--color-success)] transition"
                        >
                            <Icon className="w-6 h-6" />
                            <span>{name}</span>
                        </Link>
                    ))}
                </nav>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}