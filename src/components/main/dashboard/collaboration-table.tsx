import React from 'react';
import { IconUsersGroup, IconChevronDown } from '@tabler/icons-react';

let status = ['Completed', 'Pending', 'In Progress'];

interface Author {
  name: string;
}

interface Project {
  id: number;
  author: Author;
  name: string;
  date: string;
  timeSpent: number;
  status: number;
}

interface ProjectCollaborationProps {
  title?: string;
  projects: Array<Project>;
  className?: string;
}

const statusStyles = [
  'bg-green-100 text-green-800',
  'bg-red-100 text-red-800',
  'bg-purple-100 text-purple-800'
];

export const ProjectCollaboration: React.FC<ProjectCollaborationProps> = ({
  title = 'Project Collaboration',
  projects,
  className = ''
}) => {
  return (
    <div
      className={`bg-[var(--background)] overflow-hidden rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-y-4">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--background)] bg-[var(--foreground)] border border-gray-300 rounded-full hover:text-[var(--foreground-alt)] hover:bg-[var(--background-alt)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            All Member
            <IconUsersGroup className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--background)] bg-[var(--foreground)] border border-gray-300 rounded-full hover:text-[var(--foreground-alt)] hover:bg-[var(--background-alt)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Today
            <IconChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Header (Only on md and up) */}
      <div className="hidden md:grid grid-cols-5 gap-x-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 pb-3">
        <div className="text-left text-xs font-medium text-[var(--foreground)]/80 uppercase tracking-wider">
          Author
        </div>
        <div className="text-left text-xs font-medium text-[var(--foreground)]/80 uppercase tracking-wider">
          Project
        </div>
        <div className="text-left text-xs font-medium text-[var(--foreground)]/80 uppercase tracking-wider">
          Date
        </div>
        <div className="text-left text-xs font-medium text-[var(--foreground)]/80 uppercase tracking-wider">
          Time Spend
        </div>
        <div className="text-left text-xs font-medium text-[var(--foreground)]/80 uppercase tracking-wider">
          Status
        </div>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-gray-200">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8 py-4 hover:bg-[var(--background)]/30"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 flex items-center justify-center bg-[var(--background)]/90 text-white rounded-full text-xs font-bold">
                {index + 1}
              </div>
              <div className="text-sm font-medium text-[var(--foreground)]">
                <span className="block md:hidden text-xs font-semibold text-[var(--foreground)]/60">
                  Author:
                </span>
                {project.author.name}
              </div>
            </div>

            {/* Project */}
            <div className="text-sm text-[var(--foreground)]">
              <span className="block md:hidden text-xs font-semibold text-[var(--foreground)]/60">
                Project:
              </span>
              {project.name}
            </div>

            {/* Date */}
            <div className="text-xs text-white bg-[var(--secondary)] rounded-3xl text-center flex sm:flex-col md:flex-row items-center justify-center py-1 px-2">
              <span className="block md:hidden text-xs font-semibold text-[var(--foreground)]/60">
                Date:
              </span>
              {project.date || 'NO DATE FOUND'}
            </div>

            {/* Time */}
            <div className="text-xs text-white bg-[var(--secondary)] rounded-3xl text-center flex sm:flex-col md:flex-row items-center justify-center py-1 px-2">
              <span className="block md:hidden text-xs font-semibold text-[var(--foreground)]/60">
                Time:
              </span>
              {project.timeSpent || 0}
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[project.status]}`}
              >
                {status[project.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};