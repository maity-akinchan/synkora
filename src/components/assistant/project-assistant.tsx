"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";

export default function ProjectAssistant({ projectId }: { projectId: string }) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hi! I'm your Project Assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function sendPrompt(text: string) {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, prompt: text }),
      });
      const data = await res.json();
      const reply = data?.message || data?.error || "Sorry, I couldn't process that.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function quick(text: string) {
    sendPrompt(text);
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
      <div className="md:col-span-4 space-y-3">
        <div className="rounded-md border p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Bot className="h-4 w-4" /> Quick Actions</div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => quick("What's the project status?")}>Summarize status</Button>
            <Button size="sm" variant="secondary" onClick={() => quick("Show me overdue tasks.")}>Show overdue</Button>
            <Button size="sm" variant="secondary" onClick={() => quick("Who is overloaded with tasks right now?")}>Overloaded members</Button>
            <Button size="sm" variant="secondary" onClick={() => quick("Suggest task allocation for next sprint")}>Suggest allocation</Button>
          </div>
        </div>
      </div>
      <div className="md:col-span-8 flex h-[460px] flex-col rounded-md border">
        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <div className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendPrompt(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              className="flex-1 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ask about status, overdue tasks, workloads, or type commands..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
