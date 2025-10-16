import { prisma, dbConnection } from "@/lib/db"; 
import { Project, Task, Design, DesignComment } from "@/generated/prisma/client";

// --- Project, Task, Design, and Comment Functions (CRUD Pattern) ---

// ** Projects **
export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    await dbConnection;
    return prisma.project.create({ data: project });
}

export async function getProjectById(id: number) {
    await dbConnection;
    return prisma.project.findUnique({
        where: { id },
        include: { tasks: true, designs: true, owner: true }
    });
}

export async function updateProject(id: number, data: Partial<Project>) {
    await dbConnection;
    return prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: number) {
    await dbConnection;
    return prisma.project.delete({ where: { id } });
}

// ** Tasks **
export async function createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    await dbConnection;
    return prisma.task.create({ data: task });
}

export async function getTaskById(id: number) {
    await dbConnection;
    return prisma.task.findUnique({ where: { id } });
}

export async function updateTask(id: number, data: Partial<Task>) {
    await dbConnection;
    return prisma.task.update({ where: { id }, data });
}

export async function deleteTask(id: number) {
    await dbConnection;
    return prisma.task.delete({ where: { id } });
}

// ** Designs **
export async function createDesign(design: Omit<Design, 'id' | 'createdAt' | 'updatedAt'>) {
    await dbConnection;
    return prisma.design.create({ data: design });
}

export async function getDesignById(id: number) {
    await dbConnection;
    return prisma.design.findUnique({ where: { id }, include: { comments: true } });
}

export async function updateDesign(id: number, data: Partial<Design>) {
    await dbConnection;
    return prisma.design.update({ where: { id }, data });
}

export async function deleteDesign(id: number) {
    await dbConnection;
    return prisma.design.delete({ where: { id } });
}

// ** Design Comments **
export async function createComment(comment: Omit<DesignComment, 'id' | 'createdAt'>) {
    await dbConnection;
    return prisma.designComment.create({ data: comment });
}

export async function deleteComment(id: number) {
    await dbConnection;
    return prisma.designComment.delete({ where: { id } });
}