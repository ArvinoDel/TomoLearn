
'use client';

import { useState, useRef, useEffect } from 'react';
import { Fade, Box } from '@mui/material';
import Link from 'next/link';

const sectionKeys = ['quote', 'benefits', 'mainbanner', 'communitystat', 'communityGuide'] as const;
type SectionKey = typeof sectionKeys[number];

export default function CommunityPage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleJoinWhatsApp = () => {
    window.open('https://wa.me/6281224964214', '_blank');
  };

  // Separate visibility states for each section
  const [visibleSections, setVisibleSections] = useState({
    quote: false,
    benefits: false,
    mainbanner: false,
    communitystat: false,
    communityGuide: false,
  });

  // Separate refs for each section
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const benefitsRef = useRef<HTMLDivElement | null>(null);
  const mainbannerRef = useRef<HTMLDivElement | null>(null);
  const communityGuideRef = useRef<HTMLDivElement | null>(null);
  const communitystatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create intersection observer for each section
    const createObserver = (ref: React.RefObject<HTMLDivElement>, sectionName: string) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [sectionName]: true
            }));
          }
        },
        {
          threshold: 0.2, // Trigger when 20% of element is visible
          rootMargin: '-50px 0px' // Add some margin for better timing
        }
      );
    };

    const sectionRefs = {
      quote: quoteRef,
      benefits: benefitsRef,
      mainbanner: mainbannerRef,
      communityGuide: communityGuideRef,
      communitystat: communitystatRef
    };

    const observers = Object.entries(sectionRefs)
      .filter(([, ref]) => ref.current !== null)
      .map(([name, ref]) => ({
        ref,
        name,
        observer: createObserver(ref as React.RefObject<HTMLDivElement>, name)
      }));


    // Start observing each element
    observers.forEach(({ ref, observer }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup function
    return () => {
      observers.forEach(({ ref, observer }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
        observer.disconnect();
      });
    };
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-cyan-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-purple-200/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-orange-200/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-green-200/30 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 relative">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Floating Icons */}
          <div className="flex justify-center items-center mb-8 relative">
            <div className="absolute -top-4 -left-4 text-2xl animate-bounce">💬</div>
            <div className="absolute -top-6 -right-6 text-2xl animate-pulse">✨</div>
            <div className="absolute -bottom-2 -left-8 text-xl animate-bounce">🌟</div>
            <div className="absolute -bottom-4 -right-4 text-xl animate-pulse">🤝</div>

            <div className="w-20 h-20 bg-gradient-to-br from-white-400 to-white-600 rounded-full flex items-center justify-center shadow-lg">
              <img
                src="https://ik.imagekit.io/tdqizhhci/mascott.png"
                alt="Logo"
                className="w-15 h-15 object-contain"
              />
            </div>

          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Join the{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              TomoLearn
            </span>{' '}
            Community
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect, Share, and Grow Together
          </p>

          {/* Testimonial Quote */}
          <Fade in={visibleSections.quote} timeout={1000}>
            <Box ref={quoteRef}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex -space-x-2">
                    {/* <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">🌸</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">🎯</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">🚀</span>
                    </div> */}
                  </div>
                </div>

                <blockquote className="text-lg md:text-xl text-slate-700 italic mb-4 leading-relaxed">
                  "The TomoLearn community transformed my learning journey! Having study buddies from around the world made practicing Spanish so much more fun and engaging. We motivate each other daily and celebrate every milestone together! 🎉"
                </blockquote>

                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">MR</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Maria Rodriguez</div>
                    <div className="text-slate-500 text-sm">Advanced Spanish Learner, Mexico</div>
                  </div>
                </div>
              </div>
            </Box>
          </Fade>
        </div>

        {/* Benefits Section */}
        <Fade in={visibleSections.benefits} timeout={1000}>
          <Box ref={benefitsRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaborative Learning</h3>
                <p className="text-slate-600 leading-relaxed">
                  Practice with native speakers, join study groups, and learn from fellow language enthusiasts from around the globe.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">💪</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Peer Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get motivation, tips, and encouragement from learners at every level. We're all in this journey together!
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Language Immersion</h3>
                <p className="text-slate-600 leading-relaxed">
                  Immerse yourself in real conversations, cultural exchanges, and authentic language practice every day.
                </p>
              </div>
            </div>
          </Box>
        </Fade>

        {/* Main CTA Banner */}
        <Fade in={visibleSections.mainbanner} timeout={1000}>
          <Box ref={mainbannerRef}>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12 text-center shadow-sm border border-green-200 mb-12">
              <div className="mb-6">
                <span className="text-4xl mb-4 block">📱</span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Connect with Amazing Learners?
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join our vibrant WhatsApp community where thousands of language learners share tips, practice together, and celebrate achievements. It's free, friendly, and full of opportunities to grow! 🌱
                </p>
              </div>

              <button
                onClick={handleJoinWhatsApp}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="inline-flex items-center lg:px-8 px-4 py-4 bg-[#25D366] text-white font-semibold rounded-2xl hover:bg-[#22c55e] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
              >
                <div className="w-6 h-6 mr-3 flex items-center justify-center">
                  <i className="ri-whatsapp-fill text-xl"></i>
                </div>
                <span className="text-lg">Join WhatsApp Group</span>
                <div className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                  →
                </div>
              </button>
            </div>
          </Box>
        </Fade>

        {/* Community Stats */}
        <Fade in={visibleSections.communitystat} timeout={1000}>
          <Box ref={communitystatRef}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-cyan-500 mb-2">12K+</div>
                <div className="text-slate-600 text-sm">Active Members</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-purple-500 mb-2">45+</div>
                <div className="text-slate-600 text-sm">Countries</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">20+</div>
                <div className="text-slate-600 text-sm">Languages</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-green-500 mb-2">24/7</div>
                <div className="text-slate-600 text-sm">Support</div>
              </div>
            </div>
          </Box>
        </Fade>

        {/* Community Guidelines */}
        <Fade in={visibleSections.communityGuide} timeout={1000}>
          <Box ref={communityGuideRef}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Community Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Be Kind & Respectful</div>
                    <div className="text-slate-600 text-sm">Treat everyone with kindness and respect</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Share Knowledge</div>
                    <div className="text-slate-600 text-sm">Help others learn and grow together</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Practice Together</div>
                    <div className="text-slate-600 text-sm">Engage in meaningful conversations</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Celebrate Success</div>
                    <div className="text-slate-600 text-sm">Acknowledge achievements big and small</div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </div>
    </div>
  );
}
