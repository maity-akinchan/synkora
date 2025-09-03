import React from 'react';
import Link from "next/link"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export type SidebarProps = {
    items: { label: string; icon?: React.ReactNode; navigate: string; current: boolean}[];
    className?: string;
};


function Sidebar({items, className}: SidebarProps){
    return (
        <aside className={`w-64 bg-[var(--background-alt)] rounded-r-2xl h-full flex flex-col ${className || ''}`}>
            <div className='flex hover:cursor-default my-4 gap-2'>
                <img src="logo.png" className='w-16'/>
                <div className='flex flex-col'>
                    <p className="text-[var(--primary)] text-3xl">Synkora</p>
                    <p className="text-sm">Turn ideas into reality.</p>
                </div>
            </div>
            <nav className="flex-1 py-4">
                    {items.map((item, idx) => (
                        item.current ? 
                        <p key={idx} className={"flex hover:cursor-default items-center px-4 py-2 transition-colors text-[var(--primary)] text-xl my-2 border-1 rounded-xl"}>
                            {item.icon && <span className="mr-3">{item.icon}</span>}
                            <span className='w-full'>{item.label}</span>
                            <FontAwesomeIcon icon={faArrowRight} className='w-4'></FontAwesomeIcon>
                        </p> 
                        :
                        <Link
                            href={item.navigate}
                            key={idx}
                            className={"flex items-center px-4 py-2 hover:bg-[var(--background)] cursor-pointer transition-colors"}
                        >
                                {item.icon && <span className="mr-3">{item.icon}</span>}
                                <span>{item.label}</span>
                        </Link>
                    ))}
            </nav>
        </aside>
    );
};

export default Sidebar;