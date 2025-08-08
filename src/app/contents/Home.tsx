'use client';

import { useState, useEffect, useRef } from 'react';
import { Fade, Box } from '@mui/material';
import Link from 'next/link';

const sectionKeys = ['progress', 'courses', 'features', 'testimonials', 'community'] as const;
type SectionKey = typeof sectionKeys[number];


export default function Home() {
    const [streakDays, setStreakDays] = useState(7);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [rewards, setRewards] = useState(1250);

    // Separate visibility states for each section
    const [visibleSections, setVisibleSections] = useState({
        progress: false,
        courses: false,
        features: false,
        testimonials: false,
        community: false
    });

    // Separate refs for each section
    const progressRef = useRef<HTMLDivElement | null>(null);
    const coursesRef = useRef<HTMLDivElement | null>(null);
    const featuresRef = useRef<HTMLDivElement | null>(null);
    const testimonialsRef = useRef<HTMLDivElement | null>(null);
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
            progress: progressRef,
            courses: coursesRef,
            features: featuresRef,
            testimonials: testimonialsRef,
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

    const testimonials = [
        {
            name: "Sarah Chen",
            age: "Adult Learner",
            text: "TomoLearn made Spanish fun again! The fox mascot keeps me motivated every day.",
            avatar: "👩‍💼"
        },
        {
            name: "Marcus Johnson",
            age: "Student, 16",
            text: "I went from zero to conversational in French in just 3 months. The gamification is addictive!",
            avatar: "👨‍🎓"
        },
        {
            name: "Emma Rodriguez",
            age: "Parent & Learner",
            text: "My daughter and I both use TomoLearn. It's perfect for family learning time!",
            avatar: "👩‍👧"
        }
    ];

    const courses = [
        {
            id: 1,
            language: 'English',
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
            language: 'Spanish',
            level: 'beginner',
            title: 'Beginner Spanish',
            subtitle: '¡Hola! Start here',
            progress: 40,
            xp: 800,
            totalXp: 2000,
            lessons: 18,
            duration: '6 weeks',
            color: 'from-cyan-400 to-cyan-500',
            isStarted: false
        },
        {
            id: 3,
            language: 'French',
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
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="sm:m-2 min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 rounded-xl">
            {/* Floating Icons */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-8 h-8 text-cyan-300 animate-bounce" style={{ animationDelay: '0s' }}>
                    <i className="ri-book-open-line text-2xl"></i>
                </div>
                <div className="absolute top-40 right-20 w-8 h-8 text-cyan-300 animate-bounce" style={{ animationDelay: '2s' }}>
                    <i className="ri-chat-smile-line text-2xl"></i>
                </div>
                <div className="absolute top-80 left-1/4 w-8 h-8 text-purple-300 animate-bounce" style={{ animationDelay: '4s' }}>
                    <i className="ri-star-line text-2xl"></i>
                </div>
                <div className="absolute bottom-40 right-10 w-8 h-8 text-green-300 animate-bounce" style={{ animationDelay: '1s' }}>
                    <i className="ri-checkbox-circle-line text-2xl"></i>
                </div>
            </div>

            {/* Hero Section - No fade needed, always visible */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
                style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20minimalist%20educational%20workspace%20with%20soft%20pastel%20colors%2C%20floating%20geometric%20shapes%2C%20books%20and%20learning%20elements%20in%20background%2C%20clean%20white%20and%20cyan%20color%20scheme%2C%20bright%20ambient%20lighting%2C%20inspirational%20learning%20atmosphere%2C%20digital%20illustration%20style&width=1920&height=1080&seq=hero-bg&orientation=landscape')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="absolute inset-0 bg-white/80"></div>

                <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                <span className="block">Unlock Your</span>
                                <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                                    Potential
                                </span>
                            </h1>

                            <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Learn any language with our friendly fox guide. Interactive lessons, games, and rewards make learning addictive for every age.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/courses">
                                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap">
                                    Get Started Free
                                </button>
                            </Link>

                            <Link href="/pricing">
                                <button className="bg-white text-slate-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-slate-200 hover:border-cyan-400 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap">
                                    Try for Free
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-center lg:justify-start space-x-8 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">2M+</div>
                                <div className="text-slate-600">Happy Learners</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">15+</div>
                                <div className="text-slate-600">Languages</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">95%</div>
                                <div className="text-slate-600">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative rounded-3xl w-full md:h-100 h-3/4 overflow-hidden shadow-2xl md:min-w-[500px]">
                            <iframe
                                src="https://lottie.host/embed/148efef7-ab26-400f-8177-b239ffc89180/sgvOPjTdBx.lottie"
                                title="TomoLearn Fox Mascot Animation"
                                className="w-full h-full md:scale-[1]"
                                allowFullScreen
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>

                        {/* Floating Achievement Badge */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white p-4 rounded-full shadow-lg animate-pulse">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <i className="ri-trophy-fill text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress & Rewards Section */}
            <Fade in={visibleSections.progress} timeout={1000}>
                <Box ref={progressRef}>
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Streak Progress Card */}
                                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Daily Streak</h3>
                                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-2xl">🔥</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-4xl font-bold text-cyan-600">{streakDays} Days</div>
                                        <p className="text-slate-600">Keep it up! You're on fire!</p>

                                        <div className="flex space-x-2">
                                            {[...Array(7)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${i < streakDays ? 'bg-cyan-500 text-white' : 'bg-slate-200 text-slate-400'
                                                        }`}
                                                >
                                                    <i className="ri-check-line"></i>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Rewards Card */}
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Fox Coins</h3>
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-cyan-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-2xl">🪙</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {typeof rewards === 'number' && (
                                            <div className="text-4xl font-bold text-purple-600">
                                                {rewards.toLocaleString('id-ID')}
                                            </div>
                                        )}

                                        <p className="text-slate-600">Spend on avatars, themes & more!</p>

                                        <button
                                            onClick={() => setRewards(prev => prev + 50)}
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap"
                                        >
                                            Claim Daily Bonus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Box>
            </Fade>

            {/* Course Preview Section */}
            <Fade in={visibleSections.courses} timeout={1000}>
                <Box ref={coursesRef}>
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-cyan-50">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                                    Choose Your Adventure
                                </h2>
                                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                    Start your language journey with courses designed for every skill level
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map((course, index) => (
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


                                            {/* Progress Section - Always present with consistent height */}
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
                        </div>
                    </section>
                </Box>
            </Fade>

            {/* Features Section */}
            <Fade in={visibleSections.features} timeout={1000}>
                <Box ref={featuresRef}>
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                                    Why Choose TomoLearn?
                                </h2>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                                        <i className="ri-gamepad-line text-3xl text-white"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Gamified Learning</h3>
                                    <p className="text-slate-600">Earn points, unlock achievements, and compete with friends</p>
                                </div>

                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                                        <i className="ri-user-heart-line text-3xl text-white"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">All Ages Welcome</h3>
                                    <p className="text-slate-600">Designed for kids, teens, adults, and families</p>
                                </div>

                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                                        <i className="ri-brain-line text-3xl text-white"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">AI-Powered</h3>
                                    <p className="text-slate-600">Personalized lessons that adapt to your learning style</p>
                                </div>

                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                        <i className="ri-global-line text-3xl text-white"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Real Conversations</h3>
                                    <p className="text-slate-600">Practice with native speakers around the world</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Box>
            </Fade>

            {/* Testimonials Section */}
            <Fade in={visibleSections.testimonials} timeout={1000}>
                <Box ref={testimonialsRef}>
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 to-blue-50">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12">
                                What Our Learners Say
                            </h2>

                            <div className="bg-white rounded-3xl p-8 shadow-lg">
                                <div className="space-y-6">
                                    <div className="text-6xl">{testimonials[currentTestimonial].avatar}</div>
                                    <blockquote className="text-2xl text-slate-700 italic">
                                        "{testimonials[currentTestimonial].text}"
                                    </blockquote>
                                    <div className="space-y-2">
                                        <div className="font-bold text-gray-900 text-xl">
                                            {testimonials[currentTestimonial].name}
                                        </div>
                                        <div className="text-slate-600">
                                            {testimonials[currentTestimonial].age}
                                        </div>
                                    </div>
                                </div>

                                {/* Testimonial Navigation Dots */}
                                <div className="flex justify-center space-x-2 mt-8">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentTestimonial(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentTestimonial ? 'bg-cyan-500' : 'bg-slate-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </Box>
            </Fade>

            {/* Community CTA Section */}
            <Fade in={visibleSections.community} timeout={1000}>
                <Box ref={communityRef}>
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl sm:text-5xl font-bold">
                                    Join Our Learning Community
                                </h2>
                                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                                    Connect with millions of learners worldwide. Share progress, get help, and make friends while learning together.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/community">
                                    <button className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap">
                                        Join the Community
                                    </button>
                                </Link>

                                <Link href="/courses">
                                    <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap">
                                        Browse Courses
                                    </button>
                                </Link>
                            </div>

                            {/* Community Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-white/20">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">50K+</div>
                                    <div className="text-white/80 text-sm">Daily Active Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">1M+</div>
                                    <div className="text-white/80 text-sm">Conversations</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">180+</div>
                                    <div className="text-white/80 text-sm">Countries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">24/7</div>
                                    <div className="text-white/80 text-sm">Community Support</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Box>
            </Fade>
        </div>
    );
}