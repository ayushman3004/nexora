import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  FileCode2,
  Mail,
  CheckCircle2,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Data Protection | GROVIX",
  description:
    "Learn about GROVIX Studio's engineering security practices, data protection principles, infrastructure safeguards, and client IP integrity.",
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f4] text-[#3a302a] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8c827a] hover:text-[#c2652a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#d8d0c8]/60 pb-8 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8c827a] mb-2">
            Engineering Governance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a] tracking-tight mb-4">
            Security &amp; Data Protection
          </h1>
          <p className="text-xs font-mono text-[#8c827a]">
            Last Updated: September 5, 2026
          </p>
        </div>

        {/* Intro Highlight */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 shadow-warm-sm mb-12 space-y-4 text-sm sm:text-base text-[#605850] leading-relaxed">
          <p>
            At <strong className="text-[#3a302a]">GROVIX</strong>, security is an architectural baseline, not an afterthought. We do not hide behind misleading enterprise badges or unearned certification logos. Instead, we adhere to strict, verifiable engineering standards that protect your data, code, and user privacy from day one.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="space-y-12 text-sm sm:text-base text-[#605850] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                1. Data Encryption &amp; Transport Security
              </h2>
            </div>
            <p>
              All traffic between clients, our servers, and third-party APIs is encrypted using modern cryptographic protocols:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#c2652a]">
              <li>
                <strong className="text-[#3a302a]">Encryption in Transit:</strong> Mandatory HTTPS enforced via TLS 1.3 across all client endpoints and APIs, with automatic HSTS headers.
              </li>
              <li>
                <strong className="text-[#3a302a]">Encryption at Rest:</strong> Database volumes, backups, and media assets are encrypted using industry-standard AES-256 encryption.
              </li>
              <li>
                <strong className="text-[#3a302a]">Row-Level Security (RLS):</strong> Database-level policies ensure users and client accounts can strictly access only their own authorized records, preventing cross-tenant data leaks.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <Server className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                2. Cloud Infrastructure &amp; Edge Protection
              </h2>
            </div>
            <p>
              We partner with global, resilient cloud providers (such as Vercel, Supabase, and AWS) that maintain robust physical and operational security standards:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "DDoS mitigation at the edge",
                "Automated zero-downtime deployments",
                "Automated database snapshot backups",
                "Isolated preview and staging sandboxes",
                "Immutable deployment rollbacks",
                "Strict origin access restrictions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#3a302a]">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <FileCode2 className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                3. Application Architecture &amp; Code Hygiene
              </h2>
            </div>
            <p>
              Modern web applications must be engineered to withstand automated exploitation vectors. We enforce rigorous development standards:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#c2652a]">
              <li>
                <strong className="text-[#3a302a]">Server-First Security:</strong> Leveraging React Server Components to keep sensitive business logic, API secrets, and server database calls completely off the client-side bundle.
              </li>
              <li>
                <strong className="text-[#3a302a]">Input Sanitization:</strong> Strict schema validation on all API requests using type-safe parsers to eliminate injection and malformed payload risks.
              </li>
              <li>
                <strong className="text-[#3a302a]">Dependency Audits:</strong> Automated continuous monitoring of upstream packages to detect and patch known vulnerabilities promptly.
              </li>
              <li>
                <strong className="text-[#3a302a]">Strict Type-Safety:</strong> Comprehensive TypeScript coverage across full-stack applications to eliminate unexpected runtime state exceptions.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <KeyRound className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                4. Authentication &amp; Access Controls
              </h2>
            </div>
            <p>
              Administrative access to customer accounts, databases, and deployment pipelines is governed by the principle of least privilege:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#c2652a]">
              <li>Mandatory Multi-Factor Authentication (MFA) on all studio developer and infrastructure accounts.</li>
              <li>Zero hardcoded API secrets; all configuration keys are injected via encrypted runtime secrets vaults.</li>
              <li>Session tokens and authenticated cookies are configured with HttpOnly, Secure, and SameSite attributes to prevent token theft via XSS or CSRF.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2ece4] flex items-center justify-center text-[#c2652a] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
                5. Transparent Posture on External Certifications
              </h2>
            </div>
            <div className="p-5 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 space-y-2">
              <p className="text-xs sm:text-sm text-[#3a302a] leading-relaxed">
                GROVIX adheres to industry-standard secure development benchmarks (including OWASP Top 10 guidelines and GDPR privacy-by-design principles). We do not claim third-party certifications (such as formal SOC 2 Type II or ISO 27001 audit attestations) unless our studio has formally undergone and completed external independent third-party audits.
              </p>
              <p className="text-xs sm:text-sm text-[#605850] leading-relaxed">
                When building client applications that require specific compliance targets (e.g., HIPAA-ready or SOC2-aligned architectures), we engineer the infrastructure and codebase to comply with those technical requirements upon request.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 pt-6 border-t border-[#d8d0c8]/60">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              6. Responsible Disclosure &amp; Security Inquiries
            </h2>
            <p>
              If you believe you have discovered a security vulnerability or have a security-related inquiry regarding GROVIX or our products, please reach out to us directly:
            </p>
            <div className="p-6 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 space-y-3">
              <div className="font-serif font-bold text-lg text-[#3a302a]">GROVIX Security Team</div>
              <div className="flex items-center gap-2 text-sm text-[#605850]">
                <Globe className="w-4 h-4 text-[#c2652a]" />
                <span>Website:</span>
                <a
                  href="https://www.grovix.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c2652a] hover:underline font-mono text-xs"
                >
                  www.grovix.site
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#605850]">
                <Mail className="w-4 h-4 text-[#c2652a]" />
                <span>Email:</span>
                <a
                  href="mailto:contact@grovix.site"
                  className="text-[#c2652a] hover:underline font-mono text-xs"
                >
                  contact@grovix.site
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
