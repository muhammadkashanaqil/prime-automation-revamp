export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  tagline: string;
  iconName: string;
  heroHeadline: string;
  problemStatement: string;
  useCases: Array<{
    title: string;
    description: string;
    metrics: string;
  }>;
  capabilities: Array<{
    title: string;
    description: string;
    deliverables: string[];
  }>;
  typicalIntegrations: string[];
  engagementModel: {
    duration: string;
    phases: Array<{ step: string; title: string; desc: string }>;
  };
  expectedOutcomes: string[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "ai-chatbots-virtual-agents": {
    slug: "ai-chatbots-virtual-agents",
    title: "AI Chatbots & Virtual Agents",
    shortDescription: "Autonomous conversational agents that resolve customer queries, qualify inbound sales leads, and execute backend tasks 24/7.",
    tagline: "Intelligent, action-oriented AI agents connected directly to your core business systems.",
    iconName: "Bot",
    heroHeadline: "Deploy Custom AI Agents That Actually Solve Problems, Not Just Chat",
    problemStatement: "Traditional customer support and sales teams are bogged down by repetitive inquiries, slow response times, and fragmented software tools. Off-the-shelf chatbots produce hallucinated answers and fail to take real action in your databases.",
    useCases: [
      {
        title: "24/7 Multi-Channel Customer Support",
        description: "Autonomously resolve Tier-1 and Tier-2 inquiries across Website, WhatsApp, Zendesk, and Email with sub-10-second response latency.",
        metrics: "60-75% ticket deflection",
      },
      {
        title: "Autonomous Sales SDR & Lead Qualifier",
        description: "Engage website visitors in real-time, qualify purchase intent against your ideal customer profile, and book meetings directly onto AE calendars.",
        metrics: "3x faster speed-to-lead",
      },
      {
        title: "Internal Operations & IT Helpdesk Agent",
        description: "Empower employees to query internal company knowledge bases, generate software access tokens, and check PTO balances instantly in Slack or Teams.",
        metrics: "85% reduction in internal tickets",
      },
    ],
    capabilities: [
      {
        title: "Deterministic Tool Calling & DB Actions",
        description: "Our agents execute verified read and write actions in your databases, CRM, and ERP under strict permission guardrails.",
        deliverables: ["Custom tool-calling schemas", "Live database lookup APIs", "Transactional audit logs"],
      },
      {
        title: "Grounded Enterprise RAG Knowledge",
        description: "Zero hallucination architecture retrieving facts exclusively from your validated SOPs, manuals, product catalogs, and policies.",
        deliverables: ["Vector embedding database", "Automated document sync", "Strict citation mechanisms"],
      },
      {
        title: "Human Escalation & Telemetry",
        description: "Seamless sentiment detection that passes frustrated users to live representatives with a summarized context brief.",
        deliverables: ["Live agent handoff protocol", "Full conversation telemetry", "Quality evaluation scoring"],
      },
    ],
    typicalIntegrations: ["n8n", "OpenAI GPT-4o", "Claude 3.5", "Shopify", "Zendesk", "HubSpot", "Slack", "WhatsApp API", "Supabase"],
    engagementModel: {
      duration: "4 - 6 Weeks from Audit to Production",
      phases: [
        { step: "01", title: "Discovery & Knowledge Audit", desc: "Map historical tickets, knowledge sources, and API schemas." },
        { step: "02", title: "Architecture & Sandbox Build", desc: "Construct RAG vector index, n8n tool nodes, and test guardrails." },
        { step: "03", title: "Shadow Deployment", desc: "Run agent in parallel with human operators to calibrate accuracy." },
        { step: "04", title: "Production Launch & Hypercare", desc: "Deploy across live channels with 24/7 telemetry monitoring." },
      ],
    },
    expectedOutcomes: [
      "Sub-15-second average first-response time across all digital channels",
      "Over 60% of routine inquiries resolved without human intervention",
      "Zero customer PII leakage with SOC2-compliant sandboxing",
      "Significant reduction in support team burnout and operating costs",
    ],
  },
  "workflow-automation": {
    slug: "workflow-automation",
    title: "Workflow Automation",
    shortDescription: "End-to-end orchestration of business operations eliminating manual copy-pasting, brittle spreadsheets, and repetitive tasks.",
    tagline: "Resilient, declarative workflow automation powered by self-hosted n8n and modern APIs.",
    iconName: "Workflow",
    heroHeadline: "Eliminate Operational Friction With Scalable Automation Pipelines",
    problemStatement: "Organizations waste hundreds of hours each month manually shuttling data between CRMs, billing systems, spreadsheets, and emails. When processes rely on humans for manual data entry, errors skyrocket and scaling costs explode.",
    useCases: [
      {
        title: "Automated Customer & Employee Onboarding",
        description: "Trigger contract generation, KYC verification, database provisioning, CRM updates, and welcome emails immediately upon signup.",
        metrics: "90% faster onboarding cycle",
      },
      {
        title: "Financial Reconciliation & Billing Triggers",
        description: "Sync invoices between Stripe, QuickBooks/NetSuite, and your internal ERP with automated discrepancy flagging.",
        metrics: "Zero manual ledger entry errors",
      },
      {
        title: "Multi-Platform Inventory & Order Sync",
        description: "Keep inventory balances synchronized in real time across Amazon, Shopify, warehouse 3PLs, and accounting ledgers.",
        metrics: "100% real-time stock accuracy",
      },
    ],
    capabilities: [
      {
        title: "n8n Enterprise Orchestration",
        description: "Self-hosted, highly scalable workflow architectures that run complex branching logic, rate-limited batch loops, and error retries.",
        deliverables: ["Production n8n container cluster", "Modular sub-workflow architecture", "Encrypted secrets vault"],
      },
      {
        title: "Dead-Letter Queues & Failover",
        description: "Automated error trapping that captures broken API responses, alerts engineering on Slack, and enables one-click re-execution.",
        deliverables: ["Dead-letter queue handling", "Automated alert webhooks", "State replay mechanism"],
      },
      {
        title: "Custom Webhook & Event Ingestion",
        description: "High-throughput endpoints capable of ingesting thousands of webhook events per minute without dropping requests.",
        deliverables: ["Event ingress gateway", "Payload validation & deduplication", "Historical execution logs"],
      },
    ],
    typicalIntegrations: ["n8n", "PostgreSQL", "Stripe", "QuickBooks", "NetSuite", "HubSpot", "Zapier Migration", "AWS Lambda"],
    engagementModel: {
      duration: "3 - 5 Weeks",
      phases: [
        { step: "01", title: "Process Mapping", desc: "Map current manual touchpoints, schemas, and edge case scenarios." },
        { step: "02", title: "Workflow Engineering", desc: "Build modular nodes, validation filters, and retry handlers." },
        { step: "03", title: "Staging Validation", desc: "Execute dry runs with synthetic and historic datasets." },
        { step: "04", title: "Cutover & Training", desc: "Seamless cutover with automated error monitoring." },
      ],
    },
    expectedOutcomes: [
      "Elimination of repetitive manual data entry across departments",
      "Immediate processing of customer requests and transactional events",
      "Complete audit visibility into operational event flows",
      "Direct 50-80% reduction in operational processing overhead",
    ],
  },
  "data-pipeline-engineering": {
    slug: "data-pipeline-engineering",
    title: "Data Pipeline Engineering",
    shortDescription: "High-uptime, low-latency ETL/ELT pipelines and data warehouses built on PostgreSQL, Kafka, and modern cloud infrastructure.",
    tagline: "Transform messy raw data into structured, real-time intelligence for your business.",
    iconName: "Database",
    heroHeadline: "Reliable Data Infrastructure Built for High Throughput and Real-Time Analytics",
    problemStatement: "Valuable business intelligence is trapped in silos across disconnected databases, analytics tools, and legacy systems. Batch reports take 24+ hours to compile, leaving leaders blind to real-time performance.",
    useCases: [
      {
        title: "Real-Time BI & Executive Dashboards",
        description: "Stream transactional and product telemetry into centralized PostgreSQL/Supabase warehouses for sub-second dashboard rendering.",
        metrics: "< 3-second data freshness",
      },
      {
        title: "High-Volume Event Telemetry & IoT Ingestion",
        description: "Process millions of continuous sensor or app clickstream events per day with fault-tolerant queuing and schema normalization.",
        metrics: "99.99% pipeline uptime",
      },
      {
        title: "Database Migration & Schema Modernization",
        description: "Migrate legacy SQL instances to modern cloud architectures with zero downtime and verified data parity.",
        metrics: "Zero data loss guarantee",
      },
    ],
    capabilities: [
      {
        title: "Stream & Batch ETL Architecture",
        description: "Modern data extraction, transformation, and loading pipelines utilizing Python, Kafka, and PostgreSQL.",
        deliverables: ["Normalized relational schemas", "Automated CDC (Change Data Capture)", "Data deduplication pipelines"],
      },
      {
        title: "Data Quality & Anomaly Detection",
        description: "Automated regression tests that validate row integrity, schema constraints, and statistical deviations before committing data.",
        deliverables: ["Schema validation guards", "Automated anomaly alerting", "Data freshness monitors"],
      },
      {
        title: "Warehouse & Vector Store Setup",
        description: "Structured storage optimized for both analytical SQL aggregations and high-dimensional AI vector similarity search.",
        deliverables: ["Supabase/PostgreSQL provisioning", "pgvector indexing", "Optimized partitioning & indexes"],
      },
    ],
    typicalIntegrations: ["PostgreSQL", "Supabase", "Apache Kafka", "Python", "TimescaleDB", "Docker", "AWS S3", "Tableau / Looker"],
    engagementModel: {
      duration: "6 - 8 Weeks",
      phases: [
        { step: "01", title: "Data Source Audit", desc: "Analyze data volume, velocity, formats, and access patterns." },
        { step: "02", title: "Target Schema Blueprint", desc: "Design high-performance relational and analytical schemas." },
        { step: "03", title: "Pipeline Development", desc: "Build ingestion workers, transformation logic, and automated tests." },
        { step: "04", title: "Production Migration", desc: "Backfill historical records and switch live feeds with zero downtime." },
      ],
    },
    expectedOutcomes: [
      "Real-time visibility into sales, operations, and logistics metrics",
      "99.98%+ guaranteed pipeline reliability under heavy loads",
      "Clean, unified data foundations ready for advanced AI and machine learning",
      "Significant reduction in manual report compilation hours",
    ],
  },
  "custom-ai-models": {
    slug: "custom-ai-models",
    title: "Custom AI Model Development",
    shortDescription: "Fine-tuned domain-specific LLMs, computer vision systems, and intelligent document extraction engines.",
    tagline: "Proprietary AI models tailored specifically to your company's domain, documents, and standards.",
    iconName: "Cpu",
    heroHeadline: "Harness Bespoke Machine Learning Models Built for Your Exact Industry",
    problemStatement: "Generic foundation models struggle with specialized terminology, unique file layouts, proprietary business logic, and strict compliance rules. Off-the-shelf models produce inconsistent outputs and cost too much at high token volumes.",
    useCases: [
      {
        title: "Intelligent Document & Invoice Extraction",
        description: "Extract complex tabular data from PDFs, scanned receipts, and handwritten forms with 99%+ accuracy.",
        metrics: "94% straight-through processing",
      },
      {
        title: "Domain-Specific LLM Fine-Tuning",
        description: "Train lightweight open-source models (Llama 3, Mistral) on your company's historical communications, jargon, and guidelines.",
        metrics: "70% lower inference cost",
      },
      {
        title: "Predictive Churn & Demand Forecasting",
        description: "Machine learning classifiers that predict customer churn risk and inventory demand fluctuations before they occur.",
        metrics: "25% improvement in forecast accuracy",
      },
    ],
    capabilities: [
      {
        title: "Vision & Document AI Pipelines",
        description: "Multi-modal architectures combining layout analysis with structured JSON schema extraction.",
        deliverables: ["Document parsing API", "Confidence scoring system", "Human review interface"],
      },
      {
        title: "Fine-Tuning & Quantization",
        description: "Supervised fine-tuning and parameter-efficient LoRA adapters deployed on cost-effective dedicated inference clusters.",
        deliverables: ["Curated training dataset", "Fine-tuned model weights", "Optimized inference server"],
      },
      {
        title: "Guardrails & Output Validation",
        description: "Strict deterministic validation ensuring model responses strictly conform to Pydantic/Zod schemas.",
        deliverables: ["Schema validation engine", "Hallucination guardrails", "Automated eval benchmark suite"],
      },
    ],
    typicalIntegrations: ["Python", "PyTorch", "Hugging Face", "OpenAI API", "Claude API", "Ollama / vLLM", "Docker", "AWS"],
    engagementModel: {
      duration: "6 - 10 Weeks",
      phases: [
        { step: "01", title: "Dataset Curation", desc: "Gather, clean, anonymize, and label domain-specific data." },
        { step: "02", title: "Model Architecture & Training", desc: "Run fine-tuning experiments and optimize hyper-parameters." },
        { step: "03", title: "Evaluation & Benchmarking", desc: "Validate model against rigorous domain test suites." },
        { step: "04", title: "API Deployment & Scaling", desc: "Deploy secure containerized inference endpoints." },
      ],
    },
    expectedOutcomes: [
      "Superior domain accuracy compared to generic prompt engineering",
      "Significant reduction in recurring per-token cloud API costs",
      "Full ownership and data privacy over proprietary model weights",
      "Zero leakage of trade secrets or customer data",
    ],
  },
  "ai-system-integration": {
    slug: "ai-system-integration",
    title: "AI System Integration",
    shortDescription: "Seamlessly embed modern AI capabilities and autonomous workflows into your existing legacy software, ERP, and CRM stacks.",
    tagline: "Bridge the gap between modern AI intelligence and your existing enterprise software stack.",
    iconName: "Layers",
    heroHeadline: "Supercharge Your Existing Tech Stack With Enterprise-Grade AI Integrations",
    problemStatement: "Most enterprises cannot replace their core systems of record (SAP, Oracle, NetSuite, Salesforce, custom SQL). Yet, adding AI to these complex legacy environments feels daunting and risky.",
    useCases: [
      {
        title: "CRM & Sales Pipeline AI Enrichment",
        description: "Automatically research inbound leads, summarize customer email history, and generate next-step recommendations inside Salesforce or HubSpot.",
        metrics: "+35% SDR meeting booking rate",
      },
      {
        title: "ERP & Legacy SQL Database AI Interfaces",
        description: "Allow non-technical managers to query legacy relational databases using natural language with secure read-only translation.",
        metrics: "Instant natural language querying",
      },
      {
        title: "Unified Omnichannel Communications",
        description: "Integrate email, SMS, WhatsApp, and ticketing systems into a single intelligent synchronization layer.",
        metrics: "Unified customer context",
      },
    ],
    capabilities: [
      {
        title: "Custom Middleware & API Gateways",
        description: "High-performance TypeScript/Python middleware that translates between modern JSON/REST and legacy SOAP/SQL interfaces.",
        deliverables: ["Custom API adapter services", "Rate-limiting & caching layer", "TLS 1.3 secured tunnels"],
      },
      {
        title: "Bi-Directional State Synchronization",
        description: "Ensure changes in your AI workflows immediately reflect in your systems of record with zero conflicts.",
        deliverables: ["Two-way synchronization webhooks", "Conflict resolution logic", "Transaction rollback safety"],
      },
      {
        title: "Enterprise IAM & Role-Based Access",
        description: "Strict permission scoping ensuring AI only accesses records permitted by the authenticated user's credentials.",
        deliverables: ["OAuth2 / JWT authentication", "Role-based access matrix", "Detailed audit logging"],
      },
    ],
    typicalIntegrations: ["Salesforce", "HubSpot", "NetSuite", "Shopify", "PostgreSQL", "n8n", "GraphQL", "REST APIs"],
    engagementModel: {
      duration: "4 - 8 Weeks",
      phases: [
        { step: "01", title: "API & Protocol Audit", desc: "Audit legacy interfaces, authentication mechanisms, and schemas." },
        { step: "02", title: "Middleware Architecture", desc: "Build secure translation layers and caching proxies." },
        { step: "03", title: "Integration Testing", desc: "Simulate high concurrency loads and edge-case error states." },
        { step: "04", title: "Phased Deployment", desc: "Roll out to pilot teams before organization-wide activation." },
      ],
    },
    expectedOutcomes: [
      "Zero disruption to existing mission-critical systems of record",
      "Modern AI capabilities accessible directly within familiar tools",
      "Rigorous enterprise security and granular role-based access",
      "Immediate employee productivity gains without extensive retraining",
    ],
  },
  "ai-audit-optimization": {
    slug: "ai-audit-optimization",
    title: "AI Audit & Optimization",
    shortDescription: "In-depth technical review of your existing operations, identifying high-ROI automation opportunities and fixing underperforming AI systems.",
    tagline: "Actionable roadmap, ROI modeling, and technical optimization for high-impact automation.",
    iconName: "Gauge",
    heroHeadline: "Identify Bottlenecks, Quantify ROI, and Accelerate Your Automation Roadmap",
    problemStatement: "Many companies spend months and tens of thousands of dollars on AI initiatives that never reach production or fail to deliver measurable financial return.",
    useCases: [
      {
        title: "Comprehensive Operational Workflow Audit",
        description: "Deep dive into your company's operational touchpoints to identify top automation opportunities ranked by feasibility and financial ROI.",
        metrics: "Clear 12-month automation roadmap",
      },
      {
        title: "AI Cost & Token Optimization",
        description: "Audit existing LLM pipelines, reducing token spend by 40-70% through semantic caching, prompt pruning, and model distillation.",
        metrics: "40-70% reduction in AI cloud bills",
      },
      {
        title: "Safety, Accuracy & Guardrail Evaluation",
        description: "Benchmark and stress-test current chatbots and agents to eliminate hallucinations and secure prompt injection vulnerabilities.",
        metrics: "Zero security vulnerability gaps",
      },
    ],
    capabilities: [
      {
        title: "Process & Time-Motion Analysis",
        description: "Detailed measurement of employee time spent on repetitive tasks to establish baseline cost metrics.",
        deliverables: ["Executive Opportunity Matrix", "Hours & dollars savings model", "Technology stack recommendation"],
      },
      {
        title: "LLM Pipeline Profiling & Caching",
        description: "Implement semantic caching and prompt optimization strategies to slash latency and recurring token costs.",
        deliverables: ["Token reduction report", "Semantic cache implementation", "Model routing architecture"],
      },
      {
        title: "Security & Red-Teaming Assessment",
        description: "Comprehensive vulnerability testing to safeguard against data leakage, jailbreaks, and unauthorized API calls.",
        deliverables: ["Security evaluation report", "Sanitization filters", "Remediation action plan"],
      },
    ],
    typicalIntegrations: ["n8n", "OpenAI", "Anthropic", "LangSmith", "PostgreSQL", "LangChain", "Cloudflare"],
    engagementModel: {
      duration: "2 - 3 Weeks (Audit) or Ongoing Retainer",
      phases: [
        { step: "01", title: "Stakeholder Interviews", desc: "Interview department heads and review current tooling & logs." },
        { step: "02", title: "Technical Diagnostic", desc: "Profile pipeline latency, token costs, and error rates." },
        { step: "03", title: "ROI Modeling & Architecture", desc: "Formulate concrete architectural solutions and ROI models." },
        { step: "04", title: "Executive Briefing", desc: "Present comprehensive findings, prioritized roadmap, and code prototypes." },
      ],
    },
    expectedOutcomes: [
      "Prioritized roadmap of automation initiatives with proven ROI potential",
      "Immediate 40-70% savings on current AI token and infrastructure spend",
      "Elimination of security risks, hallucinations, and prompt vulnerabilities",
      "Executive alignment on high-leverage technology investments",
    ],
  },
};

export const SERVICES_LIST = Object.values(SERVICES_DATA);
