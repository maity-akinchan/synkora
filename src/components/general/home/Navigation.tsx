"use client"
import { Button } from "@/components/general/home/ui/button";
import { cn } from "@/lib/home.utils";
import synkoraLogo from "@/assets/home/synkora-logo.png";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import logo from "@/assets/home/synkora-logo.png";

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const router = useRouter();

  return (
    <nav className={cn("fixed top-2.5 left-0 right-0 mx-auto max-w-6xl z-50 bg-background/80 backdrop-blur-lg border border-border rounded-full", className)}>
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center ">
            <img src={"/logo.png"} alt="Synkora" className="w-10 h-10" />
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
            <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              Blogs
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              <Link href="/signin">LOGIN</Link>
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