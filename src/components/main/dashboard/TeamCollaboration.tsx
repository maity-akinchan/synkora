'use client';

import { Project } from '@/lib/commons/store/useProjectStore';

interface TeamCollaborationProps {
    projects: Project[];
}

export default function TeamCollaboration({ projects }: TeamCollaborationProps) {
    const teamMembers = projects.flatMap((proj) => proj.teamMembers);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]';
            case 'In Progress':
                return 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]';
            case 'Pending':
            default:
                return 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)]';
        }
    };

    return (
        <div className="bg-[var(--color-background)] p-4 rounded-md shadow">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-[var(--color-foreground-muted)]">
                    Team Collaboration
                </h3>
                <button className="text-[var(--color-success)] hover:underline">
                    + Add Member
                </button>
            </div>
            <ul className="space-y-3 max-h-[240px] overflow-y-auto">
                {teamMembers.map((member) => (
                    <li key={member.id} className="flex items-center gap-3">
                        <img
                            src={`/avatars/${member.id}.png`}
                            alt={member.name}
                            className="w-8 h-8 rounded-full"
                            draggable={false}
                            onError={(e) =>
                                ((e.target as HTMLImageElement).src = '/default-avatar.png')
                            }
                        />
                        <div className="flex flex-col flex-1">
                            <span className="font-semibold text-[var(--color-foreground-strong)]">
                                {member.name}
                            </span>
                            <small className="text-[var(--color-foreground-muted)]">
                                {member.role}
                            </small>
                        </div>
                        <span
                            className={`text-xs px-2 py-0.5 rounded font-semibold ${getStatusBadge(
                                'In Progress'
                            )}`}
                        >
                            In Progress
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
