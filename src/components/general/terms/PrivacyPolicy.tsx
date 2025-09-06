"use client";

import React, { useState } from "react";
import {
  Shield,
  Eye,
  Database,
  Lock,
  Users,
  Globe,
  FileText,
  Settings,
  AlertCircle,
  Phone,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const sections = [
    { id: "intro", title: "Your Privacy Matters", icon: Shield },
    { id: "info-collect", title: "Information We Collect", icon: Database },
    { id: "use-info", title: "How We Use Your Information", icon: Eye },
    { id: "sharing", title: "Information Sharing & Disclosure", icon: Users },
    { id: "security", title: "Data Security & Protection", icon: Lock },
    { id: "rights", title: "Your Rights & Choices", icon: Settings },
    { id: "cookies", title: "Cookies & Tracking Technologies", icon: Globe },
    { id: "retention", title: "Data Retention & International Transfers", icon: FileText },
    { id: "updates", title: "Policy Updates & Contact Information", icon: AlertCircle },
  ];

  const Section = ({
    id,
    title,
    icon: Icon,
    children,
  }: {
    id: string;
    title: string;
    icon: React.ComponentType;
    children: React.ReactNode;
  }) => {
    return (
      <div
        id={id}
        className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden scroll-mt-24"
      >
        <div className="px-6 py-4 flex items-center space-x-3 border-b border-gray-200 bg-gray-50">
          <Icon />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="px-6 py-6 text-gray-600 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    );
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -20;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 rounded-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Synkora</p>
          <div className="mt-6 space-y-2 text-sm opacity-80">
            <p>Last Updated: August 31, 2025</p>
            <p>Effective Date: September 1, 2025</p>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row gap-8">
        {/* Table of Contents */}
        <div className="hidden sm:block w-full sm:w-1/4 sticky top-24 h-fit bg-white rounded-lg border border-gray-200 shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b border-gray-200 pb-2 text-gray-800">
            Table of Contents
          </h2>
          <ul className="space-y-2 text-sm mt-3">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleScrollTo(section.id)}
                  className="text-gray-600 hover:text-green-600 transition-colors text-left w-full"
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy Sections */}
        <div className="w-full sm:w-3/4 space-y-10">
          <Section id="intro" title="Your Privacy Matters" icon={Shield}>
            <p>
              At Synkora Technologies, we are committed to protecting your
              privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform.
            </p>
            <p>
              By using Synkora, you consent to the data practices described in
              this policy. We encourage you to read this policy carefully and
              contact us if you have any questions.
            </p>
          </Section>

          <Section id="info-collect" title="Information We Collect" icon={Database}>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal Information: Name, email, contact info, payment info</li>
              <li>Project Data: Content you create, upload, or share</li>
              <li>Usage Information: Log data, IP, device, browser, interactions</li>
            </ul>
          </Section>

          <Section id="use-info" title="How We Use Your Information" icon={Eye}>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide and improve our services</li>
              <li>Communication & notifications</li>
              <li>Security and fraud prevention</li>
              <li>Analytics & service improvements</li>
              <li>Legal compliance</li>
            </ul>
          </Section>

          <Section id="sharing" title="Information Sharing & Disclosure" icon={Users}>
            <ul className="list-disc list-inside space-y-2">
              <li>With Your Consent</li>
              <li>Trusted Service Providers</li>
              <li>Legal Requirements</li>
              <li>Business Transfers</li>
            </ul>
          </Section>

          <Section id="security" title="Data Security & Protection" icon={Lock}>
            <ul className="list-disc list-inside space-y-2">
              <li>Encryption in transit and at rest</li>
              <li>Access controls</li>
              <li>Regular audits</li>
              <li>Backup & recovery</li>
            </ul>
          </Section>

          <Section id="rights" title="Your Rights & Choices" icon={Settings}>
            <ul className="list-disc list-inside space-y-2">
              <li>Access & correction</li>
              <li>Data portability</li>
              <li>Deletion requests</li>
              <li>Communication preferences</li>
            </ul>
          </Section>

          <Section id="cookies" title="Cookies & Tracking Technologies" icon={Globe}>
            <ul className="list-disc list-inside space-y-2">
              <li>Essential Cookies</li>
              <li>Functional Cookies</li>
              <li>Analytics Cookies</li>
            </ul>
          </Section>

          <Section
            id="retention"
            title="Data Retention & International Transfers"
            icon={FileText}
          >
            <ul className="list-disc list-inside space-y-2">
              <li>Data Retention as long as account is active</li>
              <li>International Transfers with safeguards</li>
              <li>Children's Privacy (not for under 16)</li>
            </ul>
          </Section>

          <Section
            id="updates"
            title="Policy Updates & Contact Information"
            icon={AlertCircle}
          >
            <p>Policy may be updated; continued use indicates acceptance.</p>
            <p>Contact privacy team for questions or rights requests.</p>
          </Section>
        </div>
      </div>

      {/* Acceptance Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Privacy Policy Acknowledgment
          </h3>
          <div className="flex items-start space-x-3 mb-6">
            <input
              type="checkbox"
              id="accept-privacy"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              className="mt-1 w-4 h-4 text-green-700 rounded focus:ring-green-600"
            />
            <label
              htmlFor="accept-privacy"
              className="text-gray-600 leading-relaxed"
            >
              I have read and understood this Privacy Policy. I acknowledge
              how Synkora collects, uses, and protects my personal information.
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={!acceptedPolicy}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${acceptedPolicy
                  ? "bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-800 hover:to-green-700 shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Accept Privacy Policy
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold hover:border-gray-400 hover:text-gray-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <Phone className="w-5 h-5" />
            <h3 className="text-xl font-bold">Privacy Questions or Concerns?</h3>
          </div>
          <p className="opacity-90 mb-4">
            Our privacy team is here to help. Contact us for questions or privacy concerns.
          </p>
          <p className="text-sm opacity-80">Email: privacy@synkora.com</p>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: August 31, 2025 • Effective: September 1, 2025</p>
          <p className="mt-2">
            This policy complies with GDPR, CCPA, and other applicable privacy regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
