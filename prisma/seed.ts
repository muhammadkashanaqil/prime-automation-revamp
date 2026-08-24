import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for Prime Automation...");

  // 1. Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "Prime Automation Pvt. Ltd.",
      email: "info@primeautomationpl.com",
      phone: "+1 (800) 555-AUTO",
      schedulingUrl: "https://cal.com/primeautomation/free-audit",
      socialLinks: JSON.stringify({
        linkedin: "https://linkedin.com/company/prime-automation",
        twitter: "https://x.com/primeautomation",
        github: "https://github.com/prime-automation",
        youtube: "https://youtube.com/@primeautomation",
      }),
      defaultSeoTitle: "Prime Automation | Enterprise AI & Operational Automation Systems",
      defaultSeoDescription: "Prime Automation builds production-grade AI chatbots, intelligent workflow automation, resilient data pipelines, and custom AI systems engineered for measurable business ROI.",
      footerText: "Prime Automation Pvt. Ltd. — Enterprise AI systems, autonomous workflows, and modern data engineering.",
      chatbotWelcomeMessage: "👋 Welcome to Prime Automation! I can help you explore our AI solutions, estimate your automation potential, or schedule a free audit with our engineering team.",
    },
  });

  // 2. Seed Admin User
  const passwordHash = await bcrypt.hash("PrimeAdmin2026!", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@primeautomationpl.com" },
    update: { passwordHash },
    create: {
      email: "admin@primeautomationpl.com",
      passwordHash,
      name: "Prime Lead Architect",
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log("✅ Admin user seeded: admin@primeautomationpl.com");

  // 3. Seed Case Studies
  const caseStudiesData = [
    {
      title: "Autonomous Multi-Channel Support & Intelligent Lead Routing",
      slug: "autonomous-multi-channel-support-lead-routing",
      status: "PUBLISHED",
      clientName: "OmniRetail Global",
      industry: "E-Commerce & Retail",
      services: JSON.stringify(["ai-chatbots-virtual-agents", "workflow-automation", "ai-system-integration"]),
      excerpt: "How a high-volume e-commerce brand reduced first-response time from 4 hours to 12 seconds and deflected 68% of Tier-1 support queries.",
      heroImageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Customer support automation team monitoring metrics",
      featured: true,
      featuredResult: "68% Support Deflection",
      metrics: JSON.stringify([
        { label: "Query Deflection", value: "68%", note: "Tier-1 queries resolved autonomously" },
        { label: "Avg Response Time", value: "12 sec", note: "Down from 4 hours" },
        { label: "Annual Cost Savings", value: "$180,000+", note: "Direct operational payroll savings" },
        { label: "CSAT Score", value: "4.8 / 5.0", note: "Customer satisfaction rating" },
      ]),
      challenge: JSON.stringify({
        summary: "OmniRetail was experiencing rapid global growth, receiving over 25,000 monthly support tickets across email, live chat, and WhatsApp. Their 14-person support team was overwhelmed by repetitive queries regarding order tracking, refund status, inventory checks, and address corrections.",
        bulletPoints: [
          "Peak support wait times exceeded 12 hours during sales events.",
          "High agent burnout and turnover rate (>35% annually).",
          "Customer data was fragmented across Shopify, Zendesk, Klaviyo, and internal ERP systems.",
          "Valuable high-intent pre-purchase leads were lost due to slow initial responses.",
        ],
      }),
      solution: JSON.stringify({
        summary: "Prime Automation engineered a multi-layered AI agent framework powered by n8n workflow orchestration, OpenAI LLMs with custom retrieval mechanisms, and bi-directional API synchronizations.",
        bulletPoints: [
          "Autonomous conversational agent integrated directly into Shopify, Zendesk, and WhatsApp Business API.",
          "Dynamic tool-calling framework enabling the AI to look up live tracking info, generate return labels, and process validated partial refunds within strict safety boundaries.",
          "Smart sentiment and intent classifier that escalates complex or frustrated customers instantly to senior human agents with synthesized context summaries.",
          "High-intent sales lead router that pushes qualified VIP shoppers directly into CRM with purchase intent scores.",
        ],
      }),
      implementation: JSON.stringify({
        summary: "The project was delivered across an 8-week phased timeline adhering to Prime's 4-step engineering process.",
        bulletPoints: [
          "Weeks 1-2: Audit of 60,000 historical support tickets and API schema mapping.",
          "Weeks 3-4: Knowledge graph construction and sandbox n8n workflow development.",
          "Weeks 5-6: Rigorous safety boundary testing and shadow-mode parallel runs alongside human agents.",
          "Weeks 7-8: Production rollout, staff training dashboard, and continuous telemetry monitoring.",
        ],
      }),
      results: JSON.stringify({
        summary: "Within 60 days of full deployment, OmniRetail experienced transformative operational efficiency and improved customer sentiment scores across all geographic regions.",
        bulletPoints: [
          "68% of incoming inquiries resolved autonomously without human intervention.",
          "Average first-touch response time plunged from 4 hours to under 12 seconds.",
          "Support team was repurposed toward proactive customer success and retention programs.",
          "Net Promoter Score (NPS) rose by +24 points over the first fiscal quarter.",
        ],
      }),
      technologies: JSON.stringify(["n8n", "OpenAI GPT-4o", "Shopify API", "Zendesk API", "PostgreSQL", "Supabase", "TypeScript"]),
      testimonial: JSON.stringify({
        quote: "Prime Automation built a system that fundamentally transformed how we operate. Our customers get instant answers at 2 AM, and our team is finally free from repetitive ticket firefighting.",
        name: "Elena Rostova",
        role: "VP of Customer Operations",
        company: "OmniRetail Global",
      }),
      seoTitle: "Case Study: Multi-Channel AI Support & Workflow Automation | Prime Automation",
      seoDescription: "Discover how Prime Automation implemented an autonomous AI support agent that deflected 68% of inquiries and saved $180k annually.",
      publishedAt: new Date("2026-06-15T10:00:00Z"),
    },
    {
      title: "Real-Time Enterprise ETL & Automated Supply Chain Analytics",
      slug: "real-time-etl-automated-supply-chain-analytics",
      status: "PUBLISHED",
      clientName: "Nexus Logistics Partners",
      industry: "Logistics & Supply Chain",
      services: JSON.stringify(["data-pipeline-engineering", "workflow-automation", "ai-system-integration"]),
      excerpt: "Engineering a resilient data pipeline processing 15M+ daily event records with automated anomaly detection and predictive rerouting.",
      heroImageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "High-tech logistics hub with data visualization screens",
      featured: true,
      featuredResult: "15M+ Daily Records",
      metrics: JSON.stringify([
        { label: "Data Volume", value: "15M+", note: "Daily event records processed in real-time" },
        { label: "Pipeline Uptime", value: "99.98%", note: "High-availability fault tolerant infrastructure" },
        { label: "Reporting Latency", value: "< 3 sec", note: "Down from 24-hour batch delay" },
        { label: "Fuel & Route Waste", value: "-22%", note: "Optimized through dynamic event triggers" },
      ]),
      challenge: JSON.stringify({
        summary: "Nexus Logistics manages a fleet of 4,000+ freight vehicles and 18 regional distribution hubs. Fleet telemetry, warehouse IoT sensors, and carrier status feeds were siloed in disconnected legacy SQL databases, causing delayed reporting and slow incident response.",
        bulletPoints: [
          "Data sync bottlenecks caused daily 24-hour delays in executive dashboard updates.",
          "Manual spreadsheet consolidation consumed over 200 engineer hours monthly.",
          "Inability to detect delivery bottlenecks or temperature deviations in refrigerated transit before cargo damage occurred.",
        ],
      }),
      solution: JSON.stringify({
        summary: "Prime Automation designed and deployed a modern stream-and-batch ETL architecture with automated anomaly triggers and real-time dashboard syndication.",
        bulletPoints: [
          "Built event-driven data ingestion pipeline utilizing Apache Kafka, Python workers, and TimescaleDB.",
          "Implemented automated data cleaning, normalization, and deduplication layers.",
          "Created automated alerting workflows in n8n that ping dispatch managers via Slack and SMS whenever telemetry thresholds are breached.",
          "Integrated real-time BI sync into Supabase and PostgreSQL for instant analytical querying.",
        ],
      }),
      implementation: JSON.stringify({
        summary: "A 10-week end-to-end modernization implemented without disrupting 24/7 fleet operations.",
        bulletPoints: [
          "Comprehensive schema normalization across 12 legacy data providers.",
          "Zero-downtime database migration and pipeline load testing under 3x peak load.",
          "Automated regression test suites validating data integrity across all reporting endpoints.",
        ],
      }),
      results: JSON.stringify({
        summary: "Nexus achieved real-time visibility across their entire logistics network with zero data loss.",
        bulletPoints: [
          "99.98% continuous pipeline uptime handling over 15 million telemetry events daily.",
          "Automated anomaly triggers prevented an estimated $320k in spoilage during summer operations.",
          "Manual reporting overhead reduced to zero.",
        ],
      }),
      technologies: JSON.stringify(["Python", "PostgreSQL", "Kafka", "TimescaleDB", "n8n", "Docker", "AWS"]),
      testimonial: JSON.stringify({
        quote: "The engineering rigor Prime Automation brought to our data infrastructure gave us the clarity and real-time speed we needed to outcompete larger logistics operators.",
        name: "Marcus Vance",
        role: "Chief Technology Officer",
        company: "Nexus Logistics Partners",
      }),
      seoTitle: "Case Study: Real-Time Data Pipeline & Logistics Automation | Prime Automation",
      seoDescription: "See how Prime Automation built a 15M daily event data pipeline with real-time alerting for Nexus Logistics.",
      publishedAt: new Date("2026-07-01T10:00:00Z"),
    },
    {
      title: "Intelligent Document Processing & Automated Financial Reconciliation",
      slug: "intelligent-document-processing-financial-reconciliation",
      status: "PUBLISHED",
      clientName: "Apex FinServe",
      industry: "Fintech & Corporate Finance",
      services: JSON.stringify(["custom-ai-models", "workflow-automation", "ai-system-integration"]),
      excerpt: "Automating invoice parsing, multi-currency verification, and ledger reconciliation across 45,000 monthly invoices with 99.4% accuracy.",
      heroImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Financial dashboard analytics on laptop display",
      featured: true,
      featuredResult: "99.4% Accuracy",
      metrics: JSON.stringify([
        { label: "Extraction Accuracy", value: "99.4%", note: "Across unstructured PDFs & scans" },
        { label: "Processing Speed", value: "4.1 sec", note: "Per complex multi-page document" },
        { label: "Straight-Through Rate", value: "92%", note: "Zero manual intervention needed" },
        { label: "Labor Time Saved", value: "820 hrs/mo", note: "Reallocated to financial analysis" },
      ]),
      challenge: JSON.stringify({
        summary: "Apex FinServe processes invoices, tax receipts, and purchase orders from over 800 global suppliers in 14 languages. Manual optical character recognition and keypunching caused frequent data entry errors, delayed vendor payouts, and compliance risks.",
        bulletPoints: [
          "Inconsistent invoice formats (PDFs, images, paper scans, and email attachments).",
          "Frequent errors in line-item tax calculations and currency conversions.",
          "End-of-month financial close took 11 business days due to reconciliation backlogs.",
        ],
      }),
      solution: JSON.stringify({
        summary: "Prime Automation engineered a Vision-LLM document extraction pipeline paired with programmatic cross-validation workflows and ERP connector actions.",
        bulletPoints: [
          "Multi-model document comprehension engine combining layout analysis with fine-tuned LLM extraction schemas.",
          "Self-validating reconciliation engine that cross-references extracted purchase order numbers against QuickBooks & NetSuite records.",
          "Interactive human-in-the-loop review interface for the 8% of low-confidence edge cases.",
          "Instant automated 2-way approval workflow triggering bank batch payments via webhooks.",
        ],
      }),
      implementation: JSON.stringify({
        summary: "Implemented with bank-grade security protocols, end-to-end encryption, and comprehensive audit trails.",
        bulletPoints: [
          "SOC2-compliant data handling architecture with zero retention of customer PII on third-party model servers.",
          "Continuous active learning loop that gets smarter with every manual correction.",
        ],
      }),
      results: JSON.stringify({
        summary: "Financial closing time dropped from 11 days to 2 days, with 92% of invoices processed straight-through.",
        bulletPoints: [
          "Over 820 hours of manual bookkeeping saved every month.",
          "Vendor invoice payment disputes decreased by 88%.",
        ],
      }),
      technologies: JSON.stringify(["Python", "Claude 3.5 Sonnet", "n8n", "NetSuite API", "PostgreSQL", "Supabase"]),
      testimonial: JSON.stringify({
        quote: "Prime Automation's document pipeline handled our most complex multi-currency invoices effortlessly. Our month-end close is now 5x faster.",
        name: "Sarah Chen, CPA",
        role: "Head of Financial Operations",
        company: "Apex FinServe",
      }),
      seoTitle: "Case Study: Intelligent Document Processing & Financial Automation | Prime Automation",
      seoDescription: "Learn how Prime Automation automated invoice parsing and ledger reconciliation with 99.4% accuracy.",
      publishedAt: new Date("2026-07-20T10:00:00Z"),
    },
    {
      title: "Autonomous B2B Sales Prospecting & AI Agent Qualification Engine",
      slug: "autonomous-b2b-sales-prospecting-qualification",
      status: "PUBLISHED",
      clientName: "ScaleCloud Technologies",
      industry: "Enterprise SaaS",
      services: JSON.stringify(["ai-chatbots-virtual-agents", "workflow-automation", "ai-audit-optimization"]),
      excerpt: "Building an autonomous outbound pipeline that enriches leads, crafts hyper-personalized messaging, and qualifies buyers 24/7.",
      heroImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Sales leadership meeting discussing revenue acceleration",
      featured: false,
      featuredResult: "3.2x Pipeline Growth",
      metrics: JSON.stringify([
        { label: "Pipeline Generated", value: "+320%", note: "Increase in sales-accepted opportunities" },
        { label: "Response Rate", value: "28.4%", note: "Up from 6.1% industry average" },
        { label: "Speed to Lead", value: "45 sec", note: "Inbound demo request qualification" },
      ]),
      challenge: JSON.stringify({
        summary: "ScaleCloud's sales reps spent 65% of their working hours searching LinkedIn, copying lead details into CRM, and sending generic cold templates with low reply rates.",
        bulletPoints: [
          "High customer acquisition costs (CAC) due to inefficient SDR outbound motions.",
          "Inbound demo requests took an average of 6 hours to receive a response.",
        ],
      }),
      solution: JSON.stringify({
        summary: "Prime Automation designed an AI SDR engine that monitors industry hiring signals, generates tailored value briefs, and qualifies inbound leads automatically.",
        bulletPoints: [
          "Automated signal scraping across tech job boards, funding announcements, and tech stacks.",
          "Context-aware outreach personalization referencing recent company initiatives.",
          "Interactive qualification chatbot on website booking demos directly into account executive calendars.",
        ],
      }),
      implementation: JSON.stringify({
        summary: "Integrated seamlessly into HubSpot CRM, Apollo.io, and Google Workspace.",
        bulletPoints: [
          "Strict deliverability guardrails and warmup controls.",
          "Bi-weekly A/B testing matrix for value proposition refinement.",
        ],
      }),
      results: JSON.stringify({
        summary: "ScaleCloud scaled outbound meetings by 320% without adding headcount to their SDR team.",
        bulletPoints: [
          "Sales team freed to focus 100% of their energy on closing active opportunities.",
          "Inbound lead conversion increased by 41%.",
        ],
      }),
      technologies: JSON.stringify(["n8n", "OpenAI", "HubSpot API", "Apollo API", "TypeScript", "PostgreSQL"]),
      testimonial: JSON.stringify({
        quote: "Our sales reps now spend their entire day talking to qualified buyers instead of copy-pasting lead spreadsheets. Prime Automation built our highest-ROI revenue engine.",
        name: "David Sterling",
        role: "Chief Commercial Officer",
        company: "ScaleCloud Technologies",
      }),
      seoTitle: "Case Study: AI Sales Prospecting & Autonomous Qualification | Prime Automation",
      seoDescription: "How Prime Automation helped ScaleCloud achieve 3.2x pipeline growth through autonomous AI prospecting workflows.",
      publishedAt: new Date("2026-08-05T10:00:00Z"),
    },
  ];

  for (const cs of caseStudiesData) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }
  console.log(`✅ ${caseStudiesData.length} Case Studies seeded.`);

  // 4. Seed Posts / Insights
  const postsData = [
    {
      title: "The 2026 Blueprint for Enterprise Workflow Automation with n8n and AI",
      slug: "2026-blueprint-enterprise-workflow-automation-n8n-ai",
      status: "PUBLISHED",
      excerpt: "A comprehensive guide on combining open orchestration platforms with modern LLMs to eliminate brittle scripts and build resilient operational pipelines.",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      coverImageAlt: "Abstract digital network representing workflow connectivity",
      author: "Engineering Team",
      categories: JSON.stringify(["Workflow Automation", "n8n", "Engineering Architecture"]),
      readingTime: "7 min read",
      featured: true,
      body: JSON.stringify({
        sections: [
          {
            heading: "The Shift from Brittle Scripts to Declarative Orchestration",
            content: "For years, engineering teams struggled with custom Python cron scripts and fragmented Zapier automations. When an API endpoint shifted or rate limits hit, automations silently broke. In 2026, enterprise orchestration has evolved into robust, node-based declarative workflows powered by n8n.",
          },
          {
            heading: "Why Self-Hosted n8n is Winning the Enterprise",
            content: "Unlike legacy black-box SaaS automation tools, n8n offers complete data sovereignty, native Docker deployment, self-hosted privacy compliance (GDPR/HIPAA), and direct access to raw execution telemetry. When paired with PostgreSQL and message queues, it can effortlessly process tens of millions of records per day.",
          },
          {
            heading: "Incorporating AI Decision Nodes",
            content: "The true superpower of modern automation is embedding LLMs not as conversational chatbots, but as silent decision routers. By combining structured JSON schemas with LLMs inside n8n nodes, systems can parse messy customer intent, validate incoming invoices, or triage urgent support tickets with extreme precision.",
          },
          {
            heading: "Key Takeaway for Operational Leaders",
            content: "Start with high-volume, repetitive processes that follow clear business rules. Ensure every automation has retry loops, dead-letter alerts, and a clear escalation path to human operators.",
          },
        ],
      }),
      seoTitle: "The 2026 Enterprise Workflow Automation Blueprint | Prime Automation",
      seoDescription: "Learn how to architect robust, scalable business automations using n8n, modern LLMs, and fault-tolerant infrastructure.",
      publishedAt: new Date("2026-08-10T10:00:00Z"),
    },
    {
      title: "Why Custom AI Agents Beat Off-The-Shelf SaaS Chatbots Every Time",
      slug: "why-custom-ai-agents-beat-off-the-shelf-chatbots",
      status: "PUBLISHED",
      excerpt: "Generic chatbot widgets create customer frustration. Here is why bespoke agent architectures with tool calling and custom DB connections deliver 10x ROI.",
      coverImageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      coverImageAlt: "Engineers working on artificial intelligence architecture",
      author: "Prime AI Research",
      categories: JSON.stringify(["AI Chatbots", "Custom AI Models", "Customer Experience"]),
      readingTime: "6 min read",
      featured: true,
      body: JSON.stringify({
        sections: [
          {
            heading: "The Illusion of Quick-Fix SaaS Chatbots",
            content: "Most companies start their AI journey by adding a $49/mo generic chatbot widget. The result? Hallucinated answers, inability to take actual action in backend systems, and disappointed customers who immediately ask for a human representative.",
          },
          {
            heading: "The Architecture of a True Autonomous Agent",
            content: "A production-grade AI agent requires four core layers: 1) Deterministic State Management, 2) Grounded Vector & SQL Knowledge Retrieval, 3) Strict Tool-Calling APIs with Sandboxed Permissions, and 4) Graceful Human Escalation Triggers.",
          },
          {
            heading: "Action-Oriented vs Conversation-Oriented",
            content: "Customers don't want friendly chitchat—they want their problem solved. When a customer says 'Where is my shipment #84912?', a bespoke agent queries the warehouse database in real-time, generates the carrier tracking link, and offers to update delivery instructions immediately.",
          },
        ],
      }),
      seoTitle: "Why Custom AI Agents Outperform Generic SaaS Chatbots | Prime Automation",
      seoDescription: "Understand the architectural differences between generic chatbots and custom AI agents connected to real business tools.",
      publishedAt: new Date("2026-08-14T10:00:00Z"),
    },
    {
      title: "Building Resilient Data Pipelines for Real-Time AI Systems",
      slug: "building-resilient-data-pipelines-real-time-ai",
      status: "PUBLISHED",
      excerpt: "Your AI models are only as smart as the data fed into them. Best practices for low-latency ETL, vector embeddings, and schema evolution.",
      coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      coverImageAlt: "Modern server data center rack with glowing fiber optic cables",
      author: "Data Engineering Team",
      categories: JSON.stringify(["Data Pipelines", "Architecture", "PostgreSQL"]),
      readingTime: "8 min read",
      featured: true,
      body: JSON.stringify({
        sections: [
          {
            heading: "The Clean Data Imperative",
            content: "Over 80% of AI failure in production stems from dirty, delayed, or unsynchronized data pipelines. Before investing in custom fine-tuning, organizations must establish clean data ingestion pipelines.",
          },
          {
            heading: "Stream vs Batch: Picking the Right Cadence",
            content: "Not every process needs microsecond streaming. We break down the engineering tradeoffs between real-time Kafka event streams and high-efficiency 15-minute micro-batches.",
          },
          {
            heading: "Automated Telemetry & Dead-Letter Handling",
            content: "Resilience means anticipating failures. We share our production-tested dead-letter queue pattern for logging failed payloads without blocking downstream consumers.",
          },
        ],
      }),
      seoTitle: "Resilient Data Pipelines for AI Systems | Prime Automation",
      seoDescription: "Best practices for architecting high-uptime, low-latency ETL and data pipelines for modern enterprise AI applications.",
      publishedAt: new Date("2026-08-18T10:00:00Z"),
    },
    {
      title: "A Practical Framework for Calculating Operational Automation ROI",
      slug: "framework-calculating-operational-automation-roi",
      status: "PUBLISHED",
      excerpt: "How to audit business workflows, quantify human hour savings, model error reduction, and present a bulletproof business case to executive stakeholders.",
      coverImageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      coverImageAlt: "Financial spreadsheet analysis and ROI modeling charts",
      author: "Strategy & Operations",
      categories: JSON.stringify(["Strategy", "AI Audit", "Business ROI"]),
      readingTime: "5 min read",
      featured: false,
      body: JSON.stringify({
        sections: [
          {
            heading: "Beyond Just 'Hours Saved'",
            content: "Traditional ROI formulas only measure time multiplied by hourly wage. But the highest value of automation often comes from reduced customer churn, zero compliance fines, and the agility to scale revenue 5x without adding overhead.",
          },
          {
            heading: "The 4-Quadrant Automation Priority Matrix",
            content: "How we categorize processes by Volume vs Complexity to identify quick wins (under 3 weeks to deploy) versus high-impact architectural transformations.",
          },
        ],
      }),
      seoTitle: "Framework for Calculating Automation ROI | Prime Automation",
      seoDescription: "Step-by-step methodology to calculate and maximize the return on investment of enterprise automation projects.",
      publishedAt: new Date("2026-08-20T10:00:00Z"),
    },
  ];

  for (const post of postsData) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✅ ${postsData.length} Insights / Posts seeded.`);

  // 5. Seed FAQs
  const faqsData = [
    {
      question: "What types of automation and AI systems does Prime Automation build?",
      answer: "We specialize in end-to-end operational automation for businesses. This includes autonomous AI chatbots & customer agents, complex multi-step workflow automation (via n8n and custom engines), real-time data engineering and ETL pipelines, fine-tuned custom AI models, and seamless API integrations across your existing CRM, ERP, and internal databases.",
      category: "Services & Scope",
      relatedServices: JSON.stringify(["ai-chatbots-virtual-agents", "workflow-automation", "data-pipeline-engineering"]),
      featured: true,
      sortOrder: 1,
      status: "PUBLISHED",
    },
    {
      question: "How does Prime Automation work with our existing software stack?",
      answer: "We never force you to replace tools that already work. We integrate directly with your existing platforms—including Shopify, Salesforce, HubSpot, Zendesk, PostgreSQL, Supabase, QuickBooks, Google Workspace, Slack, and custom internal APIs—connecting them through secure, fault-tolerant orchestration layers.",
      category: "Services & Scope",
      relatedServices: JSON.stringify(["ai-system-integration", "workflow-automation"]),
      featured: true,
      sortOrder: 2,
      status: "PUBLISHED",
    },
    {
      question: "How long does a typical automation project take to build and deploy?",
      answer: "A standard Phase 1 production automation (such as an intelligent support agent or workflow pipeline) typically takes 3 to 6 weeks from initial Discovery & Audit to live deployment. Complex enterprise data migrations or bespoke AI model fine-tuning may take 8 to 12 weeks with phased sprint rollouts.",
      category: "Process & Timelines",
      relatedServices: JSON.stringify(["ai-audit-optimization", "workflow-automation"]),
      featured: true,
      sortOrder: 3,
      status: "PUBLISHED",
    },
    {
      question: "What is your 4-step engineering process?",
      answer: "Our structured process guarantees quality and ROI: 1) Discovery & Audit (we map your operational bottlenecks and calculate expected ROI), 2) Architecture & Design (we blueprint schemas, APIs, and safety guardrails), 3) Build & Test (we develop workflows, train models, and test in sandbox environments), and 4) Deploy & Optimize (we roll out to production, train your team, and provide active telemetry monitoring).",
      category: "Process & Timelines",
      relatedServices: JSON.stringify(["ai-audit-optimization"]),
      featured: true,
      sortOrder: 4,
      status: "PUBLISHED",
    },
    {
      question: "How do you prevent AI chatbots from hallucinating or sharing incorrect data?",
      answer: "We implement multi-layered safety guardrails: strict RAG (Retrieval-Augmented Generation) constrained only to verified company documentation, deterministic validation layers for numerical and policy queries, tool-calling schemas with strict permission bounds, and automated confidence scoring that triggers human escalation whenever uncertainty exceeds threshold.",
      category: "Chatbots & AI",
      relatedServices: JSON.stringify(["ai-chatbots-virtual-agents", "custom-ai-models"]),
      featured: true,
      sortOrder: 5,
      status: "PUBLISHED",
    },
    {
      question: "Why do you use n8n for workflow automation?",
      answer: "n8n provides the optimal balance between high-speed visual orchestration and raw code extensibility. It allows complete on-premise or private cloud hosting for full data security, supports custom JavaScript/Python nodes, handles millions of executions with zero per-task penalty pricing, and connects seamlessly to any REST, GraphQL, or webhook API.",
      category: "Security & Tech Stack",
      relatedServices: JSON.stringify(["workflow-automation", "ai-system-integration"]),
      featured: true,
      sortOrder: 6,
      status: "PUBLISHED",
    },
    {
      question: "How is data privacy and intellectual property protected?",
      answer: "Your data security is paramount. We build on zero-data-retention AI endpoints, encrypt all data in transit (TLS 1.3) and at rest (AES-256), host databases in your preferred geographic regions (SOC2/GDPR compliant), and never use proprietary client data to train public foundation models.",
      category: "Security & Tech Stack",
      relatedServices: JSON.stringify(["custom-ai-models", "data-pipeline-engineering"]),
      featured: true,
      sortOrder: 7,
      status: "PUBLISHED",
    },
    {
      question: "What is included in the Free Automation Audit?",
      answer: "Our Free Automation Audit is a 45-minute technical deep-dive with a Senior Automation Architect. We examine your top 2-3 operational bottlenecks, review your tech stack, outline potential automation architectures, and provide a clear ROI estimate and implementation roadmap with no obligation.",
      category: "Pricing & ROI",
      relatedServices: JSON.stringify(["ai-audit-optimization"]),
      featured: true,
      sortOrder: 8,
      status: "PUBLISHED",
    },
    {
      question: "What post-launch support and maintenance do you offer?",
      answer: "All Prime deployments include 30 days of intensive hypercare monitoring. We also provide ongoing SLA retainer packages covering 24/7 telemetry alerting, proactive API schema updates, continuous prompt optimization, and quarterly automation expansion sprints.",
      category: "Pricing & ROI",
      relatedServices: JSON.stringify(["ai-audit-optimization"]),
      featured: false,
      sortOrder: 9,
      status: "PUBLISHED",
    },
    {
      question: "Can we manage and update content without writing code?",
      answer: "Yes! Our platform includes a built-in protected CMS dashboard at /admin where non-technical team members can easily manage case studies, publish blog posts, update FAQs, review captured leads, and modify site settings in real time.",
      category: "Services & Scope",
      relatedServices: JSON.stringify([]),
      featured: false,
      sortOrder: 10,
      status: "PUBLISHED",
    },
  ];

  for (const faq of faqsData) {
    await prisma.fAQ.create({
      data: faq,
    });
  }
  console.log(`✅ ${faqsData.length} FAQs seeded.`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
