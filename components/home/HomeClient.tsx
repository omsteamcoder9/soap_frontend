// components/home/HomeClient.tsx
'use client';

import { Truck, Shield, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { Category } from '@/types/category';
import ProductGrid from '@/components/products/ProductGrid';
import Image from "next/image";
import { settingsAPI } from '@/lib/settings-api'; // ADDED IMPORT

interface HomeClientProps {
  categories: Category[];
  featuredCategories: Category[];
}

// Define slide data - 3 slides
const heroSlides = [
  {
    id: 1,
    titleLine1: "Hold",
    titleLine2: "the Nature",
                    
    subtitle: "Glainic Newly Launched Collection",
    tagline: "Pure. Gentle. Naturally Beautiful.",
    description: "The art of cleansing redefined. Experience a ritual of nature, meticulously crafted for your skin's soul.",
    bgImage: "/images/aaa.png",
    overlay: "from-black/80 via-black/40 to-transparent",

    ctaLink: "/products",
    accentColor: "emerald"
  },
  {
    id: 2,
    titleLine1: "Pure",
    titleLine2: "Essentials",
    subtitle: "Organic Collection",
    tagline: "Nature's Touch in Every Bar",
    description: "Handcrafted with organic botanicals for your daily cleansing ritual.",
    bgImage: "/images/f2.jpg",
    overlay: "from-blue-900/80 via-blue-800/40 to-transparent",
  
    ctaLink: "/products?category=organic",
    accentColor: "blue"
  },
  {
    id: 3,
    titleLine1: "Luxury",
    titleLine2: "Redefined",
    subtitle: "Premium Range",
    tagline: "Elevate Your Daily Ritual",
    description: "Indulge in premium ingredients that nourish and rejuvenate your skin.",
    bgImage: "/images/g2.jpg",
    overlay: "from-amber-900/80 via-amber-800/40 to-transparent",
  
    ctaLink: "/products?category=premium",
    accentColor: "amber"
  }
];

export default function HomeClient({ featuredCategories }: HomeClientProps) {
  const router = useRouter();
  const heroRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contactNumber, setContactNumber] = useState('7200074221'); // ADDED STATE

  // Fetch contact info on component mount
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const contactInfo = await settingsAPI.getContactInfo();
        // Use whatsappNumber or contactNumber from settings
        setContactNumber(contactInfo.whatsappNumber || contactInfo.contactNumber || '7200074221');
      } catch (error) {
        console.error('Error fetching contact info:', error);
        // Keep default number if API fails
        setContactNumber('7200074221');
      }
    };

    fetchContactInfo();
  }, []);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const navigateToProducts = () => {
    router.push('/products');
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const faqItems = [
    {
      question: "How can I See my order?",
      answer: "You can see your order in the 'My Profile' section."
    },
    {
      question: "What is the standard delivery timings?",
      answer: "Normal delivery time is about 5-6 working days. Local Delivery time is 2-3 days."
    },
    {
      question: "Is free delivery available?",
      answer: "All domestic orders are delivered for free of charge."
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

      {/* Hero Slider Section - 3 Slides */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-[#0f110c]"
        aria-label="Glafnic Soap Hero Slider"
      >
        {/* Background Slides Container */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.bgImage}
                alt="Hold the Nature – Glafnic"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[70%_25%]"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Slide Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-1000 ease-out transform ${
                currentSlide === index
                  ? 'opacity-100 translate-x-0 relative'
                  : 'opacity-0 -translate-x-20 absolute pointer-events-none'
              }`}
            >
              <div className="max-w-2xl text-left">
                {/* Brand Header */}
                <div className="space-y-1 mb-8">
                  <div className="flex items-center gap-3">
                    <span className={`h-[1px] w-10 bg-${slide.accentColor}-400/60`}></span>
                    <p className="text-white/80 tracking-[0.4em] uppercase text-xs font-medium">
                      {slide.subtitle}
                    </p>
                  </div>
                  <p className="italic text-white/60 text-base md:text-lg font-light pl-12">
                    {slide.tagline}
                  </p>
                </div>

                {/* Hero Headline */}
                <h1 className="font-serif text-white leading-[1.1] mb-6">
                  <span className="block text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">
                    {slide.titleLine1}
                  </span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl italic font-extralight text-white/90 ml-4 md:ml-12">
                    {slide.titleLine2}
                  </span>
                </h1>

                {/* Description Text */}
                
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Scroll Indicator */}
        <div className="absolute bottom-12 left-6 md:left-12 hidden md:flex items-center gap-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
          <span className="text-[9px] text-white/40 tracking-[0.5em] uppercase [writing-mode:vertical-lr]">
            Scroll to discover
          </span>
        </div>
      </section>

      {/* Explore Soaps Section */}
      <section className="py-8 bg-white" aria-label="Explore Our Organic Soaps">
        <div className="container mx-auto px-1">
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
          

                {/* CHANGED: limit from 18 to 12 */}
                <ProductGrid 
                  category={category._id} 
                  limit={8} 
                  hideFilters={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Skin-vestment Section - Updated with dynamic contact number and better typography */}
<section className="bg-[#f6f5f2] py-27" aria-label="Our Skin-Vestment Philosophy">
  <div className="max-w-7xl mx-auto px-5">
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
        </div>
      </div>

      {/* RIGHT — COPY - Updated with better font sizing */}
      <div className="text-center md:text-left">
        <h2 className="font-serif text-[52px] leading-tight text-[#2c2c2c] mb-8">
          Say Hello to Glow
        </h2>

        <p className="text-[#444] text-[22px] leading-[1.8] max-w-xl mx-auto md:mx-0 mb-3">
          Your skin deserves more than a quick fix—it&apos;s a skinvestment
          in lasting beauty. Nourish, protect, and glow with confidence
          every day.
        </p>
<h3 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] leading-tight text-[#2c2c2c] mb-4 whitespace-nowrap mr-3 sm:mr-0">
  For a better you, today & always
</h3>
        {/* Customization content */}
        <div className="space-y-8 max-w-xl">
          <div className="space-y-4">
            <h4 className="text-[28px] font-bold text-gray-800">
              We Welcome Customisation!
            </h4>
            <p className="text-[#444] text-[20px] leading-relaxed">
              We can make varieties as per your wish! (Ex: Shea Butter soap, Turmeric, Avocado, 
              as well as Combo products, etc.)
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-[25px] font-bold text-gray-800">
              To place a custom order:
            </h4>
            <p className="text-[#444] text-[20px] leading-relaxed">
              Call / WhatsApp us at <span className="font-semibold text-gray-900">{contactNumber}</span>
            </p>
          </div>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r">
            <p className="text-amber-800 font-medium text-[18px]">
              Note: Minimum order count should be 10 units.
            </p>
          </div>
        </div>
      </div>
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
                desc: 'All domestic orders are delivered for free of charge.',
                
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
                title: 'No Returns', 
                desc: ' We do not allow returns or refunds for any purchases made through our website. All sales are final and non-refundable.If the order is damaged or wrong product sent then we will process you with a refund',
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