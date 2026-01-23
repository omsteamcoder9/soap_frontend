// app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// ✅ SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  return {
    title: `About Us | Our Story & Mission | ${storeName}`,
    description: `Discover ${storeName}'s story, mission, and values. Learn about our journey in providing Soap and skincare products.`,
    keywords: ['about soap', 'our story', 'organic soap company', 'soap mission', 'our team'],
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/about`,
      title: `About Us | ${storeName}`,
      description: `Learn about ${storeName}'s mission to provide Soap and natural skincare products.`,
      siteName: storeName,
      images: [{ url: `${siteUrl}/images/m3.avif`, width: 1200, height: 630, alt: `${storeName} - About Us` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `About Us | ${storeName}`,
      description: `Discover our story and mission at ${storeName}`,
      images: [`${siteUrl}/images/m3.avif`],
    },
    alternates: { canonical: `${siteUrl}/about` },
  };
}

// ✅ Structured Data (JSON-LD)
function generateStructuredData() {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'Soap Store';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soapstore.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us",
    "description": "Learn about our soap company's mission, values, and team",
    "url": `${siteUrl}/about`,
    "publisher": {
      "@type": "Organization",
      "name": storeName,
      "description": "Premium organic soap company",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "foundingDate": "2020",
      "founders": [{ "@type": "Person", "name": "John Doe" }],
      "address": { "@type": "PostalAddress", "addressCountry": "IN" },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };
}

const AboutPage: React.FC = () => {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'Soap Store';
  
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: `John has over 10 years of experience in organic skincare and founded ${storeName} with a vision to provide natural, chemical-free soaps.`,
      image: '/images/m1.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'CTO',
      bio: `Jane leads our technical team with expertise in modern web technologies and ensures a seamless shopping experience.`,
      image: '/images/m1.png'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Lead Skincare Expert',
      bio: 'Mike creates beautiful and effective soap formulations using natural ingredients and traditional methods.',
      image: '/images/m1.png'
    }
  ];

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '100+', label: 'Soap Varieties' },
    { number: '5k+', label: 'Happy Customers' },
    { number: '100%', label: 'Natural Ingredients' }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      <div className="min-h-screen bg-[#fafaf9] text-stone-800 font-sans selection:bg-stone-200">
        
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-stone-300 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-stone-200 blur-[100px]" />
            </div>
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <span className="inline-block py-1.5 px-4 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 rounded-full shadow-sm">
                   Est. 2020 • Our Heritage
                </span>
                <h1 className="text-5xl md:text-8xl font-serif font-light mb-8 tracking-tight leading-none text-stone-900">
                   Pure. Organic. <br/> <span className="italic font-normal text-stone-500">Glainic.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 leading-relaxed font-light">
                    Dedicated to provide 100%natural, organic soap with premium ingredients and by traditional methods.
                </p>
            </div>
        </section>

        {/* --- Mission Section --- */}
        <section className="py-24 bg-white" aria-label="Our Mission">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group order-2 lg:order-1">
                <div className="absolute -inset-4 bg-stone-100 rounded-3xl rotate-3 transition-transform group-hover:rotate-1 duration-500" />
                <div className="relative h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/50">
                    <Image
                    src="/images/m3.avif"
                    alt="Premium Collection"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block border border-stone-100">
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Guaranteed</p>
                    <p className="text-stone-900 font-serif text-xl italic">100% No Chemical</p>
                </div>
              </div>
              
              <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Our Philosophy</h2>
                    <div className="w-16 h-1.5 bg-stone-800 rounded-full" />
                </div>
                
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                    <p>
                        Our mission is to make quality organic soaps accessible to everyone while providing
                        an exceptional skincare experience. We believe in the power of natural ingredients to
                        transform skin health.
                    </p>
                    <p className="font-light">
                        We craft our soaps with care, ensuring every product we offer meets
                        the highest standards of purity and provides genuine benefits to our customers.
                    </p>
                </div>

                <div className="p-8 bg-stone-50 rounded-2xl border-l-8 border-stone-800 italic text-xl text-stone-700 font-serif leading-relaxed shadow-sm">
                  Nature doesn&apos;t need chemicals to heal, and neither does your skin.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-24 bg-stone-900 text-stone-50 overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl md:text-6xl font-serif mb-3 text-stone-100 group-hover:scale-110 transition-transform duration-500">
                    {stat.number}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-stone-500 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </section>

        {/* --- Team Section --- */}
        <section className="py-32 bg-[#fafaf9]" aria-label="Our Team">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Meet The Makers</h2>
              <div className="w-12 h-1 bg-stone-300 mx-auto" />
              <p className="text-stone-500 text-lg font-light tracking-wide">
                The passionate skincare experts behind {storeName}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative bg-white p-10 rounded-[2rem] border border-stone-200 transition-all duration-700 hover:-translate-y-4 shadow-sm hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-stone-50 rounded-full transition-transform group-hover:scale-[3] duration-700" />
                  
                  <div className="relative z-10">
                    <div className="w-28 h-28 mb-8 relative rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ring-4 ring-stone-50 rotate-3 group-hover:rotate-0 shadow-lg">
                        <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                        />
                    </div>
                    
                    <h3 className="text-2xl font-serif text-stone-900 mb-1">{member.name}</h3>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-6">{member.role}</p>
                    <p className="text-stone-600 leading-relaxed font-light">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Elevated CTA Section --- */}
    {/* --- Elevated CTA Section --- */}
<section className="py-24 container mx-auto px-6">
  <div className="relative bg-[#1c1917] rounded-[3.5rem] overflow-hidden group">
    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    <div className="relative z-10 grid lg:grid-cols-2 items-center">
      <div className="p-12 md:p-24 space-y-10 text-left">
        <div className="space-y-4">
          <span className="text-stone-500 text-[10px] font-bold tracking-[0.4em] uppercase">
            Transform Your Ritual
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-stone-50 leading-[1.1]">
            Experience the natural glow of <br/> 
            <span className="italic text-stone-400">Glainic Soap</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          
          {/* ✅ UPDATED BUTTON TO LINK TO HOME PAGE */}
          <Link 
            href="/" 
            className="bg-stone-50 text-stone-900 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-stone-200 transition-all hover:-translate-y-1 shadow-2xl inline-block"
          >
            Explore Soap
          </Link>

          <button className="text-stone-400 hover:text-stone-50 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group/link">
            Our Ingredients 
            <span className="group-hover/link:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>
      
      {/* ... rest of the image code remains same ... */}
      <div className="relative h-[400px] lg:h-full min-h-[500px] overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-stone-800/50 to-transparent z-10" />
        <Image
          src="/images/m3.avif"
          alt="Glainic Soap Experience"
          fill
          className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
        />
        <div className="absolute top-10 right-10 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full w-24 h-24 flex items-center justify-center text-center rotate-12">
          <p className="text-stone-50 text-[8px] font-bold uppercase tracking-tighter">
            Pure <br/> Botanical <br/> Blend
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