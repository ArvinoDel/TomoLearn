
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Breadcrumbs,
  Chip,
  Button,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Typography,
  Box,
  Paper,
  Divider
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeIcon,
  CheckCircle as CheckIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  NavigateNext as NavigateNextIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Replay as ReplayIcon
} from '@mui/icons-material';
import LessonHeader from './LessonHeader';
import VideoLesson from './VideoLesson';
import InteractiveLesson from './InteractiveLesson';
import SpeakingLesson from './SpeakingLesson';
import QuizLesson from './QuizLesson';
import LessonNavigation from './LessonNavigation';

// Mock lesson data
const lessonData = {
  '1': {
    id: '1',
    title: "Introduction to Hiragana あ-お",
    type: "interactive" as const,
    courseId: '4',
    courseTitle: "Master Japanese N5 – 30 Days",
    module: "Module 1: Foundation",
    duration: "15 min",
    completed: false,
    progress: 0,
    description: "Learn the first 5 Hiragana characters with interactive writing practice",
    content: {
      characters: [
        { char: "あ", romaji: "a", stroke: "2 strokes", meaning: "Vowel sound 'ah'" },
        { char: "い", romaji: "i", stroke: "2 strokes", meaning: "Vowel sound 'ee'" },
        { char: "う", romaji: "u", stroke: "3 strokes", meaning: "Vowel sound 'oo'" },
        { char: "え", romaji: "e", stroke: "3 strokes", meaning: "Vowel sound 'eh'" },
        { char: "お", romaji: "o", stroke: "3 strokes", meaning: "Vowel sound 'oh'" }
      ]
    }
  },
  '2': {
    id: '2',
    title: "Basic Greetings Conversation",
    type: "speaking" as const,
    courseId: '4',
    courseTitle: "Master Japanese N5 – 30 Days",
    module: "Module 1: Foundation",
    duration: "12 min",
    completed: false,
    progress: 0,
    description: "Practice essential greeting phrases with AI pronunciation feedback",
    content: {
      phrases: [
        { japanese: "こんにちは", romaji: "Konnichiwa", english: "Hello/Good afternoon", audio: "https://ik.imagekit.io/tdqizhhci/file_example_MP3_700KB.mp3" },
        { japanese: "おはよう", romaji: "Ohayou", english: "Good morning (casual)", audio: "greeting2.mp3" },
        { japanese: "こんばんは", romaji: "Konbanwa", english: "Good evening", audio: "greeting3.mp3" },
        { japanese: "はじめまして", romaji: "Hajimemashite", english: "Nice to meet you", audio: "greeting4.mp3" }
      ]
    }
  },
  '3': {
    id: '3',
    title: "Japanese Culture Introduction",
    type: "video" as const,
    courseId: '4',
    courseTitle: "Master Japanese N5 – 30 Days",
    module: "Module 1: Foundation",
    duration: "8 min",
    completed: true,
    progress: 100,
    description: "Understanding Japanese social customs and cultural context",
    content: {
      videoUrl: "https://readdy.ai/api/search-image?query=Modern%20Japanese%20cultural%20scene%20with%20traditional%20elements%2C%20cherry%20blossoms%2C%20peaceful%20temple%20garden%2C%20people%20in%20both%20traditional%20and%20modern%20clothing%2C%20educational%20documentary%20style%2C%20warm%20natural%20lighting&width=800&height=450&seq=japan-culture-video&orientation=landscape",
      transcript: [
        { time: "0:00", text: "Welcome to Japanese culture! Today we'll explore the beautiful customs that shape daily life in Japan." },
        { time: "0:30", text: "Bowing is a fundamental greeting. The depth of your bow shows respect and courtesy." },
        { time: "1:15", text: "Gift-giving, or 'omiyage', is deeply rooted in Japanese society..." }
      ],
      keyPoints: [
        "Respect and harmony (wa) are central values",
        "Bowing etiquette varies by situation",
        "Gift-giving shows thoughtfulness",
        "Seasonal awareness influences daily life"
      ]
    }
  },
  '4': {
    id: '4',
    title: "Quiz: Japanese Culture Checkpoint",
    type: "quiz" as const,
    courseId: '4',
    courseTitle: "Master Japanese N5 – 30 Days",
    module: "Module 1: Foundation",
    duration: "5 min",
    completed: false,
    progress: 0,
    description: "Test your understanding of Japanese cultural practices and daily etiquette.",
    content: {
      questions: [
        {
          question: "What does the depth of a bow in Japanese culture signify?",
          options: [
            "The length of your conversation",
            "The season of the year",
            "The level of respect and formality",
            "The closeness of relationship"
          ],
          correctAnswer: "The level of respect and formality"
        },
        {
          question: "What is 'omiyage' in Japanese tradition?",
          options: [
            "A type of tea ceremony",
            "Seasonal clothing",
            "Gift-giving practice",
            "Greeting style"
          ],
          correctAnswer: "Gift-giving practice"
        },
        {
          question: "Which value is central to Japanese social harmony?",
          options: [
            "Wa (harmony)",
            "Kawaii (cuteness)",
            "Genki (energy)",
            "Yugen (mystery)"
          ],
          correctAnswer: "Wa (harmony)"
        }
      ],
      passingScore: 70,
      feedback: {
        success: "Excellent! You’re on your way to understanding the soul of Japan.",
        fail: "Not bad! Review the video again to master the cultural subtleties."
      }
    }
  }

};

interface LessonDetailProps {
  courseId: string;
  lessonId: string;
}

export default function LessonDetail({ courseId, lessonId }: LessonDetailProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = lessonData[lessonId as keyof typeof lessonData];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
          <div className="relative p-8 text-center">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-lg"></div>

            {/* Success icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Main content */}
            <Typography
              variant="h4"
              className="mb-3 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent font-bold"
            >
              Congratulations!
            </Typography>

            <Typography
              variant="h6"
              className="mb-6 text-slate-600 font-medium"
            >
              All Lessons Have Been Completed
            </Typography>

            <Typography
              variant="body1"
              className="mb-8 text-slate-500 leading-relaxed"
            >
              You've successfully finished all the lessons in this course. Great job on your learning journey!
            </Typography>

            {/* Action button */}
            <Link href={`/courses/${courseId}`}>
              <Button
                variant="contained"
                size="large"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-3 rounded-xl font-semibold"
                startIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                }
              >
                Back to Course
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const handleComplete = () => {
    setIsCompleted(true);
    setProgress(100);
  };

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-8 h-8 text-blue-200 animate-pulse" style={{ animationDelay: '0s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <i className="ri-lightbulb-line text-2xl"></i>
          </div>
        </div>
        <div className="absolute top-1/3 right-16 w-6 h-6 text-purple-200 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <i className="ri-star-fill text-xl"></i>
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-10 h-10 text-orange-200 animate-pulse" style={{ animationDelay: '3s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <i className="ri-heart-fill text-2xl"></i>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <LessonHeader lesson={lesson} progress={progress} />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {lesson.type === 'video' && (
            <VideoLesson lesson={lesson} onProgressUpdate={handleProgressUpdate} />
          )}
          {lesson.type === 'interactive' && (
            <InteractiveLesson lesson={lesson} onProgressUpdate={handleProgressUpdate} />
          )}
          {lesson.type === 'speaking' && (
            <SpeakingLesson lesson={lesson} onProgressUpdate={handleProgressUpdate} />
          )}
          {lesson.type === 'quiz' && (
            <QuizLesson lesson={lesson} onProgressUpdate={handleProgressUpdate} />
          )}
        </div>

        <LessonNavigation
          courseId={courseId}
          lessonId={lessonId}
          isCompleted={isCompleted}
          onComplete={handleComplete}
          progress={progress}
        />
      </div>
    </div>
  );
}
