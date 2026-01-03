// components/home/HomeClient.tsx
'use client';

import { Truck, Shield, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Category } from '@/types/category';
import ProductGrid from '@/components/products/ProductGrid';
import Image from "next/image";
// import Link from 'next/link'; // Added missing import

interface HomeClientProps {
  categories: Category[];
  featuredCategories: Category[];
}

export default function HomeClient({  featuredCategories }: HomeClientProps) {
  const router = useRouter();
  const heroRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const navigateToProducts = () => {
    router.push('/products');
  };

  const faqItems = [
    {
      question: "How can I track my order?",
      answer: "You can track your order from 'My Orders' section. There is a button 'Track Order' in front of each shipped order."
    },
    {
      question: "What is the standard delivery timings?",
      answer: "Normal delivery time is about 5-6 working days. Local Delivery time is 2-3 days."
    },
    {
      question: "Is free delivery available?",
      answer: "Yes, For free delivery minimum order amount should be Rs. 599."
    },
    {
      question: "Is COD available?",
      answer: "Yes, COD is available with extra Rs 35 as Cash Collection And Handling fees."
    },
    {
      question: "Are These soaps New?",
      answer: "Yes, All soaps Are Absolutely New."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Reduced background element size */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gray-100 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Glainic Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[75vh] flex items-center overflow-hidden"
        aria-label="Glainic Soap Hero Section"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
  <Image
    src="/images/g1.png"
    alt="Glainic Natural Skincare"
    fill
    priority
    sizes="100vw"
    className="object-cover object-right-top"
  />

  {/* overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
</div>


          {/* Soft luxury overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl text-center md:text-left">
            {/* Brand */}
            <div className="mb-6">
              <p className="text-white/80 tracking-widest uppercase text-sm">
                GLAINIC™
              </p>
              <p className="italic text-white/90 text-lg mt-1">
                Pure. Gentle. Naturally Beautiful.
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-white leading-tight drop-shadow-2xl">
              <span className="block text-5xl md:text-6xl lg:text-7xl">
                Hold
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic mt-2">
                the Nature
              </span>
            </h1>

            {/* Subline */}
            <p className="mt-6 text-white/90 text-lg md:text-xl max-w-xl">
              Successfully launched.
              <span className="block text-white/70 mt-1 text-base">
                A ritual of nature, crafted for your skin.
              </span>
            </p>

            {/* Buttons */}
            <div className="mt-10 flex gap-4 justify-center md:justify-start">
              <button
                onClick={navigateToProducts}
                className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold shadow-xl transition-transform hover:scale-105"
                aria-label="Explore our organic soap collection"
              >
                Explore
              </button>

              <button
                className="border border-white/60 text-white px-8 py-3 rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 transition"
                aria-label="Learn more about our organic soaps"
                onClick={() => router.push('/about')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      

      {/* Skin-vestment Section */}
      <section className="bg-[#f6f5f2] py-28" aria-label="Our Skin-Vestment Philosophy">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-24">
            {/* LEFT — PAPER WITH MASK */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-[380px] h-[460px]">
                <Image
                  src="/images/s1.png"
                  alt="Our Skin-Vestment - Premium Organic Skincare"
                  className="object-cover rounded-lg shadow-2xl"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
                
                {/* CENTERED TEXT */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white font-serif text-[40px] tracking-wide leading-tight text-center drop-shadow-lg">
                    OUR <br /> SKIN-VESTMENT
                  </h2>
                </div>
              </div>
            </div>

            {/* RIGHT — COPY */}
            <div className="text-center md:text-left">
              <h2 className="font-serif text-[52px] leading-tight text-[#2c2c2c] mb-8">
                Say Hello to Glow
              </h2>

              <p className="text-[#444] text-[18px] leading-[1.9] max-w-xl mx-auto md:mx-0 mb-16">
                Your skin deserves more than a quick fix—it&apos;s a skinvestment
                in lasting beauty. Nourish, protect, and glow with confidence
                every day.
              </p>

              <h3 className="font-serif text-[52px] leading-tight text-[#2c2c2c]">
                For a better you, <br /> today &amp; always
              </h3>
            </div>
          </div>
        </div>
      </section>
        {/* All Categories Section */}
{/* <div className="mt-12">
  <div className="text-center mb-8">
    <h3 className="text-3xl font-bold text-gray-900 mb-4">Browse All Categories</h3>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Discover our complete range of soap categories
    </p>
  </div>
  
  <div className="flex flex-wrap justify-center gap-6 px-4">
    {categories.map((category) => (
      <div key={category._id} className="w-64">
        <Link
          href={`/products?category=${category.slug || category._id}`}
          className="group bg-white backdrop-blur-sm rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden p-6 text-center block h-full"
          aria-label={`Browse ${category.name} soaps`}
          itemScope
          itemType="https://schema.org/ProductCategory"
        >
          <div 
            className="w-16 h-16 bg-gradient-to-br from-[#556B2F]/10 to-[#D9825B]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            itemProp="image"
            aria-hidden="true"
          >
            <svg className="w-8 h-8 text-[#556B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="name">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed" itemProp="description">
            {category.description || `Premium organic ${category.name.toLowerCase()} soaps for healthy skin`}
          </p>
        </Link>
      </div>
    ))}
  </div>
</div> */}

      {/* Explore Soaps Section */}
      <section className="py-8 bg-white" aria-label="Explore Our Organic Soaps">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Explore soaps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated soaps
            </p>
          </div>

          <div className="space-y-8">
            {featuredCategories.map((category, index) => (
              <div 
                key={category._id} 
                className="animate-fade-in-up" 
                style={{ 
                  animationDelay: `${index * 300}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Category Header */}
                <div className="relative flex items-center justify-center mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
                    {category.name}
                  </h3>
                  <button 
                    onClick={() => router.push(`/products?category=${category.slug}`)}
                    className="absolute right-0 inline-flex items-center gap-0.5 sm:gap-1 bg-gray-700 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-md shadow-sm cursor-pointer text-xs sm:text-sm"
                    aria-label={`View more ${category.name} soaps`}
                  >
                    View More
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </div>

                <ProductGrid 
                  category={category._id} 
                  limit={18}
                  hideFilters={true}
                />
              </div>
            ))}
          </div>

        
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-[white] border-t border-gray-200" aria-label="Why Choose Us">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: Truck, 
                color: 'gray',
                title: 'Free Shipping', 
                desc: 'Free delivery on all orders over ₹500. Fast and reliable shipping to your doorstep.',
                highlight: 'No hidden fees'
              },
              { 
                icon: Shield, 
                color: 'gray',
                title: 'Secure Payment', 
                desc: 'Your data is protected with bank-level security. Shop with complete peace of mind.',
                highlight: '100% secure'
              },
              { 
                icon: Clock, 
                color: 'gray',
                title: 'Easy Returns', 
                desc: 'Not happy? Return within 30 days for a full refund. No questions asked.',
                highlight: '30-day policy'
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 hover:border-gray-300 overflow-hidden bg-white"
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-4 right-4 w-4 h-4 bg-gray-300 rounded-full opacity-40 animate-float"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-gray-400 rounded-full opacity-30 animate-float delay-1000"></div>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`relative w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                    <feature.icon className="text-white" size={24} />
                    <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-gray-800 transition-colors duration-300" itemProp="name">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-3 leading-relaxed text-sm" itemProp="description">
                    {feature.desc}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                      {feature.highlight}
                    </span>
                  </div>
                </div>

                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gray-700 group-hover:w-3/4 transition-all duration-500 rounded-full z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white border-t border-gray-200" aria-label="Frequently Asked Questions">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our soaps and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/FAQPage">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-gray-800 text-lg" itemProp="name">
                    {faq.question}
                  </span>
                  <span className="text-gray-700">
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <div 
                  id={`faq-answer-${index}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'py-4 max-h-96' : 'max-h-0 py-0'}`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* FAQ Schema Script for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqItems.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}