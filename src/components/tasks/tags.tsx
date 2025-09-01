'use client';

import { useState, useMemo } from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils'; // Utility for conditional class names
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

export function MultiSelectCombobox() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const filteredFrameworks = useMemo(() => {
    return frameworks.filter(
      (framework) =>
        !selectedFrameworks.includes(framework.value) &&
        framework.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, selectedFrameworks]);

  const handleSelect = (frameworkValue: string) => {
    setSelectedFrameworks((prev) => {
      const isSelected = prev.includes(frameworkValue);
      if (isSelected) {
        return prev.filter((item) => item !== frameworkValue);
      } else {
        return [...prev, frameworkValue];
      }
    });
    setInputValue('');
  };

  const handleRemove = (frameworkValue: string) => {
    setSelectedFrameworks((prev) =>
      prev.filter((item) => item !== frameworkValue)
    );
  };

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-wrap gap-2 rounded-md border p-2 min-h-[38px] cursor-text">
            {selectedFrameworks.map((frameworkValue) => {
              const framework = frameworks.find((f) => f.value === frameworkValue);
              return (
                <Badge key={frameworkValue} variant="secondary">
                  {framework?.label}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleRemove(frameworkValue)}
                  >
                    <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                  </button>
                </Badge>
              );
            })}
            <input
              className="flex-1 min-w-[150px] px-4 bg-transparent focus:outline-none"
              placeholder="Select tags.."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (filteredFrameworks.length > 0) {
                    handleSelect(filteredFrameworks[0].value);
                  }
                }
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              placeholder="Search frameworks..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {filteredFrameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                  className="flex justify-between"
                >
                  <span>{framework.label}</span>
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedFrameworks.includes(framework.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
  );
}