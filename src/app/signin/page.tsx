
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    // Future integration with NextAuth or Firebase
    console.log('Google Sign In clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-indigo-50/50 flex items-center justify-center px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex items-center justify-center lg:justify-between gap-12 relative z-10">
        {/* Left side - Mascot/Illustration (hidden on mobile) */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 animate-fade-in">
          <div className="relative">
            <img 
              src="https://readdy.ai/api/search-image?query=Cute%20fox%20mascot%20sitting%20with%20books%20and%20digital%20learning%20elements%2C%20friendly%20cartoon%20style%2C%20soft%20lighting%2C%20gradient%20background%20from%20cyan%20to%20purple%2C%20modern%20illustration%20style%2C%20educational%20theme%20with%20floating%20icons%20like%20stars%20books%20and%20speech%20bubbles%20around%20the%20fox%2C%20minimal%20clean%20background%2C%20warm%20and%20inviting%20atmosphere&width=500&height=600&seq=signin-mascot&orientation=portrait"
              alt="TomoLearn Fox Mascot"
              className="w-96 h-96 object-contain animate-float"
            />
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce delay-300">
              ⭐
            </div>
            <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center animate-bounce delay-700">
              💬
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Ready to Continue?</h3>
            <p className="text-gray-500">Your learning journey awaits!</p>
          </div>
        </div>

        {/* Right side - Sign In Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 animate-slide-in-right">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-200/50 p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text" style={{fontFamily: "Pacifico, serif"}}>
                  TomoLearn
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue your journey with TomoLearn</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 text-black border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-400 transition-all duration-300 peer placeholder-transparent"
                  placeholder="Email"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sky-600 peer-focus:text-sm peer-focus:bg-white"
                >
                  Email
                </label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border text-black border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-400 transition-all duration-300 peer placeholder-transparent"
                  placeholder="Password"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sky-600 peer-focus:text-sm peer-focus:bg-white"
                >
                  Password
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="text-sky-600 hover:text-sky-700 font-semibold hover:underline transition-colors duration-200"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}