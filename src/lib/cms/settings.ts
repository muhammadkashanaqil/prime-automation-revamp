import prisma from "@/lib/db";
import { SiteSettingsFormData } from "@/lib/validators";

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      return {
        id: "default",
        businessName: "Prime Automation Pvt. Ltd.",
        email: "info@primeautomationpl.com",
        phone: "+1 (800) 555-AUTO",
        schedulingUrl: "https://cal.com/primeautomation/free-audit",
        socialLinks: {
          linkedin: "https://linkedin.com/company/prime-automation",
          twitter: "https://x.com/primeautomation",
          github: "https://github.com/prime-automation",
          youtube: "https://youtube.com/@primeautomation",
        },
        defaultSeoTitle: "Prime Automation | Enterprise AI & Operational Automation Systems",
        defaultSeoDescription: "Prime Automation builds production-grade AI chatbots, intelligent workflow automation, resilient data pipelines, and custom AI systems engineered for measurable business ROI.",
        footerText: "Prime Automation Pvt. Ltd. — Enterprise AI systems, autonomous workflows, and modern data engineering.",
        chatbotWelcomeMessage: "👋 Welcome to Prime Automation! I can help you explore our AI solutions, estimate your automation potential, or schedule a free audit with our engineering team.",
      };
    }

    let socialLinksObj = {};
    try {
      socialLinksObj = JSON.parse(settings.socialLinks || "{}");
    } catch {
      socialLinksObj = {};
    }

    return {
      ...settings,
      socialLinks: socialLinksObj,
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      id: "default",
      businessName: "Prime Automation Pvt. Ltd.",
      email: "info@primeautomationpl.com",
      phone: "+1 (800) 555-AUTO",
      schedulingUrl: "https://cal.com/primeautomation/free-audit",
      socialLinks: {},
      defaultSeoTitle: "Prime Automation | Enterprise AI & Operational Automation Systems",
      defaultSeoDescription: "Prime Automation builds production-grade AI systems and workflows.",
      footerText: "Prime Automation Pvt. Ltd.",
      chatbotWelcomeMessage: "Welcome to Prime Automation! How can we help you today?",
    };
  }
}

export async function updateSiteSettings(data: SiteSettingsFormData) {
  return await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      businessName: data.businessName,
      email: data.email,
      phone: data.phone || null,
      schedulingUrl: data.schedulingUrl || null,
      socialLinks: data.socialLinks ? JSON.stringify(data.socialLinks) : null,
      defaultSeoTitle: data.defaultSeoTitle,
      defaultSeoDescription: data.defaultSeoDescription,
      footerText: data.footerText || null,
      chatbotWelcomeMessage: data.chatbotWelcomeMessage,
    },
    create: {
      id: "default",
      businessName: data.businessName,
      email: data.email,
      phone: data.phone || null,
      schedulingUrl: data.schedulingUrl || null,
      socialLinks: data.socialLinks ? JSON.stringify(data.socialLinks) : null,
      defaultSeoTitle: data.defaultSeoTitle,
      defaultSeoDescription: data.defaultSeoDescription,
      footerText: data.footerText || null,
      chatbotWelcomeMessage: data.chatbotWelcomeMessage,
    },
  });
}
