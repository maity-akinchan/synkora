'use client';

import { Project } from '@/lib/stores/useProjectStore';

interface TeamCollaborationProps {
    projects: Project[];
}

export default function TeamCollaboration({ projects }: TeamCollaborationProps) {
    // Flatten team members for demo (could implement filtered per project)
    const teamMembers = projects.flatMap((proj) => proj.teamMembers);

    // Sample User Status Badge color by task completion (simplified)
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-200 text-green-800';
            case 'In Progress':
                return 'bg-yellow-200 text-yellow-800';
            case 'Pending':
            default:
                return 'bg-red-200 text-red-800';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Team Collaboration</h3>
                <button className="text-green-700 dark:text-green-400 hover:underline">+ Add Member</button>
            </div>
            <ul className="space-y-3 max-h-[240px] overflow-y-auto">
                {teamMembers.map((member, i) => (
                    <li key={member.id} className="flex items-center gap-3">
                        <img
                            src={`/avatars/${member.id}.png`}
                            alt={member.name}
                            className="w-8 h-8 rounded-full"
                            draggable={false}
                            onError={(e) => ((e.target as HTMLImageElement).src = '/default-avatar.png')}
                        />
                        <div className="flex flex-col flex-1">
                            <span className="font-semibold text-gray-900 dark:text-white">{member.name}</span>
                            <small className="text-gray-600 dark:text-gray-400">{member.role}</small>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getStatusBadge('In Progress')}`}>
                            In Progress
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}