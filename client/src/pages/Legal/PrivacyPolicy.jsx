import React from 'react';

const sections = [
  {
    title: '1. Introduction',
    body: `This Privacy Policy describes how Blitz India Engineering ("we", "us", or "our") collects, uses,
    and protects personal information when you visit our website, engage with our services, or communicate with our
    team. By accessing our website or submitting information through our contact channels, you agree to the
    practices outlined in this policy.`,
  },
  {
    title: '2. Information We Collect',
    body: `We collect information to deliver and improve our engineering services, maintain security, and respond
    to inquiries. This includes:
    • Contact details such as name, email address, phone number, and company information submitted through forms or email.
    • Project and technical details shared voluntarily to help us scope services or provide proposals.
    • Usage data such as IP address, browser type, and pages visited, collected via cookies and analytics tools to
      enhance website performance and user experience.
    • Communications data including messages, feedback, or support requests.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We use personal information to:
    • Respond to inquiries, provide proposals, and manage client relationships.
    • Deliver engineering, design, documentation, and analysis services that you request from us.
    • Improve our offerings, website content, and user experience.
    • Send relevant updates, service announcements, or marketing communications (you may opt out at any time).
    • Maintain security, detect fraud, and comply with legal or regulatory obligations.`,
  },
  {
    title: '4. Legal Bases for Processing',
    body: `We process personal information under one or more of the following legal bases:
    • Your consent, when you provide information through our forms or communications.
    • Contractual necessity, when processing is required to deliver requested services or proposals.
    • Legitimate interests, such as improving services, marketing, or ensuring network and information security.
    • Compliance with applicable legal obligations.`,
  },
  {
    title: '5. Information Sharing and Disclosure',
    body: `We do not sell personal information. We may share information with:
    • Trusted service providers who support our operations (such as hosting, analytics, or communication tools),
      bound by confidentiality and data protection obligations.
    • Professional advisors, insurers, or auditors under confidentiality agreements.
    • Authorities or regulators when required by law, regulation, or legal process.
    • Prospective buyers or investors in connection with a business transaction, subject to appropriate safeguards.`,
  },
  {
    title: '6. Cookies and Similar Technologies',
    body: `Our website may use cookies and similar tracking technologies to remember preferences, analyze traffic,
    and tailor content. You can manage cookie preferences through your browser settings. Disabling cookies may affect
    the availability of certain website features.`,
  },
  {
    title: '7. International Data Transfers',
    body: `Blitz India Engineering operates from Pune, India and may store or process information in other
    jurisdictions depending on service providers. We take reasonable steps to ensure that international transfers
    comply with applicable laws and that your information is protected through contractual and technical safeguards.`,
  },
  {
    title: '8. Data Retention',
    body: `We retain personal information for as long as necessary to fulfill the purposes described in this policy,
    meet legal obligations, resolve disputes, and enforce agreements. When data is no longer needed, we will securely
    delete or anonymize it.`,
  },
  {
    title: '9. Your Rights and Choices',
    body: `Depending on your jurisdiction, you may have rights to access, correct, update, or delete your personal
    information, object to or restrict processing, and withdraw consent. To exercise these rights, please contact us
    using the details below. We will respond within a reasonable timeframe in accordance with applicable law.`,
  },
  {
    title: '10. Data Security',
    body: `We implement physical, technical, and administrative safeguards to protect personal information against
    unauthorized access, alteration, disclosure, or destruction. While we strive to protect your data, no transmission
    or storage system can be guaranteed as completely secure.`,
  },
  {
    title: '11. Third-Party Links',
    body: `Our website may contain links to third-party websites or services. We are not responsible for the privacy
    practices or content of those third parties. We encourage you to review their privacy policies before providing
    personal information.`,
  },
  {
    title: '12. Updates to this Privacy Policy',
    body: `We may update this policy periodically to reflect operational changes, legal requirements, or industry
    best practices. The "Last Updated" date below indicates the most recent revision. Continued use of our services
    after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '13. Contact Us',
    body: `For questions, requests, or concerns about this Privacy Policy or our data practices, please contact us at:
    Blitz India Engineering
    Email: info@blitzindiaengineering.com
    Phone: +91-91585-75785
    Address: Pune, Maharashtra, India`,
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12">
          <header className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold mb-2">
              Legal
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
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

export default PrivacyPolicy;

