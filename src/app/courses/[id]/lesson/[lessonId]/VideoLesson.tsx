'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Paper } from '@mui/material';
import { PlayArrow as PlayIcon, Pause as PauseIcon, VolumeUp as VolumeIcon } from '@mui/icons-material';

interface VideoLessonProps {
  lesson: {
    content: {
      videoUrl: string;
      posterUrl?: string; // Optional poster image
      transcript: Array<{ time: string; text: string }>;
      keyPoints: string[];
    };
  };
  onProgressUpdate: (progress: number) => void;
}

export default function VideoLesson({ lesson, onProgressUpdate }: VideoLessonProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [watchedSegments, setWatchedSegments] = useState<boolean[]>(
    new Array(lesson.content.transcript.length).fill(false)
  );

  // Check if URL is actually a video file
  const isVideoFile = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const urlWithoutParams = url.split('?')[0].toLowerCase();
    return videoExtensions.some(ext => urlWithoutParams.endsWith(ext));
  };

  // Simulate video playback for non-video URLs (like images)
  const simulateVideoPlayback = () => {
    if (!isVideoMode) {
      // Use estimated duration from transcript or default to 8 minutes
      const estimatedDuration = lesson.content.transcript.length > 0 
        ? timeToSeconds(lesson.content.transcript[lesson.content.transcript.length - 1].time) + 30
        : 480; // 8 minutes default
      
      setDuration(estimatedDuration);
      
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Stop at the end
          if (newTime >= estimatedDuration) {
            setIsPlaying(false);
            return estimatedDuration;
          }
          
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  };

  // Separate effect for handling progress updates and watched segments
  useEffect(() => {
    if (!isVideoMode && currentTime > 0) {
      // Calculate progress
      const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
      onProgressUpdate(progress);
      
      // Mark segments as watched based on transcript timing
      lesson.content.transcript.forEach((item, index) => {
        const segmentTime = timeToSeconds(item.time);
        if (currentTime >= segmentTime && !watchedSegments[index]) {
          setWatchedSegments(prev => {
            const newSegments = [...prev];
            newSegments[index] = true;
            return newSegments;
          });
        }
      });
    }
  }, [currentTime, duration, isVideoMode, lesson.content.transcript, onProgressUpdate, watchedSegments]);

  // Convert time string (MM:SS) to seconds
  const timeToSeconds = (timeStr: string): number => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  // Initialize video mode detection
  useEffect(() => {
    const isVideo = isVideoFile(lesson.content.videoUrl);
    setIsVideoMode(isVideo);
    setHasVideoError(false);
  }, [lesson.content.videoUrl]);

  // Handle video playback simulation for non-video URLs
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    if (isPlaying && !isVideoMode) {
      cleanup = simulateVideoPlayback();
    }
    
    return cleanup;
  }, [isPlaying, isVideoMode]);

  // Update progress based on actual video time (for real videos)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoMode) return;

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      setCurrentTime(current);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setHasVideoError(false);
    };

    const handleError = () => {
      console.warn('Video failed to load, switching to simulation mode');
      setHasVideoError(true);
      setIsVideoMode(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isVideoMode]);

  // Separate effect for handling progress updates and watched segments for real videos
  useEffect(() => {
    if (isVideoMode && currentTime > 0 && duration > 0) {
      // Calculate progress based on actual duration
      const progress = Math.min((currentTime / duration) * 100, 100);
      onProgressUpdate(progress);

      // Mark segments as watched based on transcript timing
      lesson.content.transcript.forEach((item, index) => {
        const segmentTime = timeToSeconds(item.time);
        if (currentTime >= segmentTime && !watchedSegments[index]) {
          setWatchedSegments(prev => {
            const newSegments = [...prev];
            newSegments[index] = true;
            return newSegments;
          });
        }
      });
    }
  }, [currentTime, duration, isVideoMode, lesson.content.transcript, onProgressUpdate, watchedSegments]);

  const togglePlay = () => {
    if (isVideoMode && !hasVideoError) {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => {
          console.warn('Video play failed, switching to simulation mode');
          setHasVideoError(true);
          setIsVideoMode(false);
          setIsPlaying(!isPlaying);
        });
      }
    } else {
      // For image URLs or failed videos, use simulation
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Jump to specific time when transcript item is clicked
  const jumpToTime = (timeStr: string) => {
    const seconds = timeToSeconds(timeStr);
    
    if (isVideoMode && !hasVideoError) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = seconds;
      }
    } else {
      // For simulation mode, just update the current time
      setCurrentTime(seconds);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <Card className="rounded-2xl overflow-hidden shadow-lg">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 aspect-video">
            {isVideoMode && !hasVideoError ? (
              /* Real Video Element */
              <video 
                ref={videoRef}
                src={lesson.content.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                poster={lesson.content.posterUrl}
              />
            ) : (
              /* Image/Poster Display */
              <img 
                src={lesson.content.videoUrl}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            {/* Play Controls Overlay - only show when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <IconButton 
                    onClick={togglePlay}
                    className="text-blue-600"
                    size="large"
                  >
                    <PlayIcon className="text-4xl" />
                  </IconButton>
                </div>
              </div>
            )}

            {/* Mode Indicator */}
            {!isVideoMode && (
              <div className="absolute top-4 right-4">
                <Chip 
                  label="Demo Mode" 
                  size="small"
                  className="bg-yellow-500 text-white font-medium"
                />
              </div>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className="flex items-center gap-2">
                  <IconButton 
                    size="small" 
                    className="text-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </IconButton>
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
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
                  }}
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

        {/* Interactive Transcript */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📝</span>
              <Typography variant="h6" className="font-bold text-slate-900">
                Interactive Transcript
              </Typography>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {lesson.content.transcript.map((item, index) => (
                <Paper 
                  key={index} 
                  className={`p-3 transition-all duration-300 cursor-pointer hover:shadow-md ${
                    watchedSegments[index] 
                      ? 'bg-green-50 border-l-4 border-green-500' 
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  onClick={() => jumpToTime(item.time)}
                >
                  <div className="flex items-start gap-3">
                    <Chip 
                      label={item.time}
                      size="small"
                      className="bg-blue-100 text-blue-700 font-mono text-xs hover:bg-blue-200 cursor-pointer"
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