
'use client';

import { Card, CardContent, Chip, LinearProgress } from '@mui/material';

interface CourseOverviewProps {
  course: any;
}

export default function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <Card
          sx={{
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f1f5f9',
            overflow: 'visible'
          }}
        >
          <CardContent sx={{ padding: '48px' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Course Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://readdy.ai/api/search-image?query=Japanese%20language%20learning%20materials%20beautifully%20arranged%2C%20hiragana%20and%20katakana%20charts%2C%20Japanese%20textbooks%2C%20cultural%20items%20like%20origami%20and%20tea%20ceremony%20elements%2C%20modern%20clean%20educational%20setup%20with%20soft%20lighting%2C%20inspirational%20learning%20environment&width=500&height=350&seq=course-overview-materials&orientation=landscape"
                    alt="Course Materials"
                    className="w-full h-80 object-cover object-center"
                  />
                </div>

                {/* Progress Indicator */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-lg"></i>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">30-Day Completion</span>
                  </div>
                </div>
              </div>

              {/* Right - Course Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Stats Grid - Responsive Version */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 sm:p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-book-2-line text-white text-lg"></i>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">Level</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{course.level}</div>
                    <div className="text-xs sm:text-sm text-slate-600">Perfect for beginners</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 sm:p-6 border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-time-line text-white text-lg"></i>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">Duration</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">{course.duration}</div>
                    <div className="text-xs sm:text-sm text-slate-600">{course.hours} hours total</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 sm:p-6 border border-orange-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-video-line text-white text-lg"></i>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">Lessons</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-orange-600">{course.lessons}</div>
                    <div className="text-xs sm:text-sm text-slate-600">Interactive content</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 sm:p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-trophy-line text-white text-lg"></i>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">Skills</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{course.skills.length}</div>
                    <div className="text-xs sm:text-sm text-slate-600">Core abilities</div>
                  </div>
                </div>

                {/* Skills Tags */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Skills You'll Master</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill: string, index: number) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="medium"
                        sx={{
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          fontWeight: 500,
                          borderRadius: '12px',
                          '&:hover': {
                            backgroundColor: '#e2e8f0',
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.2s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
