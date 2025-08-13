'use client';

import Link from 'next/link';
import {
    HomeIcon,
    ClipboardIcon,
    ChartBarIcon,
    UsersIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
    { name: 'Tasks', icon: ClipboardIcon, href: '/tasks' },
    { name: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
    { name: 'Team', icon: UsersIcon, href: '/teams' },
    { name: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
    { name: 'Help', icon: QuestionMarkCircleIcon, href: '/help' },
    { name: 'Logout', icon: ArrowRightOnRectangleIcon, href: '/logout' },
];

export default function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col w-60 bg-[var(--color-background)] border-r border-[var(--color-border)] p-6 fixed h-full">
            {/* Logo */}
            <div className="mb-6 flex items-center gap-2 font-bold text-xl text-[var(--color-success)]">
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
                Donezo
            </div>

            {/* Menu */}
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

            {/* Footer */}
            <div className="mt-auto">
                <div className="bg-[var(--color-success-bg)] rounded-md p-3 text-[var(--color-success-foreground)] cursor-pointer">
                    Download our Mobile App
                    <button className="block mt-2 w-full rounded-md py-2 bg-[var(--color-success)] text-[var(--color-success-foreground)] hover:bg-[var(--color-success-hover)]">
                        Download
                    </button>
                </div>
            </div>
        </aside>
    );
}
