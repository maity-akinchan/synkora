import ProjectSummaryCard from '@/components/main/dashboard/ProjectSummaryCard';

export default function TasksList() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <ProjectSummaryCard title="Total Projects" value={11} highlightIncrease={5} highlightColor="green" />
                <ProjectSummaryCard title="Ended Projects" value={2} highlightIncrease={6} />
                <ProjectSummaryCard title="Running Projects" value={9} highlightIncrease={2} />
                <ProjectSummaryCard title="Pending Project" value={3} highlightText="On Discuss" />
            </div>
        </>
    )
}