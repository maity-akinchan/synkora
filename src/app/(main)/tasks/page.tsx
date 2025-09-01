import TasksList from "@/components/tasks/tasksData";
import AdminTasks from "@/components/tasks/adminTasks";
import data from "./data.json";
export default function Page() {
    const userType = "admin";
    return (
        <>
            <div className="p-8 w-full">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>Tasks</h1>
                <p style={{ color: 'var(--color-muted-foreground)' }}>Plan, prioritize, and accomplish your tasks with ease.</p>
                <div className="mt-10">
                    <AdminTasks data={data}></AdminTasks>
                    {/* {(userType == "admin") ? (<AdminTasks data={data} />) : (<TasksList></TasksList>)} */}
                </div>
            </div>
        </>
    )
}