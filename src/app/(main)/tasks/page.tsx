import TasksList from "@/components/main/tasks/tasksData";
import AdminTasks from "@/components/main/tasks/adminTasks";
import {CreateTaskForm} from "@/components/main/tasks/manage/taskForm";
import data from "./data.json";
import { backgroundGradientStyle } from "@/lib/commons/styles";

export default function Page() {
    const userType = "admin";
    return (
        <>
            <div className="py-6 min-h-screen font-sans bg-[var(--background)] grid grid-cols-12 gap-8">
                <div className={`p-4 flex gap-4 flex-col h-full rounded-3xl ${backgroundGradientStyle} col-span-8`}>
                    <div className="px-4">
                        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>Tasks</h1>
                        <p style={{ color: 'var(--color-muted-foreground)' }}>Plan, prioritize, and accomplish your tasks with ease.</p>
                    </div>
                    <hr />
                    <AdminTasks data={data}></AdminTasks>
                    {/* {(userType == "admin") ? (<AdminTasks data={data} />) : (<TasksList></TasksList>)} */}

                </div>
                <div className={`h-full rounded-3xl ${backgroundGradientStyle} col-span-4`}>
                    <CreateTaskForm />
                </div>
            </div>
        </>
    )
}