import { Card, CardContent } from "@/components/general/home/ui/card";
import { Package, Shuffle, Fingerprint } from "lucide-react";
import { useRef, useState, MouseEvent } from "react";

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
        {/* New Feature Cards Section */}
        <div className="mb-20">
          {/* Two Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* All under one roof card */}
            <Card className="bg-background border-border hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">All under one roof</h3>
                    <p className="text-neutral-400 text-lg">Can work like Notion, Slack, Figma, Sheets & more.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 ml-6">
                    {/* App icons */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">F</div>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">N</div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-lg">*</div>
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">X</div>
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg">⚙</div>
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">A</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collaborate real-time card */}
            <Card className="bg-background border-border hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">Collaborate real-time</h3>
                    <p className="text-neutral-400 text-lg">Chat, co-edit, brainstorm — all in the same tab.</p>
                  </div>
                  <div className="flex items-center ml-6 relative">
                    {/* User avatars */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-purple-400 flex items-center justify-center text-white text-sm font-medium">S</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-blue-400 flex items-center justify-center text-white text-sm font-medium -ml-2">M</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-green-500 border-2 border-lime-400 flex items-center justify-center text-white text-sm font-medium -ml-2 relative">
                      E
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-lime-400 text-black text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Elia
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-lime-400"></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neutral-700 border-2 border-neutral-600 flex items-center justify-center text-neutral-400 text-sm -ml-2">+</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              "Team whiteboard",
              "Live session", 
              "Data insights",
              "Resource Hub",
              "Timeline Tracking",
              "Advance role",
              "Global ready"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full hover:border-primary/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(190,255,60,0.6)]"></div>
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 scroll-reveal">
          <div className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary mb-6">
            <div className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(190,255,60,0.6)] mr-2"></div>
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Seamless teamwork,{" "}
            <br className="hidden md:block" />
            delivered in real time.
          </h2>
        </div>

        {/* Steps Grid with 3D tilt/hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <TiltCard key={step.title} index={index}>
              <div className="p-8 text-center [transform-style:preserve-3d]">
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(0,0,0,0))] border border-neutral-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] will-change-transform"
                  style={{ transform: "translateZ(24px)" }}
                >
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" style={{ transform: "translateZ(18px)" }}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ transform: "translateZ(12px)" }}>
                  {step.description}
                </p>
              </div>
            </TiltCard>
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

type TiltCardProps = {
  children: React.ReactNode;
  index?: number;
};

const TiltCard = ({ children, index = 0 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateX = (py - 0.5) * -8;
    const rotateY = (px - 0.5) * 8;
    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      background: `radial-gradient(500px circle at ${x}px ${y}px, rgba(180,255,50,0.08), transparent 40%)`,
      transition: "transform 120ms ease-out, background 200ms ease-out",
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 300ms ease-in",
    });
  };

  return (
    <div className="relative [perspective:1000px] group animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
      <Card
        ref={ref as any}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="bg-background border-border transition-all duration-300 hover:border-lime-300/30 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(180,255,50,0.15)] [transform-style:preserve-3d] transform-gpu"
        style={style}
      >
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
      {/* Outer glow ring */}
      <div className="pointer-events-none absolute -inset-px rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(400px_circle_at_50%_0,rgba(180,255,50,0.12),transparent_60%)]" />
    </div>
  );
};