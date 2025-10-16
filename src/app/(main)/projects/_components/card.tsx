import React from "react";
import { Play } from 'lucide-react';
import Avatars from "@/components/main/dashboard/nav/avatars";

type ProjectData = {
    projectName: string;
    dueDate: string; // TODO: Shift to Date type
    description: string;
    status: number;
    // TODO: Add avatars
};

type ProjectCardProps = {
    project: ProjectData;
};

const bgProps = [
    'bg-[var(--primary)]',
    'bg-[var(--color-warning)]',
    'bg-[var(--color-error)]'
];

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="p-3 flex bg-[var(--foreground-alt)] text-[var(--background-alt)] flex-col gap-2 border rounded-2xl w-full text-xs">
            <div className="flex items-center gap-2">
                <h2 className="font-medium w-2/3">{project.projectName}</h2>
                <span className="flex justify-end items-center gap-1 w-1/3">
                    <Play className={`p-1 rounded-full text-black ${bgProps[project.status] || 'bg-green-500'}`} />
                    <span className="text-[10px]">Active</span>
                </span>
            </div>
            <div>
                <Avatars />
            </div>
            <p className="text-[10px]">
                <span className="font-medium">Due:</span> {project.dueDate}
            </p>
            <p className="text-[11px]">
                {project.description.length > 50
                    ? project.description.slice(0, 50) + "..."
                    : project.description}
            </p>
        </div>
    );
}

type ProjectCardsLoaderProps = {
    projects: ProjectData[];
};

export function ProjectCardsLoader({ projects }: ProjectCardsLoaderProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    );
}
