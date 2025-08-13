interface ProjectSummaryCardProps {
    title: string;
    value: number;
    highlightIncrease?: number;
    highlightText?: string;
    highlightColor?: 'green' | 'yellow' | 'red';
}

export default function ProjectSummaryCard({
    title,
    value,
    highlightIncrease,
    highlightText,
    highlightColor = 'green',
}: ProjectSummaryCardProps) {
    // Map highlight colors to CSS variables
    const highlightColorMap: Record<'green' | 'yellow' | 'red', string> = {
        green: 'var(--color-success)',
        yellow: 'var(--color-warning)',
        red: 'var(--color-error)',
    };

    const colorStyle = { color: highlightColorMap[highlightColor] };

    return (
        <div
            className="rounded-lg p-5 shadow"
            style={{
                backgroundColor: highlightIncrease
                    ? 'var(--color-primary)'
                    : 'var(--color-background)',
                color: highlightIncrease ? 'var(--color-foreground)' : 'var(--color-foreground)',
                backgroundImage: highlightIncrease
                    ? `linear-gradient(to bottom right, var(--color-primary), var(--bg-primary))`
                    : undefined,
            }}
        >
            <h3>{title}</h3>
            <p className="text-4xl font-bold">{value}</p>

            {highlightIncrease && (
                <span className="flex items-center gap-1 text-sm mt-2" style={colorStyle}>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12l5 5L20 7" />
                    </svg>
                    <p className="text-[var(--color-foreground)]">Increased from last month</p>
                </span>
            )}

            {highlightText && (
                <p className="mt-2" style={{ color: 'var(--color-muted-foreground)' }}>
                    {highlightText}
                </p>
            )}
        </div>
    );
}
