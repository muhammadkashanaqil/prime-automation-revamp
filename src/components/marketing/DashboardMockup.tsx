"use client";

import React, { useState } from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Play,
  Clock,
} from "lucide-react";

interface DashboardMockupProps {
  variant?: "retail" | "logistics" | "finance" | "workflow";
}

export default function DashboardMockup({ variant = "retail" }: DashboardMockupProps) {
  const [activeTab, setActiveTab] = useState<"telemetry" | "graph" | "logs">("graph");

  return (
    <div className="w-full bg-[#0B101E] text-white p-4 sm:p-6 font-sans select-none">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[11px] text-prime-gray flex items-center justify-between">
            <span>Throughput</span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-black text-white mt-1">1,420 <span className="text-[11px] font-normal text-emerald-400">req/s</span></div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[11px] text-prime-gray flex items-center justify-between">
            <span>AI Deflection</span>
            <Bot className="w-3.5 h-3.5 text-prime-purple" />
          </div>
          <div className="text-lg sm:text-xl font-black text-white mt-1">68.4% <span className="text-[11px] font-normal text-prime-purple">+14%</span></div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[11px] text-prime-gray flex items-center justify-between">
            <span>P99 Latency</span>
            <Clock className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-lg sm:text-xl font-black text-white mt-1">142 <span className="text-[11px] font-normal text-sky-400">ms</span></div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[11px] text-prime-gray flex items-center justify-between">
            <span>Guardrail Accuracy</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-black text-white mt-1">99.98%</div>
        </div>
      </div>

      {/* Main Orchestrator Canvas */}
      <div className="rounded-2xl bg-[#070B14] border border-white/10 p-4 relative overflow-hidden">
        {/* Canvas Toolbar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white tracking-wide">Autonomous Engine #408</span>
            <span className="px-2 py-0.5 rounded bg-prime-purple/20 text-prime-purple text-[10px] font-semibold border border-prime-purple/30">
              Live Production
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("graph")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                activeTab === "graph" ? "bg-prime-purple text-white shadow-sm" : "text-prime-gray hover:text-white"
              }`}
            >
              Pipeline Graph
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("logs")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                activeTab === "logs" ? "bg-prime-purple text-white shadow-sm" : "text-prime-gray hover:text-white"
              }`}
            >
              Live Telemetry
            </button>
          </div>
        </div>

        {activeTab === "graph" ? (
          /* Visual Pipeline Flow */
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
              {/* Node 1: Webhook Ingestion */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/15 relative group">
                <div className="text-[10px] uppercase font-bold text-prime-gray tracking-wider mb-1 flex items-center justify-between">
                  <span>01. Ingestion</span>
                  <Zap className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-xs font-bold text-white">Event Webhook</div>
                <div className="text-[10px] text-prime-gray mt-1 truncate">n8n / HTTP Stream</div>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 24ms ACK
                </div>
              </div>

              {/* Node 2: Deterministic Guardrails */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/15 relative">
                <div className="text-[10px] uppercase font-bold text-prime-gray tracking-wider mb-1 flex items-center justify-between">
                  <span>02. Guardrails</span>
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-xs font-bold text-white">Policy Verification</div>
                <div className="text-[10px] text-prime-gray mt-1 truncate">Schema + Rate Filter</div>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 0 Hallucinations
                </div>
              </div>

              {/* Node 3: LLM Reasoning */}
              <div className="p-3.5 rounded-xl bg-prime-purple/15 border border-prime-purple/40 relative shadow-accent">
                <div className="text-[10px] uppercase font-bold text-prime-purple tracking-wider mb-1 flex items-center justify-between">
                  <span>03. Intelligence</span>
                  <Sparkles className="w-3 h-3 text-prime-purple" />
                </div>
                <div className="text-xs font-bold text-white">Claude / GPT-4o</div>
                <div className="text-[10px] text-prime-gray mt-1 truncate">Vector Context RAG</div>
                <div className="mt-2 text-[10px] text-prime-purple font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Tool Call Ready
                </div>
              </div>

              {/* Node 4: Action Execution */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/15 relative">
                <div className="text-[10px] uppercase font-bold text-prime-gray tracking-wider mb-1 flex items-center justify-between">
                  <span>04. Execution</span>
                  <Database className="w-3 h-3 text-sky-400" />
                </div>
                <div className="text-xs font-bold text-white">Supabase / ERP</div>
                <div className="text-[10px] text-prime-gray mt-1 truncate">Atomic SQL Commit</div>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 200 OK
                </div>
              </div>
            </div>

            {/* Bottom Stream Status */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-prime-gray flex items-center justify-between">
              <span className="text-white">Payload: <span className="text-prime-purple">{`{"session": "usr_94a", "intent": "inventory_sync", "status": "resolved"}`}</span></span>
              <span className="text-emerald-400 font-bold hidden sm:inline">99.99% HEALTHY</span>
            </div>
          </div>
        ) : (
          /* Live Stream Logs */
          <div className="space-y-1.5 font-mono text-[11px] text-prime-gray py-1">
            <div className="text-emerald-400">[2026-08-24 16:40:01] INFO  Ingestion trigger fired: payload_id=98124 (8ms)</div>
            <div className="text-sky-300">[2026-08-24 16:40:01] DEBUG Context retrieved from Pinecone index "prod-knowledge" (18ms)</div>
            <div className="text-purple-300">[2026-08-24 16:40:02] INFO  Deterministic tool call executed: update_crm_record (42ms)</div>
            <div className="text-emerald-400">[2026-08-24 16:40:02] SUCCESS Transaction committed to PostgreSQL replica (99.98% SLA)</div>
          </div>
        )}
      </div>
    </div>
  );
}
