import React from 'react';
import { CONSTANTS } from '@/lib/constants';
const CONTACT_EMAIL = CONSTANTS.CONTACT_EMAIL;

export default function FAQ() {
    return (
        <div className="container mx-auto py-[12vh] px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

            <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3">General Questions</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">What is Slack Reserver?</h3>
                            <p className="text-gray-700">
                                Slack Reserver is a resource reservation platform that integrates with Slack workspaces,
                                allowing teams to easily book and manage resources like meeting rooms, equipment, and
                                other shared assets directly from Slack.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">How does Slack Reserver work?</h3>
                            <p className="text-gray-700">
                                After connecting your Slack workspace to Slack Reserver, you can add resources that
                                your team needs to reserve. Team members can then make reservations through Slack
                                commands or through our web interface. The system manages availability, prevents
                                conflicts, and sends notifications to keep everyone informed.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">Do I need admin privileges to set up Slack Reserver?</h3>
                            <p className="text-gray-700">
                                Yes, you'll need Slack admin privileges to install the Slack Reserver app in your
                                workspace. After installation, you can assign resource management permissions to
                                specific team members.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3">Subscription & Pricing</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">Is there a free trial available?</h3>
                            <p className="text-gray-700">
                                Yes, we offer a 14-day free trial with full access to all features.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">Can i cancel my plan after the free trial if i didnt like it?</h3>
                            <p className="text-gray-700">
                                Yes, if you cancel your plan before the end of the free trial, you will not be charged.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">How much does Slack Reserver cost?</h3>
                            <p className="text-gray-700">
                                We offer several pricing tiers based on team size and needs. Our Basic plan starts at
                                $5 monthly. Please visit our <a href="/pricing" className="text-blue-600 hover:underline">Pricing page</a> for
                                detailed information on all available plans.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">Can I change my subscription plan later?</h3>
                            <p className="text-gray-700">
                                Yes, you can upgrade or downgrade your subscription at any time. Changes to your
                                subscription will be reflected in your next billing cycle.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3">Technical Questions</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">Is Slack Reserver secure?</h3>
                            <p className="text-gray-700">
                                Yes, security is our top priority. We use industry-standard encryption for all data
                                transfers and storage. We never store Slack messages and only access the permissions
                                needed for resource management. For more details, please review our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">Does slack reserver read any sensitive information of our workspace?</h3>
                            <p className="text-gray-700">
                                No. We only read information crucial to start reservations, read commands (messages starting with "/" that reserver is listening to) and read the workspace name. We do not read any messages or sensitive information from your workspace.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3">Support & Troubleshooting</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">How do I get support if I encounter an issue?</h3>
                            <p className="text-gray-700">
                                You can get in touch with us through our email support for all customers.
                                <br />
                                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>
                            </p>
                        </div>


                        <div>
                            <h3 className="text-lg font-medium text-blue-600 mb-2">Can I request new features?</h3>
                            <p className="text-gray-700">
                                Absolutely! We welcome feature requests from our users. You can submit feature requests
                                through emailing <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
                <p className="text-gray-700 mb-4">
                    If you couldn't find the answer you were looking for, please don't hesitate to reach out to us.
                </p>
                <div className="flex gap-4">
                    <a href="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                        Contact Us
                    </a>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
                        Email Support
                    </a>
                </div>
            </div>
        </div>
    );
}