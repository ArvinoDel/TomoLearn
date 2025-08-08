
'use client';

import { useState } from 'react';
import { Chip, Button, Rating, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import {
  PlayArrow as PlayArrowIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';

interface CourseHeroProps {
  course: any;
}

export default function CourseHero({ course }: CourseHeroProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-slate-600">
              <span>Courses</span>
              <i className="ri-arrow-right-s-line"></i>
              <span>Japanese</span>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-slate-900 font-medium">N5 Beginner</span>
            </nav>

            {/* Course Tags */}
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag: string, index: number) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: index === 0 ? '#ff9800' : index === 1 ? '#4caf50' : '#2196f3',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: index === 0 ? '#f57c00' : index === 1 ? '#388e3c' : '#1976d2',
                    }
                  }}
                />
              ))}
            </div>

            {/* Title and Subtitle */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed">
                {course.subtitle}
              </p>
            </div>

            {/* Course Stats */}
            <div className="flex flex-wrap items-center gap-6 py-4">
              <div className="flex items-center gap-2">
                <Rating value={course.rating} precision={0.1} size="small" readOnly />
                <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                <span className="text-sm text-slate-600">({course.reviewCountFormatted = course.reviewCount.toLocaleString('id-ID')
                } reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-user-line text-sm"></i>
                </div>
                <span className="text-sm">{
                  course.studentCountFormatted = course.studentCount.toLocaleString('id-ID')} students</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-time-line text-sm"></i>
                </div>
                <span className="text-sm">{course.duration}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/payment" passHref>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    backgroundColor: '#00BFCF',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    padding: '12px 32px',
                    borderRadius: '16px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#00a8b8',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  className="whitespace-nowrap"
                >
                  Enroll Now - ${course.price}
                </Button>
              </Link>

              <Link href="/payment" passHref>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: '#00BFCF',
                    borderColor: '#00BFCF',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    padding: '12px 32px',
                    borderRadius: '16px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#00BFCF',
                      color: 'white',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  className="whitespace-nowrap"
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4">
              <Tooltip title="Add to Wishlist">
                <IconButton
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  sx={{
                    color: isWishlisted ? '#e91e63' : '#64748b',
                    '&:hover': { backgroundColor: '#f1f5f9' }
                  }}
                >
                  {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Share Course">
                <IconButton sx={{ color: '#64748b', '&:hover': { backgroundColor: '#f1f5f9' } }}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Save for Later">
                <IconButton sx={{ color: '#64748b', '&:hover': { backgroundColor: '#f1f5f9' } }}>
                  <BookmarkBorderIcon />
                </IconButton>
              </Tooltip>
            </div>

            {/* Special Offer Banner */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-fire-fill text-white text-lg"></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Limited Time: 50% Off!
                  </div>
                  <div className="text-xs text-slate-600">
                    <span className="line-through">${course.originalPrice}</span> → ${course.price} • Ends in 2 days
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Course Preview */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://readdy.ai/api/search-image?query=Japanese%20language%20learning%20course%20preview%20showing%20beautiful%20traditional%20and%20modern%20Japan%20elements%2C%20cherry%20blossoms%2C%20Mount%20Fuji%20in%20background%2C%20hiragana%20and%20katakana%20characters%20floating%20elegantly%2C%20students%20learning%20with%20books%20and%20technology%2C%20warm%20and%20inviting%20educational%20atmosphere%2C%20high%20quality%20photography%20style&width=600&height=400&seq=japanese-course-hero&orientation=landscape"
                alt={course.title}
                className="w-full h-96 object-cover object-center"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="contained"
                  onClick={() => window.location.href = 'https://youtube.com'}
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#1f2937',
                    '&:hover': {
                      backgroundColor: 'white',
                      transform: 'scale(1.1)',
                    },
                    borderRadius: '50px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  Preview Course
                </Button>
              </div>
            </div>

            {/* Floating Course Info Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-graduation-cap-fill text-white text-xl"></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{course.lessons} Lessons</div>
                  <div className="text-xs text-slate-600">{course.hours} Hours Content</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-ai-generate text-white text-xl"></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">AI-Powered</div>
                  <div className="text-xs text-slate-600">Smart Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
