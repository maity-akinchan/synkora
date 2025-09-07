"use client";

type CardProps = {
  heading: string;
  para: string;
  checked: boolean;
};

export default function Card({ heading, para, checked }: CardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[var(--foreground)] text-[var(--background)] px-3 py-2 text-sm">
      <div className="flex flex-col w-full pr-2">
        <h1 className="text-sm font-medium leading-tight">{heading}</h1>
        <p className="text-[10px] font-light">{para}</p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="h-4 w-4 rounded-full relative md:-top-4 appearance-none border border-[var(--background)] checked:bg-blue-500 checked:border-blue-500"
      />
    </div>
  );
}
