"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "assistant" | "user";
  text: string;
  suggestedActions?: string[];
  timestamp: string;
}

const SESSION_STORAGE_KEY = "prime-chat-session";

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize or retrieve Session ID from sessionStorage (prime-chat-session)
  useEffect(() => {
    let sid = "";
    try {
      sid = sessionStorage.getItem(SESSION_STORAGE_KEY) || "";
    } catch {
      sid = "";
    }

    if (!sid) {
      sid = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}`;
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
      } catch {}
    }
    setSessionId(sid);

    // Load saved conversation or initialize welcome message
    let savedMessages: string | null = null;
    try {
      savedMessages = sessionStorage.getItem("prime_chat_history");
    } catch {}

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch {
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, []);

  // Persist conversation history in sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("prime_chat_history", JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Keyboard shortcut: Escape closes chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const initializeWelcomeMessage = () => {
    setMessages([
      {
        id: "welcome-1",
        sender: "assistant",
        text: "👋 Hi! Welcome to Prime Automation. I can answer questions about our autonomous AI agents, n8n workflow systems, or help you schedule a Free Automation Audit. How can I help you today?",
        suggestedActions: ["Services", "Automation Audit", "Case Studies", "How it works"],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleToggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      trackEvent({
        name: "chatbot_open",
        params: { page_path: pathname },
      });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorState(null);
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    trackEvent({
      name: "chatbot_message_sent",
      params: { page_path: pathname },
    });

    try {
      const activeUrl = typeof window !== "undefined" ? window.location.href : pathname;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId || undefined,
          pageUrl: activeUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server returned status ${response.status}`);
      }

      // Reuse or update sessionId from backend response
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        try {
          sessionStorage.setItem(SESSION_STORAGE_KEY, data.sessionId);
        } catch {}
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "Thank you for reaching out! How else may I assist you?",
        suggestedActions: data.suggestedActions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorState(err.message || "Failed to reach AI assistant. Please retry.");
      trackEvent({
        name: "chatbot_error",
        params: { error_type: err.message || "network_failure" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (action: string) => {
    const lower = action.toLowerCase();
    // Navigation actions
    if (lower.includes("audit") || lower.includes("book") || lower.includes("contact page") || lower.includes("call")) {
      window.location.href = "/contact";
      return;
    }
    if (lower.includes("service") || lower.includes("ai agent") || lower.includes("workflow automation")) {
      window.location.href = "/services";
      return;
    }
    if (lower.includes("case stud") || lower.includes("proof") || lower.includes("portfolio")) {
      window.location.href = "/case-studies";
      return;
    }
    // Send as a message for conversational actions
    handleSendMessage(action);
  };

  const handleClearHistory = () => {
    try {
      sessionStorage.removeItem("prime_chat_history");
    } catch {}
    initializeWelcomeMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Window (Panel Desktop 380-420px, max 80vh) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Prime Assistant"
          className="mb-4 w-[92vw] sm:w-[400px] h-[580px] max-h-[80vh] rounded-3xl bg-[#0C1322]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Header: Prime logo/icon, "Prime Assistant", online label, close */}
          <div className="px-5 py-4 bg-[#090E1B] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl bg-prime-purple/20 border border-prime-purple/40 flex items-center justify-center text-prime-purple">
                <Bot className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-prime-navy" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white leading-none">Prime Assistant</h3>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                    AI Online
                  </span>
                </div>
                <p className="text-[10px] text-prime-gray mt-0.5">Autonomous Systems Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-prime-gray hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-prime-gray hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Message Stream */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-4 text-sm"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-prime-purple/20 border border-prime-purple/30 flex items-center justify-center text-prime-purple shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 space-y-2 text-xs sm:text-sm ${
                    msg.sender === "user"
                      ? "bg-prime-purple text-white rounded-br-none shadow-accent font-medium"
                      : "bg-white/[0.08] text-white/95 rounded-bl-none border border-white/10"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {/* Suggested Action Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleActionClick(action)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-prime-purple/20 hover:bg-prime-purple text-white font-medium border border-prime-purple/40 transition-all active:scale-95 cursor-pointer"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[10px] ${
                      msg.sender === "user" ? "text-white/70 text-right" : "text-prime-gray/70"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Three subtle dots typing state */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-6 h-6 rounded-lg bg-prime-purple/20 border border-prime-purple/30 flex items-center justify-center text-prime-purple shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white/[0.08] rounded-2xl rounded-bl-none px-4 py-2.5 border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-prime-purple animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-prime-purple animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-prime-purple animate-bounce" />
                </div>
              </div>
            )}

            {/* Error Message with Retry */}
            {errorState && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-between text-xs text-rose-300">
                <span>{errorState}</span>
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="font-bold underline ml-2 hover:text-white"
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Composer: Sticky bottom, multiline max 4 rows */}
          <div className="p-3 bg-[#080D18] border-t border-white/10">
            <div className="relative flex items-center gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AI, n8n automations, audits..."
                className="w-full resize-none bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-prime-gray/70 focus:outline-none focus:border-prime-purple max-h-24"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 rounded-xl bg-prime-purple hover:bg-prime-accent-hover text-white disabled:opacity-40 transition-all shrink-0 active:scale-95 shadow-accent cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between px-1 pt-1.5 text-[10px] text-prime-gray/70">
              <span>Enter ↵ sends • Shift+Enter newline</span>
              <a href="/contact" className="hover:text-white underline">
                Book Audit
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Launcher: 56-62px circular/rounded-square button, lift 2px + controlled glow on hover */}
      <button
        type="button"
        onClick={handleToggleOpen}
        className="relative group w-14 h-14 rounded-2xl bg-prime-purple text-white shadow-accent hover:bg-prime-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center cursor-pointer"
        aria-label={isOpen ? "Close Prime AI chat" : "Open Prime Assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
