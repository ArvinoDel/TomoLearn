'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const AboutUsPage = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const teamMembers = [
        {
            name: "Andika Supriyadi N.M",
            role: "Founder & CEO",
            image: "https://ik.imagekit.io/tdqizhhci/foto%20andika%20yb.jpg?updatedAt=1751735087750"
        },
        {
            name: "Syah Jahan Ghazi",
            role: "Co-Founder & CTO",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Mutiara Rahmah",
            role: "Director",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        // {
        //   name: "David Kim",
        //   role: "Content Director",
        //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        // }
    ];

    const values = [
        {
            title: "Mission",
            description: "To democratize quality education by making learning accessible, engaging, and personalized for every student worldwide."
        },
        {
            title: "Vision",
            description: "A world where anyone, anywhere can unlock their potential through innovative and adaptive learning experiences."
        },
        {
            title: "Values",
            description: "Innovation, inclusivity, and excellence guide everything we do. We believe in the power of technology to transform education."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h1 className="text-5xl md:text-6xl text-white font-bold mb-4">
                            About TomoLearn
                        </h1>
                        <p className="text-xl text-cyan-100 max-w-2xl mx-auto leading-relaxed">
                            Empowering learners through innovative educational technology and personalized learning experiences
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission, Vision, Values Section */}
            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className={`transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-4xl text-center text-gray-800 mb-12 font-bold">
                            Our Foundation
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((item, index) => (
                            <div
                                key={item.title}
                                className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${1000 + index * 200}ms` }}
                            >
                                <div className="bg-white rounded-lg shadow-lg p-8 h-full transition-transform hover:scale-105 border-t-4 border-cyan-400">
                                    <h3 className="text-2xl text-cyan-600 mb-4 font-bold">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Meet the Team Section */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className={`transition-all duration-1000 delay-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-4xl text-center text-gray-800 mb-4 font-bold">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-center text-gray-600 mb-12">
                            Passionate educators and technologists working to transform learning
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.name}
                                className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${1400 + index * 200}ms` }}
                            >
                                <div className="bg-white rounded-lg shadow-md text-center p-6 transition-transform hover:scale-105">
                                    <div className="relative w-[120px] h-[120px] mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-400">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            quality={75}
                                            className="object-cover"
                                        />
                                    </div>



                                    <h4 className="text-lg font-bold text-gray-800 mb-1">
                                        {member.name}
                                    </h4>
                                    <p className="text-cyan-600 font-medium">
                                        {member.role}
                                    </p>
                                    <p className='text-black font-medium'>
                                    TomoLearn
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="bg-gray-100 py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className={`transition-all duration-1000 delay-1500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-white rounded-lg shadow-md p-12">
                            <h3 className="text-3xl text-cyan-600 mb-6 font-bold text-center">
                                Our Story
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Founded in 2025, TomoLearn emerged from a simple yet powerful idea: that every learner deserves access to high-quality, personalized education. Our founders, a group of educators and technologists, recognized the growing gap between traditional teaching methods and the diverse needs of modern learners.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Through cutting-edge AI and adaptive learning technologies, we've created a platform that not only delivers content but understands each learner's unique journey. Today, we serve thousands of students worldwide, helping them achieve their educational goals through innovative, engaging experiences.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                As we continue to grow, our commitment remains unchanged: to empower every learner with the tools and opportunities they need to succeed in an ever-evolving world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;