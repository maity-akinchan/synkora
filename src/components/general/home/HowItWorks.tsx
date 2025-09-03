import { Card, CardContent } from "@/components/general/home/ui/card";
import { Package, Shuffle, Fingerprint } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Set your workspace",
    description: "Create a project, invite your team, and define your collaboration style.",
    color: "text-primary"
  },
  {
    icon: Shuffle,
    title: "Collaborate & visualize",
    description: "Plan, brainstorm, and build together — with AI-assisted clarity and real-time updates.",
    color: "text-blue-400"
  },
  {
    icon: Fingerprint,
    title: "Stay in sync",
    description: "Synkora keeps your team connected and your projects evolving — no matter the scale.",
    color: "text-purple-400"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 scroll-reveal">
          <div className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary mb-6">
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Seamless teamwork,{" "}
            <br className="hidden md:block" />
            delivered in real time.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <Card 
              key={step.title}
              className="bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card group animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-surface-elevated to-surface-hover rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Icons */}
        <div className="mt-20 text-center animate-fade-in">
          <h3 className="text-lg font-medium text-muted-foreground mb-8">
            All under one roof
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Figma", "Slack", "Notion", "Sheets", "X", "Monday"].map((tool) => (
              <div 
                key={tool}
                className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-muted-foreground hover:border-primary/30 transition-colors"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};