// app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// ✅ SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soapstore.com';
  
  return {
    title: `About Us | Our Story & Mission | ${storeName}`,
    description: `Discover ${storeName}'s story, mission, and values. Learn about our journey in providing Soap and skincare products.`,
    keywords: ['about soap', 'our story', 'organic soap company', 'soap mission', 'our team', storeName],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/about`,
      title: `About Us | ${storeName}`,
      description: `Learn about ${storeName}'s mission to provide Soap and natural skincare products.`,
      siteName: storeName,
      images: [
        {
          url: `${siteUrl}/images/m3.avif`,
          width: 1200,
          height: 630,
          alt: `${storeName} - About Us`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `About Us | ${storeName}`,
      description: `Discover our story and mission at ${storeName}`,
      images: [`${siteUrl}/images/m3.avif`],
    },
    alternates: {
      canonical: `${siteUrl}/about`,
    },
  };
}

// ✅ Generate structured data for About Page
function generateStructuredData() {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
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
      "logo2": `${siteUrl}/logo2.png`,
      "foundingDate": "2020",
      "founders": [
        {
          "@type": "Person",
          "name": "John Doe"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };
}

const AboutPage: React.FC = () => {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
  
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
      bio: `Jane leads our technical team with expertise in modern web technologies and ensures seamless shopping experience at ${storeName}.`,
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
    { number: '5+', label: 'Years in Organic Skincare' },
    { number: '100+', label: 'Soap Varieties' },
    { number: '5000+', label: 'Happy Customers' },
    { number: '100%', label: 'Natural Ingredients' }
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hidden semantic content for better indexing */}
        <div className="sr-only">
          <h1>About {storeName} - Premium Organic Soap Company</h1>
          <p>{storeName} is dedicated to providing 100% natural, organic soaps made with traditional methods and premium ingredients. Our mission is to bring chemical-free skincare to everyone.</p>
        </div>

     

        {/* Mission Section */}
        <section className="py-16 bg-white" aria-label="Our Mission">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Our mission is to make quality organic soaps accessible to everyone while providing 
                  an exceptional skincare experience. We believe in the power of natural ingredients to 
                  transform skin health and enhance daily routines.
                </p>
                <p className="text-lg text-gray-700">
                  We craft our soaps with care, ensuring every product we offer meets 
                  the highest standards of purity and provides genuine benefits to our customers.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg border border-gray-300">
                <Image
                  src="/images/m3.avif"
                  alt={`${storeName} - Premium Organic Soap Collection`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#f2f2f2]" aria-label="Company Statistics">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" itemScope itemType="https://schema.org/QuantitativeValue">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" itemProp="value">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium" itemProp="unitText">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white" aria-label="Our Team">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-700">
                The passionate skincare experts behind {storeName}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" itemScope itemType="https://schema.org/Person">
              {teamMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300 hover:border-gray-400"
                  itemScope
                  itemProp="employee"
                  itemType="https://schema.org/Person"
                >
                  <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-gray-300">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role} at ${storeName}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2" itemProp="name">
                    {member.name}
                  </h3>
                  <p className="text-gray-700 font-medium mb-3" itemProp="jobTitle">{member.role}</p>
                  <p className="text-gray-700" itemProp="description">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

     

      </div>
    </>
  );
};

export default AboutPage;