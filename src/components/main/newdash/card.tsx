"use client";

type CardProps = {
    heading: string;
    para: string;
    // checkAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

export default function Card({ heading, para, checked }: CardProps) {
    return (
        <div className="flex rounded-3xl bg-[var(--foreground)] text-[var(--background)] px-2 py-3 relative">
            <div className="flex flex-col w-full px-4">
                <h1 className="text-xl font-semibold">{heading}</h1>
                <p className="text-xs font-thin">{para}</p>
            </div>
            <input
                className="relative rounded-full appearance-none border-1
                    appearance-none h-4 w-4 border rounded-full
                    checked:bg-blue-500 checked:border-blue-500
                    justify-centerborder-[var(--background)]"
                type="checkbox" />

        </div>
    )
}
