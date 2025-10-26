import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReportsClient from "@/components/analytics/reports-client"; // assumed frontend visualization

export default async function ProjectReportsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = await params;

  // --- Mock Data ---
  const session = {
    user: {
      id: "user_123",
      name: "John Doe",
      email: "john@example.com",
    },
  };

  // Mock analytics data
  const stats = {
    workload: [
      { user: { name: "Alice" }, tasks: 12, capacity: 8 },
      { user: { name: "Bob" }, tasks: 5, capacity: 10 },
    ],
    velocity: [
      { sprint: "Sprint 1", completed: 8 },
      { sprint: "Sprint 2", completed: 6 },
      { sprint: "Sprint 3", completed: 9 },
    ],
    burndown: [
      { day: 1, remaining: 30 },
      { day: 2, remaining: 24 },
      { day: 3, remaining: 20 },
      { day: 4, remaining: 15 },
      { day: 5, remaining: 10 },
      { day: 6, remaining: 6 },
      { day: 7, remaining: 3 },
    ],
    completion: {
      onTimeRate: 0.72,
    },
    overdue: {
      count: 2,
    },
  };

  // --- Derived Metrics ---
  const avgVelocity =
    stats.velocity.length > 0
      ? stats.velocity.reduce((a, b) => a + b.completed, 0) / stats.velocity.length
      : 0;

  const remaining =
    stats.burndown.length > 0
      ? stats.burndown[stats.burndown.length - 1].remaining
      : 0;

  const predictedSprints = avgVelocity > 0 ? Math.ceil(remaining / avgVelocity) : null;

  const overload = {
    overloaded: [{ user: { name: "Alice" } }],
  };

  const insights = {
    insights: {
      overloadedMembers: overload.overloaded.map((o) => o.user),
      risks: [
        ...(stats.overdue.count > 0
          ? [`${stats.overdue.count} overdue tasks`]
          : []),
        ...(overload.overloaded.length > 0
          ? [`Workload imbalance affecting ${overload.overloaded.length} member(s)`]
          : []),
        ...((stats.completion.onTimeRate || 0) < 0.6
          ? ["Low on-time completion rate (<60%)"]
          : []),
      ],
      suggestions: [
        ...overload.overloaded.map(
          (o) =>
            `Rebalance tasks from ${o.user.name} to under-utilized members.`
        ),
        stats.overdue.count > 0
          ? "Prioritize overdue tasks this week and renegotiate deadlines if needed."
          : null,
      ].filter(Boolean),
      predictedSprintCompletion: predictedSprints,
      context: {
        avgVelocity: Number(avgVelocity.toFixed(2)),
        remaining,
        onTimeRate: Number((stats.completion.onTimeRate * 100).toFixed(1)),
      },
    },
    aiSummary: null,
  };

  // --- Render ---
  return (
    <main
      className="container mx-auto max-w-7xl px-4 py-8"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Back link */}
      <div className="mb-4">
        <Link
          href={`/project/${projectId}`}
          className="inline-flex items-center gap-2 text-sm transition"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          <ArrowLeft
            className="h-4 w-4"
            style={{ color: "var(--muted-foreground)" }}
          />
          <span className="hover:underline hover:text-[var(--foreground)]">
            Back to project
          </span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          Reports & Analytics
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          Visualize project health, productivity, and risks.
        </p>
      </div>

      {/* Analytics Section */}
      {!stats ? (
        <div
          className="rounded border p-6 text-sm"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--muted-foreground)",
          }}
        >
          No analytics available.
        </div>
      ) : (
        <div
          className="rounded-lg border p-6"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--muted)",
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Summary Insights
          </h2>

          <ul className="mb-4 list-disc pl-6 space-y-1">
            {insights.insights.risks.map((risk, idx) => (
              <li key={idx} style={{ color: "var(--color-warning-dark)" }}>
                ⚠️ {risk}
              </li>
            ))}
          </ul>

          <h3
            className="text-lg font-semibold mt-6 mb-2"
            style={{ color: "var(--color-success-dark)" }}
          >
            Suggestions
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            {insights.insights.suggestions.map((s, idx) => (
              <li key={idx} style={{ color: "var(--foreground)" }}>
                💡 {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 text-sm">
            <p>
              <strong style={{ color: "var(--color-primary)" }}>
                Avg Velocity:
              </strong>{" "}
              {insights.insights.context.avgVelocity} tasks/sprint
            </p>
            <p>
              <strong style={{ color: "var(--color-primary)" }}>
                Remaining Tasks:
              </strong>{" "}
              {insights.insights.context.remaining}
            </p>
            <p>
              <strong style={{ color: "var(--color-primary)" }}>
                On-Time Rate:
              </strong>{" "}
              {insights.insights.context.onTimeRate}%
            </p>
            {predictedSprints && (
              <p>
                <strong style={{ color: "var(--color-primary)" }}>
                  Predicted Sprint Completion:
                </strong>{" "}
                {predictedSprints} sprints
              </p>
            )}
          </div>
        </div>
      )}

      {/* Mock visualization placeholder */}
      <div
        className="mt-10 rounded-lg border p-10 text-center text-sm"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--background-alt)",
          color: "var(--muted-foreground)",
        }}
      >
        <ReportsClient projectId={projectId} stats={stats as any} insights={insights} />
      </div>
    </main>
  );
}
