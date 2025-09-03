"use client";

import { IconSearch, IconFilter2Search } from "@tabler/icons-react"
import { SearchDropdown } from "./search-dropdown";
type SearchBarProps = {
    placeholderText: string;
};

export default function SearchBar({ placeholderText }: SearchBarProps) {
    return (
        <div className="flex items-center gap-4 border-2 p-1 rounded-full w-7/12">
            <span className="flex gap-1 items-center p-1 bg-[var(--background-alt)] rounded-full  hover:bg-[var(--foreground)] hover:text-[var(--background)]">
                <SearchDropdown onFilterChange={(filter) => { console.log(filter) }} />
            </span>
            <input className="w-full px-2 py-1 border-0 focus:outline-none" placeholder={placeholderText} />
            <p className="p-1 bg-[var(--background-alt)] rounded-3xl  hover:bg-[var(--foreground)] hover:text-[var(--background)]"><IconSearch /></p>
        </div>
    );
}