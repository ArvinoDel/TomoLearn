
'use client';

import { Button } from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import Link from 'next/link';

interface CTASectionProps {
  course: any;
}

export default function CTASection({ course }: CTASectionProps) {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Ready to Master Japanese?
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
                  Start Today! 🚀
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Join thousands of successful students who've transformed their language skills with our AI-powered learning system.
              </p>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-fire-fill text-white text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    🔥 Limited Time Offer
                  </h3>
                  <div className="text-gray-300">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-white">${course.price}</span>
                      <span className="text-lg line-through text-gray-400">${course.originalPrice}</span>
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        50% OFF
                      </span>
                    </div>
                    <p className="text-sm">⏰ Offer ends in 2 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  backgroundColor: '#00BFCF',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  padding: '16px 40px',
                  borderRadius: '20px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#00a8b8',
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 32px rgba(0, 191, 207, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
                className="whitespace-nowrap"
              >
                Enroll Now - ${course.price}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  padding: '16px 40px',
                  borderRadius: '20px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#1f2937',
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
                className="whitespace-nowrap"
              >
                7-Day Free Trial
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                </div>
                <span className="text-gray-300">30-day money-back guarantee</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-smartphone-line text-white text-sm"></i>
                  </div>
                </div>
                <span className="text-gray-300">Mobile & desktop access</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-infinity-line text-white text-sm"></i>
                  </div>
                </div>
                <span className="text-gray-300">Lifetime access</span>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Happy%20diverse%20students%20celebrating%20successful%20language%20learning%20achievement%2C%20holding%20certificates%20and%20books%2C%20Japanese%20cultural%20elements%20in%20background%2C%20inspirational%20success%20story%20scene%2C%20professional%20photography%20with%20warm%20lighting%2C%20motivational%20educational%20atmosphere&width=600&height=500&seq=success-celebration&orientation=landscape"
                alt="Students Success"
                className="w-full h-96 object-cover object-center"
              />
              
              {/* Success Stats Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 w-full">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {course.studentCount.toLocaleString('id-ID')}
                      </div>
                      <div className="text-sm text-gray-200">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">95%</div>
                      <div className="text-sm text-gray-200">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{course.rating}</div>
                      <div className="text-sm text-gray-200">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-star-fill text-white text-xl"></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Top Rated</div>
                  <div className="text-xs text-slate-600">Course of 2024</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-shield-check-fill text-white text-xl"></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Guaranteed</div>
                  <div className="text-xs text-slate-600">30-day refund</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">12K+</div>
              <div className="text-gray-300">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-gray-300">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
