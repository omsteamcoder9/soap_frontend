// components/home/HomeClient.tsx
'use client';

import { Truck, Shield, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Category } from '@/types/category';
import ProductGrid from '@/components/products/ProductGrid';
import Image from "next/image";

interface HomeClientProps {
  categories: Category[];
  featuredCategories: Category[];
}

export default function HomeClient({ categories, featuredCategories }: HomeClientProps) {
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
      question: "Are These Fashion and Fancys New?",
      answer: "Yes, All Fashion and Fancys Are Absolutely New."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Use all categories instead of just featured categories
  const categoriesToDisplay = categories.length > 0 ? categories : featuredCategories;

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Reduced background element size */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-yellow-50 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Fashion and Fancy Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden bg-[#0a0a0a]"
        aria-label="Sastika Fashion and Fancy"
      >
        {/* 1. Background Image - Focused on the top/right to clear space for left text */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sa1.png"
            alt="Sastika Luxury Celebration"
            fill
            priority
            className="object-cover object-[center_20%] opacity-80 scale-105 transition-transform duration-[10s]"
          />
          {/* Gradient Overlays: Darker on the left to make white text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* 2. Background Aesthetic Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-20 right-20 text-yellow-500/10 text-[15rem] font-serif select-none">01</div>
        </div>

        {/* 3. Main Content - Nudged slightly right with pl-12 and md:pl-32 */}
        <div className="relative z-20 w-full max-w-[1400px] pl-12 md:pl-32 pr-8">
          <div className="flex flex-col items-start text-left max-w-2xl ml-2 md:ml-6">
            
            {/* Premium Badge */}
            <div className="mb-8 overflow-hidden">
              <span className="block text-yellow-100 tracking-[0.5em] uppercase text-xs font-light animate-reveal-up">
                The Art of Gifting & Grace
              </span>
              <div className="h-[1px] w-12 bg-yellow-500/60 mt-4" />
            </div>

            {/* Hero Headline */}
            <div className="relative mb-8">
              <h1 className="font-serif text-white">
                <span className="block text-7xl md:text-[110px] leading-none font-extralight tracking-tighter opacity-95">
                  Modern
                </span>
                <span className="block text-5xl md:text-8xl italic font-light -mt-4 md:-mt-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500/40 ml-6 md:ml-12">
                  Tradition
                </span>
              </h1>
            </div>

            {/* Floating Subline */}
            <div className="mt-4">
              <p className="text-yellow-100/80 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                Curated Designer Sarees & Luxury Gifts.
                <span className="block italic font-serif text-yellow-200/60 text-base mt-2">
                  A celebration of heritage, crafted for your moments.
                </span>
              </p>
            </div>

            {/* Premium Interaction Group */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-8">
              <button
                onClick={navigateToProducts}
                className="group relative px-12 py-5 bg-yellow-500 text-black text-xs uppercase tracking-widest font-bold transition-all duration-500 hover:bg-yellow-600 hover:text-white"
              >
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 border border-yellow-500 scale-0 group-hover:scale-100 transition-transform duration-500" />
              </button>

              <button
                onClick={() => router.push('/about')}
                className="text-yellow-100/70 text-xs uppercase tracking-[0.3em] font-light border-b border-yellow-500/30 pb-2 hover:text-yellow-100 hover:border-yellow-500 transition-all"
              >
                Our Story
              </button>
            </div>
          </div>
        </div>

        {/* 4. Minimalist Sidebar Info (Right Side) */}
        <div className="absolute bottom-12 right-12 hidden lg:block z-20">
          <div className="flex flex-col items-center gap-4">
            <p className="text-yellow-100/40 text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180">
              Scroll to Explore
            </p>
            <div className="h-20 w-[1px] bg-gradient-to-b from-yellow-500/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Explore Fashion and Fancys Section - Show ALL categories */}
      <section className="py-8 bg-white" aria-label="Explore Our Fashion and Fancys">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-yellow-600 mb-3">Explore Our Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of curated Fashion and Fancys from all categories
            </p>
          </div>

          {categoriesToDisplay.length > 0 ? (
            <div className="space-y-8">
              {categoriesToDisplay.map((category, index) => (
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
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 text-center">
                      {category.name}
                    </h3>
                    <button 
                      onClick={() => router.push(`/products?category=${category.slug}`)}
                      className="absolute right-0 inline-flex items-center gap-0.5 sm:gap-1 bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-all duration-300 hover:bg-yellow-600 hover:shadow-md shadow-sm cursor-pointer text-xs sm:text-sm"
                      aria-label={`View all ${category.name} Fashion and Fancys`}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-white border-t border-gray-200" aria-label="Why Choose Us">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-yellow-600 mb-3">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: Truck, 
                color: 'yellow',
                title: 'Free Shipping', 
                desc: 'Free delivery on all orders over ₹500. Fast and reliable shipping to your doorstep.',
                highlight: 'No hidden fees'
              },
              { 
                icon: Shield, 
                color: 'yellow',
                title: 'Secure Payment', 
                desc: 'Your data is protected with bank-level security. Shop with complete peace of mind.',
                highlight: '100% secure'
              },
              { 
                icon: Clock, 
                color: 'yellow',
                title: 'Easy Returns', 
                desc: 'Not happy? Return within 30 days for a full refund. No questions asked.',
                highlight: '30-day policy'
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 hover:border-yellow-200 overflow-hidden bg-white"
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-200 rounded-full opacity-40 animate-float"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-yellow-300 rounded-full opacity-30 animate-float delay-1000"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="relative w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                    <feature.icon className="text-white" size={24} />
                    <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  </div>

                  <h3 className="text-xl font-bold text-yellow-600 mb-2 text-center group-hover:text-yellow-700 transition-colors duration-300" itemProp="name">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-3 leading-relaxed text-sm" itemProp="description">
                    {feature.desc}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-yellow-50 text-yellow-700 text-sm font-medium px-3 py-1 rounded-full border border-yellow-200">
                      {feature.highlight}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-yellow-500 group-hover:w-3/4 transition-all duration-500 rounded-full z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white border-t border-gray-200" aria-label="Frequently Asked Questions">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-yellow-600 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our Fashion and Fancys and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/FAQPage">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-yellow-300 hover:shadow-lg"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-yellow-50 hover:bg-yellow-100 transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-gray-800 text-lg" itemProp="name">
                    {faq.question}
                  </span>
                  <span className="text-yellow-600">
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