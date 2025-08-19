import { DataTable } from "@/components/tasks/data-table";
import TasksList from "./_components/tasksData"
import data from "./data.json";
export default function Page() {
    const userType = "admin";
    return (
        <>
            <div className="w-full">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>Tasks</h1>
                <p style={{ color: 'var(--color-muted-foreground)' }}>Plan, prioritize, and accomplish your tasks with ease.</p>
                <div className="w-full mt-10">
                    {(userType == "admin") ? (<DataTable data={data} />) : (<TasksList></TasksList>)}
                </div>
            </div>
        </>
    )
}