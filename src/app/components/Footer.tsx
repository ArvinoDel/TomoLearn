'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };



  return (
    <footer className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Section */}
          <div>
            <h3 className="text-gray-800 text-sm font-light mb-6 tracking-wide uppercase">Company</h3>
            <div className="space-y-4">
              <Link href="/about" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                About Us
              </Link>
              <Link href="/careers" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Careers
              </Link>
              <Link href="/press" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Press
              </Link>
              <Link href="/blog" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Blog
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-gray-800 text-sm font-light mb-6 tracking-wide uppercase">Support</h3>
            <div className="space-y-4">
              <Link href="/help" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Help Center
              </Link>
              <Link href="/contact" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Contact Us
              </Link>
              <Link href="/tutorials" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Tutorials
              </Link>
              <Link href="/faq" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                FAQ
              </Link>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-gray-800 text-sm font-light mb-6 tracking-wide uppercase">Legal</h3>
            <div className="space-y-4">
              {/* <Link href="/privacy" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Privacy Policy
              </Link> */}
              <Link href="/terms" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="block text-sm font-light text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>

          {/* Stay Connected Section */}
          <div>
            <h3 className="text-gray-800 text-sm font-light mb-6 tracking-wide uppercase">Stay Connected</h3>

            {/* Email Subscription */}
            <div className="mb-8">
              <p className="text-sm font-light text-gray-600 mb-4">Get updates and learning tips</p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-100 rounded-full text-sm font-light text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-cyan-500 text-white px-4 py-3 rounded-full text-sm font-medium hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.58C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                  <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" strokeWidth={1.5} />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-light">
              © 2025 TomoLearn. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}