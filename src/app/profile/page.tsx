'use client';

import { useState, useRef, useEffect } from 'react';
import { Fade, Box } from '@mui/material';
import { User } from 'lucide-react';
import Link from 'next/link';

const sectionKeys = ['profile', 'validity', 'courses', 'stats'] as const;
type SectionKey = typeof sectionKeys[number];

// Mock user data
const userData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    joinDate: 'March 2024',
    profilePicture: 'https://readdy.ai/api/search-image?query=professional%20woman%20smiling%20portrait%20photo%20headshot%20clean%20white%20background%20business%20casual%20attire%20confident%20friendly%20expression%20natural%20lighting%20high%20quality%20photography%20modern%20professional&width=200&height=200&seq=profile001&orientation=squarish',
    totalCourses: 4,
    completedCourses: 1,
    // Subscription data for different language packages
    subscriptions: {
        english: {
            active: true,
            expiryDays: 12,
            packageName: 'English Premium',
            startDate: 'March 2024'
        },
        japanese: {
            active: true,
            expiryDays: 5,
            packageName: 'Japanese Basic',
            startDate: 'April 2024'
        },
        spanish: {
            active: false,
            expiryDays: 0,
            packageName: 'Spanish Complete',
            startDate: null
        },
        french: {
            active: false,
            expiryDays: 0,
            packageName: 'French Advanced',
            startDate: null
        }
    }
};

// Mock courses data
const enrolledCourses = [
    {
        id: 1,
        title: 'English Conversation Mastery',
        level: 'Intermediate',
        progress: 75,
        description: 'Master everyday English conversations with confidence',
        lastAccessed: '2 hours ago',
        status: 'active',
        language: 'english'
    },
    {
        id: 2,
        title: 'Japanese for Beginners',
        level: 'Beginner',
        progress: 45,
        description: 'Learn fundamental Japanese grammar and vocabulary',
        lastAccessed: '1 day ago',
        status: 'active',
        language: 'japanese'
    },
    {
        id: 3,
        title: 'Spanish Grammar Fundamentals',
        level: 'Beginner',
        progress: 100,
        description: 'Complete guide to Spanish grammar rules',
        lastAccessed: '3 days ago',
        status: 'completed',
        language: 'spanish'
    },
    {
        id: 4,
        title: 'French Pronunciation Workshop',
        level: 'Advanced',
        progress: 20,
        description: 'Perfect your French accent and pronunciation',
        lastAccessed: '1 week ago',
        status: 'paused',
        language: 'french'
    }
];

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('overview');

    // Separate visibility states for each section
    const [visibleSections, setVisibleSections] = useState({
        profile: false,
        validity: false,
        courses: false,
        stats: false,
    });

    // Separate refs for each section
    const profileRef = useRef<HTMLDivElement | null>(null);
    const validityRef = useRef<HTMLDivElement | null>(null);
    const coursesRef = useRef<HTMLDivElement | null>(null);
    const statsRef = useRef<HTMLDivElement | null>(null);

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
            profile: profileRef,
            validity: validityRef,
            courses: coursesRef,
            stats: statsRef
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

    const getProgressColor = (progress: number) => {
        if (progress === 100) return 'bg-emerald-500';
        if (progress >= 75) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        return 'bg-gray-400';
    };

    const getStatusBadge = (status: string, progress: number) => {
        if (progress === 100) return 'bg-emerald-100 text-emerald-800';
        if (status === 'paused') return 'bg-orange-100 text-orange-800';
        return 'bg-blue-100 text-blue-800';
    };

    const getStatusText = (status: string, progress: number) => {
        if (progress === 100) return 'Completed';
        if (status === 'paused') return 'Paused';
        return 'Active';
    };

    const getLanguageFlag = (language: string) => {
        const flags = {
            english: '🇺🇸',
            japanese: '🇯🇵',
            spanish: '🇪🇸',
            french: '🇫🇷'
        };
        return flags[language as keyof typeof flags] || '🌐';
    };

    const getLanguageName = (language: string) => {
        const names = {
            english: 'English',
            japanese: 'Japanese',
            spanish: 'Spanish',
            french: 'French'
        };
        return names[language as keyof typeof names] || language;
    };

    // Get active subscriptions
    const activeSubscriptions = Object.entries(userData.subscriptions).filter(([, sub]) => sub.active);
    const expiringSoon = activeSubscriptions.filter(([, sub]) => sub.expiryDays <= 7);

    return (
        <main className="pt-20 pb-12">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {/* Page Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

                    {/* Decorative blur */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 blur-2xl"></div>

                    {/* Content */}
                    <div className="relative px-6 py-8 text-white">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 text-center sm:text-left">

                            {/* Icon User */}
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                <User size={24} className="text-white" />
                            </div>

                            {/* Text Section */}
                            <div>
                                <h1 className="text-3xl font-bold mb-1">My Profile</h1>
                                <p className="text-cyan-50/90">Manage your account and track your learning progress</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info & Subscription Status */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <Fade in={visibleSections.profile} timeout={1000}>
                            <Box ref={profileRef}>
                                <div className="bg-white rounded-2xl shadow-md p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors whitespace-nowrap">
                                            Edit Profile
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-blue-50">
                                            <img
                                                src={userData.profilePicture}
                                                alt="Profile"
                                                className="w-full h-full object-cover object-top"
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{userData.name}</h3>
                                        <p className="text-gray-600 mb-2">{userData.email}</p>
                                        <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <p className="text-2xl font-bold text-blue-600">{userData.totalCourses}</p>
                                                <p className="text-sm text-gray-600">Total Courses</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-emerald-600">{userData.completedCourses}</p>
                                                <p className="text-sm text-gray-600">Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Fade>

                        {/* Subscription Status Card */}
                        <Fade in={visibleSections.validity} timeout={1000}>
                            <Box ref={validityRef}>
                                <div className={`bg-white rounded-2xl shadow-md p-4 sm:p-6 ${expiringSoon.length > 0 ? 'ring-2 ring-amber-200' : ''}`}>
                                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Subscription Status</h2>
                                        <div className={`w-3 h-3 rounded-full ${expiringSoon.length > 0 ? 'bg-amber-400' : activeSubscriptions.length > 0 ? 'bg-emerald-400' : 'bg-gray-400'}`}></div>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        {/* Active Subscriptions */}
                                        {activeSubscriptions.length > 0 ? (
                                            <div className="space-y-3">
                                                {activeSubscriptions.map(([language, subscription]) => (
                                                    <div key={language} className={`border rounded-xl p-3 sm:p-4 ${subscription.expiryDays <= 7 ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}>
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-base sm:text-lg">{getLanguageFlag(language)}</span>
                                                                <span className="font-semibold text-gray-900 text-sm sm:text-base">{getLanguageName(language)}</span>
                                                            </div>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${subscription.expiryDays <= 7 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                                {subscription.expiryDays <= 7 ? 'Expiring Soon' : 'Active'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs sm:text-sm text-gray-600 mb-1">{subscription.packageName}</p>
                                                        <p className={`text-xs sm:text-sm font-medium ${subscription.expiryDays <= 7 ? 'text-amber-600' : 'text-gray-700'}`}>
                                                            {subscription.expiryDays} days remaining
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p className="text-gray-600 text-sm sm:text-base">No active subscriptions</p>
                                            </div>
                                        )}

                                        {/* Expiring Soon Warning */}
                                        {expiringSoon.length > 0 && (
                                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
                                                <p className="text-amber-800 text-xs sm:text-sm font-medium mb-2">
                                                    <i className="ri-alert-line mr-1"></i>
                                                    {expiringSoon.length === 1 ? 'Subscription expiring soon' : 'Multiple subscriptions expiring soon'}
                                                </p>
                                                <p className="text-amber-700 text-xs sm:text-sm mb-3 leading-relaxed">
                                                    {expiringSoon.length === 1 
                                                        ? `Your ${getLanguageName(expiringSoon[0][0])} subscription will expire in ${expiringSoon[0][1].expiryDays} days.`
                                                        : `You have ${expiringSoon.length} subscriptions expiring within 7 days.`
                                                    } Renew now to continue learning.
                                                </p>
                                                <Link
                                                    href="/pricing"
                                                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto text-center"
                                                >
                                                    Renew Subscriptions
                                                </Link>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 pt-2">
                                            <Link
                                                href="/pricing"
                                                className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:py-3 rounded-xl text-center font-medium transition-colors text-sm sm:text-base"
                                            >
                                                Manage Subscriptions
                                            </Link>
                                            <Link
                                                href="/pricing"
                                                className="inline-block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 sm:py-3 rounded-xl text-center font-medium transition-colors text-sm sm:text-base"
                                            >
                                                Add New Language
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </div>

                    {/* Right Column - Courses */}
                    <div className="lg:col-span-2">

                        <Fade in={visibleSections.courses} timeout={1000}>
                            <Box ref={coursesRef}>
                                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Courses</h2>
                                        <Link
                                            href="/courses"
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors self-start sm:self-auto"
                                        >
                                            Browse All Courses
                                        </Link>
                                    </div>

                                    {enrolledCourses.length > 0 ? (
                                        <div className="space-y-4">
                                            {enrolledCourses.map((course) => {
                                                const hasActiveSubscription = userData.subscriptions[course.language as keyof typeof userData.subscriptions]?.active;
                                                
                                                return (
                                                    <div key={course.id} className={`border rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow ${!hasActiveSubscription ? 'opacity-75 border-gray-300' : 'border-gray-200'}`}>
                                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-0">
                                                            <div className="flex-1">
                                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-base sm:text-lg">{getLanguageFlag(course.language)}</span>
                                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{course.title}</h3>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(course.status, course.progress)}`}>
                                                                            {getStatusText(course.status, course.progress)}
                                                                        </span>
                                                                        {!hasActiveSubscription && (
                                                                            <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                                Subscription Expired
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <p className="text-gray-600 mb-2 text-sm sm:text-base leading-relaxed">{course.description}</p>
                                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                                                    <span className="bg-gray-100 px-2 sm:px-3 py-1 rounded-full w-fit">{course.level}</span>
                                                                    <span>Last accessed {course.lastAccessed}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs sm:text-sm font-medium text-gray-700">Progress</span>
                                                                <span className="text-xs sm:text-sm font-medium text-gray-900">{course.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                                                                    style={{ width: `${course.progress}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-2 w-full">
                                                            {!hasActiveSubscription ? (
                                                                <Link
                                                                    href="/pricing"
                                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors w-full text-center text-sm sm:text-base"
                                                                >
                                                                    Renew to Continue
                                                                </Link>
                                                            ) : course.progress === 100 ? (
                                                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors w-full text-sm sm:text-base">
                                                                    <i className="ri-check-line mr-2"></i>
                                                                    Completed
                                                                </button>
                                                            ) : (
                                                                <Link
                                                                    href={`/courses/${course.id}`}
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors w-full text-center text-sm sm:text-base"
                                                                >
                                                                    Continue Learning
                                                                </Link>
                                                            )}

                                                            {hasActiveSubscription && course.status === 'paused' && (
                                                                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors w-full text-sm sm:text-base">
                                                                    Resume Course
                                                                </button>
                                                            )}
                                                        </div>

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 sm:py-12">
                                            <div className="w-20 sm:w-24 h-20 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <i className="ri-book-line text-2xl sm:text-3xl text-blue-500"></i>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
                                            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">Start your learning journey by exploring our course catalog</p>
                                            <Link
                                                href="/courses"
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base"
                                            >
                                                Explore Courses
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </Box>
                        </Fade>

                        {/* Quick Stats */}
                        <Fade in={visibleSections.stats} timeout={1000}>
                            <Box ref={statsRef}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <i className="ri-time-line text-xl text-blue-600"></i>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">127h</p>
                                        <p className="text-sm text-gray-600">Total Study Time</p>
                                    </div>

                                    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <i className="ri-medal-line text-xl text-emerald-600"></i>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">8</p>
                                        <p className="text-sm text-gray-600">Certificates Earned</p>
                                    </div>

                                    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <i className="ri-fire-line text-xl text-purple-600"></i>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">21</p>
                                        <p className="text-sm text-gray-600">Day Streak</p>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </div>
                </div>
            </div>
        </main>
    );
}