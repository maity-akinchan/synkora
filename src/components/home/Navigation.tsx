"use client"
import { Button } from "@/components/home/ui/button";
import { cn } from "@/lib/home.utils";
import synkoraLogo from "@/assets/home/synkora-logo.png";
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const router = useRouter();
  const handleButtonClick = () => {
    console.log("Clicked!")
    router.push('/login');
  };
  return (
    <nav className={cn("fixed top-2.5 left-0 right-0 mx-auto max-w-6xl z-50 bg-background/80 backdrop-blur-lg border border-border rounded-full", className)}>
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={synkoraLogo} alt="Synkora" className="w-8 h-8" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQs
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">LOGIN</Link>
            </Button>
            <Button variant="outline" className="border-border hover:border-primary text-foreground">
              Notify me
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};