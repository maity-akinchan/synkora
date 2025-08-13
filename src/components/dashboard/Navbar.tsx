'use client';

import { useState } from 'react';
import CreateProjectModal from './CreateProjectModal';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header
                className="flex justify-between items-center p-4 fixed w-full left-0 top-0 z-10 md:pl-64"
                style={{
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    borderBottom: `1px solid var(--color-border)`,
                }}
            >
                {/* Search Input */}
                <input
                    type="search"
                    placeholder="Search task"
                    className="rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2"
                    style={{
                        backgroundColor: 'var(--color-muted)',
                        color: 'var(--color-foreground)',
                        border: `1px solid var(--color-border)`,
                        outlineColor: 'var(--color-primary)',
                    }}
                />

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Create Project Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="font-semibold px-4 py-2 rounded-lg transition"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-foreground)',
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--color-primary)')
                        }
                    >
                        Create Project
                    </button>

                    {/* Notifications */}
                    <button
                        aria-label="Notifications"
                        className="p-2 rounded-full transition"
                        style={{ backgroundColor: 'transparent' }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--color-muted)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                    >
                        🔔
                    </button>

                    {/* Messages */}
                    <button
                        aria-label="Messages"
                        className="p-2 rounded-full transition"
                        style={{ backgroundColor: 'transparent' }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--color-muted)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                    >
                        📧
                    </button>

                    {/* Avatar */}
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img
                            src="/avatar.png"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                            draggable={false}
                        />
                        <div className="hidden md:block">
                            <p
                                className="font-semibold"
                                style={{ color: 'var(--color-foreground)' }}
                            >
                                Totok Michael
                            </p>
                            <p
                                className="text-xs"
                                style={{ color: 'var(--color-muted-foreground)' }}
                            >
                                tmichael20@mail.com
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <CreateProjectModal open={open} setOpen={setOpen} />
        </>
    );
}
