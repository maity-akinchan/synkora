import { Button } from "@/components/general/home/ui/button";
import { ArrowRight } from "lucide-react";
import heroMockups from "@/assets/home/hero-mockups.jpg";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(84, 255, 159, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(84, 255, 159, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Your team's{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              visual command center
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            Task management, live dashboards, and whiteboard collaboration in one powerful workspace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up">
            <Button variant="outline" className="border-border hover:border-primary text-lg px-8 py-6 h-auto">
                <Link href="/login">LOGIN</Link>
            </Button>
            <Button 
              variant="hero"
              size="lg" 
              className="text-lg px-8 py-6 h-auto group transition-all duration-300 hover:scale-105"
            >
                <Link href="/signup">Sign Up</Link>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-scale-in">
            {["Real-time Collaboration", "Visual Workflows", "Team Analytics", "Custom Views"].map((feature) => (
              <div 
                key={feature}
                className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-muted-foreground hover:border-primary transition-colors"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-primary rounded-full animate-pulse delay-700" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-1000" />
      
      {/* Hero Mockups */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-20 hidden lg:block">
        <img 
          src={heroMockups} 
          alt="Synkora dashboard mockups" 
          className="w-96 h-auto object-contain animate-pulse"
        />
      </div>
    </section>
  );
};