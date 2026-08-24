"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import { trackEvent } from "@/lib/analytics";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCtaClick = () => {
    trackEvent({
      name: "cta_click",
      params: {
        cta_name: "header_book_free_audit",
        page_path: pathname,
      },
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "h-[68px] sm:h-[74px] bg-[#0C1322]/85 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "h-[78px] sm:h-[88px] bg-transparent"
      } flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-all group ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-prime-gray hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-prime-purple rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Primary CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            onClick={handleCtaClick}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-prime-purple text-white font-semibold text-sm shadow-accent hover:bg-prime-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>Book a Free Automation Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/contact"
            onClick={handleCtaClick}
            className="px-3.5 py-1.5 rounded-full bg-prime-purple text-white text-xs font-semibold"
          >
            Audit
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-prime-gray hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-prime-purple"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-[#0C1322]/98 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-top duration-200 z-50">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3.5 rounded-2xl text-lg font-medium transition-all ${
                    isActive
                      ? "text-white bg-prime-purple/20 border border-prime-purple/40 font-bold"
                      : "text-prime-gray hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-prime-purple text-white font-bold text-center shadow-accent text-base"
            >
              <span>Book a Free Automation Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-center text-xs text-prime-gray/70 pt-1">
              Prime Automation Pvt. Ltd.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
