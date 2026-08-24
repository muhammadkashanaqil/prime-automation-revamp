"use client";

// Centralized GA4 & Marketing Analytics Dispatcher

export type AnalyticsEvent =
  | { name: "cta_click"; params: { cta_name: string; page_path: string } }
  | { name: "contact_form_start"; params: { page_path: string } }
  | { name: "contact_form_submit"; params: { primary_need: string; page_path: string } }
  | { name: "schedule_click"; params: { page_path: string } }
  | { name: "case_study_view"; params: { slug: string; industry: string } }
  | { name: "post_view"; params: { slug: string; category: string } }
  | { name: "chatbot_open"; params: { page_path: string } }
  | { name: "chatbot_message_sent"; params: { page_path: string } }
  | { name: "chatbot_lead_capture"; params: { page_path: string } }
  | { name: "chatbot_error"; params: { error_type: string } };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] 📊 ${event.name}:`, event.params);
  }

  // Google Analytics 4 (gtag) dispatch
  const windowWithGtag = window as unknown as {
    gtag?: (command: string, eventName: string, params: Record<string, any>) => void;
  };

  if (typeof windowWithGtag.gtag === "function") {
    windowWithGtag.gtag("event", event.name, event.params);
  }
}
