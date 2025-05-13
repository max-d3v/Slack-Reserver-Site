import React from 'react';
import { CONSTANTS } from '@/lib/constants';
const CONTACT_EMAIL = CONSTANTS.CONTACT_EMAIL;


export default function TermsOfService() {
  return (
    <div className="container mx-auto py-[12vh] px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <p className="mb-4">Last Updated: April 8, 2025</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using the Slack Reserver service, you agree to be bound by these Terms of Service ("Terms"). 
          If you disagree with any part of these terms, you may not access or use the service.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
        <p className="mb-4">
          Slack Reserver is a resource reservation platform that integrates with Slack workspaces to allow users to reserve 
          resources within their organization. Our service provides tools for managing resource allocation, scheduling, and tracking.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Registration and Account</h2>
        <p className="mb-4">
          To use our service, you must create an account using Google authentication. You are responsible for:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Maintaining the confidentiality of your account</li>
          <li>Restricting access to your account</li>
          <li>All activities that occur under your account</li>
          <li>Ensuring that all account information you provide is accurate and current</li>
        </ul>
        <p className="mb-4">
          You must immediately notify us of any unauthorized use of your account or any other breach of security.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. Subscription and Payments</h2>
        <p className="mb-4">
          Our service is provided on a subscription basis. By subscribing to our service, you agree to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Pay all fees associated with your subscription plan</li>
          <li>Provide current, complete, and accurate billing information</li>
          <li>Allow automatic renewal of your subscription unless canceled before the renewal date</li>
          <li>Accept that subscription fees are non-refundable except as required by law or as explicitly stated in these Terms</li>
        </ul>
        <p className="mb-4">
          We reserve the right to change subscription fees upon reasonable notice. Any changes to the fee structure will be 
          communicated to you in advance and will apply to the next billing cycle.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. Free Trial</h2>
        <p className="mb-4">
          We may offer a free trial period for our service. At the end of the trial period, your account will automatically 
          convert to a paid subscription unless you cancel before the trial ends. You are required to provide your payment 
          information when registering for the free trial.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. Slack Integration</h2>
        <p className="mb-4">
          Our service integrates with Slack. By using our service, you authorize us to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Connect to your Slack workspace</li>
          <li>Access workspace information required for our service functionality</li>
          <li>Send messages and notifications to your Slack channels related to reservations</li>
          <li>Process commands initiated through Slack</li>
        </ul>
        <p className="mb-4">
          You acknowledge that your use of Slack is subject to Slack's own terms of service and privacy policy.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">7. User Conduct and Prohibited Activities</h2>
        <p className="mb-4">
          You agree not to use the Service to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Violate any laws or regulations</li>
          <li>Infringe upon the rights of others</li>
          <li>Send spam or unsolicited messages</li>
          <li>Upload or transmit viruses, malware, or other malicious code</li>
          <li>Attempt to gain unauthorized access to our service or systems</li>
          <li>Interfere with or disrupt the integrity or performance of the Service</li>
          <li>Harass or harm other users</li>
          <li>Impersonate any person or entity</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">8. Intellectual Property Rights</h2>
        <p className="mb-4">
          Slack Reserver and its original content, features, and functionality are owned by us and are protected by international 
          copyright, trademark, patent, trade secret, and other intellectual property laws. You may not modify, reproduce, distribute, 
          create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our materials, 
          except as allowed by the Service's normal functionality.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">9. Data and Content</h2>
        <p className="mb-4">
          You retain all ownership rights to any data you submit to the Service. By submitting data to our service, you grant us 
          a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such data solely for the purposes of 
          providing and improving the Service. We will handle your data in accordance with our Privacy Policy.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">10. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for 
          any reason, including but not limited to a breach of these Terms. Upon termination, your right to use the Service will 
          immediately cease. All provisions of the Terms which by their nature should survive termination shall survive, including 
          ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">11. Disclaimers and Limitations</h2>
        <p className="mb-4">
          The Service is provided on an "as is" and "as available" basis without any warranties of any kind. We do not warrant 
          that the Service will be uninterrupted, timely, secure, or error-free. In no event shall we be liable for any indirect, 
          incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, 
          goodwill, or other intangible losses resulting from your use of or inability to use the Service.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">12. Indemnification</h2>
        <p className="mb-4">
          You agree to defend, indemnify, and hold harmless Slack Reserver and its officers, directors, employees, and agents from 
          and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney fees 
          and costs, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, 
          or your violation of any third-party rights.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">13. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of Brazil, without regard to its conflict of 
          law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">14. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 
          30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">15. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="font-medium">{CONTACT_EMAIL}</p>
      </section>
    </div>
  );
}