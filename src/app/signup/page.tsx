
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    // Future integration with NextAuth or Firebase
    console.log('Google Sign Up clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/50 flex items-center justify-center px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 right-16 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-64 left-12 w-32 h-32 bg-pink-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 bg-indigo-200/25 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex items-center justify-center lg:justify-between gap-12 relative z-10">
        {/* Left side - Welcome Message (hidden on mobile) */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 animate-slide-in-left">
          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=Friendly%20fox%20character%20welcoming%20new%20users%20with%20open%20arms%2C%20surrounded%20by%20colorful%20learning%20icons%20like%20books%20stars%20graduation%20cap%20and%20speech%20bubbles%2C%20modern%20cartoon%20illustration%20style%2C%20warm%20gradient%20background%20from%20purple%20to%20pink%2C%20inviting%20and%20encouraging%20atmosphere%2C%20educational%20symbols%20floating%20around%2C%20clean%20minimal%20background&width=500&height=600&seq=signup-welcome&orientation=portrait"
              alt="Welcome to TomoLearn"
              className="w-96 h-96 object-contain animate-float"
            />
            <div className="absolute -top-6 -right-2 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-bounce delay-300">
              🎓
            </div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce delay-500">
              ✨
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-3xl font-bold text-gray-700 mb-3">Join TomoLearn Today!</h3>
            <p className="text-lg text-gray-600 max-w-md">Start your language learning adventure with millions of learners worldwide</p>
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>2M+ Learners</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>15+ Languages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sign Up Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 animate-slide-in-up">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-200/50 p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text" style={{ fontFamily: "Pacifico, serif" }}>
                  TomoLearn
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Free Account</h1>
              <p className="text-gray-600">Start learning today — it's fast and free</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 text-black border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 peer placeholder-transparent ${errors.name ? 'border-red-300 focus:ring-red-500/50 focus:border-red-400' : 'border-gray-200 focus:ring-purple-500/50 focus:border-purple-400'
                    }`}
                  placeholder="Full Name"
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white ${errors.name ? 'text-red-600 peer-placeholder-shown:text-gray-400 peer-focus:text-red-600' : 'text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-purple-600'
                    }`}
                >
                  👤 Full Name
                </label>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 text-black border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 peer placeholder-transparent ${errors.email ? 'border-red-300 focus:ring-red-500/50 focus:border-red-400' : 'border-gray-200 focus:ring-purple-500/50 focus:border-purple-400'
                    }`}
                  placeholder="Email"
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white ${errors.email ? 'text-red-600 peer-placeholder-shown:text-gray-400 peer-focus:text-red-600' : 'text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-purple-600'
                    }`}
                >
                  📧 Email
                </label>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 border text-black rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 peer placeholder-transparent ${errors.password
                      ? 'border-red-300 focus:ring-red-500/50 focus:border-red-400'
                      : 'border-gray-200 focus:ring-purple-500/50 focus:border-purple-400'
                    }`}
                  placeholder="Password"
                  required
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white ${errors.password
                      ? 'text-red-600 peer-placeholder-shown:text-gray-400 peer-focus:text-red-600'
                      : 'text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-purple-600'
                    }`}
                >
                  🔒 Password
                </label>

                {/* 👁️ Icon Toggle */}
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-xl cursor-pointer select-none"
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>


              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 border text-black rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 peer placeholder-transparent ${errors.confirmPassword
                      ? 'border-red-300 focus:ring-red-500/50 focus:border-red-400'
                      : 'border-gray-200 focus:ring-purple-500/50 focus:border-purple-400'
                    }`}
                  placeholder="Confirm Password"
                  required
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white ${errors.confirmPassword
                      ? 'text-red-600 peer-placeholder-shown:text-gray-400 peer-focus:text-red-600'
                      : 'text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-purple-600'
                    }`}
                >
                  🔐 Confirm Password
                </label>

                {/* 👁️ Icon Toggle */}
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-xl cursor-pointer select-none"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>


              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setAcceptTerms(!acceptTerms)}
                    className={`w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200 ${acceptTerms
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                        : errors.terms
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-300 bg-white hover:border-purple-400'
                      }`}
                  >
                    {acceptTerms && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <label htmlFor="terms" className={`text-sm cursor-pointer ${errors.terms ? 'text-red-600' : 'text-gray-600'}`}>
                  I accept the{' '}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-700 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-700 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  '🚀 Create Account'
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

              {/* Google Sign Up */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/signin"
                  className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}