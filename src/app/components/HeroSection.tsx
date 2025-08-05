"use client";

import { useState } from 'react';
import { Home, BookOpen, MessageCircle, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';


export default function HeroSection() {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'courses', icon: BookOpen, label: 'Courses', href: '/courses' },
    { id: 'community', icon: MessageCircle, label: 'Community', href: '/community' },
    { id: 'profile', icon: User, label: 'Profile', href: '/profile' }
  ];

  return (
    <div className="relative">
      {/* Desktop Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Desktop Logo - Centered */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-sm">
                  <img
                    src="https://ik.imagekit.io/tdqizhhci/mascott.png?updatedAt=1753851463294"
                    alt="TomoLearn Mascot"
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <span className="text-xl font-light text-slate-900 tracking-wide">
                  TomoLearn
                </span>
              </div>
            </div>

            {/* Mobile Logo - Left Aligned */}
            <div className="lg:hidden flex items-center">
              <div className="flex items-center space-x-2">
                 <div className="w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-sm">
                  <img
                    src="https://ik.imagekit.io/tdqizhhci/mascott.png?updatedAt=1753851463294"
                    alt="TomoLearn Mascot"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-lg font-light text-slate-900">
                  TomoLearn
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative group text-sm tracking-wide font-light transition-all duration-300 ease-in-out ${isActive ? 'text-cyan-600' : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-cyan-600 transition-all duration-300 ease-in-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full bg-slate-900'
                        }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="/signin" className="text-slate-600 hover:text-slate-900 font-light text-sm tracking-wide transition-all duration-300 ease-in-out">
                Sign In
              </a>
              <a href="/signup" className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all duration-300 ease-in-out font-light text-sm tracking-wide shadow-sm">
                Get Started
              </a>
            </div>

            {/* Mobile Right Actions */}
            <div className="lg:hidden flex items-center">
              <a href="/signin" className="text-slate-600 hover:text-slate-900 font-light text-sm transition-all duration-300 ease-in-out">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="mx-4 mb-4">
          <nav className="bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-lg">
            <div className="flex justify-evenly items-center py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(item.href)}
                    className="flex flex-col items-center py-2 px-4 transition-all duration-300 ease-in-out relative group"
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ease-in-out ${isActive
                      ? 'bg-cyan-500 shadow-lg shadow-cyan-500/25'
                      : 'bg-transparent group-hover:bg-slate-100'
                      }`}>
                      <Icon
                        size={20}
                        className={`transition-all duration-300 ease-in-out ${isActive
                          ? 'text-white'
                          : 'text-slate-500 group-hover:text-slate-700'
                          }`}
                        fill={isActive ? 'currentColor' : 'none'}
                      />
                    </div>
                    <span className={`text-xs font-light mt-1 transition-all duration-300 ease-in-out ${isActive
                      ? 'text-cyan-500 font-medium'
                      : 'text-slate-500'
                      }`}>
                      {item.label}
                    </span>

                    {isActive && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full transition-all duration-300 ease-in-out"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      {/* <div className="lg:hidden h-20"></div> */}
    </div>
  );
}