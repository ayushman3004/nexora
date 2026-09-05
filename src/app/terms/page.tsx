import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Mail, Globe, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Engagement | GROVIX",
  description:
    "Review the professional Terms of Engagement governing digital engineering, design services, and client partnerships with GROVIX Studio.",
};

export default function TermsOfEngagementPage() {
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
            Terms of Engagement
          </h1>
          <p className="text-xs font-mono text-[#8c827a]">
            Last Updated: September 5, 2026
          </p>
        </div>

        {/* Intro */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#faf5ee] border border-[#d8d0c8]/70 shadow-warm-sm mb-12 space-y-4 text-sm sm:text-base text-[#605850] leading-relaxed">
          <p>
            These Terms of Engagement outline the general terms governing the relationship between <strong className="text-[#3a302a]">GROVIX</strong> (&ldquo;GROVIX&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) and clients who engage us for digital services.
          </p>
          <p>
            By engaging GROVIX for services, you acknowledge and agree to these terms together with any project-specific proposal, quotation, statement of work, or agreement provided to you.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm sm:text-base text-[#605850] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              1. Our Services
            </h2>
            <p>GROVIX provides digital services that may include:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                "Website design and development",
                "Web applications",
                "eCommerce development",
                "SaaS and custom software",
                "UI/UX design",
                "Mobile applications",
                "AI integrations",
                "Search engine optimization",
                "Digital marketing",
                "Performance optimization",
                "Website maintenance and support",
              ].map((service) => (
                <div key={service} className="flex items-center gap-2 text-sm text-[#3a302a]">
                  <CheckCircle2 className="w-4 h-4 text-[#c2652a] shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
            <p className="pt-2 text-xs sm:text-sm text-[#8c827a]">
              The exact scope of each project will be defined in the applicable proposal or project agreement.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              2. Project Scope
            </h2>
            <p>
              Each project is developed according to the agreed scope, requirements, features, and deliverables.
            </p>
            <p>
              Requests that fall outside the original scope may require additional fees, development time, or a separate agreement.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              3. Client Responsibilities
            </h2>
            <p>
              Clients are responsible for providing accurate information, content, assets, credentials, approvals, and feedback reasonably required to complete the project.
            </p>
            <p>
              Delays in providing required materials or approvals may affect the project timeline.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              4. Payments
            </h2>
            <p>
              Project pricing, payment schedules, deposits, milestones, and applicable taxes or fees will be communicated before work begins.
            </p>
            <p>
              Unless otherwise agreed in writing, work may begin after the required initial payment has been received.
            </p>
            <p>
              Completed work may be withheld from deployment or final delivery until outstanding payments are settled.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              5. Revisions
            </h2>
            <p>
              The number and type of revisions included in a project will depend on the agreed scope.
            </p>
            <p>
              Additional revisions or substantial changes after approval may be treated as additional work and may incur additional charges.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              6. Timelines
            </h2>
            <p>
              GROVIX will make reasonable efforts to meet agreed project timelines.
            </p>
            <p>
              Project timelines may change because of delayed feedback, changes in requirements, third-party services, technical issues, or circumstances outside our reasonable control.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              7. Intellectual Property
            </h2>
            <p>
              Unless otherwise agreed in writing, ownership of final custom deliverables created specifically for the client will transfer according to the payment and ownership terms established in the applicable project agreement.
            </p>
            <p>
              GROVIX may retain ownership of pre-existing tools, frameworks, reusable components, libraries, methodologies, templates, and other materials developed independently of the client&apos;s project.
            </p>
            <p>
              Third-party software, fonts, images, plugins, APIs, and other licensed materials remain subject to their respective licenses.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              8. Client Content
            </h2>
            <p>
              The client is responsible for ensuring that all text, images, logos, videos, trademarks, data, and other materials supplied to GROVIX may legally be used for the project.
            </p>
            <p>
              The client agrees to indemnify GROVIX against claims arising from unlawful or unauthorized client-provided content, to the extent permitted by applicable law.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              9. Third-Party Services
            </h2>
            <p>
              Some projects may depend on third-party platforms or services such as hosting providers, domain registrars, payment processors, APIs, analytics platforms, email services, or other external providers.
            </p>
            <p>
              GROVIX cannot guarantee uninterrupted availability or performance of services controlled by third parties.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              10. Website & Software Performance
            </h2>
            <p>
              GROVIX aims to deliver reliable, secure, and high-quality digital products.
            </p>
            <p>
              However, performance can depend on hosting infrastructure, third-party services, internet connectivity, browsers, devices, future software updates, and other external factors.
            </p>
            <p>
              No guarantee of uninterrupted or error-free operation is provided unless specifically agreed in writing.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              11. Cancellation
            </h2>
            <p>
              Either party may request termination of a project subject to the applicable project agreement.
            </p>
            <p>
              Payments for work already completed, committed third-party expenses, or non-refundable costs may remain payable following cancellation.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              12. Confidentiality
            </h2>
            <p>
              GROVIX will treat confidential client information shared during a project with reasonable care and will not intentionally disclose confidential information except where necessary to provide the agreed services or where required by law.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              13. Portfolio Rights
            </h2>
            <p>
              Unless otherwise agreed in writing, GROVIX may display completed work in its portfolio, website, social media, presentations, or other marketing materials.
            </p>
            <p>
              Clients may request that specific confidential or unreleased work not be publicly displayed.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              14. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by applicable law, GROVIX will not be liable for indirect, incidental, special, consequential, or unforeseeable losses arising from the use of our services.
            </p>
            <p>
              Nothing in these terms excludes liability that cannot legally be excluded or limited.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              15. Changes to These Terms
            </h2>
            <p>
              GROVIX may update these Terms of Engagement from time to time. Updated terms will be published on this page with a revised &ldquo;Last Updated&rdquo; date.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-4 pt-6 border-t border-[#d8d0c8]/60">
            <h2 className="text-xl sm:text-2xl font-serif text-[#3a302a]">
              16. Contact
            </h2>
            <p>
              For questions regarding these Terms of Engagement:
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
