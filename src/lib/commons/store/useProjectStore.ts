import { create } from 'zustand';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline: string;
    priority: 'Low' | 'Medium' | 'High';
    assignedTo: string[]; // member ids
    status: TaskStatus;
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    deadline: string;
    tasks: Task[];
    teamMembers: TeamMember[];
}

interface ProjectStore {
    projects: Project[];
    addProject: (project: Project) => void;
    updateProject: (project: Project) => void;
    addTeamMember: (projectId: string, member: TeamMember) => void;
    addTask: (projectId: string, task: Task) => void;
    updateTaskStatus: (
        projectId: string,
        taskId: string,
        status: TaskStatus
    ) => void;
    // Other CRUD methods...
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],

    addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),

    updateProject: (updatedProject) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === updatedProject.id ? updatedProject : p
            ),
        })),

    addTeamMember: (projectId, member) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId
                    ? { ...p, teamMembers: [...p.teamMembers, member] }
                    : p
            ),
        })),

    addTask: (projectId, task) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId ? { ...p, tasks: [...p.tasks, task] } : p
            ),
        })),

    updateTaskStatus: (projectId, taskId, status) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId
                    ? {
                        ...p,
                        tasks: p.tasks.map((t) =>
                            t.id === taskId ? { ...t, status } : t
                        ),
                    }
                    : p
            ),
        })),
}));