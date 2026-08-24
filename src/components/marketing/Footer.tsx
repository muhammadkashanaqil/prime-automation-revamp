import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { getSiteSettings } from "@/lib/cms/settings";
import { Mail, Phone, MapPin, ArrowRight, Cpu } from "lucide-react";

// SVG social icons (no external icon lib needed)
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default async function Footer() {
  const settings = await getSiteSettings();
  const currentYear = new Date().getFullYear();

  const phone = settings.phone || "";
  const email = settings.email || "info@primeautomationpl.com";
  const businessName = settings.businessName || "Prime Automation Pvt. Ltd.";
  const socialLinks = (settings.socialLinks as Record<string, string>) || {};

  const telHref = phone ? `tel:+${phone.replace(/\D/g, "")}` : "#";

  const socials = [
    { key: "linkedin", label: "LinkedIn", icon: <LinkedInIcon /> },
    { key: "twitter", label: "X / Twitter", icon: <TwitterIcon /> },
    { key: "github", label: "GitHub", icon: <GitHubIcon /> },
    { key: "youtube", label: "YouTube", icon: <YouTubeIcon /> },
  ].filter((s) => !!socialLinks[s.key]);

  return (
    <footer className="bg-[#080D18] border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-prime-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-prime-gray text-sm leading-relaxed max-w-sm">
              Engineering production-grade AI agents, intelligent multi-step workflows, and
              real-time data pipelines built for measurable enterprise ROI.
            </p>

            {/* Contact Details */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-sm text-prime-gray">
                <Mail className="w-4 h-4 text-prime-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors break-all">
                  {email}
                </a>
              </div>

              {phone && (
                <div className="flex items-center gap-3 text-sm text-prime-gray">
                  <Phone className="w-4 h-4 text-prime-accent shrink-0" />
                  <a href={telHref} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-prime-gray">
                <MapPin className="w-4 h-4 text-prime-accent shrink-0" />
                <span>Global Remote Engineering • Delaware / Singapore</span>
              </div>
            </div>

            {/* Social Icons */}
            {socials.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={socialLinks[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-prime-accent/20 hover:text-prime-accent text-prime-gray flex items-center justify-center transition-colors border border-white/10 hover:border-prime-accent/40"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/ai-chatbots-virtual-agents" className="text-prime-gray hover:text-white transition-colors">
                  AI Chatbots &amp; Agents
                </Link>
              </li>
              <li>
                <Link href="/services/workflow-automation" className="text-prime-gray hover:text-white transition-colors">
                  Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/services/data-pipeline-engineering" className="text-prime-gray hover:text-white transition-colors">
                  Data Pipeline Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/custom-ai-models" className="text-prime-gray hover:text-white transition-colors">
                  Custom AI Models
                </Link>
              </li>
              <li>
                <Link href="/services/ai-system-integration" className="text-prime-gray hover:text-white transition-colors">
                  AI System Integration
                </Link>
              </li>
              <li>
                <Link href="/services/ai-audit-optimization" className="text-prime-gray hover:text-white transition-colors">
                  AI Audit &amp; Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-prime-gray hover:text-white transition-colors">
                  About Prime
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-prime-gray hover:text-white transition-colors">
                  Case Studies &amp; Proof
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-prime-gray hover:text-white transition-colors">
                  Insights &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-prime-gray hover:text-white transition-colors">
                  Knowledge FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-prime-gray hover:text-white transition-colors">
                  Book Free Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-prime-accent/20 text-prime-accent text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" /> High ROI Systems
            </span>
            <h5 className="text-white font-bold text-sm">
              Ready to automate your operations?
            </h5>
            <p className="text-xs text-prime-gray leading-relaxed">
              Book a 45-minute technical audit with our lead automation architect.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-prime-accent text-white text-xs font-semibold hover:bg-prime-accent-hover transition-colors"
            >
              <span>Schedule Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-prime-gray">
          <p>© {currentYear} {businessName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="hover:text-white transition-colors text-white/40">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
