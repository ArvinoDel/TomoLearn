
'use client';

import { Button, Chip, Paper } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, CheckCircle as CheckIcon } from '@mui/icons-material';
import Link from 'next/link';

interface LessonNavigationProps {
  courseId: string;
  lessonId: string;
  isCompleted: boolean;
  onComplete: () => void;
  progress: number;
}

const getNextLessonId = (currentId: string): string | null => {
  const id = parseInt(currentId);
  if (id < 5) return (id + 1).toString();
  return null;
};

const getPrevLessonId = (currentId: string): string | null => {
  const id = parseInt(currentId);
  if (id > 1) return (id - 1).toString();
  return null;
};

export default function LessonNavigation({ 
  courseId, 
  lessonId, 
  isCompleted, 
  onComplete, 
  progress 
}: LessonNavigationProps) {
  const nextLessonId = getNextLessonId(lessonId);
  const prevLessonId = getPrevLessonId(lessonId);

  return (
    <div className="bottom-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Paper className="rounded-2xl shadow-lg p-4 bg-gradient-to-r from-white to-slate-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Previous Lesson */}
            <div className="flex-shrink-0">
              {prevLessonId ? (
                <Link href={`/courses/${courseId}/lesson/${prevLessonId}`}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    className="rounded-xl hover:scale-105 transition-all duration-200"
                  >
                    Previous Lesson
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${courseId}`}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    className="rounded-xl hover:scale-105 transition-all duration-200"
                  >
                    Back to Course
                  </Button>
                </Link>
              )}
            </div>

            {/* Center: Progress & Complete Button */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Chip 
                    label={`${Math.round(progress)}% Complete`}
                    size="small"
                    className={`font-semibold ${
                      progress === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  />
                  {isCompleted && (
                    <CheckIcon className="text-green-500" />
                  )}
                </div>
              </div>

              {progress >= 70 && !isCompleted && (
                <Button
                  variant="contained"
                  onClick={onComplete}
                  startIcon={<CheckIcon />}
                  className="bg-green-600 hover:bg-green-700 rounded-xl px-6 hover:scale-105 transition-all duration-200 whitespace-nowrap"
                >
                  Mark Complete
                </Button>
              )}
            </div>

            {/* Right: Next Lesson */}
            <div className="flex-shrink-0">
              {nextLessonId ? (
                <Link href={`/courses/${courseId}/lesson/${nextLessonId}`}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    disabled={!isCompleted}
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl hover:scale-105 transition-all duration-200 whitespace-nowrap disabled:bg-slate-300"
                  >
                    Next Lesson
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${courseId}`}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    disabled={!isCompleted}
                    className="bg-green-600 hover:bg-green-700 rounded-xl hover:scale-105 transition-all duration-200 whitespace-nowrap disabled:bg-slate-300"
                  >
                    Complete Course
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="mt-4 sm:hidden">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
