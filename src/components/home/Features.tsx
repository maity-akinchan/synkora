import { Card, CardContent } from "@/components/home/ui/card";
import { Monitor, Users, BarChart3, Zap, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Unified workspace",
    description: "Replace 6 tools with 1. Keep tasks, chats, docs & whiteboards in sync.",
    accent: "from-primary/20 to-primary/5"
  },
  {
    icon: Users,
    title: "Custom views",
    description: "Switch between kanban, mind maps, or data views — your workspace, your way.",
    accent: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: BarChart3,
    title: "Scales with your team",
    description: "From solo founders to entire organizations — Synkora adapts as you grow.",
    accent: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Zap,
    title: "Real-time collaboration",
    description: "Chat, co-edit, brainstorm — all in the same tab with instant updates.",
    accent: "from-orange-500/20 to-orange-500/5"
  },
  {
    icon: Globe,
    title: "Global ready",
    description: "Connect teams worldwide with multi-language support and timezone awareness.",
    accent: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Shield,
    title: "Enterprise security",
    description: "Bank-level encryption and compliance standards to keep your data safe.",
    accent: "from-red-500/20 to-red-500/5"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 scroll-reveal">
          <div className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-full text-sm text-primary mb-6">
            What you'll get
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            We resolve problems associated with{" "}
            <span className="text-muted-foreground">disconnected workflow</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};