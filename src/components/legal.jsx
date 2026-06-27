// Revly — Legal pages (Privacy, Terms) · plain black-on-white, Bricolage Grotesque
import React from 'react';
import { Navbar, Footer } from './components.jsx';

function LegalPage({ title, updated, sections }) {
  return (
    <>
      <Navbar />
      <main style={{ background: "#fff", fontFamily: "'Bricolage Grotesque', sans-serif", color: "#121212" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.9rem)", letterSpacing: "-0.02em", lineHeight: 1.08, margin: 0 }}>{title}</h1>
        <p style={{ margin: "0.9rem 0 0", fontSize: "0.95rem", fontWeight: 500, color: "#6b6b6b" }}>Last updated: {updated}</p>
        <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "2.6rem" }}>
          {sections.map((s, i) =>
          <section key={i}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.01em", margin: "0 0 0.85rem" }}>{s.n}. {s.h}</h2>
              {s.body.map((b, j) => {
              if (Array.isArray(b)) {
                return (
                  <ul key={j} style={{ margin: "0.6rem 0 0", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {b.map((li, k) =>
                    <li key={k} style={{ fontSize: "1.02rem", lineHeight: 1.6, fontWeight: 400 }}>{li}</li>
                    )}
                    </ul>);
              }
              if (b && b.lead) {
                return <p key={j} style={{ margin: j ? "1.1rem 0 0" : 0, fontSize: "1.02rem", lineHeight: 1.65, fontWeight: 600 }}>{b.lead}</p>;
              }
              return <p key={j} style={{ margin: j ? "1.1rem 0 0" : 0, fontSize: "1.02rem", lineHeight: 1.7, fontWeight: 400 }}>{b}</p>;
            })}
            </section>
          )}
        </div>
        </div>
      </main>
      <Footer />
    </>);
}

export function Terms() {
  const sections = [
  { n: 1, h: "Acceptance of Terms", body: ["By accessing or using Revly's website (revly.io) and platform (app.revly.io), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."] },
  { n: 2, h: "Description of Service", body: ["Revly is a review management platform that helps businesses collect, monitor, and respond to customer reviews across multiple platforms. Our services include review collection via smart links, AI-enhanced review generation, multi-platform review monitoring, and review response management."] },
  { n: 3, h: "Account Registration", body: ["To use our services, you must create an account. You agree to:", ["Provide accurate and complete registration information", "Maintain the security of your account credentials", "Notify us immediately of any unauthorized access", "Accept responsibility for all activity under your account"]] },
  { n: 4, h: "Acceptable Use", body: ["You agree not to use Revly to:", ["Generate fake, misleading, or fraudulent reviews", "Violate the terms of service of any third-party review platform", "Harass, abuse, or harm other users or reviewers", "Attempt to manipulate or game review platform algorithms", "Collect personal data of reviewers for unauthorized purposes", "Use the service for any unlawful purpose"]] },
  { n: 5, h: "AI-Generated Content", body: ["Revly uses artificial intelligence to enhance customer feedback into review drafts. These AI-generated drafts are suggestions only. Customers always have the opportunity to review, edit, and approve content before posting. You acknowledge that AI-generated content may not always be perfectly accurate and that final review content is the responsibility of the person who posts it."] },
  { n: 6, h: "Third-Party Platforms", body: ["Revly integrates with third-party review platforms (including Shopify, G2, QuickBooks, WordPress, Xero, and WooCommerce). Your use of these platforms is subject to their respective terms of service. We are not responsible for the availability, accuracy, or policies of third-party platforms."] },
  { n: 7, h: "Pricing & Payment", body: ["Revly offers both free and paid subscription plans. Pricing details are available on our pricing page. Paid plans are billed monthly or annually through Stripe. We reserve the right to modify pricing with at least 30 days' notice to existing subscribers."] },
  { n: 8, h: "Intellectual Property", body: ["The Revly platform, including its design, code, features, and documentation, is owned by Revly and protected by intellectual property laws. You retain ownership of the data you upload to Revly. By using our services, you grant us a limited license to process your data as needed to provide our services."] },
  { n: 9, h: "Data & Privacy", body: ["Your use of Revly is also governed by our Privacy Policy, which describes how we collect, use, and protect your data."] },
  { n: 10, h: "Limitation of Liability", body: ["Revly is provided \"as is\" without warranties of any kind. To the maximum extent permitted by law, Revly shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of our services."] },
  { n: 11, h: "Termination", body: ["Either party may terminate this agreement at any time. You may delete your account through the platform or by contacting us. We may suspend or terminate your account if you violate these terms. Upon termination, your right to use the service ceases immediately."] },
  { n: 12, h: "Changes to Terms", body: ["We may update these Terms of Service from time to time. We will notify users of material changes by email or through the platform. Continued use of Revly after changes take effect constitutes acceptance of the updated terms."] },
  { n: 13, h: "Contact Us", body: ["If you have questions about these Terms of Service, please contact us at hello@revly.io."] }];

  return <LegalPage title="Terms of Service" updated="February 7, 2026" sections={sections} />;
}

export function Privacy() {
  const sections = [
  { n: 1, h: "Introduction", body: ["Revly (\"we,\" \"our,\" or \"us\") operates the Revly platform at revly.io and app.revly.io. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services."] },
  { n: 2, h: "Information We Collect", body: [
  "Account Information: When you create an account, we collect your name, email address, and password.",
  "Product & Review Data: We collect information about the products you add to Revly and the reviews we monitor or collect on your behalf, including review content, ratings, reviewer names, and platform metadata.",
  "Usage Data: We automatically collect information about how you interact with our services, including pages visited, features used, and device/browser information.",
  "Cookies: We use essential cookies to keep you logged in and functional cookies to remember your preferences. We do not use third-party advertising cookies."] },
  { n: 3, h: "How We Use Your Information", body: ["We use the information we collect to:", ["Provide, maintain, and improve our services", "Monitor and aggregate reviews from third-party platforms on your behalf", "Generate AI-enhanced review drafts from customer feedback", "Send you notifications about new reviews and platform activity", "Respond to your support requests", "Protect against fraud and abuse"]] },
  { n: 4, h: "How We Share Your Information", body: ["We do not sell your personal information. We may share information with:", ["Service Providers: Third-party services that help us operate our platform (e.g., hosting, AI processing, email delivery)", "Legal Requirements: When required by law, subpoena, or legal process", "Business Transfers: In connection with a merger, acquisition, or sale of assets"]] },
  { n: 5, h: "Data Security", body: ["We implement industry-standard security measures to protect your data, including encryption in transit (TLS), secure cloud infrastructure (AWS), and access controls. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security."] },
  { n: 6, h: "Data Retention", body: ["We retain your account information and review data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal purposes."] },
  { n: 7, h: "Your Rights", body: ["Depending on your location, you may have the right to:", ["Access the personal data we hold about you", "Request correction of inaccurate data", "Request deletion of your data", "Export your data in a portable format", "Opt out of marketing communications"], "To exercise these rights, contact us at hello@revly.io."] },
  { n: 8, h: "Third-Party Platforms", body: ["Our service interacts with third-party review platforms (Shopify, G2, QuickBooks, WordPress, Xero, WooCommerce, and others). Review data collected from these platforms is subject to their respective terms of service and privacy policies. We access only publicly available review information."] },
  { n: 9, h: "Children's Privacy", body: ["Our services are not directed to individuals under 18. We do not knowingly collect personal information from children."] },
  { n: 10, h: "Changes to This Policy", body: ["We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the \"Last updated\" date."] },
  { n: 11, h: "Contact Us", body: ["If you have questions about this Privacy Policy, please contact us at hello@revly.io."] }];

  return <LegalPage title="Privacy Policy" updated="February 7, 2026" sections={sections} />;
}
