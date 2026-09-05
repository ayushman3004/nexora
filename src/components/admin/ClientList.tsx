"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Users,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  confirmClientEmailAction,
  generateVerificationLinkAction,
} from "@/app/actions/admin";
import type { Profile, Project } from "@/types/database";

interface ClientWithAuth extends Profile {
  email_confirmed?: boolean;
}

interface ClientListProps {
  clients: ClientWithAuth[];
  projects: Project[];
}

export function ClientList({ clients, projects }: ClientListProps) {
  const [copiedLinkFor, setCopiedLinkFor] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDirectly = (userId: string, name: string) => {
    startTransition(async () => {
      try {
        await confirmClientEmailAction(userId);
        setActionMessage(`Successfully confirmed email for ${name}!`);
        setTimeout(() => setActionMessage(null), 3500);
      } catch (err: unknown) {
        setActionMessage(err instanceof Error ? err.message : "Could not verify email.");
        setTimeout(() => setActionMessage(null), 3500);
      }
    });
  };

  const handleCopyVerificationLink = (email: string) => {
    startTransition(async () => {
      try {
        const res = await generateVerificationLinkAction(email);
        if (res.actionLink) {
          await navigator.clipboard.writeText(res.actionLink);
          setCopiedLinkFor(email);
          setActionMessage(`Verification link copied to clipboard for ${email}!`);
          setTimeout(() => {
            setCopiedLinkFor(null);
            setActionMessage(null);
          }, 4000);
        }
      } catch (err: unknown) {
        setActionMessage(err instanceof Error ? err.message : "Could not generate link.");
        setTimeout(() => setActionMessage(null), 3500);
      }
    });
  };

  return (
    <div className="space-y-6">
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-[#c2652a]/10 border border-[#c2652a]/20 text-[#c2652a] text-xs sm:text-sm flex items-center gap-2 shadow-warm-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => {
            const assignedProjects = projects.filter((p) => p.client_id === client.id);
            const isConfirmed = client.email_confirmed ?? false;
            const formattedDate = new Date(client.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={client.id}
                className="p-6 rounded-3xl bg-white/80 border border-[#d8d0c8]/60 shadow-warm-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar with Avatar & Verification Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#f2ece4] border border-[#d8d0c8] flex items-center justify-center font-bold text-sm text-[#c2652a]">
                      {client.name.charAt(0).toUpperCase()}
                    </div>

                    {isConfirmed ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#4a7c59]/15 text-[#4a7c59] border border-[#4a7c59]/30 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Email Confirmed</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#c2652a]/15 text-[#c2652a] border border-[#c2652a]/30 flex items-center gap-1 font-semibold animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        <span>Unverified Email</span>
                      </span>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#3a302a]">
                      {client.name}
                    </h3>
                    <p className="text-xs text-[#605850] flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-[#8c827a]" />
                      <span>{client.company || "Individual Client"}</span>
                    </p>
                    <p className="text-xs text-[#8c827a] flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-[#8c827a]" />
                      <span className="truncate">{client.email}</span>
                    </p>
                  </div>

                  {/* Verification Actions (if not confirmed yet) */}
                  {!isConfirmed && (
                    <div className="p-3.5 rounded-2xl bg-[#fbe8d8]/60 border border-[#f0a878]/50 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#c2652a] block">
                        Admin Email Actions
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleConfirmDirectly(client.id, client.name)}
                          disabled={isPending}
                          className="px-3 py-1.5 rounded-full bg-[#4a7c59] hover:bg-[#3d6649] text-white text-[11px] font-semibold transition-all flex items-center gap-1 shadow-warm-xs cursor-pointer disabled:opacity-50"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verify Directly</span>
                        </button>

                        <button
                          onClick={() => handleCopyVerificationLink(client.email)}
                          disabled={isPending}
                          className="px-3 py-1.5 rounded-full bg-white hover:bg-[#faf5ee] border border-[#d8d0c8] text-[#3a302a] text-[11px] font-semibold transition-all flex items-center gap-1 shadow-warm-xs cursor-pointer disabled:opacity-50"
                        >
                          {copiedLinkFor === client.email ? (
                            <>
                              <Check className="w-3 h-3 text-[#4a7c59]" />
                              <span className="text-[#4a7c59]">Copied Link!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#c2652a]" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Assigned Projects */}
                  <div className="pt-3 border-t border-[#d8d0c8]/40 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#8c827a] block">
                      Assigned Projects ({assignedProjects.length})
                    </span>
                    {assignedProjects.length > 0 ? (
                      <div className="space-y-1">
                        {assignedProjects.map((p) => (
                          <Link
                            key={p.id}
                            href={`/admin/projects/${p.id}`}
                            className="block p-2 rounded-xl bg-[#faf5ee] border border-[#d8d0c8]/50 text-xs font-semibold text-[#3a302a] hover:text-[#c2652a] transition-colors truncate"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#8c827a] italic">
                        No projects assigned yet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d8d0c8]/40 flex items-center justify-between text-[11px] text-[#8c827a] font-mono">
                  <span>Joined {formattedDate}</span>
                  <span>ID: {client.id.substring(0, 6)}...</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white/70 border border-dashed border-[#d8d0c8] text-center space-y-3 max-w-md mx-auto">
          <Users className="w-10 h-10 text-[#c2652a]/60 mx-auto" />
          <h3 className="text-lg font-serif text-[#3a302a]">No Clients Registered Yet</h3>
          <p className="text-xs text-[#605850] leading-relaxed">
            When clients sign up via `/register`, their profile details, email verification status, and assigned projects will be tracked here.
          </p>
        </div>
      )}
    </div>
  );
}
