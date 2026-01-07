'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { settingsAPI } from '@/lib/settings-api';
import { PublicSettings } from '@/types/settings';

export default function PrivacyPolicy() {
  const [settings, setSettings] = useState<PublicSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.getPublicSettings();
        if (response.success && response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);


  const companyName = settings?.siteName || 'Sastika Fashion and Fancy';
  const contactEmail = settings?.contactEmail || 'privacy@fashionandfancy.com';
  const contactNumber = settings?.contactNumber || '+91 7200074221';
  const companyAddress = settings?.companyAddress || '';

  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">


        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Introduction
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Welcome to {companyName} (&rdquo;we,&rdquo; &rdquo;our,&rdquo; or &rdquo;us&rdquo;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at {contactEmail}.
              </p>
              <p>
                This Privacy Policy applies to all information collected through our website (https://sastikafashionandfancy.com), and/or any related services, sales, marketing or events (we refer to them collectively in this Privacy Policy as the &rdquo;Services&rdquo;).
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="font-medium text-gray-800">
                  Please read this privacy policy carefully as it will help you understand what we do with the information that we collect.
                </p>
              </div>
            </div>
          </section>

          {/* What Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              What Information We Collect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>Name and contact details (email, phone number)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>Shipping and billing addresses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>Payment information (processed securely)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>Account credentials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Automated Information</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>Device and browser information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>IP address and location data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>Cookies and usage data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>Pages visited and time spent</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              How We Use Your Information
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We use the information we collect in various ways, including to:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Process and fulfill your orders</span>
                </div>
                
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Provide customer support</span>
                </div>
                
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  </svg>
                  <span>Improve our website and services</span>
                </div>
                
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Send marketing communications (with consent)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Data Sharing and Disclosure
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We may share your information in the following situations:
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        With Whom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        Service Providers
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Payment processing, shipping, and email services
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        Business Transfers
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        In connection with merger or sale of company assets
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        Legal Requirements
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        To comply with applicable laws and regulations
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Data Security
            </h2>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-start">
                <svg className="w-8 h-8 text-green-600 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">We Protect Your Data</h3>
                  <p className="text-gray-700">
                    We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Privacy Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Your Privacy Rights
            </h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">You have the right to:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#D4AF37] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Access your personal data</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#D4AF37] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Correct inaccurate data</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#D4AF37] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Request deletion of your data</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#D4AF37] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Object to data processing</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700">
                To exercise these rights, please contact us using the contact details provided below.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Cookies and Tracking Technologies
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800 mb-2">Types of cookies we use:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences</li>
                  <li><strong>Advertising Cookies:</strong> Deliver relevant advertisements</li>
                </ul>
              </div>
              
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Contact Us
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>
              
              <div className="space-y-4">
                {companyAddress && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-700">{companyAddress}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-700">{contactEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-700">{contactNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <div className="bg-[#D4AF37] bg-opacity-10 p-6 rounded-xl border border-[#D4AF37] border-opacity-30">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Updates to This Policy</h3>
                <p className="text-gray-700">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &rdquo;Last updated&rdquo; date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#D4AF37] text-white font-medium rounded-lg hover:bg-yellow-600 transition-all duration-200 hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}