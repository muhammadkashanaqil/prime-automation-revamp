"use client";

import React, { useState } from "react";
import {
  Zap,
  Cpu,
  Bot,
  Database,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";

interface NodeDetail {
  id: string;
  step: string;
  name: string;
  role: string;
  tech: string;
  description: string;
  icon: any;
  metric: string;
}

const NODES: NodeDetail[] = [
  {
    id: "trigger",
    step: "01. TRIGGER",
    name: "Event Ingestion",
    role: "Multi-Source Listener",
    tech: "n8n Webhook / Kafka / REST",
    description:
      "Captures customer interactions, ERP inventory webhooks, and raw email tickets in real-time with sub-30ms acknowledgment.",
    icon: Zap,
    metric: "0ms Drop Rate",
  },
  {
    id: "orchestrator",
    step: "02. LOGIC",
    name: "Orchestration & Branching",
    role: "Deterministic State Machine",
    tech: "Self-Hosted n8n Engine",
    description:
      "Evaluates deterministic business rules, validates schemas, and checks authentication before routing to LLM agents.",
    icon: Layers,
    metric: "100% Policy Bound",
  },
  {
    id: "ai",
    step: "03. INTELLIGENCE",
    name: "Autonomous AI Agent",
    role: "Contextual Reasoning & Tools",
    tech: "Claude 3.5 Sonnet / GPT-4o",
    description:
      "Performs semantic search over vector databases (Pinecone/pgvector), drafts precision responses, and executes structured tool calls.",
    icon: Bot,
    metric: "68% Deflection",
  },
  {
    id: "action",
    step: "04. ACTION",
    name: "Database & Tool Execution",
    role: "Atomic Systems Update",
    tech: "Supabase / PostgreSQL / CRM",
    description:
      "Executes verified SQL mutations, updates CRM tickets, and notifies teams with complete audit logs and rollback guarantees.",
    icon: Database,
    metric: "99.98% Uptime",
  },
];

export default function WorkflowNodeDiagram() {
  const [selectedNode, setSelectedNode] = useState<string>("ai");
  const activeNode = NODES.find((n) => n.id === selectedNode) || NODES[2];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Node Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {NODES.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = selectedNode === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node.id)}
              className={`p-5 rounded-2xl text-left transition-all relative border ${
                isSelected
                  ? "bg-prime-purple/15 border-prime-purple shadow-accent text-white"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-prime-gray hover:text-white"
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase mb-3">
                <span className={isSelected ? "text-prime-purple" : "text-prime-gray/70"}>
                  {node.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-prime-purple text-white shadow-sm"
                      : "bg-white/10 text-prime-purple"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-white">{node.name}</div>
              </div>

              <div className="text-xs text-prime-gray mt-1 truncate">{node.role}</div>

              {/* Status Badge */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-prime-gray/80">{node.metric}</span>
                <span className={`text-[10px] ${isSelected ? "text-prime-purple font-bold" : "text-prime-gray/60"}`}>
                  {isSelected ? "Active" : "Click to view"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Deep Dive Box */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-prime-purple/30 bg-[#0B1020]/90 relative overflow-hidden animate-in fade-in-50 duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-prime-purple/20 text-prime-purple text-xs font-bold border border-prime-purple/40">
                {activeNode.step} Architecture
              </span>
              <span className="text-xs text-prime-gray font-mono">{activeNode.tech}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeNode.name} — {activeNode.role}
            </h4>
            <p className="text-sm text-prime-gray leading-relaxed">{activeNode.description}</p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[160px]">
            <div className="text-[11px] font-semibold text-prime-gray uppercase tracking-wider">
              Guaranteed SLA
            </div>
            <div className="text-2xl font-black text-white mt-1 text-emerald-400">
              {activeNode.metric}
            </div>
            <div className="text-[10px] text-prime-gray mt-1">Fault-tolerant execution</div>
          </div>
        </div>
      </div>
    </div>
  );
}
