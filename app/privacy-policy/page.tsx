import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-[12vh] px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <p className="mb-4">Last Updated: April 8, 2025</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Slack Reserver. We respect your privacy and are committed to protecting your personal data.
          This privacy policy will inform you about how we look after your personal data when you visit our website
          and tell you about your privacy rights and how the law protects you.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Data We Collect</h2>
        <p className="mb-4">We may collect, use, store, and transfer different kinds of personal data about you as follows:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Identity Data:</strong> Includes name, username, Google account ID</li>
          <li><strong>Contact Data:</strong> Includes email address</li>
          <li><strong>Profile Data:</strong> Includes your profile image provided by Google</li>
          <li><strong>Technical Data:</strong> Includes Time zone setting, for customized reserving times</li>
          <li><strong>Usage Data:</strong> Includes information about how you use our website and services</li>
          <li><strong>Slack Workspace Data:</strong> Includes workspace name, data given in commands, workspace ID and slack names.</li>
          <li><strong>Subscription Data:</strong> Includes details about your subscription plan and payment status</li>
          <li><strong>Reservation Data:</strong> Includes details about resources you've reserved</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. How We Collect Your Data</h2>
        <p className="mb-4">We collect data through:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Direct interactions with our website and services</li>
          <li>Google authentication when you sign in</li>
          <li>Slack workspace integration</li>
          <li>Automated technologies or interactions (cookies, server logs)</li>
          <li>Third parties (Stripe for payment processing)</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. How We Use Your Data</h2>
        <p className="mb-4">We use your data for the following purposes:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>To register you as a new customer</li>
          <li>To process and deliver your service requests</li>
          <li>To manage our relationship with you</li>
          <li>To enable you to participate in features of our service</li>
          <li>To administer and protect our business and website</li>
          <li>To deliver relevant content and advertisements to you</li>
          <li>To use data analytics to improve our website, services, marketing, and user experience</li>
          <li>To integrate with Slack for resource reservation</li>
          <li>To process payments and subscriptions</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. Data Sharing</h2>
        <p className="mb-4">We may share your personal information with:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Service Providers:</strong> Including Stripe for payment processing and Google for authentication</li>
          <li><strong>Slack:</strong> To integrate with your workspace for resource reservation</li>
          <li><strong>Professional Advisers:</strong> Including lawyers, bankers, auditors, and insurers</li>
          <li><strong>Authorities:</strong> When required by law or to protect our rights</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
        <p className="mb-4">
          We have implemented appropriate security measures to prevent your personal data from being accidentally lost,
          used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents,
          contractors, and other third parties who have a business need to know.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
        <p className="mb-4">
          We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for,
          including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">8. Your Legal Rights</h2>
        <p className="mb-4">Under certain circumstances, you have rights under data protection laws including:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Access:</strong> Request access to your personal data</li>
          <li><strong>Correction:</strong> Request correction of your personal data</li>
          <li><strong>Erasure:</strong> Request erasure of your personal data</li>
          <li><strong>Objection:</strong> Object to processing of your personal data</li>
          <li><strong>Restriction:</strong> Request restriction of processing your personal data</li>
          <li><strong>Transfer:</strong> Request transfer of your personal data</li>
          <li><strong>Withdraw consent:</strong> Withdraw consent where we rely on consent to process your personal data</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">9. Cookies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information.
          Cookies are files with small amounts of data which may include an anonymous unique identifier. You can instruct
          your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date at the top of this policy.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="font-medium">info@slackreserver.com</p>
      </section>
    </div>
  );
}