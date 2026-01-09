// app/returns/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { settingsAPI } from '@/lib/settings-api';
import { PublicSettings } from '@/types/settings';

export default function ReturnsPage() {
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

  const contactEmail = settings?.contactEmail || 'support@example.com';
  const contactNumber = settings?.contactNumber || '+1 (555) 123-4567';

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact our customer service within 30 days of delivery to request a return authorization.',
    },
    {
      step: 2,
      title: 'Package Item',
      description: 'Package the item securely in its original packaging with all accessories and documentation.',
    },
    {
      step: 3,
      title: 'Ship Return',
      description: 'Ship the item back to us using a trackable shipping method. Return shipping is customer\'s responsibility.',
    },
    {
      step: 4,
      title: 'Receive Refund',
      description: 'Once we receive and inspect the item, we\'ll process your refund within 5-10 business days.',
    }
  ];

  const nonReturnableItems = [
    'Personalized or customized items',
    'Downloadable software products',
    'Gift cards',
    'Intimate apparel (for hygiene reasons)',
    'Items damaged due to misuse or improper care',
    'Final sale items (clearly marked as such)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
  

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Here&apos;s everything you need to know about returns and refunds.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Return Process Steps */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-gray-700 mr-3 rounded-full"></div>
              Our Return Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step) => (
                <div key={step.step} className="border border-gray-200 rounded-xl p-6 hover:border-gray-700 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Return Conditions */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-gray-700 mr-3 rounded-full"></div>
              Return Conditions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Timeframe</h3>
                <p className="text-gray-700">
                  You have <strong className="text-gray-800">30 days from the delivery date</strong> to initiate a return. 
                  Items must be in new, unused condition with all original packaging and tags.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Condition Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Items must be unworn, unused, and unwashed',
                    'Original packaging must be intact',
                    'All tags and labels must be attached',
                    'Accessories and documentation must be included'
                  ].map((requirement, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium shadow text-sm text-center"
                    >
                      {requirement}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Costs</h3>
                <p className="text-gray-700">
                  Return shipping costs are the responsibility of the customer, unless the return is due 
                  to our error (wrong item shipped, defective item, etc.).
                </p>
              </div>
            </div>
          </section>

          {/* Non-Returnable Items */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-gray-700 mr-3 rounded-full"></div>
              Non-Returnable Items
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-6">
                The following items cannot be returned unless they are defective or we made an error:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nonReturnableItems.map((item, index) => (
                  <div 
                    key={item} 
                    className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium shadow text-sm text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Defective Items */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-gray-700 mr-3 rounded-full"></div>
              Defective or Damaged Items
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Important Note</h3>
                <p className="text-gray-700">
                  If you receive a defective or damaged item, please contact us immediately. 
                  We will arrange for a replacement or refund, and cover all return shipping costs.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-gray-700 mr-3 rounded-full"></div>
              Refund Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Processing Time</h3>
                <p className="text-gray-700 mb-3">
                  Once we receive your return, our team will inspect the item. If approved, refunds will be 
                  processed within <strong className="text-gray-800">5-10 business days</strong>. The refund will be issued to your original 
                  payment method.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-gray-700">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> It may take additional time for the refund to appear on your 
                    credit card statement, depending on your bank&apos;s processing time.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Amount</h3>
                <p className="text-gray-700">
                  You will receive a full refund for the item price, minus any shipping costs. 
                  Original shipping fees are non-refundable.
                </p>
                <div className="mt-4 p-3 bg-gray-700 text-white rounded-md text-center font-medium">
                  Refund Amount = Item Price - Shipping Costs
                </div>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-gray-700 mr-3 rounded-full"></div>
              Exchange Policy
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700">
                We currently do not offer direct exchanges. To exchange an item, please return 
                the original item for a refund and place a new order for the desired item.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-gray-700 mr-3 rounded-full"></div>
              Need to Initiate a Return?
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-6">
                To start a return, please contact our customer service team with your order number 
                and the reason for return. We&apos;ll guide you through the process.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-gray-700">
                    <span className="text-sm font-medium block mb-1">Email:</span>
                    <span className="text-sm">{contactEmail}</span>
                  </div>
                  <div className="text-gray-700">
                    <span className="text-sm font-medium block mb-1">Phone:</span>
                    <span className="text-sm">{contactNumber}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/contact"
                    className="bg-gray-700 text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium shadow hover:shadow-lg text-center text-sm"
                  >
                    Contact Us Now
                  </Link>
                  <Link
                    href="/faq"
                    className="bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-50 transition-all duration-200 font-medium shadow text-center text-sm"
                  >
                    Read Our FAQ
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Back Button */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 hover:shadow-lg text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}