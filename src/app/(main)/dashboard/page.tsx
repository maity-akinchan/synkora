import CreateProjectModal from "@/components/create-project-modal";
import { ProjectCard } from "@/components/project-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    // --- Mock session ---
    const session = {
        user: {
            id: "user_123",
            name: "John Doe",
            email: "john@example.com",
            image: "https://i.pravatar.cc/150?img=3",
        },
    };

    // --- Mock data ---
    const projects = [
        {
            id: "p1",
            name: "Synkora",
            description: "Collaborative project management platform",
            createdAt: new Date("2025-05-10"),
            members: [
                {
                    user: {
                        id: "user_123",
                        name: "John Doe",
                        email: "john@example.com",
                        image: "https://i.pravatar.cc/150?img=3",
                    },
                    role: "admin",
                },
            ],
        },
        {
            id: "p2",
            name: "OrbitalEye",
            description: "AI-powered space monitoring system",
            createdAt: new Date("2025-06-15"),
            members: [
                {
                    user: {
                        id: "user_123",
                        name: "John Doe",
                        email: "john@example.com",
                        image: "https://i.pravatar.cc/150?img=3",
                    },
                    role: "member",
                },
            ],
        },
    ];

    const invitations = [
        {
            id: "inv1",
            token: "abc123",
            project: {
                name: "NeuroDash",
                description: "AI dashboard for neural network metrics",
            },
        },
    ];

    // --- Handle query params (mock) ---
    const sp = await searchParams;
    const errorRaw = sp?.inviteError;
    const successRaw = sp?.inviteSuccess;
    const errorKey = (Array.isArray(errorRaw) ? errorRaw[0] : errorRaw) || "";
    const successKey = (Array.isArray(successRaw) ? successRaw[0] : successRaw) || "";

    const errorMessage =
        errorKey === "missing_token"
            ? "Invitation token is missing."
            : errorKey === "invalid_or_expired"
                ? "This invitation is invalid or has expired."
                : errorKey === "email_mismatch"
                    ? "This invitation is for a different email address."
                    : "";

    const successMessage =
        successKey === "accepted"
            ? "Invitation accepted. You've been added to the project."
            : "";

    // --- Render ---
    return (
        <main
            className="container mx-auto max-w-7xl px-4 py-10"
            style={{
                background: "var(--background)",
                color: "var(--foreground)",
            }}
        >
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Dashboard
                    </h1>
                    <p
                        className="mt-2"
                        style={{ color: "var(--muted-foreground)" }}
                    >
                        Your projects
                    </p>
                </div>

                {/* Feedback for invitation accept flows */}
                <div className="w-full">
                    {errorMessage ? (
                        <div className="mt-4">
                            <Alert
                                style={{
                                    borderColor: "var(--color-error)",
                                    background: "var(--color-error-light)",
                                    color: "var(--color-error-dark)",
                                }}
                            >
                                <AlertTitle>Invitation Error</AlertTitle>
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        </div>
                    ) : null}
                    {successMessage ? (
                        <div className="mt-4">
                            <Alert
                                style={{
                                    borderColor: "var(--color-success)",
                                    background: "var(--color-success-light)",
                                    color: "var(--color-success-dark)",
                                }}
                            >
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>{successMessage}</AlertDescription>
                            </Alert>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Invitations */}
            {invitations.length > 0 && (
                <div
                    className="mt-8 rounded-lg border p-5"
                    style={{
                        borderColor: "var(--color-border)",
                        background: "var(--muted)",
                        color: "var(--foreground)",
                    }}
                >
                    <h2
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Pending invitations
                    </h2>
                    <ul className="mt-3 space-y-3">
                        {invitations.map((inv) => (
                            <li
                                key={inv.id}
                                className="flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-medium">{inv.project.name}</div>
                                    <div
                                        className="text-xs"
                                        style={{ color: "var(--muted-foreground)" }}
                                    >
                                        {inv.project.description}
                                    </div>
                                </div>
                                <a
                                    href={`/invitations/accept?token=${encodeURIComponent(inv.token)}`}
                                    className="text-sm font-medium underline"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    Accept
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Projects */}
            {projects.length === 0 ? (
                <div
                    className="mt-10 rounded-lg border p-10 text-center"
                    style={{
                        borderColor: "var(--color-border)",
                        color: "var(--muted-foreground)",
                    }}
                >
                    You have no projects yet. Click the + button to create one.
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p) => {
                        const me = p.members.find((m) => m.user.id === session.user.id);
                        const canAdmin = me?.role === "admin";
                        return (
                            <ProjectCard
                                key={p.id}
                                project={{
                                    id: p.id,
                                    name: p.name,
                                    description: p.description,
                                    createdAt: p.createdAt,
                                    members: p.members,
                                }}
                                canAdmin={!!canAdmin}
                            />
                        );
                    })}
                </div>
            )}

            <CreateProjectModal />
        </main>
    );
}
