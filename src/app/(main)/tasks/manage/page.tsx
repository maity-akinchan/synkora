"use client";
import { MultiSelectCombobox } from "@/components/main/tasks/tags";
import {ComboboxDropdownMenu} from "@/components/ui/dropdown-tags"

export default function Page() {
  function onSubmit(data: unknown) {
    // handle form submission
    console.log(data);
  }
    const myLabels = new Array("hello", "Hi", "Bye")

  return (
    <>
      <ComboboxDropdownMenu tagText="Hello" labels={myLabels}></ComboboxDropdownMenu>

      <div className="p-4 sm:p-8 w-full">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>Manage Task</h1>
        <hr />
        <div className="w-full sm:max-w-2xl mx-auto mt-10 bg-gradient-to-tl from-[var(--background-alt)] to-[var(--background)] p-4 sm:p-8 rounded-xl">
          <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label>Task name</label>
                <input name="taskName" placeholder="Task Name" className="border-2 py-1 px-4 rounded-md focus:border-[var(--color-primary)] w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label>Assigned To</label>
                <select name="taskAssignee" id="taskAssignee" className="border-2 px-4 rounded-md h-full focus:border-[var(--color-primary)] w-full">
                  <option value="opt1">Option 1</option>
                  <option value="opt2">Option 2</option>
                  <option value="opt3">Option 3</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label>Due Date</label>
                <input type="date" name="dueDate" placeholder="Due Date" className="border-2 py-1 px-4 rounded-md focus:border-[var(--color-primary)] w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label>Due Time</label>
                <input type="time" name="dueTime" placeholder="Due Time" className="border-2 py-1 px-4 rounded-md focus:border-[var(--color-primary)] w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Description</label>
              <textarea name="description" placeholder="Description" className="border-2 w-full p-4 rounded-md focus:border-[var(--color-primary)]"></textarea>
            </div>
            <MultiSelectCombobox />
            <div className="flex w-full justify-end">
              <button className="bg-[var(--primary)] hover:bg-[var(--primary)-dark] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] active:bg-violet-700 px-4 py-2 rounded-full">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
