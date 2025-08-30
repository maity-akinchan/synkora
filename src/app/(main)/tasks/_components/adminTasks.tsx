import React from "react";
import {DataTable} from "@/components/tasks/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCheck, IconHourglassLow } from "@tabler/icons-react";

const completedTasks = 42; // Replace with real data
const ongoingTasks = 17;   // Replace with real data

export default function AdminTasks(params: any) {
    return (
        <div className="space-y-8 p-6">
            <div className="flex px-6 flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                <Card className="flex-1 text-[var(--color-success)] font-bold">
                    <CardHeader className="flex items-center space-x-2">
                        <IconCheck className="text-[var(--color-success)]" size={28} />
                        <CardTitle>Completed Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-3xl font-bold text-[var(--color-success)]">{completedTasks}</span>
                    </CardContent>
                </Card>
                <Card className="flex-1 text-[var(--color-warning)]">
                    <CardHeader className="flex items-center space-x-2">
                        <IconHourglassLow className="text-[var(--color-warning)]" size={28} />
                        <CardTitle>Ongoing Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-3xl font-bold text-[var(--color-warning)]">{ongoingTasks}</span>
                    </CardContent>
                </Card>
            </div>
            <div className="flex px-6">
                <Button variant="default" size="lg">
                    + Create Task
                </Button>
            </div>
            <DataTable data={params.data} />
        </div>
    );
}