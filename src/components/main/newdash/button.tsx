export default function IconButton ({Icon, text}) {
    return (
        <>
            <span
                className="flex h-8 text-sm items-center border rounded-full p-4
             bg-[var(--background-alt)] text-[var(--foreground-alt)]
             cursor-pointer transition-colors"
            >
                <Icon />
                <p className="w-full">{text}</p>
            </span>

        </>
    )
}