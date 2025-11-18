import React from 'react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `These Terms of Service ("Terms") govern your access to and use of the Blitz India Engineering website,
    content, and engineering services (collectively, the "Services"). By accessing our website, engaging with our
    team, or using our Services, you agree to be bound by these Terms and any referenced policies, including our
    Privacy Policy. If you do not agree, please discontinue use of our website and services.`,
  },
  {
    title: '2. Scope of Services',
    body: `We provide mechanical design, documentation, analysis, validation, and manufacturing support solutions to
    industrial clients. Specific deliverables, schedules, and pricing are set out in proposals, statements of work,
    or service agreements. We reserve the right to change or discontinue any Service without prior notice.`,
  },
  {
    title: '3. Client Responsibilities',
    body: `Clients are responsible for:
    • Providing accurate, timely, and complete information necessary to execute the Services.
    • Obtaining required permissions, approvals, or third-party rights for materials supplied to us.
    • Ensuring that design inputs, specifications, or data provided are free from intellectual property infringement
      and comply with applicable laws.
    • Maintaining secure access to shared collaboration tools or platforms.
    • Reviewing deliverables promptly and providing feedback within agreed timelines.`,
  },
  {
    title: '4. Intellectual Property',
    body: `Unless otherwise agreed in writing:
    • Pre-existing intellectual property (IP) owned by a party remains the property of that party.
    • Deliverables created specifically for a client, once payment is received in full, will be assigned to the client
      subject to our retention of the right to use underlying methodologies, know-how, or non-confidential concepts.
    • Both parties agree to respect each other’s trademarks, copyrights, patents, and trade secrets.
    • Unauthorized use of our logos, content, or proprietary materials is prohibited.`,
  },
  {
    title: '5. Confidentiality',
    body: `Each party agrees to keep confidential information received from the other party strictly confidential and
    to use it solely for the purposes of fulfilling obligations under the engagement. Confidential information excludes
    information that is publicly available, independently developed without reference to the other party’s information,
    or disclosed under legal obligation.`,
  },
  {
    title: '6. Payment Terms',
    body: `Fees, payment schedules, and milestones are defined in proposals or agreements. Unless stated otherwise,
    invoices are payable within 15 days of issuance. We reserve the right to suspend work for overdue accounts and to
    charge interest on delayed payments as permitted by law.`,
  },
  {
    title: '7. Warranties and Disclaimers',
    body: `We warrant that we will perform Services with reasonable skill, care, and diligence consistent with
    industry standards. Except as expressly stated in a written agreement, the Services are provided "as is" without
    additional warranties, express or implied. We disclaim warranties of merchantability, fitness for a particular
    purpose, non-infringement, and uninterrupted availability.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `To the fullest extent permitted by law, Blitz India Engineering will not be liable for any indirect,
    incidental, special, consequential, or punitive damages, including lost profits or data, arising out of or related
    to the Services. Our aggregate liability under these Terms will not exceed the total fees paid by the client for the
    specific Services giving rise to the claim.`,
  },
  {
    title: '9. Indemnification',
    body: `Clients agree to indemnify and hold Blitz India Engineering harmless from any claims, damages, or losses
    arising from client-provided materials, misuse of deliverables, or violation of these Terms. Each party will
    promptly notify the other of any such claim and cooperate in the defense.`,
  },
  {
    title: '10. Termination',
    body: `Either party may terminate a Services engagement for convenience with reasonable written notice, or for
    cause if the other party materially breaches the agreement and fails to cure the breach within a reasonable period.
    Upon termination, clients must pay for services rendered up to the termination date.`,
  },
  {
    title: '11. Compliance and Export Controls',
    body: `Clients are responsible for ensuring that projects comply with applicable regulations, including export
    controls, safety standards, and industry-specific requirements. We reserve the right to decline projects that may
    breach legal or ethical obligations.`,
  },
  {
    title: '12. Governing Law and Dispute Resolution',
    body: `These Terms are governed by the laws of India without regard to conflict-of-law principles. Disputes will be
    resolved through good-faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of
    the competent courts in Pune, Maharashtra, India.`,
  },
  {
    title: '13. Updates to the Terms',
    body: `We may modify these Terms from time to time. The "Last Updated" date indicates the most recent revision.
    Continued use of the Services after changes take effect constitutes acceptance of the revised Terms.`,
  },
  {
    title: '14. Contact Information',
    body: `For questions or concerns about these Terms, please contact:
    Blitz India Engineering
    Email: info@blitzindiaengineering.com
    Phone: +91-91585-75785
    Address: Pune, Maharashtra, India`,
  },
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12">
          <header className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold mb-2">
              Legal
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

