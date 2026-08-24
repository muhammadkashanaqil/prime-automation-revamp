import Link from "next/link";
import prisma from "@/lib/db";
import {
  FolderKanban,
  FileText,
  HelpCircle,
  Users,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let publishedCaseStudiesCount = 0;
  let draftCaseStudiesCount = 0;
  let publishedPostsCount = 0;
  let draftPostsCount = 0;
  let publishedFaqsCount = 0;
  let draftFaqsCount = 0;
  let leadsCount = 0;
  let recentLeads: any[] = [];

  try {
    const stats = await Promise.all([
      prisma.caseStudy.count({ where: { status: "PUBLISHED" } }),
      prisma.caseStudy.count({ where: { status: "DRAFT" } }),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.fAQ.count({ where: { status: "PUBLISHED" } }),
      prisma.fAQ.count({ where: { status: "DRAFT" } }),
      prisma.lead.count(),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

    publishedCaseStudiesCount = stats[0];
    draftCaseStudiesCount = stats[1];
    publishedPostsCount = stats[2];
    draftPostsCount = stats[3];
    publishedFaqsCount = stats[4];
    draftFaqsCount = stats[5];
    leadsCount = stats[6];
    recentLeads = stats[7];
  } catch (err) {
    console.error("Dashboard stats query error:", err);
  }

  const statCards = [
    {
      title: "Case Studies",
      published: publishedCaseStudiesCount,
      drafts: draftCaseStudiesCount,
      icon: FolderKanban,
      href: "/admin/case-studies",
      newHref: "/admin/case-studies/new",
    },
    {
      title: "Insights / Posts",
      published: publishedPostsCount,
      drafts: draftPostsCount,
      icon: FileText,
      href: "/admin/posts",
      newHref: "/admin/posts/new",
    },
    {
      title: "Knowledge FAQs",
      published: publishedFaqsCount,
      drafts: draftFaqsCount,
      icon: HelpCircle,
      href: "/admin/faqs",
      newHref: "/admin/faqs/new",
    },
    {
      title: "Captured Inbound Leads",
      published: leadsCount,
      drafts: 0,
      icon: Users,
      href: "/admin/leads",
      newHref: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-prime-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime-accent/10 border border-prime-accent/30 text-prime-accent text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prime Central Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            System Content & Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-prime-gray leading-relaxed">
            Manage your architecture case studies, technical insights, knowledge base FAQs, and review inbound client consultation inquiries in real time.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between hover:border-prime-accent/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-prime-gray group-hover:text-white transition-colors">
                  {card.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-prime-accent">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-3xl font-black text-white font-mono">
                  {card.published}
                </div>
                {card.newHref && (
                  <div className="text-[11px] text-prime-gray mt-0.5">
                    {card.drafts} Drafts in progress
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <Link
                  href={card.href}
                  className="text-prime-gray hover:text-prime-accent font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Manage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {card.newHref && (
                  <Link
                    href={card.newHref}
                    className="p-1 rounded-lg bg-white/5 hover:bg-prime-accent hover:text-white text-prime-gray transition-colors"
                    title="Add new"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Leads Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inbound Leads (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-prime-accent" />
              <span>Recent Inbound Consultation Leads</span>
            </h2>
            <Link
              href="/admin/leads"
              className="text-xs text-prime-accent hover:underline font-semibold"
            >
              View all ({leadsCount})
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{lead.fullName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-prime-accent/15 text-prime-accent font-mono">
                        {lead.primaryNeed}
                      </span>
                    </div>
                    <div className="text-[11px] text-prime-gray">
                      {lead.workEmail} {lead.company && `• ${lead.company}`}
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.status === "NEW"
                          ? "bg-rose-500/20 text-rose-300"
                          : lead.status === "QUALIFIED"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-white/10 text-prime-gray"
                      }`}
                    >
                      {lead.status}
                    </span>
                    <div className="text-[10px] text-prime-gray font-mono">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-prime-gray text-xs">
                No leads captured yet. Submissions from /contact and Chatbot will appear here.
              </div>
            )}
          </div>
        </div>

        {/* Quick System Actions (1 Col) */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-prime-accent" />
            <span>Quick CMS Actions</span>
          </h2>

          <div className="space-y-2.5">
            <Link
              href="/admin/case-studies/new"
              className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs text-white font-medium group transition-all"
            >
              <span className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4 text-prime-accent" />
                <span>Compose Case Study</span>
              </span>
              <Plus className="w-4 h-4 text-prime-gray group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/posts/new"
              className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs text-white font-medium group transition-all"
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-prime-accent" />
                <span>Write Insight Post</span>
              </span>
              <Plus className="w-4 h-4 text-prime-gray group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/faqs/new"
              className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs text-white font-medium group transition-all"
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-prime-accent" />
                <span>Add Knowledge FAQ</span>
              </span>
              <Plus className="w-4 h-4 text-prime-gray group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/settings"
              className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs text-white font-medium group transition-all"
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-prime-accent" />
                <span>Site & Chatbot Config</span>
              </span>
              <ArrowRight className="w-4 h-4 text-prime-gray group-hover:text-white transition-colors" />
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 text-xs text-prime-gray hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-prime-accent" />
              <span>View Public Live Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
