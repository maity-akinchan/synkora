import React from 'react';
import Link from "next/link";
import Image from "next/image"; // Use Next.js Image for optimization
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx'; // A utility for constructing className strings conditionally
import { backgroundGradientStyle } from '@/lib/commons/styles';
import { NewDesignPopup } from '../main/design/newDesignPopup';
import { usePathname } from 'next/navigation'
import path from 'path';

// Define a type for a single sidebar item for clarity
export type SidebarItem = {
    label: string;
    icon?: React.ReactNode;
    navigate: string;
    current: boolean;
};

// Update props to make the header dynamic and reusable
export type SidebarProps = {
    items: SidebarItem[];
    className?: string;
    logoSrc: string;
    title: string;
    tagline?: string;
};

function Sidebar({ items, className, logoSrc, title, tagline }: SidebarProps) {
     const pathname = usePathname().split("/")[1];
    return (
        <aside className={clsx('bg-[var(--background-alt)] rounded-r-2xl h-full flex flex-col p-4 shadow-xs shadow-green-500', className + " " + backgroundGradientStyle)}>
            {/* Header section is now a link to the homepage and uses props */}
            <Link href="/" className='flex hover:cursor-pointer mb-4 gap-3 items-center'>
                <Image 
                    src={logoSrc} 
                    alt={`${title} logo`} // Add descriptive alt text for accessibility
                    width={56} 
                    height={56}
                    className='w-14 h-14'
                />
                <div className='flex flex-col'>
                    <p className="text-[var(--primary)] text-3xl font-bold">{title}</p>
                    {tagline && <p className="text-xs text-gray-400">{tagline}</p>}
                </div>
            </Link>

            {/* Navigation is now a semantic list (<ul>) */}
            <nav className="flex-1">
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li key={item.navigate}> {/* Use a unique identifier for the key */}
                            <Link
                                href={item.navigate}
                                // Use clsx for cleaner conditional classnames
                                className={clsx(
                                    "flex items-center px-4 py-2 transition-colors rounded-lg",
                                    {
                                        // Classes for the current/active item
                                        "bg-[var(--background)] text-[var(--primary)] text-lg font-semibold": item.current,
                                        // Classes for non-active items
                                        "hover:bg-[var(--background)]": !item.current,
                                    }
                                )}
                                // Important for accessibility to indicate the current page
                                aria-current={item.current ? "page" : undefined}
                            >
                                {item.icon && <span className="mr-3 w-6 text-center">{item.icon}</span>}
                                <span className='flex-grow'>{item.label}</span>
                                {item.current && (
                                    <ArrowRight className='w-4 h-4' />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
                {pathname == "project" &&
                    <ul className='flex flex-col gap-2 absolute bottom-5'>
                        <NewDesignPopup />
                    </ul>
                }
            </nav>
        </aside>
    );
};

export default Sidebar;