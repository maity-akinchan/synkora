"use client"
import { MultiSelectCombobox } from "@/components/tasks/tags";
export default function Page() {
    function onSubmit(data: unknown) {
        // handle form submission
        console.log(data);
    }

    return (
        <>
            <div className="sm:w-full md:w-[70vw]">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>Manage Task</h1>
                <hr />
                <div className="w-[70%] bg-gradient-to-tl mx-auto mt-10 from-[var(--background-alt)] to-[var(--background)] p-8 rounded-xl">
                    <form onSubmit={onSubmit} className="flex flex-col gap-10">
                        <span className="flex gap-4">
                            <span className="flex flex-col gap-2 sm:w-full md:w-1/2">
                                <label htmlFor="">Task name</label>
                                <input name="taskName" placeholder="Task Name" className="border-2 py-1 px-4 rounded-md focus:border-[var(--color-primary)]" />
                            </span>
                            <span className="flex flex-col gap-2 sm:w-full md:w-1/2">
                                <label htmlFor="">Assigned To</label>
                                <select name="taskAssignee" id="taskAssignee" className="border-2 px-4 rounded-md h-full focus:border-[var(--color-primary)]">
                                    <option value="opt1" className="text-[var(--foreground)] bg-[var(--background-alt)]">Option 1</option>
                                    <option value="opt2" className="text-[var(--foreground)] bg-[var(--background-alt)]">Option 2</option>
                                    <option value="opt3" className="text-[var(--foreground)] bg-[var(--background-alt)]">Option 3</option>
                                </select>
                            </span>
                        </span>
                        <span className="flex gap-4">
                            <span className="flex flex-col gap-2 sm:w-full md:w-1/2">
                                <label htmlFor="">Due Date</label>
                                <input type="date" name="taskName" placeholder="Due Date" className="border-2 py-1 px-4 rounded-md focus-visible:border-[var(--color-primary)]" />
                            </span>
                            <span className="flex flex-col gap-2 sm:w-full md:w-1/2">
                                <label htmlFor="">Due Time</label>
                                <input type="time" name="taskName" placeholder="Due Date" className="border-2 py-1 px-4 rounded-md focus-visible:border-[var(--color-primary)]" />
                            </span>
                        </span>
                        <span className="flex flex-col gap-4 justify-around">
                            <label htmlFor="">Description</label>
                            <textarea name="description" id="" placeholder="Description" className="border-2 w-full p-4 rounded-md focus-visible:border-[var(--color-primary)]"></textarea>
                        </span>
                        <MultiSelectCombobox />
                        <div className="flex w-full justify-end">
                            <button className="bg-[var(--primary)] hover:bg-[var(--primary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--secondary)] active:bg-violet-700 px-2 py-1 rounded-full w-fit ">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}