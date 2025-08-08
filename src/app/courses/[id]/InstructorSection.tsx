
'use client';

import { Avatar, Rating, Button, Tooltip } from '@mui/material';
import Link from 'next/link';

interface InstructorSectionProps {
  instructor: any;
}

export default function InstructorSection({ instructor }: InstructorSectionProps) {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet Your Instructor 👨‍🏫
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn from an expert who's dedicated to your success in mastering Japanese.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left - Instructor Image */}
            <div className="relative h-96 lg:h-auto">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Achievement Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-award-fill text-white text-lg"></i>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Top Instructor</span>
                </div>
              </div>

              {/* Quote Bubble */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-chat-quote-line text-white text-lg"></i>
                    </div>
                  </div>
                  <p className="text-sm text-gray-900 italic leading-relaxed">
                    "Every student can master Japanese with the right guidance and practice. I'm here to make your journey enjoyable and successful!"
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Instructor Details */}
            <div className="p-8 lg:p-12 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                <p className="text-lg text-slate-600 mb-4">{instructor.title}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <Rating value={instructor.rating} precision={0.1} size="small" readOnly />
                  <span className="font-semibold text-gray-900">{instructor.rating}</span>
                  <span className="text-slate-600">({instructor.studentsFormatted = instructor.students.toLocaleString('id-ID')} students)</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 leading-relaxed text-lg">
                {instructor.bio}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-1">
                    {(instructor.students / 1000).toFixed(0)}K+
                  </div>
                  <div className="text-sm text-slate-600">Students Taught</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{instructor.courses}</div>
                  <div className="text-sm text-slate-600">Courses Created</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">8+</div>
                  <div className="text-sm text-slate-600">Years Experience</div>
                </div>
              </div>

              {/* Expertise Areas */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Teaching Expertise</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'ri-mic-line', label: 'Pronunciation', color: 'from-blue-400 to-blue-600' },
                    { icon: 'ri-brain-line', label: 'Grammar', color: 'from-purple-400 to-purple-600' },
                    { icon: 'ri-chat-3-line', label: 'Conversation', color: 'from-green-400 to-green-600' },
                    { icon: 'ri-book-open-line', label: 'Writing Systems', color: 'from-orange-400 to-orange-600' }
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                      <div className={`w-8 h-8 bg-gradient-to-br ${skill.color} rounded-full flex items-center justify-center`}>
                        <div className="w-full h-full flex items-center justify-center">
                          <i className={`${skill.icon} text-white text-sm`}></i>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/instructors/${instructor.name.toLowerCase().replace(' ', '-')}`}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: '#00BFCF',
                      borderColor: '#00BFCF',
                      fontWeight: 600,
                      padding: '12px 24px',
                      borderRadius: '16px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#00BFCF',
                        color: 'white',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    className="whitespace-nowrap w-full sm:w-auto"
                  >
                    View Profile
                  </Button>
                </Link>

                <Tooltip title="Send a message to the instructor">
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: '#6366f1',
                      color: 'white',
                      fontWeight: 600,
                      padding: '12px 24px',
                      borderRadius: '16px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#5048e5',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    startIcon={
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-mail-line text-lg"></i>
                      </div>
                    }
                    className="whitespace-nowrap w-full sm:w-auto"
                  >
                    Ask Question
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Instructor Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <i className="ri-translate-2 text-white text-2xl"></i>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Native Speaker</h4>
            <p className="text-sm text-slate-600">Born and raised in Tokyo, Japan</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <i className="ri-graduation-cap-line text-white text-2xl"></i>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Certified Teacher</h4>
            <p className="text-sm text-slate-600">TESOL & JLPT certified instructor</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <i className="ri-heart-line text-white text-2xl"></i>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Student-Focused</h4>
            <p className="text-sm text-slate-600">Passionate about student success</p>
          </div>
        </div>
      </div>
    </section>
  );
}
