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


 
  const contactEmail = settings?.contactEmail || 'support@fashionandfancy.com';
  const contactNumber = settings?.contactNumber || '+91 7200074221';

  const shippingInfo = {
    domestic: {
      standard: {
        delivery: '5-7 business days',
        cost: '₹99',
        freeThreshold: 'Orders above ₹999'
      },
      express: {
        delivery: '2-3 business days',
        cost: '₹199',
        freeThreshold: 'Orders above ₹1999'
      }
    },
    international: {
      standard: {
        delivery: '10-15 business days',
        cost: 'Based on destination',
        freeThreshold: 'Not available'
      }
    },
    processingTime: '1-2 business days',
    tracking: 'Available for all orders',
    shippingPartners: ['Delhivery', 'Blue Dart', 'DTDC', 'FedEx']
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}


        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about our shipping policies, delivery times, and tracking information
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Processing Time */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Order Processing Time
            </h2>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <p className="text-gray-700">
                All orders are processed within <strong>{shippingInfo.processingTime}</strong> after payment confirmation. Orders placed on weekends or holidays will be processed on the next business day.
              </p>
            </div>
          </section>

          {/* Shipping Methods */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Shipping Methods & Rates
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Domestic Standard */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-[#D4AF37] transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Standard Shipping</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Delivery:</span> {shippingInfo.domestic.standard.delivery}</p>
                  <p><span className="font-medium">Cost:</span> {shippingInfo.domestic.standard.cost}</p>
                  <p><span className="font-medium">Free Shipping:</span> {shippingInfo.domestic.standard.freeThreshold}</p>
                </div>
              </div>

              {/* Express Shipping */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-[#D4AF37] transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Express Shipping</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Delivery:</span> {shippingInfo.domestic.express.delivery}</p>
                  <p><span className="font-medium">Cost:</span> {shippingInfo.domestic.express.cost}</p>
                  <p><span className="font-medium">Free Shipping:</span> {shippingInfo.domestic.express.freeThreshold}</p>
                </div>
              </div>
            </div>

            {/* International Shipping */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">International Shipping</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Delivery:</span> {shippingInfo.international.standard.delivery}</p>
                <p><span className="font-medium">Cost:</span> {shippingInfo.international.standard.cost}</p>
                <p className="text-sm text-gray-600">International shipping costs vary by destination. You&apos;ll see the exact shipping cost at checkout.</p>
              </div>
            </div>
          </section>

 

          {/* Contact for Support */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-[#D4AF37] mr-3 rounded-full"></div>
              Need Help with Shipping?
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                If you have any questions about shipping or need assistance with your order, please contact our customer service team.
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