import React from 'react';

type IconButtonProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ComponentType<any>;
  text?: React.ReactNode;
};

export default function IconButton({ Icon, text }: IconButtonProps) {
  return (
    <button
      type="button"
      className="flex h-8 text-sm items-center border rounded-full px-3 gap-2 bg-[var(--background-alt)] text-[var(--foreground-alt)] cursor-pointer transition-colors"
    >
      <Icon />
      {text && <span className="truncate">{text}</span>}
    </button>
  );
}
