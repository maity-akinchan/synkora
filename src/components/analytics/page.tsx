'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// -----------------------------
// Types
// -----------------------------

type PriorityPoint = { month: string; high: number; medium: number; low: number };

type ProjectAnalytics = {
  stats: {
    completed: number;
    updated: number;
    created: number;
    dueSoon: number;
  };
  prioritySeries: PriorityPoint[];
  statusOverview: { label: string; value: number }[];
  assigneeCompletion: { name: string; value: number }[];
  timeSeries: { day: string; hours: number }[];
  recentActivity: string[];
};



const defaultAnalytics: ProjectAnalytics = {
  stats: { completed: 12, updated: 12, created: 12, dueSoon: 12 },
  prioritySeries: (() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months.map((m, i) => ({ month: m, high: 40 + i * 3, medium: 20 + i * 2, low: 10 + (i % 6) }));
  })(),
  statusOverview: [ { label: 'To Do', value: 60 }, { label: 'In Progress', value: 30 }, { label: 'Done', value: 40 } ],
  assigneeCompletion: [ { name: 'Juyed', value: 34 }, { name: 'Nahid', value: 22 }, { name: 'Rahi', value: 44 } ],
  timeSeries: [ { day: 'Fri', hours: 1 }, { day: 'Sun', hours: 2 }, { day: 'Mon', hours: 3 }, { day: 'Tue', hours: 4 }, { day: 'Wed', hours: 6 } ],
  recentActivity: [ "Juyed Ahmed's List", 'Netlify SaaS Real estate', "Pixrem's Project", 'RetoxAI Meeting Assistance' ],
};



function Sidebar() {
  return (
    <aside className="w-72 bg-[#0f1724] text-white h-screen p-6 flex flex-col gap-6">
      <div className="font-bold text-xl">Taskbito</div>
      <nav className="flex-1">
        <ul className="space-y-3 text-sm opacity-90">
          <li className="px-3 py-2 rounded bg-white/6">Dashboard</li>
          <li className="px-3 py-2 rounded bg-white/2">My Tasks</li>
          <li className="px-3 py-2 rounded">Inbox</li>
          <li className="px-3 py-2 rounded">Calendar</li>
          <li className="px-3 py-2 rounded">Reports</li>
        </ul>
      </nav>
      <div className="text-xs opacity-70">© Project Platform</div>
    </aside>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm w-48">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-green-500 mt-1">▲ 20% in the last 7 days</div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl p-4 shadow-sm">{children}</div>;
}


function PriorityChart({ data }: { data: PriorityPoint[] }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Priority Breakdown</div>
        <div className="text-xs text-gray-500">Year</div>
      </div>
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="high" stroke="#7c3aed" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="low" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-3 mt-3 text-xs text-gray-600">
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-500 rounded"/>High</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500 rounded"/>Medium</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded"/>Low</div>
      </div>
    </Card>
  );
}

function TimeSeriesArea({ data }: { data: { day: string; hours: number }[] }) {
  return (
    <Card>
      <div className="text-sm font-medium mb-2">Total Time worked</div>
      <div style={{ width: '100%', height: 140 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.4} />
                <stop offset="95%" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="hours" stroke="#6366f1" fillOpacity={1} fill="url(#grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-gray-500 mt-2">13h 32m 09s • +1.5%</div>
    </Card>
  );
}

function AssigneeDonut({ data }: { data: { name: string; value: number }[] }) {
  const COLORS = ['#6366f1', '#f97316', '#10b981', '#ef4444'];
  return (
    <Card>
      <div className="text-sm font-medium mb-2">Task completed by assignee</div>
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={24} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function StatusOverview({ data }: { data: { label: string; value: number }[] }) {
  return (
    <Card>
      <div className="text-sm font-medium mb-3">Status overview</div>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded" style={{ background: d.label === 'To Do' ? '#6366f1' : d.label === 'In Progress' ? '#f97316' : '#10b981' }} />
              <div className="text-sm">{d.label}</div>
            </div>
            <div className="text-sm font-semibold">{d.value}%</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentActivity({ items }: { items: string[] }) {
  return (
    <Card>
      <div className="text-sm font-medium mb-3">Recent activity</div>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((it, idx) => (
          <li key={idx} className="px-2 py-1 rounded hover:bg-gray-50">{it}</li>
        ))}
      </ul>
    </Card>
  );
}



export default function ProjectAnalysis() {
  // Use the defaultAnalytics object so the page runs standalone and never throws the "analytics is undefined" error.
  const analytics = defaultAnalytics;

  return (
    <div className="flex bg-gray-50 min-h-screen text-sm">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">My Tasks</h1>
            <p className="text-gray-500">Short description will be placed here</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white rounded-2xl shadow">Share Tasks</button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-2xl shadow">+ New Task</button>
          </div>
        </header>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-4">
            <div className="flex gap-4">
              <StatCard title="Completed" value={analytics.stats.completed} />
              <StatCard title="Updated" value={analytics.stats.updated} />
              <StatCard title="Created" value={analytics.stats.created} />
              <StatCard title="Due soon" value={analytics.stats.dueSoon} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <PriorityChart data={analytics.prioritySeries} />
              <div className="space-y-4">
                <StatusOverview data={analytics.statusOverview} />
                <AssigneeDonut data={analytics.assigneeCompletion} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TimeSeriesArea data={analytics.timeSeries} />
              <RecentActivity items={analytics.recentActivity} />
            </div>
          </div>

          <aside className="col-span-4 space-y-4">
            <Card>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Priority quick stats</div>
                <div className="text-xs text-gray-500">Overview</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500">High Priority</div>
                  <div className="text-lg font-semibold">721</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Medium</div>
                  <div className="text-lg font-semibold">125</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Low</div>
                  <div className="text-lg font-semibold">110</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-sm font-medium mb-2">Task completion by assignee</div>
              <AssigneeDonut data={analytics.assigneeCompletion} />
            </Card>

            <RecentActivity items={analytics.recentActivity} />
          </aside>
        </section>
      </main>
    </div>
  );
}


