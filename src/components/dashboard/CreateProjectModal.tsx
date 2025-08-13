'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useProjectStore } from '@/lib/commons/store/useProjectStore';
import { v4 as uuidv4 } from 'uuid';

interface CreateProjectModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function CreateProjectModal({ open, setOpen }: CreateProjectModalProps) {
    const addProject = useProjectStore((state) => state.addProject);
    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [deadline, setDeadline] = React.useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !deadline) return alert('Name and deadline required.');

        addProject({
            id: uuidv4(),
            name,
            description: desc,
            deadline,
            tasks: [],
            teamMembers: [],
        });

        setOpen(false);
        setName('');
        setDesc('');
        setDeadline('');
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                <Dialog.Content className="sm:max-w-lg sm:mx-auto rounded-lg p-6 bg-white dark:bg-gray-900">
                    <Dialog.Title>Create New Project</Dialog.Title>
                    <Dialog.Description>Enter project details below.</Dialog.Description>
                    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Project Name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            className="textarea textarea-bordered w-full"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="bg-green-700 text-white rounded py-2 hover:bg-green-600 transition font-semibold"
                        >
                            Create Project
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}