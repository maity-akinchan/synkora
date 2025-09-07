"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type RobotPopupProps = {
    setMarkdown: (markdown: string) => void;
};

export function RobotPopup({ setMarkdown }: RobotPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Convert FormData to plain object
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/api/gen/md", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Now it's a serializable object
        });

        if (!response.ok) {
          console.error("Failed to fetch:", response.status, await response.text());
          return;
        }

        const body = await response.json();
        setMarkdown(body.output);
        setIsOpen(false);
    }
    const toggleOpen = () => {
        if (isOpen == false) {
            setIsOpen(true);
        }
    }
    return (
        <span onClick={toggleOpen}>
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <FontAwesomeIcon
                    className="hover:text-gray-500 hover:cursor-pointer"
                    icon={faRobot}
                    size="lg"
                />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create using AI!</DialogTitle>
                        <DialogDescription>
                            Describe your markdown file
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="prompt">Prompt</Label>
                            <Input
                                id="prompt"
                                name="prompt"
                                defaultValue="Create me a SRS for a Banking Application"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="bg-green-500" onClick={()=>{setIsOpen(false)}}variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button className="bg-green-500" type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </span>
    );
}
