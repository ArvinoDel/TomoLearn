
import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Tooltip,
  LinearProgress,
  Rating,
  Grid,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayArrowIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import CourseHero from './CourseHero';
import CourseOverview from './CourseOverview';
import AboutSection from './AboutSection';
import SyllabusSection from './SyllabusSection';
import InstructorSection from './InstructorSection';
import ReviewsSection from './ReviewsSection';
import CTASection from './CTASection';

// Mock data for the course
const courseData = {
  id: 4,
  title: "Master Japanese N5 – 30 Days",
  subtitle: "Learn real-world phrases with AI-guided lessons",
  language: "japanese",
  level: "Beginner",
  rating: 4.9,
  reviewCount: 2847,
  studentCount: 12459,
  price: 49,
  originalPrice: 99,
  duration: "30 days",
  lessons: 45,
  hours: 12,
  skills: ["Speaking", "Reading", "Hiragana", "Katakana", "Basic Kanji"],
  tags: ["Top Rated", "Bestseller", "AI-Powered"],
  instructor: {
    name: "Yuki Tanaka",
    title: "Native Japanese Teacher & AI Learning Specialist",
    avatar: "https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20language%20teacher%20smiling%20warmly%2C%20modern%20educational%20setting%2C%20professional%20headshot%20style%2C%20clean%20background%2C%20confident%20and%20friendly%20appearance&width=150&height=150&seq=instructor-yuki&orientation=squarish",
    bio: "Native Japanese speaker with 8+ years of teaching experience. Specialized in accelerated learning techniques.",
    rating: 4.9,
    students: 45000,
    courses: 12
  },
  description: "Master Japanese fundamentals in just 30 days with our revolutionary AI-powered learning system. Perfect for complete beginners who want to build a strong foundation in Japanese language and culture.",
  whatYouLearn: [
    "Master Hiragana and Katakana writing systems",
    "Learn 500+ essential Japanese words and phrases",
    "Understand basic grammar patterns and sentence structure",
    "Practice real conversations with AI speaking partner",
    "Discover Japanese culture and social etiquette",
    "Build confidence for JLPT N5 exam preparation"
  ],
  syllabus: [
    {
      week: 1,
      title: "Foundation - Hiragana & Basic Phrases",
      lessons: 12,
      duration: "3 hours",
      topics: [
        { title: "Introduction to Japanese Language", type: "video", duration: "15 min", completed: true },
        { title: "Hiragana Characters A-O", type: "interactive", duration: "20 min", completed: true },
        { title: "Basic Greetings Practice", type: "speaking", duration: "10 min", completed: false },
        { title: "Week 1 Quiz", type: "quiz", duration: "15 min", completed: false }
      ]
    },
    {
      week: 2,
      title: "Building Blocks - Katakana & Numbers",
      lessons: 10,
      duration: "2.5 hours",
      topics: [
        { title: "Katakana Writing System", type: "video", duration: "18 min", completed: false },
        { title: "Numbers 1-100", type: "interactive", duration: "25 min", completed: false },
        { title: "Time & Dates", type: "speaking", duration: "12 min", completed: false },
        { title: "Cultural Insight: Japanese Etiquette", type: "video", duration: "10 min", completed: false }
      ]
    },
    {
      week: 3,
      title: "Communication - Essential Phrases",
      lessons: 11,
      duration: "3 hours",
      topics: [
        { title: "Restaurant Conversations", type: "speaking", duration: "20 min", completed: false },
        { title: "Shopping Vocabulary", type: "interactive", duration: "15 min", completed: false },
        { title: "Direction & Transportation", type: "video", duration: "18 min", completed: false },
        { title: "Practice Test", type: "quiz", duration: "20 min", completed: false }
      ]
    },
    {
      week: 4,
      title: "Mastery - Grammar & Conversation",
      lessons: 12,
      duration: "3.5 hours",
      topics: [
        { title: "Basic Grammar Patterns", type: "video", duration: "25 min", completed: false },
        { title: "Family & Relationships", type: "interactive", duration: "18 min", completed: false },
        { title: "Final Conversation Challenge", type: "speaking", duration: "30 min", completed: false },
        { title: "N5 Readiness Assessment", type: "quiz", duration: "45 min", completed: false }
      ]
    }
  ],
  reviews: [
    {
      name: "Sarah Chen",
      rating: 5,
      comment: "Incredible course! I went from zero Japanese to having basic conversations in just one month. The AI tutor is amazing!",
      date: "2 days ago",
      helpful: 24
    },
    {
      name: "Mike Rodriguez",
      rating: 5,
      comment: "Best language course I've ever taken. The structure is perfect and Yuki-sensei explains everything clearly.",
      date: "1 week ago", 
      helpful: 18
    },
    {
      name: "Emma Thompson",
      rating: 4,
      comment: "Really enjoyed the cultural insights. Made learning feel more meaningful and connected to real life.",
      date: "2 weeks ago",
      helpful: 12
    }
  ]
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-16 w-12 h-12 text-blue-200 animate-pulse" style={{ animationDelay: '0s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <i className="ri-book-open-line text-4xl"></i>
          </div>
        </div>
        <div className="absolute top-40 right-20 w-10 h-10 text-purple-200 animate-bounce" style={{ animationDelay: '2s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <i className="ri-star-fill text-3xl"></i>
          </div>
        </div>
        <div className="absolute bottom-40 left-1/4 w-8 h-8 text-orange-200 animate-pulse" style={{ animationDelay: '4s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <i className="ri-trophy-line text-2xl"></i>
          </div>
        </div>
      </div>

      <CourseHero course={courseData} />
      <CourseOverview course={courseData} />
      <AboutSection course={courseData} />
      <SyllabusSection course={courseData} />
      <InstructorSection instructor={courseData.instructor} />
      <ReviewsSection reviews={courseData.reviews} rating={courseData.rating} reviewCount={courseData.reviewCount} />
      <CTASection course={courseData} />
    </div>
  );
}
