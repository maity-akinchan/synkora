"use client";

import React, { useState } from "react"
import { IconFilter2Search } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type FilterType = "All" | "Teams" | "Projects" | "Tasks" | "Name" | "Templates";

interface SearchDropdownProps {
  onFilterChange: (filter: FilterType) => void
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({ onFilterChange }) => {
  const [selected, setSelected] = useState<FilterType>("All")

  const handleSelect = (filter: FilterType) => {
    setSelected(filter)
    onFilterChange(filter)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-fit flex focus:outline-none active:outline-none">
            <IconFilter2Search /> {selected}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => handleSelect("All")}>All</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect("Teams")}>Teams</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect("Projects")}>Projects</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect("Tasks")}>Tasks</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect("Templates")}>Templates</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => handleSelect("Name")}>Name</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}