import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/home/ui/accordion";
import { Button } from "@/components/home/ui/button";
import { Input } from "@/components/home/ui/input";

const faqs = [
  {
    id: "item-1",
    question: "Can I use Synkora for client work and team collaboration?",
    answer: "Absolutely. Synkora is built for both internal teams and agencies. You can collaborate, share visual workflows, manage tasks, and invite external clients to review in real-time."
  },
  {
    id: "item-2",
    question: "How is Synkora different from Notion or Trello?",
    answer: "While Notion focuses on documentation and Trello on simple task management, Synkora combines real-time collaboration, visual workflows, live dashboards, and AI-assisted features in one unified workspace designed specifically for modern teams."
  },
  {
    id: "item-3",
    question: "Can I integrate Google Sheets or other tools?",
    answer: "Yes! Synkora integrates with popular tools like Google Sheets, Slack, Figma, and more. We're constantly adding new integrations based on user feedback."
  },
  {
    id: "item-4",
    question: "Is Synkora secure for sensitive project data?",
    answer: "Security is our top priority. We use bank-level encryption, comply with SOC 2 Type II standards, and offer enterprise-grade security features including SSO, audit logs, and advanced permissions."
  },
  {
    id: "item-5",
    question: "Do I need to install anything to use Synkora?",
    answer: "No installation required! Synkora runs entirely in your web browser. We also offer desktop apps for enhanced performance and mobile apps for on-the-go collaboration."
  },
  {
    id: "item-6",
    question: "Is there a free plan or trial?",
    answer: "Yes, we offer a free plan for small teams and a 14-day free trial for all premium features. No credit card required to get started."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 scroll-reveal">
          <div className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary mb-6">
            FAQs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to know about{" "}
            <br className="hidden md:block" />
            <span className="text-primary">Synkora</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-20">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="bg-background border border-border rounded-lg px-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-muted-foreground mb-4">
              Still have more questions? Contact our{" "}
              <a href="#" className="text-primary hover:underline">help center</a>
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-scale-in">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Elevate how you{" "}
            <br className="hidden md:block" />
            collaborate & create
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Synkora helps you manage projects, share ideas, and stay visually connected — without switching between 5 tools. Early access opening soon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="name@email.com"
              className="bg-background border-border focus:border-primary"
            />
            <Button variant="hero" className="w-full sm:w-auto">
              Get notified
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};