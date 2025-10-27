import { Card, CardContent } from "@/components/general/home/ui/card";
import { Monitor, Users, BarChart3, Zap, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Unified workspace",
    description: "Replace 6 tools with 1. Keep tasks, chats, docs & whiteboards in sync.",
    accent: "from-primary/20 to-primary/5",
    media: "bars"
  },
  {
    icon: Users,
    title: "Custom views",
    description: "Switch between kanban, mind maps, or data views — your workspace, your way.",
    accent: "from-blue-500/20 to-blue-500/5",
    media: "panel"
  },
  {
    icon: BarChart3,
    title: "Scales with your team",
    description: "From solo founders to entire organizations — Synkora adapts as you grow.",
    accent: "from-purple-500/20 to-purple-500/5",
    media: "line"
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
              <CardContent className="p-0">
                {feature.media && (
                  <div className="p-8 pb-0">
                    {feature.media === "bars" && (
                      <div className="relative h-40 rounded-2xl bg-gradient-to-b from-lime-300/10 to-black/40 border border-neutral-800 overflow-hidden">
                        <span className="absolute left-4 top-4 text-[10px] font-semibold text-lime-300">Growth</span>
                        <div className="absolute inset-x-4 bottom-4 flex items-end gap-2">
                          {[10,22,16,28,18,30,24,26,22,34,20,18].map((h, i) => (
                            <div
                              key={i}
                              className={`${i % 3 === 0 ? 'group-hover:-translate-y-3' : i % 2 === 0 ? 'group-hover:-translate-y-2' : 'group-hover:-translate-y-1'} w-3 rounded-t bg-lime-300/80 shadow-[0_0_18px_rgba(190,255,60,0.4)] transition-transform duration-500`}
                              style={{ height: `${h * 3}px`, transitionDelay: `${i * 30}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {feature.media === "panel" && (
                      <div className="relative h-40 rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_20%,rgba(255,255,255,0.04),transparent)]" />
                        <div className="absolute left-4 top-4 h-8 w-12 rounded-lg bg-black/60 border border-neutral-800 flex items-center justify-center text-yellow-300 transition-transform duration-300 group-hover:-translate-y-0.5">⚡</div>
                        <div className="absolute left-20 top-4 right-4 h-10 rounded-xl bg-black/70 border border-neutral-800 flex items-center px-3 text-sm text-neutral-300 transition-transform duration-300 group-hover:-translate-y-0.5">
                          Custom Views
                          <span className="ml-auto text-[10px] text-neutral-500">Today, 11:50</span>
                        </div>
                        <div className="absolute left-4 right-4 bottom-5 h-1 rounded bg-neutral-800 overflow-hidden">
                          <div className="h-full w-1/2 rounded bg-lime-300/70 transition-all duration-700 group-hover:w-3/4" />
                        </div>
                      </div>
                    )}
                    {feature.media === "line" && (
                      <div className="relative h-40 rounded-2xl bg-gradient-to-b from-purple-400/10 to-black/40 border border-neutral-800 overflow-hidden">
                        <svg className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:-translate-y-1" viewBox="0 0 400 160" preserveAspectRatio="none">
                          <polyline points="0,120 60,110 110,130 150,90 190,100 230,70 270,90 320,60 400,80" fill="none" stroke="#a3e635" strokeWidth="3" />
                          <circle cx="230" cy="70" r="6" className="animate-pulse" fill="#a3e635" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(180,255,50,0.2)]` }>
                  <feature.icon className="w-6 h-6 text-foreground transition-transform duration-300 group-hover:rotate-3" />
                </div>
                <div className="px-8 pb-8">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};