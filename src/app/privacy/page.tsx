import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ShieldCheck, Mail, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | GROVIX",
  description:
    "Learn how GROVIX collects, uses, and safeguards your personal data when you interact with our website, services, and digital products.",
};

export default function PrivacyPolicyPage() {
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
            Legal & Governance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3a302a] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#8c827a]">
            Last Updated: September 5, 2026
          </p>
        </div>

        {/* Intro */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 shadow-warm-sm mb-12 space-y-4 text-sm sm:text-base text-[#605850] leading-relaxed">
          <p>
            At <strong className="text-[#3a302a]">GROVIX</strong>, we respect your privacy and are committed to protecting the information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have when interacting with our website, services, and digital products.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm sm:text-base text-[#605850] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              1. Information We Collect
            </h2>
            <p>We may collect information that you voluntarily provide to us, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-[#c2652a]">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company or business name</li>
              <li>Project requirements and other information submitted through forms</li>
              <li>Information provided when requesting a consultation or quote</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <p className="pt-2">We may also automatically collect limited technical information such as:</p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-[#c2652a]">
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Pages visited</li>
              <li>Referring website</li>
              <li>General website usage and analytics data</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              2. How We Use Your Information
            </h2>
            <p>We may use collected information to:</p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-[#c2652a]">
              <li>Respond to inquiries and project requests</li>
              <li>Provide quotations and consultations</li>
              <li>Communicate regarding projects and services</li>
              <li>Deliver and improve our services</li>
              <li>Improve website performance and user experience</li>
              <li>Understand how visitors use our website</li>
              <li>Prevent fraud, abuse, and security issues</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-[#f2ece4] border border-[#d8d0c8]/80 text-[#3a302a] font-medium text-sm flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#c2652a] shrink-0" />
              <span>We do not sell your personal information.</span>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              3. Cookies & Analytics
            </h2>
            <p>
              GROVIX may use cookies and similar technologies to understand website usage, remember preferences, measure performance, and improve our services.
            </p>
            <p>
              Third-party analytics or advertising services may also use cookies or similar technologies according to their own privacy policies.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              4. Third-Party Services
            </h2>
            <p>
              Our website or services may use third-party providers for functions such as hosting, analytics, communication, payments, authentication, or other technical services.
            </p>
            <p>
              These providers may process information on our behalf and are expected to handle such information according to applicable privacy and security requirements.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              5. Data Retention
            </h2>
            <p>
              We retain information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing services, maintaining business records, resolving disputes, and complying with legal obligations.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              6. Data Security
            </h2>
            <p>
              We take reasonable technical and organizational measures to protect information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no internet-based service can guarantee absolute security.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              7. Your Rights
            </h2>
            <p>
              Depending on your location and applicable law, you may have rights regarding your personal information, including the right to request access, correction, deletion, or restriction of certain processing.
            </p>
            <p>
              To make a privacy-related request, contact us using the details below.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our website and services are not intentionally directed toward children under the age required by applicable law. We do not knowingly collect personal information from children without appropriate consent.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 pt-6 border-t border-[#d8d0c8]/60">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              10. Contact
            </h2>
            <p>
              For questions regarding this Privacy Policy or your personal information:
            </p>
            <div className="p-6 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 space-y-3">
              <div className="font-serif font-bold text-lg text-[#3a302a]">GROVIX Studio</div>
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
