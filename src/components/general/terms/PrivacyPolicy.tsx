"use client";

import React, { useState } from 'react';
import { Shield, Eye, Database, Lock, Users, Globe, FileText, Settings, AlertCircle, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const Section = ({ title, icon: Icon, children }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 flex items-center space-x-3 border-b border-gray-100">
          <Icon className="w-5 h-5 text-green-700" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="px-6 py-6 text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FF' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl opacity-90">Synkora</p>
            <div className="mt-6 space-y-2 text-sm opacity-80">
              <p>Last Updated: August 31, 2025</p>
              <p>Effective Date: September 1, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Privacy Matters</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Synkora Technologies, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our project and task management platform.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By using Synkora, you consent to the data practices described in this policy. We encourage you to read this policy carefully and contact us if you have any questions.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4">
          <Section title="Information We Collect" icon={Database}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Personal Information</h4>
                <p className="mb-3">We collect information that you provide directly to us, including:</p>
                <ul className="space-y-1 text-gray-600 ml-4">
                  <li>• Name, email address, and contact information</li>
                  <li>• Account credentials and profile information</li>
                  <li>• Payment and billing information</li>
                  <li>• Communications with our support team</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Project Data</h4>
                <p>We collect and store the content you create, upload, or share through our platform, including project information, tasks, comments, files, and collaboration data.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Usage Information</h4>
                <p>We automatically collect information about how you interact with our service, including log data, device information, IP addresses, browser type, and usage patterns.</p>
              </div>
            </div>
          </Section>

          <Section title="How We Use Your Information" icon={Eye}>
            <div className="space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Provide and improve our service:</strong> Process your requests, maintain your account, and enhance platform functionality</li>
                <li>• <strong>Communication:</strong> Send service-related notifications, updates, and respond to your inquiries</li>
                <li>• <strong>Security and fraud prevention:</strong> Protect against unauthorized access and maintain service security</li>
                <li>• <strong>Analytics:</strong> Understand usage patterns to improve user experience and develop new features</li>
                <li>• <strong>Legal compliance:</strong> Comply with applicable laws and respond to legal requests</li>
              </ul>
              
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-4">
                <p className="text-green-900 text-sm">
                  <strong>Data Minimization:</strong> We only collect and use information that is necessary for providing our services and improving your experience.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Information Sharing & Disclosure" icon={Users}>
            <div className="space-y-4">
              <p>We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">With Your Consent</h4>
                <p>We share information when you explicitly consent or direct us to do so.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Service Providers</h4>
                <p>We work with trusted third-party service providers who assist in operating our platform, processing payments, or providing customer support. These providers are contractually bound to protect your information.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Legal Requirements</h4>
                <p>We may disclose information when required by law, court order, or to protect our rights, property, or safety, or that of our users or the public.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Business Transfers</h4>
                <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction, with appropriate notice provided.</p>
              </div>
            </div>
          </Section>

          <Section title="Data Security & Protection" icon={Lock}>
            <div className="space-y-4">
              <p>We implement robust security measures to protect your information:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Encryption</h5>
                  <p className="text-sm text-gray-600">Data is encrypted in transit and at rest using industry-standard encryption protocols.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Access Controls</h5>
                  <p className="text-sm text-gray-600">Strict access controls ensure only authorized personnel can access your data.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Regular Audits</h5>
                  <p className="text-sm text-gray-600">We conduct regular security audits and vulnerability assessments.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Backup & Recovery</h5>
                  <p className="text-sm text-gray-600">Secure backup systems ensure data availability and recovery capabilities.</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-800 text-sm">
                  <strong>Important:</strong> While we implement strong security measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Your Rights & Choices" icon={Settings}>
            <div className="space-y-4">
              <p>You have several rights regarding your personal information:</p>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Access & Correction</h4>
                <p>You can access, update, or correct your personal information through your account settings or by contacting us.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Data Portability</h4>
                <p>You can export your data at any time during your subscription or within 30 days after cancellation.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Deletion</h4>
                <p>You can request deletion of your account and associated data. Some information may be retained for legal or legitimate business purposes.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Communication Preferences</h4>
                <p>You can opt out of non-essential communications through your account settings or unsubscribe links in emails.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>EU/UK Users:</strong> If you're located in the EU or UK, you have additional rights under GDPR, including the right to object to processing and file complaints with supervisory authorities.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Cookies & Tracking Technologies" icon={Globe}>
            <div className="space-y-4">
              <p>We use cookies and similar technologies to enhance your experience:</p>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Essential Cookies</h4>
                <p>Required for basic platform functionality, authentication, and security.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Functional Cookies</h4>
                <p>Remember your preferences and settings to provide a personalized experience.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Analytics Cookies</h4>
                <p>Help us understand how users interact with our platform to improve performance and features.</p>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                You can control cookie settings through your browser, but disabling certain cookies may impact platform functionality.
              </p>
            </div>
          </Section>

          <Section title="Data Retention & International Transfers" icon={FileText}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Data Retention</h4>
                <p>We retain your information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain information for legal compliance, dispute resolution, and legitimate business purposes.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">International Transfers</h4>
                <p>Your information may be stored and processed in countries other than your own. We ensure appropriate safeguards are in place when transferring data internationally, including standard contractual clauses and adequacy decisions.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Children's Privacy</h4>
                <p>Our service is not intended for children under 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us.</p>
              </div>
            </div>
          </Section>

          <Section title="Policy Updates & Contact Information" icon={AlertCircle}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Policy Changes</h4>
                <p>We may update this Privacy Policy from time to time. We will notify users of significant changes via email or through our platform. Your continued use of the service after changes constitutes acceptance of the updated policy.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Third-Party Services</h4>
                <p>Our platform may integrate with third-party services (email providers, cloud storage, etc.). This policy does not cover third-party practices. Please review their privacy policies separately.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Data Processing Legal Basis</h4>
                <p>We process your data based on contract performance, legitimate interests, legal compliance, and your consent where required.</p>
              </div>
            </div>
          </Section>
        </div>

        {/* Acknowledgment Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Privacy Policy Acknowledgment</h3>
          <div className="flex items-start space-x-3 mb-6">
            <input
              type="checkbox"
              id="accept-privacy"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              className="mt-1 w-4 h-4 text-green-700 rounded focus:ring-green-600"
            />
            <label htmlFor="accept-privacy" className="text-gray-600 leading-relaxed">
              I have read and understood this Privacy Policy. I acknowledge how Synkora collects, uses, and protects my personal information.
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={!acceptedPolicy}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                acceptedPolicy
                  ? 'bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-800 hover:to-green-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Accept Privacy Policy
            </button>
            
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold hover:border-gray-400 hover:text-gray-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <Phone className="w-5 h-5" />
            <h3 className="text-xl font-bold">Privacy Questions or Concerns?</h3>
          </div>
          <p className="opacity-90 mb-4">
            Our privacy team is here to help. Contact us if you have questions about this policy, want to exercise your rights, or have privacy-related concerns.
          </p>
          <div className="text-sm opacity-80">
            <p>Email:</p>
            
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: August 31, 2025 • Effective: September 1, 2025</p>
          <p className="mt-2">This policy complies with GDPR, CCPA, and other applicable privacy regulations.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;