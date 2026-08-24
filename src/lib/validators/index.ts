import { z } from "zod";

// Helper for image URLs that can be either full URLs (https://...) or relative paths (/uploads/...)
const imagePathOrUrl = z
  .string()
  .optional()
  .nullable()
  .or(z.literal(""))
  .refine(
    (val) => {
      if (!val || val === "") return true;
      return val.startsWith("/") || val.startsWith("http://") || val.startsWith("https://");
    },
    { message: "Image must be a valid URL or path (e.g. /uploads/image.png or https://...)" }
  );

// Contact / Free Audit Form Schema
export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name too long"),
  workEmail: z.string().email("Please enter a valid work email address"),
  company: z.string().max(120, "Company name too long").optional().nullable().or(z.literal("")),
  website: z.string().optional().nullable().or(z.literal("")),
  phone: z.string().max(30, "Phone number is too long").optional().nullable().or(z.literal("")),
  primaryNeed: z.enum([
    "chatbot",
    "workflow",
    "data",
    "ai_model",
    "integration",
    "ai_audit",
    "other",
  ], {
    errorMap: () => ({ message: "Please select your primary automation need" }),
  }),
  message: z.string().min(5, "Please describe your bottleneck in at least 5 characters").max(4000, "Message too long"),
  budgetRange: z.string().optional().nullable().or(z.literal("")),
  consent: z.boolean().optional().default(true),
  // Bot Honeypot field (must remain empty)
  websiteUrl_hp: z.string().max(0, "Bot submission detected").optional().or(z.literal("")),
  // Hidden UTM Fields
  utmSource: z.string().optional().nullable().or(z.literal("")),
  utmMedium: z.string().optional().nullable().or(z.literal("")),
  utmCampaign: z.string().optional().nullable().or(z.literal("")),
  utmContent: z.string().optional().nullable().or(z.literal("")),
  utmTerm: z.string().optional().nullable().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Chat Request Contract Schema
export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(2000, "Message exceeds 2000 characters"),
  sessionId: z.string().min(1, "Session ID is required"),
  pageUrl: z.string().min(1, "Current page URL is required"),
  pageTitle: z.string().optional().nullable(),
  visitor: z
    .object({
      name: z.string().optional().nullable(),
      email: z.string().email().optional().nullable().or(z.literal("")),
    })
    .optional()
    .nullable(),
});

export type ChatRequestData = z.infer<typeof chatRequestSchema>;

// Admin Login Schema
export const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

// Case Study Schema
export const caseStudySchema = z.object({
  title: z.string().min(1, "Title is required").max(250),
  slug: z
    .string()
    .min(1, "Slug is required")
    .transform((val) => {
      const cleaned = val
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return cleaned.length > 0 ? cleaned : `case-study-${Date.now()}`;
    }),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  clientName: z.string().optional().nullable(),
  industry: z.string().optional().nullable().transform((val) => (val && val.trim() ? val.trim() : "Enterprise Technology")),
  services: z.array(z.string()).default(["workflow-automation"]),
  excerpt: z
    .string()
    .optional()
    .nullable()
    .transform((val) => {
      if (!val || val.trim().length === 0) {
        return "Comprehensive architectural case study outlining system design, automated workflows, and measurable ROI.";
      }
      return val.trim();
    }),
  heroImageUrl: imagePathOrUrl,
  heroImageAlt: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  featuredResult: z.string().optional().nullable(),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        note: z.string().optional().nullable(),
      })
    )
    .optional()
    .default([]),
  challenge: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : "Detailed analysis of operational challenge and friction points.")),
  solution: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : "Architectural system solution designed and deployed by Prime Automation.")),
  implementation: z.string().optional().nullable(),
  results: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : "Measurable performance results and operational ROI.")),
  technologies: z.array(z.string()).optional().default([]),
  testimonial: z
    .object({
      quote: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      role: z.string().optional().nullable(),
      company: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  ogImageUrl: imagePathOrUrl,
  noindex: z.boolean().default(false),
});

export type CaseStudyFormData = z.infer<typeof caseStudySchema>;

// Post Schema
export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(250),
  slug: z
    .string()
    .min(1, "Slug is required")
    .transform((val) => {
      const cleaned = val
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return cleaned.length > 0 ? cleaned : `insight-post-${Date.now()}`;
    }),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  excerpt: z
    .string()
    .optional()
    .nullable()
    .transform((val) => {
      if (!val || val.trim().length === 0) {
        return "Deep-dive technical guide on enterprise automation, data engineering, and modern AI systems.";
      }
      return val.trim();
    }),
  coverImageUrl: imagePathOrUrl,
  coverImageAlt: z.string().optional().nullable(),
  author: z.string().default("Prime Automation Team"),
  categories: z.array(z.string()).default(["Workflow Automation"]),
  body: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : "Article content and architectural breakdown.")),
  featured: z.boolean().default(false),
  readingTime: z.string().default("5 min read"),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  ogImageUrl: imagePathOrUrl,
  noindex: z.boolean().default(false),
});

export type PostFormData = z.infer<typeof postSchema>;

// FAQ Schema
export const faqSchema = z.object({
  question: z.string().min(2, "Question is required").max(400),
  answer: z.string().min(2, "Answer is required"),
  category: z.string().min(1, "Category is required").default("Services & Scope"),
  relatedServices: z.array(z.string()).optional().default([]),
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
});

export type FAQFormData = z.infer<typeof faqSchema>;

// Site Settings Schema
export const siteSettingsSchema = z.object({
  businessName: z.string().min(1).default("Prime Automation Pvt. Ltd."),
  email: z.string().email().default("info@primeautomationpl.com"),
  phone: z.string().optional().nullable(),
  schedulingUrl: z.string().optional().nullable().or(z.literal("")),
  socialLinks: z
    .object({
      linkedin: z.string().optional().nullable().or(z.literal("")),
      twitter: z.string().optional().nullable().or(z.literal("")),
      github: z.string().optional().nullable().or(z.literal("")),
      youtube: z.string().optional().nullable().or(z.literal("")),
    })
    .optional()
    .nullable(),
  defaultSeoTitle: z.string().min(1),
  defaultSeoDescription: z.string().min(1),
  footerText: z.string().optional().nullable(),
  chatbotWelcomeMessage: z.string().min(1),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;
