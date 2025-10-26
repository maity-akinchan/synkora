"use client";

import React from "react";
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
  Legend as RLegend,
  LineChart as RLineChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type UserStats = {
  user: { id: string; name: string | null; email: string | null } | null;
  activeTasks: number;
  completedLast30d: number;
  completedOnTime30d: number;
  completedOverdue30d: number;
  avgCompletionDays: number | null;
  overdueAssigned: number;
  projects: { id: string; name: string }[];
  perProject: { project: { id: string; name: string }; active: number; completedLast30d: number; overdue: number }[];
  timeline30d: { date: string; created: number; completed: number }[];
};

export default function UserReportsClient({ stats }: { stats: UserStats }) {
  const colors = {
    primary: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    muted: "#94a3b8",
  } as const;

  const valueFormatter = (value: any) => (typeof value === "number" ? value.toLocaleString() : value);

  function exportCSV() {
    const rows: string[] = [];
    rows.push("Metric,Value");
    rows.push(`Active Tasks,${stats.activeTasks}`);
    rows.push(`Completed (30d),${stats.completedLast30d}`);
    rows.push(`Avg Completion Days,${stats.avgCompletionDays ?? ""}`);
    rows.push(`Overdue Assigned,${stats.overdueAssigned}`);
    rows.push("");
    rows.push("Per Project,Active,Completed(30d),Overdue");
    stats.perProject.forEach((p) => rows.push(`${p.project.name},${p.active},${p.completedLast30d},${p.overdue}`));
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-analytics.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Signed in as {stats.user?.name || stats.user?.email || stats.user?.id}
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={exportCSV}>Export CSV</Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>Export PDF</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Kpi title="Active Tasks" value={stats.activeTasks} />
        <Kpi title="Completed (30d)" value={stats.completedLast30d} />
        <Kpi title="Avg Completion (days)" value={stats.avgCompletionDays ?? 0} />
        <Kpi title="Overdue Assigned" value={stats.overdueAssigned} variant={stats.overdueAssigned > 0 ? "danger" : "default"} />
      </div>

      {/* Timeline */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Activity Timeline (30 days)</h2>
        <ChartCard title="Created vs Completed" subtitle="Tasks you created vs completed each day" height={300}>
          <div className="h-[240px] w-full">
            <ResponsiveContainer>
              <RLineChart data={stats.timeline30d}>
                <XAxis dataKey="date" hide />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value, name) => [valueFormatter(value as number), String(name)]} />
                <RLegend />
                <Line type="monotone" dataKey="created" stroke={colors.warning} strokeWidth={2} dot={false} name="Created" />
                <Line type="monotone" dataKey="completed" stroke={colors.success} strokeWidth={2} dot={false} name="Completed" />
              </RLineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Per Project */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Per Project</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard title="Active by Project" subtitle="Where your workload is concentrated" height={320}>
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <BarChart data={stats.perProject.map((p) => ({ name: p.project.name, active: p.active }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} height={40} />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [valueFormatter(value as number), "Active"]} />
                  <Bar dataKey="active" fill={colors.primary} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Completed (30d) by Project" subtitle="Recent throughput per project" height={320}>
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <BarChart data={stats.perProject.map((p) => ({ name: p.project.name, completed: p.completedLast30d }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} height={40} />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [valueFormatter(value as number), "Completed"]} />
                  <Bar dataKey="completed" fill={colors.success} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </section>

      {/* Distribution */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Distribution</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard title="On-time vs Overdue (30d)" subtitle="Share of your completed tasks in the last 30 days" height={280}>
            <div className="h-[220px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: "On-time", value: stats.completedOnTime30d, key: "on_time" },
                      { name: "Overdue", value: stats.completedOverdue30d, key: "overdue" },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    <Cell fill={colors.success} />
                    <Cell fill={colors.danger} />
                  </Pie>
                  <Tooltip formatter={(value) => [valueFormatter(value as number), "Completed"]} />
                  <RLegend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Projects" subtitle="You are a member of" height={280}>
            <div className="text-sm text-muted-foreground">
              {stats.projects.length ? (
                <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {stats.projects.map((p) => (
                    <li key={p.id} className="truncate rounded border bg-card px-3 py-2 shadow-sm">
                      <Link href={`/project/${p.id}/reports`} className="inline-block w-full truncate hover:underline">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          </ChartCard>
        </div>
      </section>
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

type KpiProps = { title: string; value: number | string; variant?: "default" | "danger" };
function Kpi({ title, value, variant = "default" }: KpiProps) {
  return (
    <div className={`rounded-lg border bg-card p-4 shadow-sm ${variant === "danger" ? "border-red-300/50 bg-red-50 dark:bg-red-900/10" : ""}`}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
