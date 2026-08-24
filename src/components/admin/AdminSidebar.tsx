"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/brand/Logo";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  HelpCircle,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/case-studies", label: "Case Studies", icon: FolderKanban },
  { href: "/admin/posts", label: "Insights / Posts", icon: FileText },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/leads", label: "Captured Leads", icon: Users },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, do not show sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      {/* Top Section */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg text-prime-gray hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 py-2 rounded-xl bg-prime-accent/10 border border-prime-accent/20 flex items-center gap-2 text-xs text-prime-accent font-semibold">
          <ShieldCheck className="w-4 h-4 text-prime-accent" />
          <span>Prime CMS Portal</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-prime-accent text-white shadow-accent"
                    : "text-prime-gray hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="p-6 border-t border-white/10 space-y-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-xs text-prime-gray hover:text-white transition-colors px-1"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-prime-accent" />
        </Link>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="truncate max-w-[140px]">
            <p className="text-xs font-bold text-white truncate">
              {userEmail || "admin@primeautomationpl.com"}
            </p>
            <p className="text-[10px] text-prime-gray font-mono">Administrator</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-xl text-prime-gray hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden w-full bg-[#080D18] border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-40">
        <Logo />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-prime-accent transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-full bg-[#080D18] border-r border-white/10 h-full z-10 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 bg-[#080D18] border-r border-white/10 h-screen sticky top-0 shrink-0 z-30">
        {navContent}
      </aside>
    </>
  );
}
