
'use client';

import { useState } from 'react';
import { Rating, Button, LinearProgress } from '@mui/material';

interface ReviewsSectionProps {
  reviews: any[];
  rating: number;
  reviewCount: number;
}

export default function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const ratingDistribution = [
    { stars: 5, count: 2156, percentage: 76 },
    { stars: 4, count: 542, percentage: 19 },
    { stars: 3, count: 102, percentage: 4 },
    { stars: 2, count: 28, percentage: 1 },
    { stars: 1, count: 19, percentage: 0 }
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Student Reviews ⭐
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See what our students are saying about their learning experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Left - Rating Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-900 mb-2">{rating}</div>
                <Rating value={rating} precision={0.1} size="large" readOnly />
                <p className="text-slate-600 mt-2">
                  Based on {reviewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} reviews
                </p>

              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium text-gray-900">{item.stars}</span>
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-star-fill text-yellow-400 text-xs"></i>
                      </div>
                    </div>
                    <div className="flex-1">
                      <LinearProgress
                        variant="determinate"
                        value={item.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: '#f1f5f9',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#fbbf24',
                            borderRadius: 3,
                          }
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-600 w-10 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Individual Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {displayedReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {review.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <span className="text-sm text-slate-500">{review.date}</span>
                    </div>
                    <Rating value={review.rating} size="small" readOnly />
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  "{review.comment}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors duration-200 text-sm">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-thumb-up-line"></i>
                      </div>
                      <span>Helpful ({review.helpful})</span>
                    </button>

                    <button className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors duration-200 text-sm">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-reply-line"></i>
                      </div>
                      <span>Reply</span>
                    </button>
                  </div>

                  <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
                </div>
              </div>
            ))}

            {/* Show More Button */}
            {reviews.length > 3 && (
              <div className="text-center">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  sx={{
                    color: '#00BFCF',
                    borderColor: '#00BFCF',
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
                  {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Review Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <i className="ri-check-double-line text-white text-2xl"></i>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Course Quality</h4>
            <div className="flex items-center justify-center gap-2">
              <Rating value={4.9} precision={0.1} size="small" readOnly />
              <span className="text-sm font-medium text-gray-900">4.9/5</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <i className="ri-user-star-line text-white text-2xl"></i>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Instructor</h4>
            <div className="flex items-center justify-center gap-2">
              <Rating value={4.9} precision={0.1} size="small" readOnly />
              <span className="text-sm font-medium text-gray-900">4.9/5</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <i className="ri-price-tag-3-line text-white text-2xl"></i>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Value</h4>
            <div className="flex items-center justify-center gap-2">
              <Rating value={4.8} precision={0.1} size="small" readOnly />
              <span className="text-sm font-medium text-gray-900">4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
