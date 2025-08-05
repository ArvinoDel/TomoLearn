
'use client';

import { Breadcrumbs, Chip, LinearProgress, Typography, Box } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import Link from 'next/link';

interface LessonHeaderProps {
  lesson: {
    id: string;
    title: string;
    type: 'video' | 'interactive' | 'speaking' | 'quiz';
    courseId: string;
    courseTitle: string;
    module: string;
    duration: string;
    description: string;
  };
  progress: number;
}

const getTypeConfig = (type: string) => {
  switch (type) {
    case 'video':
      return { color: 'primary', icon: '🎥', label: 'Video Lesson' };
    case 'interactive':
      return { color: 'secondary', icon: '✍️', label: 'Interactive Practice' };
    case 'speaking':
      return { color: 'warning', icon: '🗣️', label: 'Speaking Practice' };
    case 'quiz':
      return { color: 'success', icon: '📝', label: 'Quiz' };
    default:
      return { color: 'default', icon: '📚', label: 'Lesson' };
  }
};

export default function LessonHeader({ lesson, progress }: LessonHeaderProps) {
  const typeConfig = getTypeConfig(lesson.type);

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          className="mb-3 text-sm"
        >
          <Link href="/courses" className="text-slate-600 hover:text-blue-600 transition-colors">
            Courses
          </Link>
          <Link href={`/courses/${lesson.courseId}`} className="text-slate-600 hover:text-blue-600 transition-colors">
            {lesson.courseTitle}
          </Link>
          <Typography color="textPrimary" className="font-medium">
            {lesson.module}
          </Typography>
        </Breadcrumbs>

        {/* Lesson Title and Type */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{typeConfig.icon}</span>
              <Chip 
                label={typeConfig.label}
                color={typeConfig.color as any}
                size="small"
                className="font-medium"
              />
              <span className="text-slate-500 text-sm">• {lesson.duration}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              {lesson.title}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
              {lesson.description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <Box className="w-full">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="body2" className="text-slate-600 font-medium">
              Lesson Progress
            </Typography>
            <Typography variant="body2" className="text-slate-600">
              {Math.round(progress)}% Complete
            </Typography>
          </div>
          <LinearProgress 
            variant="determinate" 
            value={progress}
            className="h-2 rounded-full bg-slate-100"
            sx={{
              '& .MuiLinearProgress-bar': {
                borderRadius: '4px',
                background: progress === 100 ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
}
