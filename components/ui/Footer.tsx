'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] text-gray-700 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
  <div className="flex items-center space-x-3 mb-4">
    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow border border-gray-200 overflow-hidden">
      <Image 
        src="/images/logo2.png" 
        alt="Soap icon"
        width={24}
        height={24}
        className="object-contain"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">soap</h3>
  </div>
  <p className="text-gray-600">
    Your one-stop destination for soaps, stationery, and educational resources.
  </p>
</div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              {["Home", "Products", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Customer Service
            </h3>
            <ul className="space-y-2 text-gray-600">
              {["Shipping Info", "Returns", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>support@soap.com</li>
              <li>+91 7200074221</li>
              <li>Mon–Fri · 9AM–6PM</li>
            </ul>

            {/* Social Icons */}
            <div className="mt-4 flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-gray-800 transition"
                  onClick={(e) => e.preventDefault()} // Prevent actual navigation
                >
                  ●
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 soap. All rights reserved.</p>
            <div className="flex space-x-6 mt-3 md:mt-0">
              <Link href="/privacy" className="hover:text-gray-800">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-800">Terms</Link>
              <Link href="/cookies" className="hover:text-gray-800">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}