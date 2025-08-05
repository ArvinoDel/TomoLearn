'use client';

import React, { useState, useEffect } from 'react';

const HelpCenterPage = () => {
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedFaq, setExpandedFaq] = useState(null);

    useEffect(() => {
        setVisible(true);
    }, []);

    const categories = ['All', 'Account', 'Courses', 'Billing', 'Technical'];

    const faqs = [
        {
            category: 'Account',
            question: 'How do I create a TomoLearn account?',
            answer: 'Creating an account is simple! Click the "Sign Up" button on our homepage, enter your email address, create a secure password, and verify your email. You\'ll have access to our platform immediately after verification.'
        },
        {
            category: 'Account',
            question: 'How can I reset my password?',
            answer: 'If you\'ve forgotten your password, click "Forgot Password" on the login page. Enter your email address, and we\'ll send you a secure link to reset your password. The link expires in 24 hours for security purposes.'
        },
        {
            category: 'Courses',
            question: 'How do I enroll in a course?',
            answer: 'Browse our course catalog, select the course you\'re interested in, and click "Enroll Now." Some courses are free, while others require payment. Premium courses often include additional resources and certification upon completion.'
        },
        {
            category: 'Courses',
            question: 'Can I access courses offline?',
            answer: 'Yes! Our mobile app allows you to download course materials for offline viewing. This feature is available for enrolled courses and includes videos, documents, and quiz materials.'
        },
        {
            category: 'Billing',
            question: 'What payment methods do you accept?',
            answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.'
        },
        {
            category: 'Billing',
            question: 'Can I get a refund?',
            answer: 'Yes, we offer a 30-day money-back guarantee for premium courses. If you\'re not satisfied with your purchase, contact our support team within 30 days for a full refund.'
        },
        {
            category: 'Technical',
            question: 'What are the system requirements?',
            answer: 'TomoLearn works on any modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, ensure you have a stable internet connection and the latest browser version. Our mobile app is available for iOS 12+ and Android 8+.'
        },
        {
            category: 'Technical',
            question: 'I\'m experiencing video playback issues. What should I do?',
            answer: 'First, check your internet connection and try refreshing the page. Clear your browser cache and cookies, then try again. If problems persist, try a different browser or contact our technical support team.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h1 className="text-5xl md:text-6xl text-white font-bold mb-4">
                            Help Center
                        </h1>
                        <p className="text-xl text-cyan-100 mb-8">
                            Find answers to your questions and get the support you need
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for help..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-6 py-4 text-lg rounded-full border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-200"
                                />
                                <div className="absolute right-4 top-4">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Categories */}
                    <div className="lg:w-1/4">
                        <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveCategory(category)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeCategory === category
                                                    ? 'bg-cyan-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Content */}
                    <div className="lg:w-3/4">
                        <div className={`transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                                Frequently Asked Questions
                            </h2>

                            {filteredFaqs.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                                    <p className="text-gray-500">Try adjusting your search terms or selecting a different category.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredFaqs.map((faq, index) => (
                                        <div
                                            key={index}
                                            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                            style={{ transitionDelay: `${700 + index * 100}ms` }}
                                        >
                                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                                <button
                                                    onClick={() => toggleFaq(index)}
                                                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-600 bg-cyan-100 rounded-full mb-2">
                                                                {faq.category}
                                                            </span>
                                                            <h4 className="text-lg font-semibold text-gray-800">
                                                                {faq.question}
                                                            </h4>
                                                        </div>
                                                        <div className={`transform transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </button>

                                                <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                    <div className="px-6 pb-4">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Support Section */}
                <div className={`mt-16 transition-all duration-1000 delay-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Still need help?
                        </h3>
                        <p className="text-cyan-100 mb-6">
                            Our support team is here to assist you with any questions or issues you may have.
                        </p>
                        <button className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;