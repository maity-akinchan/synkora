'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Project } from '@/lib/commons/store/useProjectStore';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ProjectAnalyticsChartProps {
    projects: Project[];
}

export default function ProjectAnalyticsChart({ projects }: ProjectAnalyticsChartProps) {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const data = {
        labels: days,
        datasets: [
            {
                label: 'Project Analytics',
                data: [30, 74, 40, 80, 60, 53, 20],
                backgroundColor: getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-primary')
                    .trim() || '#16a34a',
                borderRadius: 9999,
                barPercentage: 0.6,
            },
        ],
    };

    const options = {
        plugins: { legend: { display: false } },
        scales: {
            y: { display: false },
            x: {
                grid: { display: false },
                ticks: {
                    color:
                        getComputedStyle(document.documentElement)
                            .getPropertyValue('--color-muted-foreground')
                            .trim() || '#6b7280',
                },
            },
        },
    };

    return (
        <div
            className="p-4 rounded-md shadow"
            style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
            }}
        >
            <h3
                className="mb-3 font-semibold"
                style={{ color: 'var(--color-muted-foreground)' }}
            >
                Project Analytics
            </h3>
            <Bar data={data} options={options} />
        </div>
    );
}
