"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DesignsPage() {
  const [selectedDesign, setSelectedDesign] = useState<"canvas" | "markdown" | null>(null);

  function handleCreate(type: "canvas" | "markdown") {
    setSelectedDesign(type);
    // Add your create logic here or navigate to design editor page
    alert(`Creating a new ${type} design...`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Create New Design</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          onClick={() => handleCreate("canvas")}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <CardTitle>Canvas Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create diagrams, whiteboards, and freeform designs on a flexible canvas.</p>
            <Button variant="outline" className="mt-4" onClick={() => handleCreate("canvas")}>
                <Link href="/canvas">Create Canvas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          onClick={() => handleCreate("markdown")}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <CardTitle>Markdown Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create rich, formatted documents using Markdown and LaTeX.</p>
            <Button variant="outline" className="mt-4" onClick={() => handleCreate("markdown")}>
              <Link href="/markdown">Create Markdown</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {selectedDesign && (
        <div className="mt-8 p-4 border rounded bg-gray-100 dark:bg-gray-800">
          <p>
            Selected design: <strong>{selectedDesign}</strong>
          </p>
          {/* Insert navigation or design editor component here */}
        </div>
      )}
    </div>
  );
}
