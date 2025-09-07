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

const roles = ["Owner", "Admin", "Editor", "Viewer"];

export function InviteTeamMemberForm() {
  const methods = useForm();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6 h-full flex flex-col">
      <h1 className="text-2xl font-semibold mb-2">Invite Team Member</h1>
      <hr className="mb-6 border-[var(--border)]" />

      <FormProvider {...methods}>
        <form className="flex flex-col justify-between h-full space-y-6">

          {/* Email */}
          <FormItem>
            <FormLabel htmlFor="email" className="text-[var(--foreground-alt)]">
              Email Address
            </FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
              />
            </FormControl>
          </FormItem>

          {/* Role */}
          <FormItem>
            <FormLabel htmlFor="role" className="text-[var(--foreground-alt)]">
              Role
            </FormLabel>
            <FormControl>
              <Select
                value={role}
                onValueChange={setRole}
              >
                <SelectTrigger className="text-[var(--foreground)]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roles.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Message */}
          <FormItem>
            <FormLabel htmlFor="message" className="text-[var(--foreground-alt)]">
              Message (optional)
            </FormLabel>
            <FormControl>
              <Textarea
                id="message"
                placeholder="Add a short note with the invitation"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="text-[var(--foreground)] placeholder:text-[var(--foreground-alt)]"
              />
            </FormControl>
          </FormItem>

          {/* Submit Button */}
          <div className="pt-4 mt-auto">
            <Button type="submit" className="w-full">
              Send Invite
            </Button>
          </div>

        </form>
      </FormProvider>
    </div>
  );
}
