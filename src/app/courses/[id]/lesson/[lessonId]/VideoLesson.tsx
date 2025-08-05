
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Paper } from '@mui/material';
import { PlayArrow as PlayIcon, Pause as PauseIcon, VolumeUp as VolumeIcon } from '@mui/icons-material';

interface VideoLessonProps {
  lesson: {
    content: {
      videoUrl: string;
      transcript: Array<{ time: string; text: string }>;
      keyPoints: string[];
    };
  };
  onProgressUpdate: (progress: number) => void;
}

export default function VideoLesson({ lesson, onProgressUpdate }: VideoLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [watchedSegments, setWatchedSegments] = useState<boolean[]>(new Array(lesson.content.transcript.length).fill(false));

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const progress = Math.min((newTime / 480) * 100, 100); // 8 minutes = 480 seconds
          onProgressUpdate(progress);
          
          // Mark segments as watched
          const segmentIndex = Math.floor(newTime / 60); // Every minute
          if (segmentIndex < watchedSegments.length && !watchedSegments[segmentIndex]) {
            setWatchedSegments(prev => {
              const newSegments = [...prev];
              newSegments[segmentIndex] = true;
              return newSegments;
            });
          }
          
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, onProgressUpdate, watchedSegments]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <Card className="rounded-2xl overflow-hidden shadow-lg">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 aspect-video">
            <img 
              src={lesson.content.videoUrl}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            
            {/* Play Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <IconButton 
                  onClick={togglePlay}
                  className="text-blue-600"
                  size="large"
                >
                  {isPlaying ? <PauseIcon className="text-4xl" /> : <PlayIcon className="text-4xl" />}
                </IconButton>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm font-medium">{formatTime(currentTime)} / 8:00</span>
                <div className="flex items-center gap-2">
                  <IconButton size="small" className="text-white">
                    <VolumeIcon />
                  </IconButton>
                  <Chip 
                    label={isPlaying ? "Playing" : "Paused"} 
                    size="small"
                    className={`${isPlaying ? 'bg-green-500' : 'bg-slate-500'} text-white font-medium`}
                  />
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentTime / 480) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar Content */}
      <div className="space-y-6">
        {/* Key Points */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💡</span>
              <Typography variant="h6" className="font-bold text-slate-900">
                Key Learning Points
              </Typography>
            </div>
            <div className="space-y-3">
              {lesson.content.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <Typography variant="body2" className="text-slate-700 leading-relaxed">
                    {point}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transcript */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📝</span>
              <Typography variant="h6" className="font-bold text-slate-900">
                Transcript
              </Typography>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {lesson.content.transcript.map((item, index) => (
                <Paper key={index} className={`p-3 transition-all duration-300 ${
                  watchedSegments[index] ? 'bg-green-50 border-l-4 border-green-500' : 'bg-slate-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <Chip 
                      label={item.time}
                      size="small"
                      className="bg-slate-200 text-slate-700 font-mono text-xs"
                    />
                    {watchedSegments[index] && (
                      <span className="text-green-500 text-sm">✓</span>
                    )}
                  </div>
                  <Typography variant="body2" className="text-slate-700 mt-2 leading-relaxed">
                    {item.text}
                  </Typography>
                </Paper>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
