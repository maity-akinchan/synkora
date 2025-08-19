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

export function AppSidebar() {
    const menuItems = [
        { name: 'New Project', icon: BookmarkSquareIcon, href: '/newProject'},
        { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
        { name: 'Tasks', icon: ClipboardIcon, href: '/tasks' },
        { name: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
        { name: 'Team', icon: UsersIcon, href: '/teams' },
        { name: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
        { name: 'Help', icon: QuestionMarkCircleIcon, href: '/help' },
        { name: 'Logout', icon: ArrowRightOnRectangleIcon, href: '/logout' },
    ];

    return (
        <Sidebar >
            <SidebarHeader />
            <SidebarContent className="overflow-hidden">
                <SidebarGroup />
                <div className="mb-6 mx-auto flex items-center gap-2 font-bold text-xl text-[var(--color-success)]">
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
                <nav className="flex flex-col gap-3 flex-1">
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