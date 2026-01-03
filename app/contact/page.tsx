import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';

// ✅ SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soapstore.com';
  
  return {
    title: `Contact Us | Customer Support | ${storeName}`,
    description: `Contact ${storeName} for soap inquiries, order support, and customer service. We're here to help with all your organic soap questions.`,
    keywords: ['contact soap', 'customer support', 'soap inquiries', 'order help', storeName],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/contact`,
      title: `Contact Us | ${storeName} Customer Support`,
      description: `Get in touch with ${storeName} for all your organic soap questions and order support.`,
      siteName: storeName,
    },
    twitter: {
      card: 'summary',
      title: `Contact Us | ${storeName}`,
      description: `Contact our support team for soap inquiries and order help.`,
    },
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
  };
}

// ✅ Generate structured data for Contact Page
function generateStructuredData() {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soapstore.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us",
    "description": "Contact page for soap customer support",
    "url": `${siteUrl}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": storeName,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@soap.com",
        "availableLanguage": ["English", "Hindi"],
        "contactOption": "TollFree"
      }
    }
  };
}

export default function ContactPage() {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Have questions about our soaps or services? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          {/* Hidden semantic content for SEO */}
          <div className="sr-only">
            <h2>Contact {storeName} - Soap</h2>
            <p>Get customer support for organic soap purchases, order tracking, and product inquiries.</p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
}