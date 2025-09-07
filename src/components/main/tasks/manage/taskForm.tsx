"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface TeamMember {
  id: string;
  name: string;
}

const priorities = ["High", "Medium", "Low"];

export function CreateTaskForm() {
  const methods = useForm();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [tags, setTags] = useState("");

  const teamMembers: TeamMember[] = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Carol White" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 h-full flex flex-col">
      <h1 className="text-2xl font-semibold mb-2">Create New Task</h1>
      <hr className="mb-6 border-[var(--border)]" />

      <FormProvider {...methods}>
        <form className="flex flex-col justify-between h-full space-y-6">
          
          {/* Task Name */}
          <FormItem>
            <FormLabel htmlFor="taskName" className="text-[var(--foreground-alt)]">
              Task Name
            </FormLabel>
            <FormControl>
              <Input
                id="taskName"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                className="bg-[var(--background-alt)] text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
              />
            </FormControl>
          </FormItem>

          {/* Description */}
          <FormItem>
            <FormLabel htmlFor="description" className="text-[var(--foreground-alt)]">
              Description
            </FormLabel>
            <FormControl>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="bg-[var(--background-alt)] text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
              />
            </FormControl>
          </FormItem>

          {/* Due Date */}
          <FormItem>
            <FormLabel htmlFor="dueDate" className="text-[var(--foreground-alt)]">
              Due Date
            </FormLabel>
            <FormControl>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="bg-[var(--background-alt)] text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
              />
            </FormControl>
          </FormItem>

          {/* Priority */}
          <FormItem>
            <FormLabel htmlFor="priority" className="text-[var(--foreground-alt)]">
              Priority
            </FormLabel>
            <FormControl>
              <Select
                value={priority}
                onValueChange={setPriority}
              >
                <SelectTrigger className="bg-[var(--background-alt)] text-[var(--foreground)]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {priorities.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Assigned To */}
          <FormItem>
            <FormLabel htmlFor="assignedTo" className="text-[var(--foreground-alt)]">
              Assign To
            </FormLabel>
            <FormControl>
              <Select
                value={assignedTo}
                onValueChange={setAssignedTo}
              >
                <SelectTrigger className="bg-[var(--background-alt)] text-[var(--foreground)]">
                  <SelectValue placeholder="Select a team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Tags */}
          <FormItem>
            <FormLabel htmlFor="tags" className="text-[var(--foreground-alt)]">
              Tags
            </FormLabel>
            <FormControl>
              <Input
                id="tags"
                placeholder="e.g. urgent, bug, ui"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-[var(--background-alt)] text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
              />
            </FormControl>
            <p className="text-sm text-[var(--foreground-alt)] mt-1">
              Separate tags with commas
            </p>
          </FormItem>

          {/* Submit Button */}
          <div className="pt-4 mt-auto">
            <Button type="submit" className="w-full">
              Create Task
            </Button>
          </div>

        </form>
      </FormProvider>
    </div>
  );
}
