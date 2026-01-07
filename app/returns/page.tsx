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


 
  const contactEmail = settings?.contactEmail || 'returns@fashionandfancy.com';
  const contactNumber = settings?.contactNumber || '+91 7200074221';

  const returnPolicy = {
    timeframe: '15 days from delivery date',
    conditions: [
      'Item must be unused and in original condition',
      'Original tags must be attached',
      'Original packaging must be intact',
      'Proof of purchase required'
    ],
    nonReturnable: [
      'Personalized or customized items',
      'Gift cards',
      'Intimate apparel',
      'Opened cosmetics'
    ],
    process: [
      'Contact customer service within 15 days',
      'Receive return authorization',
      'Package item securely with original packaging',
      'Ship to our return center',
      'Refund processed within 7-10 business days'
    ],
    refundMethod: 'Original payment method',
    returnShipping: 'Customer pays return shipping unless item is defective or wrong item was shipped'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
      

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hassle-free returns within {returnPolicy.timeframe}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Key Information */}
          <div className="bg-[#D4AF37] bg-opacity-10 p-6 rounded-xl border border-[#D4AF37] border-opacity-30 mb-10">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-[#D4AF37] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Important Information</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Return window: {returnPolicy.timeframe}</li>
                  <li>• Refund method: {returnPolicy.refundMethod}</li>
                  <li>• Return shipping: {returnPolicy.returnShipping}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Conditions */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Return Conditions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Returnable Items */}
              <div className="border border-green-200 bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Returnable Items</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  {returnPolicy.conditions.map((condition, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Non-Returnable Items */}
              <div className="border border-red-200 bg-red-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Non-Returnable Items</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  {returnPolicy.nonReturnable.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Return Process */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Return Process Step by Step
            </h2>
            
            <div className="space-y-6">
              {returnPolicy.process.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-[#D4AF37] text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-semibold">{index + 1}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex-grow">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Refund Timeline */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Refund Timeline
            </h2>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">1-2</div>
                  <p className="text-gray-700">Business days for return processing</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">7-10</div>
                  <p className="text-gray-700">Business days for refund to appear in your account</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">24/7</div>
                  <p className="text-gray-700">Customer support available</p>
                </div>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Exchanges
            </h2>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <p className="text-gray-700 mb-4">
                We currently offer exchanges for size or color variations, subject to availability. To initiate an exchange:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Contact customer service within the return window</li>
                <li>Return the original item following our return process</li>
                <li>Once received, we&apos;ll ship the replacement item</li>
                <li>No additional shipping charges for exchanges (domestic)</li>
              </ol>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Contact Returns Department
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                For returns-related inquiries or assistance with the return process:
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{contactEmail}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#D4AF37] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                  <span>{contactNumber}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Back Button */}
          <div className="text-center">
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