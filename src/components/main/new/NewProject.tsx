"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface TeamMember {
  id: string;
  name: string;
}

const roles = ["Owner", "Admin", "Editor", "Viewer"];

export function CreateProjectPage() {
  const methods = useForm();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const availableMembers: TeamMember[] = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Carol White" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 h-full flex flex-col">
      <h1 className="text-2xl font-semibold mb-2">Create New Project</h1>
      <hr className="mb-6 border-[var(--border)]" />

      <FormProvider {...methods}>
        <form className="flex flex-col justify-between h-full space-y-6">

          {/* Project Name */}
          <FormItem>
            <FormLabel htmlFor="projectName" className="text-[var(--foreground-alt)]">
              Project Name
            </FormLabel>
            <FormControl>
              <Input
                id="projectName"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
                placeholder="Enter project description"
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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          {/* Tags Input */}
          <FormItem>
            <FormLabel htmlFor="tags" className="text-[var(--foreground-alt)]">
              Tags
            </FormLabel>
            <FormControl>
              <Input
                id="tags"
                placeholder="e.g. frontend, dashboard, marketing"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-[var(--background-alt)] text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
              />
            </FormControl>
            <p className="text-sm text-[var(--foreground-alt)] mt-1">
              Separate tags with commas
            </p>
          </FormItem>
          {/* TODO: Add role selector. */}
          {/* Submit Button */}
          <div className="pt-4 mt-auto">
            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </div>

        </form>
      </FormProvider>
    </div>
  );
}
