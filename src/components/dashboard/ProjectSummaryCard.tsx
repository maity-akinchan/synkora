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
    const colorClass =
        highlightColor === 'green'
            ? 'text-green-600'
            : highlightColor === 'yellow'
                ? 'text-yellow-600'
                : 'text-red-600';

    return (
        <div className={`rounded-lg p-5 ${highlightIncrease ? 'bg-gradient-to-br from-green-600 to-green-400 text-white' : 'bg-white dark:bg-gray-800'} shadow`}>
            <h3>{title}</h3>
            <p className="text-4xl font-bold">{value}</p>
            {highlightIncrease && (
                <span className={`flex items-center gap-1 text-sm mt-2 ${colorClass}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg>
                    Increased from last month
                </span>
            )}
            {highlightText && <p className="mt-2 text-gray-500 dark:text-gray-400">{highlightText}</p>}
        </div>
    );
}