"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Assuming this path is correct in your project
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart as RLineChart,
  Line,
  Legend as RLegend,
} from "recharts";

// DEFINE THE TYPE FOR THE STATS OBJECT
type Stats = {
  project: { id: string; name: string } | null;
  tasksByStatus: { status: string; count: number }[];
  overdue: { count: number; overdueTasks: string[] };
  completion: {
    averageDaysToComplete: number | null;
    completedCount: number;
    onTimeRate: number; // 0..1
    overdueCompletionRate: number; // 0..1
  };
  workload: { user: { id: string; name: string | null; email: string | null }; count: number }[];
  burndown: { date: string; remaining: number }[];
  velocity: { sprint: string; completed: number }[];
  cumulativeFlow: { date: string; todo: number; in_progress: number; done: number }[];
  milestones: { title: string; dueDate: string | null; completed: boolean }[];
  activity: { date: string; commits: number; updates: number; messages: number }[];
};

// HARDCODED SAMPLE DATA
const sampleStats: Stats = {
  project: { id: "proj_1a2b3c", name: "Phoenix Project Dashboard" },
  tasksByStatus: [
    { status: "todo", count: 15 },
    { status: "in_progress", count: 8 },
    { status: "done", count: 25 },
  ],
  overdue: { count: 3, overdueTasks: ["API Integration", "Fix Login Bug", "Update Docs"] },
  completion: {
    averageDaysToComplete: 4.2,
    completedCount: 25,
    onTimeRate: 0.88, // 88%
    overdueCompletionRate: 0.12, // 12%
  },
  workload: [
    { user: { id: "u1", name: "Alice", email: "alice@example.com" }, count: 12 },
    { user: { id: "u2", name: "Bob", email: "bob@example.com" }, count: 18 },
    { user: { id: "u3", name: "Charlie", email: "charlie@example.com" }, count: 9 },
    { user: { id: "u4", name: "Diana", email: "diana@example.com" }, count: 9 },
  ],
  burndown: [
    { date: "10-20", remaining: 30 },
    { date: "10-21", remaining: 28 },
    { date: "10-22", remaining: 25 },
    { date: "10-23", remaining: 22 },
    { date: "10-24", remaining: 19 },
    { date: "10-25", remaining: 15 },
    { date: "10-26", remaining: 11 },
  ],
  velocity: [
    { sprint: "Sprint 1", completed: 10 },
    { sprint: "Sprint 2", completed: 12 },
    { sprint: "Sprint 3", completed: 9 },
    { sprint: "Sprint 4", completed: 14 },
  ],
  cumulativeFlow: [
    { date: "10-20", todo: 30, in_progress: 5, done: 10 },
    { date: "10-21", todo: 28, in_progress: 6, done: 12 },
    { date: "10-22", todo: 25, in_progress: 8, done: 15 },
    { date: "10-23", todo: 22, in_progress: 7, done: 18 },
    { date: "10-24", todo: 19, in_progress: 9, done: 20 },
    { date: "10-25", todo: 15, in_progress: 8, done: 23 },
    { date: "10-26", todo: 15, in_progress: 8, done: 25 },
  ],
  milestones: [
    { title: "Alpha Release", dueDate: "2025-11-15", completed: false },
    { title: "Beta Release", dueDate: "2025-12-10", completed: false },
  ],
  activity: [
    { date: "10-20", commits: 5, updates: 10, messages: 8 },
    { date: "10-21", commits: 8, updates: 12, messages: 15 },
    { date: "10-22", commits: 3, updates: 8, messages: 5 },
    { date: "10-23", commits: 9, updates: 15, messages: 20 },
    { date: "10-24", commits: 4, updates: 7, messages: 9 },
    { date: "10-25", commits: 6, updates: 11, messages: 13 },
    { date: "10-26", commits: 7, updates: 14, messages: 18 },
  ],
};

export default function ReportsClient() {
  // Use the hardcoded stats object instead of props
  const stats = sampleStats;
  const projectId = stats.project?.id || 'unknown';

  const totalTasks = stats.tasksByStatus.reduce((a, b) => a + b.count, 0) || 1;
  const todo = stats.tasksByStatus.find((s) => s.status === "todo")?.count || 0;
  const inProgress = stats.tasksByStatus.find((s) => s.status === "in_progress")?.count || 0;
  const done = stats.tasksByStatus.find((s) => s.status === "done")?.count || 0;

  const colors = {
    todo: "#f59e0b",
    in_progress: "#3b82f6",
    done: "#10b981",
    danger: "#ef4444",
    primary: "#3b82f6",
  } as const;

  const valueFormatter = (value: any) => (typeof value === "number" ? value.toLocaleString() : value);

  function exportCSV() {
    const rows: string[] = [];
    rows.push("Section,Key,Value");
    rows.push(`Tasks By Status,Todo,${todo}`);
    rows.push(`Tasks By Status,In Progress,${inProgress}`);
    rows.push(`Tasks By Status,Done,${done}`);
    rows.push(`Overdue,Count,${stats.overdue.count}`);
    rows.push(`Completion,Average Days,${stats.completion.averageDaysToComplete ?? ""}`);
    rows.push(`Completion,On-time Rate,${(stats.completion.onTimeRate * 100).toFixed(1)}%`);
    rows.push(`Completion,Overdue Completion Rate,${(stats.completion.overdueCompletionRate * 100).toFixed(1)}%`);
    stats.workload.forEach((w) => rows.push(`Workload,${w.user.name || w.user.email || w.user.id},${w.count}`));
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project-${projectId}-analytics.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    // Simple fallback to browser print-to-PDF. For richer PDFs, add html2canvas + jsPDF later.
    window.print();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">Project: {stats.project?.name}</div>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportPDF}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Kpi title="Total Tasks" value={totalTasks} />
        <Kpi title="Overdue" value={stats.overdue.count} variant={stats.overdue.count > 0 ? "danger" : "default"} />
        <Kpi title="Avg Completion (days)" value={stats.completion.averageDaysToComplete ?? 0} />
        <Kpi title="On-time %" value={`${(stats.completion.onTimeRate * 100).toFixed(0)}%`} />
      </div>

      {/* Task Distribution */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Task Distribution</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard title="By Status" subtitle="Share of tasks by column" height={280}>
            <div className="h-[220px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <defs>
                    <linearGradient id="gradTodo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.todo} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={colors.todo} stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="gradInProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.in_progress} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={colors.in_progress} stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="gradDone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.done} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={colors.done} stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={[
                      { name: "To-Do", value: todo, key: "todo" },
                      { name: "In Progress", value: inProgress, key: "in_progress" },
                      { name: "Done", value: done, key: "done" },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    <Cell fill="url(#gradTodo)" />
                    <Cell fill="url(#gradInProgress)" />
                    <Cell fill="url(#gradDone)" />
                  </Pie>
                  <Tooltip formatter={(value) => [valueFormatter(value as number), "Tasks"]} />
                  <RLegend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Tasks per Collaborator" subtitle="Distribution of assigned tasks" height={280}>
            <div className="h-[220px] w-full">
              <ResponsiveContainer>
                <BarChart data={stats.workload.map((w) => ({ name: w.user.name || w.user.email || w.user.id, count: w.count }))}>
                  <XAxis dataKey="name" hide tick={{ fontSize: 12, fill: "currentColor" }} stroke="currentColor" />
                  <YAxis allowDecimals={false} tick={{ fill: "currentColor" }} stroke="currentColor" />
                  <Tooltip wrapperStyle={{ color: "currentColor" }} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} labelStyle={{ color: "currentColor" }} formatter={(value) => [valueFormatter(value as number), "Tasks"]} />
                  <defs>
                    <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="count" fill="url(#gradPrimary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </section>

      {/* Progress */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Progress</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard title="Burndown" subtitle={`Remaining tasks over last ${stats.burndown.length} days`} height={300}>
            <div className="h-[240px] w-full">
              <ResponsiveContainer>
                <RLineChart data={stats.burndown.map((d) => ({ date: d.date, remaining: d.remaining }))}>
                  <XAxis dataKey="date" hide stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <YAxis allowDecimals={false} stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <Tooltip wrapperStyle={{ color: "currentColor" }} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} labelStyle={{ color: "currentColor" }} formatter={(value) => [valueFormatter(value as number), "Remaining"]} labelFormatter={(l) => `Date: ${l}`} />
                  <defs>
                    <linearGradient id="gradDanger" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.danger} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={colors.danger} stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <Line type="monotone" dataKey="remaining" stroke="url(#gradDanger)" strokeWidth={2.5} dot={false} />
                </RLineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard title="Velocity" subtitle="Completed tasks per sprint" height={300}>
            <div className="h-[240px] w-full">
              <ResponsiveContainer>
                <BarChart data={stats.velocity}>
                  <XAxis dataKey="sprint" tick={{ fontSize: 12, fill: "currentColor" }} stroke="currentColor" interval={0} angle={-15} height={40} />
                  <YAxis allowDecimals={false} tick={{ fill: "currentColor" }} stroke="currentColor" />
                  <Tooltip wrapperStyle={{ color: "currentColor" }} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} labelStyle={{ color: "currentColor" }} formatter={(value) => [valueFormatter(value as number), "Completed"]} />
                  <defs>
                    <linearGradient id="gradDone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.done} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={colors.done} stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="completed" fill="url(#gradDone)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </section>

      {/* Cumulative Flow and Activity Heatmap */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Flow & Activity</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard title="Cumulative Flow" subtitle={`Status counts across ${stats.cumulativeFlow.length} days`} height={300}>
            <div className="h-[240px] w-full">
              <ResponsiveContainer>
                <RLineChart data={stats.cumulativeFlow.map((d) => ({ date: d.date, todo: d.todo, in_progress: d.in_progress, done: d.done }))}>
                  <XAxis dataKey="date" hide stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <YAxis allowDecimals={false} stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <Tooltip wrapperStyle={{ color: "currentColor" }} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} labelStyle={{ color: "currentColor" }} formatter={(value, name) => [valueFormatter(value as number), String(name).replace("_", " ")]} />
                  <RLegend wrapperStyle={{ color: "currentColor" }} />
                  <Line type="monotone" dataKey="todo" stroke={colors.todo} strokeWidth={2} dot={false} name="To-Do" />
                  <Line type="monotone" dataKey="in_progress" stroke={colors.in_progress} strokeWidth={2} dot={false} name="In Progress" />
                  <Line type="monotone" dataKey="done" stroke={colors.done} strokeWidth={2} dot={false} name="Done" />
                </RLineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard title="Activity" subtitle="Messages, commits, and updates per day" height={320}>
            <div className="h-[240px] w-full">
              <ResponsiveContainer>
                <BarChart data={stats.activity}>
                  <XAxis dataKey="date" hide stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <YAxis allowDecimals={false} stroke="currentColor" tick={{ fill: "currentColor" }} />
                  <Tooltip wrapperStyle={{ color: "currentColor" }} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} labelStyle={{ color: "currentColor" }} formatter={(value, name) => [valueFormatter(value as number), String(name)]} />
                  <RLegend wrapperStyle={{ color: "currentColor" }} />
                  <Bar dataKey="messages" stackId="a" fill={colors.primary} name="Messages" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="commits" stackId="a" fill="#6366f1" name="Commits" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="updates" stackId="a" fill="#22c55e" name="Updates" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </section>
    </div>
  );
}

// HELPER COMPONENTS (UNCHANGED)
type KpiProps = { title: string; value: number | string; variant?: "default" | "danger" };
function Kpi({ title, value, variant = "default" }: KpiProps) {
  return (
    <div className={`rounded-lg border bg-card p-4 shadow-sm ${variant === "danger" ? "border-red-300/50 bg-red-50 dark:bg-red-900/10" : ""}`}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function ChartCard({ title, subtitle, height = 280, children }: { title: string; subtitle?: string; height?: number; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-sm font-medium leading-none">{title}</h3>
        {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </div>
  );
}