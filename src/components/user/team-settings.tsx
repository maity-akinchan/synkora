"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Trash2, AlertTriangle, GripVertical } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


// 1. Define the validation schema for the form
const teamSettingsSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters.").max(50),
  description: z.string().max(250, "Description cannot exceed 250 characters.").optional(),
  handle: z.string().regex(/^[a-z0-9-]+$/, "Handle can only contain lowercase letters, numbers, and hyphens.").max(30),
  tags: z.array(z.string()).max(10, "You can add a maximum of 10 tags."),
  allowProjectCreation: z.boolean(),
  availableRoles: z.array(z.object({ value: z.string().min(1, "Role name cannot be empty.") })).min(1, "You must have at least one role."),
});

type TeamSettingsFormValues = z.infer<typeof teamSettingsSchema>;

export function TeamSettingsPage() {
  // 2. Set up the form with default values (you'd fetch these from your API)
  const form = useForm<TeamSettingsFormValues>({
    resolver: zodResolver(teamSettingsSchema),
    defaultValues: {
      name: "Synkora Design",
      description: "The official design team for all Synkora projects. Focused on UI/UX and branding.",
      handle: "synkora-design",
      tags: ["engineering", "design", "marketing", "ui-ux"],
      allowProjectCreation: true,
      availableRoles: [{ value: "Owner" }, { value: "Admin" }, { value: "Member" }, { value: "Viewer" }],
    },
    mode: "onChange",
  });

  // `useFieldArray` for managing dynamic list of roles
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "availableRoles",
  });

  const [tagInput, setTagInput] = useState("");

  function onSubmit(data: TeamSettingsFormValues) {
    console.log("Team settings saved:", data);
    alert("Team settings updated successfully! Check the console for data.");
  }

  // Custom logic for handling tags
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (newTag && !form.getValues("tags").includes(newTag)) {
        form.setValue("tags", [...form.getValues("tags"), newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue("tags", form.getValues("tags").filter((tag) => tag !== tagToRemove));
  };
  
  return (
    <div className="container mx-auto max-w-4xl py-10 text-gray-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          {/* Section 1: General Team Information */}
          <Card className="bg-[var(--backround-alt)] border-gray-800">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription className="text-gray-400">Update your team's name, handle, and description.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background-alt border-gray-700 focus-visible:ring-green-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Handle</FormLabel>
                    <FormControl>
                        <div className="flex items-center">
                            <span className="px-3 h-10 flex items-center bg-[var(--background)] border border-r-0 border-gray-700 rounded-l-md text-gray-400 text-sm">synkora.com/</span>
                            <Input {...field} className="bg-[var(--background)] border-gray-700 rounded-l-none focus-visible:ring-green-500" />
                        </div>
                    </FormControl>
                     <FormDescription>This is your team's unique URL handle.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-[var(--background)] border-gray-700 focus-visible:ring-green-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 2: Workspace Configuration */}
          <Card className="bg-[var(--backround-alt)] border-gray-800">
            <CardHeader>
              <CardTitle>Workspace Configuration</CardTitle>
              <CardDescription className="text-gray-400">Customize tags, roles, and permissions for your team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
               <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Team Tags</FormLabel>
                     <FormControl>
                        <div>
                            <div className="flex flex-wrap gap-2 mb-2 min-h-[28px]">
                                {form.getValues("tags").map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-200">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 font-mono text-gray-400 hover:text-white focus:outline-none">&times;</button>
                                    </Badge>
                                ))}
                            </div>
                            <Input 
                                placeholder="Add a tag and press Enter"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                className="bg-[var(--background)] border-gray-700 focus-visible:ring-green-500"
                            />
                        </div>
                    </FormControl>
                    <FormDescription>Tags help in categorizing and finding projects.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                    control={form.control}
                    name="allowProjectCreation"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Allow members to create projects</FormLabel>
                                <FormDescription>If disabled, only Admins and Owners can create new projects.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                 <div>
                    <FormLabel>Available Roles</FormLabel>
                    <FormDescription className="mb-4">Define the custom roles available for team members.</FormDescription>
                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <FormField
                                key={field.id}
                                control={form.control}
                                name={`availableRoles.${index}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <TooltipProvider>
                                                  <Tooltip>
                                                    <TooltipTrigger>
                                                        <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                      <p>Drag to reorder (feature coming soon!)</p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                                <Input {...field} className="bg-[var(--background)] border-gray-700 focus-visible:ring-green-500" />
                                                <Button variant="ghost" size="icon" type="button" onClick={() => remove(index)} disabled={fields.length <= 1}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                     <Button type="button" variant="outline" size="sm" className="mt-4 border-gray-700 hover:bg-gray-800" onClick={() => append({ value: "" })}>
                        Add Role
                    </Button>
                </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="px-6 bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
          </div>
        </form>
      </Form>

      {/* Section 3: Danger Zone */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight text-red-500 mb-2">Danger Zone</h2>
        <div className="border border-red-500/30 bg-[var(--backround-alt)] rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-50">Delete this Team</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-xl">
                        This action is permanent and cannot be undone. All projects, tasks, and documents associated with this team will be permanently deleted.
                    </p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">Delete Team</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the <strong>{form.getValues("name")}</strong> team and remove all related data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => console.log("Team Deletion Confirmed!")}>
                                Yes, delete this team
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
      </div>
    </div>
  );
}
