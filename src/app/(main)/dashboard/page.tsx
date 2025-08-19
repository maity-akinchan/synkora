'use client';

import { useProjectStore } from '@/lib/commons/store/useProjectStore';
import ProjectSummaryCard from '@/components/dashboard/ProjectSummaryCard';
import ProjectAnalyticsChart from '@/components/dashboard/ProjectAnalyticsChart';
import TeamCollaboration from '@/components/dashboard/TeamCollaboration';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import TimeTracker from '@/components/dashboard/TimeTracker';
// import Reminders from '@/components/dashboard/Reminders';

export default function DashboardPage() {
    const projects = useProjectStore((state) => state.projects);

    // Calculate summary data
    const totalProjects = projects.length;
    const endedProjects = projects.filter((p) => new Date(p.deadline) < new Date()).length;
    const runningProjects = projects.filter((p) => new Date(p.deadline) >= new Date()).length;
    const pendingProjectCount = projects.filter(p => p.tasks.some(t => t.status !== 'Completed')).length;

    return (
                <main className="mx-auto space-y-6">
                    <h1 className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>
                        Dashboard
                    </h1>
                    <p style={{ color: 'var(--color-muted-foreground)' }}>
                        Plan, prioritize, and accomplish your tasks with ease.
                    </p>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        <ProjectSummaryCard title="Total Projects" value={totalProjects} highlightIncrease={5} highlightColor="green" />
                        <ProjectSummaryCard title="Ended Projects" value={endedProjects} highlightIncrease={6} />
                        <ProjectSummaryCard title="Running Projects" value={runningProjects} highlightIncrease={2} />
                        <ProjectSummaryCard title="Pending Project" value={pendingProjectCount} highlightText="On Discuss" />
                    </div>

                    {/* Analytics & Reminders */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        <ProjectAnalyticsChart projects={projects} />
                        {/* <Reminders /> */}
                        <TeamCollaboration projects={projects} />
                    </div>

                    {/* Project Progress & Time Tracker */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <ProjectProgress projects={projects} />
                        <TimeTracker />
                    </div>
                </main>
    );
}
