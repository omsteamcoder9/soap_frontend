// app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// ✅ SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'Glainic';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://glainic.com';
  
  return {
    title: `About Us | Our Story & Mission | ${storeName}`,
    description: `Welcome to the Glainic family — where skincare is simple, safe, and honest. Discover our mission to make premium organic skincare accessible, trustworthy, and part of every home.`,
    keywords: ['organic skincare', 'natural soap', 'glainic story', 'cruelty-free skincare', 'ingredient transparency'],
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/about`,
      title: `About Glainic | Pure Care. Honest Ingredients. Everyday Luxury.`,
      description: `Skincare doesn't need to be complicated. It needs to be clean, honest, and gentle. Discover the Glainic family.`,
      siteName: storeName,
      images: [{ url: `${siteUrl}/images/m3.avif`, width: 1200, height: 630, alt: `Glainic - Pure Organic Skincare` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `About Glainic | Pure Care. Honest Ingredients.`,
      description: `Welcome to the Glainic family — where skincare is simple, safe, and honest.`,
      images: [`${siteUrl}/images/m3.avif`],
    },
    alternates: { canonical: `${siteUrl}/about` },
  };
}

// ✅ Structured Data (JSON-LD)
function generateStructuredData() {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'Glainic';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://glainic.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Glainic",
    "description": "Pure Care. Honest Ingredients. Everyday Luxury. Glainic was created to bring back the simplicity of traditional skincare.",
    "url": `${siteUrl}/about`,
    "publisher": {
      "@type": "Organization",
      "name": storeName,
      "description": "Premium organic skincare made with natural ingredients, cold-processed Coconut & Castor Oils, and Essential oils.",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "foundingDate": "2020",
      "founders": [{ 
        "@type": "Person", 
        "name": "Kiruthika Kannusamy",
        "description": "Founder who created Glainic from a desire to create something she could trust for her own family."
      }],
      "address": { "@type": "PostalAddress", "addressCountry": "IN" },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      },
      "slogan": "Welcome to the Glainic family — where skincare is simple, safe, and honest.",
      "knowsAbout": ["Organic Skincare", "Natural Soap Making", "Cold-process Soap", "Essential Oils"]
    }
  };
}

const AboutPage: React.FC = () => {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'Glainic';
  
  const values = [
    { title: 'Transparency', description: 'We believe in complete ingredient transparency — no hidden chemicals, no confusing labels.' },
    { title: 'Quality over quantity', description: 'Every bar is crafted with care, focusing on quality that nourishes rather than mass production.' },
    { title: 'Customer-first approach', description: 'Your trust and satisfaction drive everything we do.' },
    { title: 'Sustainable choices', description: 'Committed to choices that respect both your skin and our planet.' },
    { title: 'Cruelty-free commitment', description: 'Never tested on animals, ever. Pure compassion in every bar.' }
  ];

  const promises = [
    'Gentle on skin',
    'Suitable for families',
    'Thoughtfully formulated',
    'Made with care'
  ];

  const stats = [
    { number: '100%', label: 'Ingredient Transparency' },
    { number: 'Cold-process', label: 'Traditional Method' },
    { number: 'Family-safe', label: 'For Kids to Adults' },
    { number: '100%', label: 'Cruelty-free' }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      <div className="min-h-screen bg-[#fafaf9] text-stone-800 font-sans selection:bg-stone-200">
        
        {/* --- Hero Section with Founder's Welcome --- */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-stone-300 blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-stone-200 blur-[100px]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="inline-block py-1.5 px-4 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 rounded-full shadow-sm">
              Welcome to the Glainic family
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-light mb-8 tracking-tight leading-none text-stone-900">
              Where skincare is <br/> 
              <span className="italic font-normal text-stone-500">simple, safe, and honest.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 leading-relaxed font-light">
              Pure Care. Honest Ingredients. Everyday Luxury.
            </p>
          </div>
        </section>

        {/* --- Personal Note from Founder --- */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-sm border border-stone-100 relative">
              <div className="absolute -top-4 -left-4 text-8xl text-stone-200 font-serif italic">"</div>
              <div className="relative z-10 space-y-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-stone-900">A Personal Note</h2>
                <div className="w-16 h-1 bg-stone-300 mx-auto" />
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed italic">
                  Glainic began with a simple intention — to create something I could trust for my own family.
                </p>
                <div className="space-y-4 text-stone-600 max-w-2xl mx-auto">
                  <p>
                    I believe skincare should feel safe, honest, and comforting. Not complicated. Not harsh. 
                    Not filled with ingredients we don't understand.
                  </p>
                  <p>
                    Every Glainic bar is made with care, thought, and responsibility — because I know it's not "just soap." 
                    It's something you use every single day.
                  </p>
                  <p>
                    Thank you for trusting Glainic and being part of this journey.
                    And for that, I'm truly grateful.
                  </p>
                </div>
                <div className="pt-6">
                  <p className="font-serif text-xl text-stone-900">Kiruthika Kannusamy</p>
                  <p className="text-sm text-stone-500 uppercase tracking-wider mt-1">Founder, Glainic</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Mission & Creation Story --- */}
        <section className="py-24 bg-white" aria-label="Our Mission">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group order-2 lg:order-1">
                <div className="absolute -inset-4 bg-stone-100 rounded-3xl rotate-3 transition-transform group-hover:rotate-1 duration-500" />
                <div className="relative h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/50">
                  <Image
                    src="/images/m3.avif"
                    alt="Cold-processed Natural Soap Making"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block border border-stone-100">
                  <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Made with</p>
                  <p className="text-stone-900 font-serif text-xl">Coconut & Castor Oils</p>
                </div>
              </div>
              
              <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-4">
                  <span className="text-stone-400 text-[10px] font-bold tracking-[0.4em] uppercase">Our Mission</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Creating What I Could Trust</h2>
                  <div className="w-16 h-1.5 bg-stone-800 rounded-full" />
                </div>
                
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                  <p>
                    <span className="font-semibold text-stone-800">Glainic was born from a desire to create something better</span> — 
                    something I could proudly place in my own home. Made with natural ingredients, Cold-processed Coconut & Castor Oils, and Essential oils.
                  </p>
                  <p className="font-light">
                    To make premium organic skincare accessible, trustworthy, and part of every home.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['Ingredient transparency', 'Consistent quality', 'Safety first', 'Long-term skin health'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-stone-500 rounded-full" />
                      <span className="text-sm text-stone-600">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-stone-50 rounded-2xl border-l-8 border-stone-800 italic text-xl text-stone-700 font-serif leading-relaxed shadow-sm">
                  Just nature doing its job.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Values Section --- */}
        <section className="py-24 bg-stone-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-stone-400 text-[10px] font-bold tracking-[0.4em] uppercase">More Than Just Soap</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Our Values</h2>
              <div className="w-12 h-1 bg-stone-300 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-stone-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-serif text-stone-900 mb-3">{value.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Our Promise Section --- */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-stone-400 text-[10px] font-bold tracking-[0.4em] uppercase">Our Promise</span>
                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mt-4 mb-6">
                  More Than a Brand — <br/>A Growing Family
                </h2>
                <p className="text-lg text-stone-600 mb-8">
                  Every Glainic bar is created with one intention — to leave your skin feeling soft, clean, and naturally healthy.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {promises.map((promise, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-stone-800 text-xl">✓</span>
                      <span className="text-stone-700">{promise}</span>
                    </div>
                  ))}
                </div>

                <p className="text-stone-600 border-t border-stone-200 pt-6">
                  <span className="font-semibold">Glainic is built on trust.</span> Every customer who switches to Glainic becomes part of a growing community that values safe, mindful skincare. From kids to adults, from first-time users to loyal families — Glainic is designed for everyone who wants simplicity without compromise.
                </p>
              </div>

              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/m3.avif"
                  alt="Family using Glainic products"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- Our Belief --- */}
        <section className="py-24 bg-stone-900 text-stone-50">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Our Belief</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12">
              Skincare doesn't need to be complicated.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 my-16">
              {['It needs to be clean.', 'It needs to be honest.', 'It needs to work — gently.'].map((item, idx) => (
                <div key={idx} className="p-6 border border-stone-700 rounded-2xl">
                  <p className="text-lg italic text-stone-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-xl text-stone-300">
              <p>When you choose Glainic, you're not just choosing a product.</p>
              <div className="flex flex-wrap justify-center gap-8 text-stone-50">
                <span className="font-serif">You're choosing care.</span>
                <span className="font-serif">You're choosing intention.</span>
                <span className="font-serif">You're choosing better.</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-24 bg-stone-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-serif mb-3 text-stone-900">
                    {stat.number}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-24 container mx-auto px-6">
          <div className="relative bg-[#1c1917] rounded-[3.5rem] overflow-hidden group">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            <div className="relative z-10 grid lg:grid-cols-2 items-center">
              <div className="p-12 md:p-24 space-y-10 text-left">
                <div className="space-y-4">
                  <span className="text-stone-500 text-[10px] font-bold tracking-[0.4em] uppercase">
                    Join Our Family
                  </span>
                  <h2 className="text-5xl md:text-7xl font-serif text-stone-50 leading-[1.1]">
                    Experience the <br/> 
                    <span className="italic text-stone-400">Glainic difference</span>
                  </h2>
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                  <Link 
                    href="/shop" 
                    className="bg-stone-50 text-stone-900 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-stone-200 transition-all hover:-translate-y-1 shadow-2xl inline-block"
                  >
                    Explore Our Soaps
                  </Link>
                  <Link 
                    href="/ingredients" 
                    className="text-stone-400 hover:text-stone-50 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group/link"
                  >
                    Our Ingredients 
                    <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
              </div>
              
              <div className="relative h-[400px] lg:h-full min-h-[500px] overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-stone-800/50 to-transparent z-10" />
                <Image
                  src="/images/m3.avif"
                  alt="Glainic Natural Soap"
                  fill
                  className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
                <div className="absolute top-10 right-10 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full w-24 h-24 flex items-center justify-center text-center rotate-12">
                  <p className="text-stone-50 text-[8px] font-bold uppercase tracking-tighter">
                    Pure <br/> Natural <br/> Care
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-stone-700/20 blur-[100px] rounded-full" />
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;