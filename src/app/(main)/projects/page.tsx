import Button from "@/components/main/button";
import { IconFilter, IconSortDescending } from "@tabler/icons-react";
import { ProjectCardsLoader } from "@/components/main/projects/card";
import { CreateProjectPage } from "@/components/main/new/NewProject";
const sampleProjects = [
  {
    projectName: 'Dashboard UI',
    dueDate: "2025-08-12", // TODO: Shift to Date type
    description: "A responsive and modern dashboard interface for visualizing key business metrics and user activity.",
    // TODO: Add avatars
  },
  {
    projectName: 'API Integration',
    dueDate: "2025-08-18", // TODO: Shift to Date type
    description: "Integrating third-party APIs to streamline data flow between services and enhance backend functionality.",
    // TODO: Add avatars
  },
  {
    projectName: 'Mobile Design',
    dueDate: "2025-09-01", // TODO: Shift to Date type
    description: "Creating a mobile-first user interface with intuitive navigation and consistent branding across platforms.",
    // TODO: Add avatars
  },
  {
    projectName: 'Marketing Plan',
    dueDate: "2025-09-05", // TODO: Shift to Date type
    description: "Developing a strategic marketing roadmap including target audience, channels, and KPIs for product launch.",
    // TODO: Add avatars
  },
]
export default function App() {
    return (
        <div className="py-6 min-h-screen font-sans bg-[var(--background)] grid grid-cols-12 gap-8">
            <div className="p-4 flex gap-4 flex-col h-full rounded-3xl bg-[var(--background-alt)] col-span-8">
                <h1 className="text-2xl font-bold">Projects</h1>
                <hr />
                <div className="flex flex-col gap-4">
                    <h1 className="text-lg font-bold">Recent Projects:</h1>
                    <ProjectCardsLoader projects={sampleProjects.slice(0,2)} />
                </div>
                <hr />
                <div>
                    <div className="flex mb-4">
                        <h1 className="w-full text-lg font-bold">Current Projects:</h1>
                        <div className="flex gap-4 justify-end">
                            <Button Icon={IconFilter} text={"Filter"}/>
                            <Button Icon={IconSortDescending} text={"Sort"}/>
                        </div>
                    </div>
                    <ProjectCardsLoader projects={sampleProjects} />
                </div>
                <hr />
            </div>
            <div className="h-full rounded-3xl bg-[var(--background-alt)] col-span-4">
                <CreateProjectPage />
            </div>
        </div>
    )
}
