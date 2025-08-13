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
                {/* Overlay */}
                <Dialog.Overlay
                    className="fixed inset-0"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                />

                {/* Content */}
                <Dialog.Content
                    className="sm:max-w-lg sm:mx-auto rounded-lg p-6"
                    style={{
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-foreground)',
                    }}
                >
                    <Dialog.Title className="text-lg font-bold">
                        Create New Project
                    </Dialog.Title>
                    <Dialog.Description style={{ color: 'var(--color-muted-foreground)' }}>
                        Enter project details below.
                    </Dialog.Description>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Project Name"
                            className="input input-bordered w-full"
                            style={{
                                backgroundColor: 'var(--color-muted)',
                                color: 'var(--color-foreground)',
                                borderColor: 'var(--color-border)',
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            className="textarea textarea-bordered w-full"
                            style={{
                                backgroundColor: 'var(--color-muted)',
                                color: 'var(--color-foreground)',
                                borderColor: 'var(--color-border)',
                            }}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            style={{
                                backgroundColor: 'var(--color-muted)',
                                color: 'var(--color-foreground)',
                                borderColor: 'var(--color-border)',
                            }}
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="rounded py-2 font-semibold transition"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-foreground)',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'var(--color-primary)')
                            }
                        >
                            Create Project
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
