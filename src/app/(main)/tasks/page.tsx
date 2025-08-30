import TasksList from "./_components/tasksData";
import AdminTasks from "./_components/adminTasks";
import data from "./data.json";
export default function Page() {
    const userType = "admin";
    return (
        <>
            <div className="sm:w-full md:w-[70vw]">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>Tasks</h1>
                <p style={{ color: 'var(--color-muted-foreground)' }}>Plan, prioritize, and accomplish your tasks with ease.</p>
                <div className="w-full mt-10">
                    <AdminTasks data={data}></AdminTasks>
                    {/* {(userType == "admin") ? (<AdminTasks data={data} />) : (<TasksList></TasksList>)} */}
                </div>
            </div>
        </>
    )
}