'use client';
import { useState } from 'react';
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
        <aside className="hidden md:flex flex-col w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 fixed h-full">
            <div className="mb-6 flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-xl">
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
            <nav className="flex flex-col gap-3 flex-1">
                {menuItems.map(({ name, icon: Icon, href }) => (
                    <Link
                        key={name}
                        href={href}
                        className="flex items-center gap-3 p-3 rounded-md text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-800 transition"
                    >
                        <Icon className="w-6 h-6" />
                        <span>{name}</span>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto">
                <div className="bg-green-900 bg-opacity-20 rounded-md p-3 text-white cursor-pointer">
                    Download our Mobile App
                    <button className="block mt-2 w-full bg-green-700 hover:bg-green-600 text-white rounded-md py-2">
                        Download
                    </button>
                </div>
            </div>
        </aside>
    );
}