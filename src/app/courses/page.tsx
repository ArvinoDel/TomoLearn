'use client';

import { useState, useEffect, useRef } from 'react';
import { Fade, Box } from '@mui/material';
import Link from 'next/link';

const sectionKeys = ['courses', 'community'] as const;
type SectionKey = typeof sectionKeys[number];

interface Course {
  id: number;
  language: string;
  level: string;
  title: string;
  subtitle: string;
  progress: number;
  xp: number;
  totalXp: number;
  lessons: number;
  duration: string;
  color: string;
  isStarted: boolean;
}


export default function CoursesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  //   const [filtecyanCourses, setFiltecyanCourses] = useState([]);
  const [filtecyanCourses, setFiltecyanCourses] = useState<Course[]>([]);

  // Separate visibility states for each section
  const [visibleSections, setVisibleSections] = useState({
    listcourses: false,
    community: false,
  });

  // Separate refs for each section
  const listcoursesRef = useRef<HTMLDivElement | null>(null);
  const communityRef = useRef<HTMLDivElement | null>(null);

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
      listcourses: listcoursesRef,
      community: communityRef
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


  const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'german', label: 'German' },
    { value: 'korean', label: 'Korean' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const courses = [
    {
      id: 1,
      language: 'english',
      level: 'beginner',
      title: 'Beginner English',
      subtitle: 'Master the basics',
      progress: 65,
      xp: 1250,
      totalXp: 2000,
      lessons: 24,
      duration: '8 weeks',
      color: 'from-blue-400 to-indigo-500',
      isStarted: true
    },
    {
      id: 2,
      language: 'spanish',
      level: 'beginner',
      title: 'Beginner Spanish',
      subtitle: '¡Hola! Start here',
      progress: 40,
      xp: 800,
      totalXp: 2000,
      lessons: 18,
      duration: '6 weeks',
      color: 'from-cyan-400 to-cyan-500',
      isStarted: true
    },
    {
      id: 3,
      language: 'french',
      level: 'intermediate',
      title: 'Intermediate French',
      subtitle: 'Bonjour conversation',
      progress: 20,
      xp: 400,
      totalXp: 2000,
      lessons: 12,
      duration: '10 weeks',
      color: 'from-purple-400 to-pink-500',
      isStarted: true
    },
    {
      id: 4,
      language: 'japanese',
      level: 'beginner',
      title: 'Beginner Japanese',
      subtitle: 'こんにちは culture',
      progress: 0,
      xp: 0,
      totalXp: 2500,
      lessons: 30,
      duration: '12 weeks',
      color: 'from-pink-400 to-rose-500',
      isStarted: false
    },
    {
      id: 5,
      language: 'german',
      level: 'beginner',
      title: 'Beginner German',
      subtitle: 'Guten Tag basics',
      progress: 0,
      xp: 0,
      totalXp: 2000,
      lessons: 22,
      duration: '8 weeks',
      color: 'from-emerald-400 to-green-500',
      isStarted: false
    },
    {
      id: 6,
      language: 'korean',
      level: 'beginner',
      title: 'Beginner Korean',
      subtitle: '안녕하세요 adventure',
      progress: 0,
      xp: 0,
      totalXp: 2300,
      lessons: 26,
      duration: '10 weeks',
      color: 'from-cyan-400 to-blue-500',
      isStarted: false
    },
    {
      id: 7,
      language: 'english',
      level: 'intermediate',
      title: 'Intermediate English',
      subtitle: 'Level up fluency',
      progress: 0,
      xp: 0,
      totalXp: 2800,
      lessons: 32,
      duration: '12 weeks',
      color: 'from-indigo-400 to-purple-500',
      isStarted: false
    },
    {
      id: 8,
      language: 'spanish',
      level: 'advanced',
      title: 'Advanced Spanish',
      subtitle: 'Master conversation',
      progress: 0,
      xp: 0,
      totalXp: 3500,
      lessons: 40,
      duration: '16 weeks',
      color: 'from-cyan-400 to-cyan-500',
      isStarted: false
    }
  ];

  useEffect(() => {
    let filtecyan = courses;

    if (selectedLanguage !== 'all') {
      filtecyan = filtecyan.filter(course => course.language === selectedLanguage);
    }

    if (selectedLevel !== 'all') {
      filtecyan = filtecyan.filter(course => course.level === selectedLevel);
    }

    setFiltecyanCourses(filtecyan);
  }, [selectedLanguage, selectedLevel]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50">
      {/* Floating Background Elements */}


      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Choose Your Path of{' '}
                  <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Mastery
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl">
                  Discover courses designed for every learning style. From beginner basics to advanced mastery, your language journey starts here.
                </p>
              </div>

              {/* Filter Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Find Your Perfect Course</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Language Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-gray-900 cursor-pointer pr-8"
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-gray-900 cursor-pointer pr-8"
                    >
                      {levels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <div className="relative rounded-3xl h-50 md:h-100 overflow-hidden">
                <div className="w-full h-full md:overflow-hidden scale-0.5 md:scale-[1.5] md:relative">
                  <iframe
                    src="https://lottie.host/embed/cb868e30-1f06-4022-9e5f-b95d40a92fd0/dU0cIepaGI.lottie"
                    title="TomoLearn Fox with Language Books Animation"
                    className="w-full h-full md:scale-[1] md:origin-top-left"
                    allowFullScreen
                    style={{ border: 'none' }}
                  ></iframe>
                </div>
              </div>


              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <i className="ri-trophy-fill text-white text-xl"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">95% Success Rate</div>
                    <div className="text-xs text-slate-600">Course Completion</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <i className="ri-global-line text-white text-xl"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">15+ Languages</div>
                    <div className="text-xs text-slate-600">Available Now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid Section */}
      <Fade in={visibleSections.listcourses} timeout={1000}>
        <Box ref={listcoursesRef}>
          <section className="py-16 px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Available Courses
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {filtecyanCourses.length} {filtecyanCourses.length === 1 ? 'course' : 'courses'} match your selection
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtecyanCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:scale-105 cursor-pointer"
                  >
                    {/* Course Header */}
                    <div className="relative mb-6">
                      <div className={`w-full h-48 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center overflow-hidden`}>
                        <img
                          src={`https://readdy.ai/api/search-image?query=Language%20learning%20illustration%20for%20$%7Bcourse.language%7D%20course%2C%20cultural%20elements%20and%20symbols%20representing%20$%7Bcourse.language%7D%20language%2C%20educational%20books%20and%20speech%20bubbles%2C%20modern%20flat%20illustration%20style%20with%20$%7Bcourse.level%7D%20difficulty%20indicators%2C%20bright%20colorful%20design%20with%20consistent%20simple%20background&width=400&height=300&seq=${course.language}-${course.level}-course&orientation=landscape`}
                          alt={`${course.title} Course`}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Level Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-gray-700 capitalize">
                          {course.level}
                        </span>
                      </div>

                      {/* Progress Ring (for started courses) */}
                      {course.isStarted && (
                        <div className="absolute -bottom-6 left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-cyan-200">
                          <div className="relative w-8 h-8">
                            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                              <circle
                                cx="16"
                                cy="16"
                                r="12"
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="3"
                              />
                              <circle
                                cx="16"
                                cy="16"
                                r="12"
                                fill="none"
                                stroke="#00BFCF"
                                strokeWidth="3"
                                strokeDasharray={`${course.progress * 0.75} 75`}
                                className="transition-all duration-500"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-cyan-600">{course.progress}%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-slate-600 text-sm">{course.subtitle}</p>
                      </div>

                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <i className="ri-book-line w-4 h-4 flex items-center justify-center"></i>
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-2 min-h-[60px] flex flex-col justify-center">
                        {course.isStarted ? (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Progress</span>
                              <span className="font-medium text-gray-900">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </>
                        ) : (
                          // Placeholder for non-started courses
                          <div className="text-center text-sm text-slate-500">
                            <i className="ri-rocket-line text-2xl text-gray-300 mb-2 block"></i>
                            <span>Ready to begin your journey</span>
                          </div>
                        )}
                      </div>

                      {/* XP Display */}
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-cyan-50 rounded-xl border border-yellow-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-cyan-500 rounded-full flex items-center justify-center">
                            <i className="ri-star-fill text-white text-sm"></i>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {course.xp.toLocaleString('id-ID')} / {course.totalXp.toLocaleString('id-ID')} XP
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          +{Math.floor(course.totalXp / course.lessons)} per lesson
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link href={`/courses/${course.id}`}>
                        <button className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap ${course.isStarted
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg'
                          : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                          }`}>
                          {course.isStarted ? 'Continue Learning' : 'Start Course'}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filtecyanCourses.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-search-line text-4xl text-slate-500"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
                  <p className="text-slate-600 mb-6">Try adjusting your filters to see more courses</p>
                  <button
                    onClick={() => {
                      setSelectedLanguage('all');
                      setSelectedLevel('all');
                    }}
                    className="bg-cyan-500 text-white px-6 py-3 rounded-2xl hover:bg-cyan-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </Box>
      </Fade>

      {/* Bottom CTA Section */}
      <Fade in={visibleSections.community} timeout={1000}>
        <Box ref={communityRef}>
          <section className="py-16 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Ready to Start Learning?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Join millions of learners worldwide and unlock your language potential with personalized courses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap">
                    Start Free Trial
                  </button>
                </Link>

                <Link href="/community">
                  <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-gray-900 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap">
                    Join Community
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </Box>
      </Fade>
    </div>
  );
}