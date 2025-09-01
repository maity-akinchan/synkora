"use client";
import React, { useState } from 'react';
import { FileText, Shield, Users, CreditCard, AlertTriangle, Scale } from 'lucide-react';

const TermsAndConditions = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const Section = ({ title, icon: Icon, children }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 flex items-center space-x-3 border-b border-gray-100">
          <Icon className="w-5 h-5 text-green-500" />
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
      <div className="bg-gradient-to-r from-green-500 to-green-400 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl opacity-90">Synkora</p>
            <div className="mt-6 space-y-2 text-sm opacity-80">
              <p>Publication Date: July 19, 2021</p>
              <p>Effective Date: September 1, 2021</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Agreement Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            This Synkora Terms of Service ("Agreement") is entered into by and between Synkora Technologies or its affiliate identified in an Order ("Synkora") and the entity or person placing an order for or accessing the Service ("Customer" or "you").
          </p>
          <p className="text-gray-600 leading-relaxed">
            By accepting this Agreement, or by accessing or using the Service, you agree to be legally bound by these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4">
          <Section title="Service Overview" icon={FileText}>
            <p className="mb-4">
              Synkora provides a cloud-based project and task management platform that allows teams to manage projects, assign tasks, collaborate, and track progress in real time. Customers retain sole control over the type and content of all information submitted to the Service.
            </p>
          </Section>

          <Section id="service" title="Service Terms & Permitted Use" icon={Users}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Permitted Use</h4>
                <p>During the subscription term, you may access and use Synkora only for your internal business or personal purposes, in accordance with this Agreement and applicable Documentation.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Users & Administration</h4>
                <p>Only registered Users may access the Service. Each User must keep login credentials secure and confidential. Customers may designate Users as administrators, with rights to manage accounts, roles, and permissions.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Age Requirement</h4>
                <p>You must be at least 16 years old to use the Service.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Registration with Work Email</h4>
                <p>If you register with a corporate or institutional email, you represent that you are authorized to act on behalf of that organization, and your employer or organization may assume control of your account.</p>
              </div>
            </div>
          </Section>

          <Section id="restrictions" title="Usage Restrictions" icon={AlertTriangle}>
            <p className="mb-3">You agree not to:</p>
            <ul className="space-y-2 text-gray-600">
              <li>• Resell, sublicense, or distribute Synkora to third parties</li>
              <li>• Use the Service for illegal or harmful activities</li>
              <li>• Reverse engineer or attempt unauthorized access to Synkora</li>
              <li>• Share user accounts among multiple people</li>
              <li>• Introduce malware, viruses, or malicious code</li>
              <li>• Store or transmit unlawful or infringing content</li>
            </ul>
          </Section>

          <Section id="data" title="Customer Data & Privacy" icon={Shield}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Data Use</h4>
                <p>You grant Synkora the right to store, process, and transmit your data solely for providing the Service.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Security</h4>
                <p>Synkora implements reasonable security measures to protect data.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Data Export</h4>
                <p>Customers may export their data at any time during or within 30 days after subscription termination. After that period, Synkora may delete customer data permanently.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Customer Obligations</h4>
                <p>You are responsible for the accuracy and legality of your content. You may not use Synkora for prohibited data (e.g., sensitive health, financial, or government-restricted data) or for high-risk activities.</p>
              </div>
            </div>
          </Section>

          <Section id="billing" title="Subscription & Billing" icon={CreditCard}>
            <div className="space-y-4">
              <p>Unless otherwise stated, subscriptions renew automatically. Customers must pay fees as agreed. Fees are non-refundable except as required by law or expressly permitted under this Agreement.</p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> Synkora may suspend accounts that violate this Agreement, are overdue on payments, or threaten system security. Access will be restored once issues are resolved.
                </p>
              </div>
            </div>
          </Section>

          <Section id="legal" title="Legal Terms & Liability" icon={Scale}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Warranties & Disclaimers</h4>
                <p>Synkora provides its Service "as is," without warranties of uninterrupted availability, fitness for a particular purpose, or error-free operation.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Limitation of Liability</h4>
                <p>Synkora's liability for any claim is limited to the fees paid by the Customer in the past 12 months. Synkora is not liable for indirect damages such as data loss, downtime, or loss of profits.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Term & Termination</h4>
                <p>This Agreement remains effective until termination. Either party may terminate in case of material breach. Customers may delete their accounts at any time, but fees already paid are non-refundable.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Ownership</h4>
                <p>Customers retain all rights to their data. Synkora retains all rights to its software, technology, and platform.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Confidentiality</h4>
                <p>Each party agrees to keep confidential any proprietary information shared during use of the Service, except as required by law.</p>
              </div>
            </div>
          </Section>

          <Section id="modifications" title="Modifications & Governing Law" icon={FileText}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Agreement Updates</h4>
                <p>Synkora may update this Agreement and will notify Customers of significant changes. Continued use of the Service after updates constitutes acceptance of the new Terms.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Governing Law</h4>
                <p>This Agreement is governed by the laws of [Your Country/State]. Any disputes shall be resolved under the jurisdiction of the courts in [Your City/State].</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Third-Party Platforms</h4>
                <p>Synkora may integrate with third-party platforms (e.g., email, cloud storage). Use of third-party services is governed by their own agreements.</p>
              </div>
            </div>
          </Section>
        </div>

        {/* Acceptance Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Agreement Acceptance</h3>
          <div className="flex items-start space-x-3 mb-6">
            <input
              type="checkbox"
              id="accept-terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <label htmlFor="accept-terms" className="text-gray-600 leading-relaxed">
              I have read, understood, and agree to be bound by these Terms of Service. I acknowledge that this Agreement will govern my use of Synkora's services.
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={!acceptedTerms}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                acceptedTerms
                  ? 'bg-gradient-to-r from-green-500 to-green-400 text-white hover:from-green-600 hover:to-green-500 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Accept Terms & Continue
            </button>
            
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold hover:border-gray-400 hover:text-gray-700 transition-colors">
              Decline
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-green-400 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Questions About These Terms?</h3>
          <p className="opacity-90">
            If you have questions about these Terms of Service, please contact our support team. We're here to help clarify any aspects of this agreement.
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: July 19, 2021 • Effective: September 1, 2021</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;