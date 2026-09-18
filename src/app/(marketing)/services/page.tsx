import type { Metadata } from "next";
import { getPublishedCaseStudies } from "@/lib/cms/case-studies";
import { getPublishedFAQs } from "@/lib/cms/faqs";
import { PageHero, FinalCTA, Reveal, Label } from "@/components/prime/shared";
import { ServicesExplorer, TechStrip, Process, ProjectGrid, Dashboard } from "@/components/prime/home";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Automation Services & AI Solutions",
  description:
    "Enterprise-grade AI chatbots, custom n8n workflow systems, and data pipeline engineering.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const caseStudies = await getPublishedCaseStudies();
  const faqs = await getPublishedFAQs();
  
  // Show only featured or first 3 case studies
  const featuredCaseStudies = caseStudies.slice(0, 3);
  const featuredFaqs = faqs.slice(0, 5);

  return (
    <>
      <PageHero 
        label="BUILT FOR YOUR BUSINESS" 
        title={<>Make your next move<br/><span className="accent">an intelligent one.</span></>} 
        description="AI agents, connected operations, and dependable data. Explore the capabilities that bring your business forward."
      />
      
      <ServicesExplorer />
      <TechStrip />
      <Process />

      {/* Dynamic Case Studies Section using New UI */}
      {featuredCaseStudies.length > 0 && (
        <div className="wrap work-list section" style={{ paddingTop: '80px' }}>
          <Reveal className="section-heading">
            <div>
              <Label>PROVEN IMPACT</Label>
              <h2>Results from <span className="muted">the real world.</span></h2>
            </div>
            <Link className="text-link" href="/case-studies">View all case studies <ArrowUpRight size={18} /></Link>
          </Reveal>
          <div className="project-grid mt-10">
            {featuredCaseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.06}>
                <Link className="project-card" href={`/case-studies/${cs.slug}`}>
                  <div className="project-card-visual">
                    <Dashboard kind={cs.imageUrl ? 'leads' : 'crm'} />
                  </div>
                  <div className="project-card-meta">
                    <span>{cs.industry || "Case Study"}</span>
                    <span>0{i + 1}</span>
                  </div>
                  <h3>
                    {cs.title} <ArrowUpRight size={22} />
                  </h3>
                  <p>
                    {cs.clientName || "Client"} <span>—</span> {cs.excerpt || "Read how we solved this problem."}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic FAQs Section using New UI */}
      {featuredFaqs.length > 0 && (
        <div className="wrap faq-section section">
          <Reveal>
            <Label>COMMON QUESTIONS</Label>
            <h2>Clarity comes first.</h2>
            <Link className="text-link" href="/faq">All your questions <ArrowUpRight size={18} /></Link>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="faq-list mt-10">
              {featuredFaqs.map((faq, i) => (
                <AccordionItem value={`faq-${i}`} key={i}>
                  <AccordionTrigger>
                    <span className="faq-num">0{i + 1}</span>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      )}

      <FinalCTA />
    </>
  );
}
