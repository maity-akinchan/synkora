"use client";

import { useForm, FormProvider, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {createTask} from  "@/lib/callers/tasks"
// --- Assume this is in another file e.g., './api/tasks.ts' ---
// You would import this function into your component
interface TaskInput {
  projectId: number; // Assuming a static project ID for now
  title: string;
  description?: string;
  priority: string;
  status: string; // Assuming a default status
  createdById?: number; // Assuming a static creator ID
  assigneeId?: number;
}

// --- End of API function ---


// Define the type for our form data
interface IFormInput {
  taskName: string;
  description: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
  tags: string;
}

interface TeamMember {
  id: string;
  name: string;
}

const priorities = ["High", "Medium", "Low"];

export function CreateTaskForm() {
  // 1. Set up react-hook-form
  const form = useForm<IFormInput>({
    // You can set default values here if needed
    defaultValues: {
      taskName: "",
      description: "",
      priority: "",
      assignedTo: "",
    },
  });

  const teamMembers: TeamMember[] = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Carol White" },
  ];

  // 2. Create the onSubmit handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form Submitted!", data);

    try {
      // 3. Map form data to the shape your API expects
      const taskVariables: TaskInput = {
        projectId: 2, // Example static projectId
        title: data.taskName,
        description: data.description,
        priority: data.priority,
        status: "To Do", // Example default status
        assigneeId: parseInt(data.assignedTo, 10), // Convert string ID to number
        createdById: 1, // Example static creatorId
      };
      
      // 4. Call the API function
      await createTask(taskVariables);
      
      alert("Task created successfully!"); // Or use a toast notification
      form.reset(); // Reset form fields after successful submission
      
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Please try again."); // Or use a toast notification
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 h-full flex flex-col">
      <h1 className="text-2xl font-semibold mb-2">Create New Task</h1>
      <hr className="mb-6 border-[var(--border)]" />

      {/* Use the Form component from Shadcn with react-hook-form */}
      <Form {...form}>
        {/* The `handleSubmit` function from react-hook-form wraps your onSubmit */}
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col justify-between h-full space-y-6"
        >
          {/* Task Name */}
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--foreground-alt)]">Task Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter task name" 
                    {...field}
                    className="text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--foreground-alt)]">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter task description"
                    rows={4}
                    {...field}
                    className="text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Due Date - This remains similar as it's a standard input */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--foreground-alt)]">Due Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority - Using Controller for custom components like Select */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--foreground-alt)]">Priority</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-[var(--foreground)]">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorities.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assigned To */}
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--foreground-alt)]">Assign To</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-[var(--foreground)]">
                      <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--foreground-alt)]">Tags</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. urgent, bug, ui" 
                    {...field}
                    className="text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
                  />
                </FormControl>
                <p className="text-sm text-[var(--foreground-alt)] mt-1">
                  Separate tags with commas
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Submit Button */}
          <div className="pt-4 mt-auto">
            <Button type="submit" className="w-full">
              Create Task
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}