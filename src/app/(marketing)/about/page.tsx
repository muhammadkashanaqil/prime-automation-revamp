import type { Metadata } from "next";
import { PageHero, FinalCTA, Reveal, Label, CTA } from "@/components/prime/shared";
import { Process } from "@/components/prime/home";

export const metadata: Metadata = {
  title: "About Us | Enterprise AI Agency",
  description:
    "We build intelligent systems that connect your workflows, data, and communications.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero 
        label="WE ARE PRIME AUTOMATION" 
        title={<>Built on a simple belief.<br/><span className="accent">Work can work better.</span></>} 
        description="We are a specialized engineering team building AI agents, connected operations, and reliable data pipelines for businesses that need to scale."
      />
      
      <section className="about-statement wrap section">
        <Label>OUR PURPOSE</Label>
        <Reveal>
          <h2>
            A lot of businesses buy software to solve operational problems.<br/>
            <span className="accent">Software alone rarely connects the dots.</span>
          </h2>
          <p>
            That&apos;s why we founded Prime. We wanted to move past generic SaaS subscriptions and build systems that actually fit the way a company works. By combining custom AI models with robust workflow automation (like n8n), we create one intelligent layer for your operations.
          </p>
          <p>
            We don&apos;t just write scripts; we engineer architectures that handle exceptions, securely manage your data, and give your team their time back.
          </p>
          <p>
            We begin with your operation, not a preselected tool. Every system should earn its place by simplifying work, reducing friction, and giving your team more room to grow.
          </p>
          <CTA />
        </Reveal>
      </section>

      <section className="principles wrap section">
        <Label>OUR PRINCIPLES</Label>
        {[
          {
            title: "Utility over hype.",
            desc: "We use AI where it solves real problems, not just because it's new. Our focus is on measurable impact and reliable outcomes."
          },
          {
            title: "Security by design.",
            desc: "Your data stays yours. We specialize in self-hosted solutions, private models, and architectures that keep your operations compliant."
          },
          {
            title: "Systems that scale.",
            desc: "We build for tomorrow. Our workflows are designed to handle 10x volume without requiring you to rewrite the logic."
          },
          {
            title: "Connect what already works.",
            desc: "Respect your existing systems and make them more useful together."
          },
          {
            title: "Measure and improve.",
            desc: "Define success, observe the results, and refine the system continuously."
          }
        ].map((principle, i) => (
          <Reveal key={principle.title}>
            <span>0{i + 1}</span>
            <h3>{principle.title}</h3>
            <p>{principle.desc}</p>
          </Reveal>
        ))}
      </section>

      <Process />
      <FinalCTA />
    </>
  );
}
