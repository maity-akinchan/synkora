"use client";

import { Navigation } from "@/components/general/home/Navigation";
import { Hero } from "@/components/general/home/Hero";
import { CompanyLogos } from "@/components/general/home/CompanyLogos";
import { Features } from "@/components/general/home/Features";
import { HowItWorks } from "@/components/general/home/HowItWorks";
import { Testimonials } from "@/components/general/home/Testimonials";
import { FAQ } from "@/components/general/home/FAQ";
import { Footer } from "@/components/general/home/Footer";
import { useEffect } from "react";
import { SelectSeparator } from "@radix-ui/react-select";
import { time } from "console";

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scroll-reveal');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <CompanyLogos />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;