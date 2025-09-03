import { Card, CardContent } from "@/components/general/home/ui/card";
import { Star, Play } from "lucide-react";
import { Button } from "@/components/general/home/ui/button";

const testimonials = [
  {
    quote: "Synkora helped us align engineering and product updates without the Slack chaos.",
    author: "Henry Arthur",
    role: "Head of Engineering",
    company: "Loom",
    rating: 5
  },
  {
    quote: "Game-changing platform for agile retros, visual sprints, and shared task views.",
    author: "Jerome Bell",
    role: "Product Analyst",
    company: "Intercom",
    rating: 5
  },
  {
    quote: "The live whiteboard + AI chat combo is now core to our remote onboarding.",
    author: "Eleanor Pena",
    role: "Head of Product Design",
    company: "Abstract",
    rating: 5
  }
];

const stats = [
  { value: "45+", label: "Happy customers" },
  { value: "5k+", label: "Hours spent on craft" },
  { value: "4.8", label: "Review rate" }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Featured Testimonial */}
        <div className="mb-20 opacity-0 scroll-reveal">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-full text-sm text-primary mb-6">
              Customer story
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <blockquote className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                "We cut 50% of project delays and aligned remote teams — without adding new tools."
              </blockquote>
              <Button variant="outline" className="group">
                Read the story
                <Play className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-surface-elevated flex items-center justify-center cursor-pointer group" onClick={() => window.open('https://vimeo.com/johnnyseedapple', '_blank')}>
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-semibold text-foreground">
                      <a href="https://vimeo.com/johnnyseedapple" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Johnny Seedapple
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">Technical Lead/Product Manager</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.author}
              className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-primary text-lg mb-1">
                    {testimonial.company}
                  </p>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Logos */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-muted-foreground mb-8">Already chosen by the leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["Headspace", "Shopify", "Volvo", "Mobbin", "Pinterest", "Duolingo"].map((company) => (
              <div 
                key={company}
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-8 animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};