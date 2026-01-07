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
 


  const companyName = settings?.siteName ;
  const contactEmail = settings?.contactEmail ;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">


        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Agreement */}
          <section className="mb-10">
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 mb-6">
              <p className="text-gray-700 text-center font-medium">
                By accessing and using {companyName}s website, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </div>
          </section>

          {/* Terms */}
          <div className="space-y-10">
            {/* Use of Website */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                1. Use of Website
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  This website is provided solely for the purpose of purchasing products from {companyName}. You agree not to use the website for any unlawful purpose or in any way that might harm, damage, or disparage any other party.
                </p>
                <p>
                  You must be at least 18 years old or have the consent of a parent or guardian to use this website and make purchases.
                </p>
              </div>
            </section>

            {/* Products and Pricing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                2. Products and Pricing
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice.
                </p>
                <p>
                  We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
                </p>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                3. Payment Terms
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We accept various payment methods as displayed at checkout. By providing payment information, you represent that you are authorized to use the payment method.
                </p>
                <p>
                  All payments are processed through secure third-party payment processors. We do not store your credit card information on our servers.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                4. Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content included on this site, such as text, graphics, logos, images, and software, is the property of {companyName} or its content suppliers and protected by international copyright laws.
                </p>
                <p>
                  The {companyName} name and logo are trademarks of our company. You may not use these marks without our prior written permission.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                5. Limitation of Liability
              </h2>
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <p className="text-gray-700">
                  To the fullest extent permitted by applicable law, {companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                6. Governing Law
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                7. Changes to Terms
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
                8. Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  Questions about the Terms of Service should be sent to us at:
                </p>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{contactEmail}</span>
                </div>
              </div>
            </section>
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