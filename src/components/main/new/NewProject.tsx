"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [members, setMembers] = useState<
    { memberId: string; role: string }[]
  >([]);

  // Example team members - replace with your data source
  const availableMembers: TeamMember[] = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Carol White" },
  ];

  function addMember() {
    setMembers((prev) => [...prev, { memberId: "", role: roles[0] }]);
  }

  function updateMember(
    index: number,
    data: Partial<{ memberId: string; role: string }>
  ) {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...data };
      return copy;
    });
  }

  function removeMember(index: number) {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-2xl font-semibold mb-6">Create New Project</h1>
      <FormProvider {...methods}>
        <form className="space-y-6">
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-[var(--foreground-alt)]">Assign Team Members</Label>
              <Button type="button" size="sm" onClick={addMember}>
                + Add Member
              </Button>
            </div>

            {members.map((member, idx) => (
              <div
                key={idx}
                className="mb-4 flex gap-4 items-center bg-[var(--background-alt)] p-4 rounded-md"
              >
                <FormControl className="flex-1">
                  <Select
                    value={member.memberId}
                    onValueChange={(val) => updateMember(idx, { memberId: val })}
                  >
                    <SelectTrigger className="bg-[var(--background)] text-[var(--foreground)]">
                      <SelectValue placeholder="Select member" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--background-alt)] text-[var(--foreground)]">
                      <SelectGroup>
                        {availableMembers.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormControl className="w-48">
                  <Select
                    value={member.role}
                    onValueChange={(val) => updateMember(idx, { role: val })}
                  >
                    <SelectTrigger className="bg-[var(--background)] text-[var(--foreground)]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--background-alt)] text-[var(--foreground)]">
                      <SelectGroup>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(idx)}
                  aria-label="Remove member"
                  className="w-full justify-right text-[var(--foreground)]"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full mt-4">
            Create Project
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
