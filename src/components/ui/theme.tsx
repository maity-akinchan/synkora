"use client";

import { useEffect, useState } from "react";

export function ThemeBoot() {
  useEffect(() => {
    const stored = (typeof window !== 'undefined') ? localStorage.getItem('theme') : null;
    const theme = stored === 'dark' || stored === 'light' ? stored : undefined;
    if (theme) {
      document.documentElement.style.colorScheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      // Leave to OS preference; ensure both are allowed
      document.documentElement.style.colorScheme = 'light dark';
      document.documentElement.removeAttribute('data-theme');
    }
    const handler = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const v = e.newValue as string | null;
        if (v === 'light' || v === 'dark') {
          document.documentElement.style.colorScheme = v;
          document.documentElement.setAttribute('data-theme', v);
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);
  return null;
}

export function ThemeToggle({ className }:{ className?: string }) {
  const [mode, setMode] = useState<'system'|'light'|'dark'>(() => {
    if (typeof window === 'undefined') return 'system';
    const v = localStorage.getItem('theme');
    return v === 'light' || v === 'dark' ? v : 'system';
  });
  useEffect(() => {
    if (mode === 'system') {
      localStorage.removeItem('theme');
      document.documentElement.style.colorScheme = 'light dark';
      document.documentElement.removeAttribute('data-theme');
    } else {
      localStorage.setItem('theme', mode);
      document.documentElement.style.colorScheme = mode;
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode]);
  return (
    <div className={className}>
      <select
        className="px-2 py-1 border rounded text-[var(--foreground)] bg-[var(--background)]"
        value={mode}
        onChange={e=>setMode(e.target.value as any)}
        aria-label="Theme"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
