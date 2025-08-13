'use client';

import { useState } from 'react';
import CreateProjectModal from './CreateProjectModal';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 fixed w-full left-0 top-0 z-10 md:pl-64">
                <input
                    type="search"
                    placeholder="Search task"
                    className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 w-1/3 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-green-700 hover:bg-green-600 transition text-white font-semibold px-4 py-2 rounded-lg"
                    >
                        Create Project
                    </button>
                    <button aria-label="Notifications" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        🔔
                    </button>
                    <button aria-label="Messages" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        📧
                    </button>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img
                            src="/avatar.png"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                            draggable={false}
                        />
                        <div className="hidden md:block">
                            <p className="font-semibold text-gray-900 dark:text-white">Totok Michael</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">tmichael20@mail.com</p>
                        </div>
                    </div>
                </div>
            </header>
            <CreateProjectModal open={open} setOpen={setOpen} />
        </>
    );
}
