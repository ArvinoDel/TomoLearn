
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Chip, LinearProgress, Box, IconButton, Paper } from '@mui/material';
import { 
  Mic as MicIcon, 
  MicOff as MicOffIcon, 
  PlayArrow as PlayIcon,
  VolumeUp as VolumeIcon,
  Replay as ReplayIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

interface SpeakingLessonProps {
  lesson: {
    content: {
      phrases: Array<{
        japanese: string;
        romaji: string;
        english: string;
        audio: string;
      }>;
    };
  };
  onProgressUpdate: (progress: number) => void;
}

export default function SpeakingLesson({ lesson, onProgressUpdate }: SpeakingLessonProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState<boolean[]>(new Array(lesson.content.phrases.length).fill(false));
  const [recordingTime, setRecordingTime] = useState(0);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  
  const currentPhrase = lesson.content.phrases[currentPhraseIndex];
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setPronunciationScore(null);
    setShowWaveform(true);
    
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 0.1);
    }, 100);
    
    // Simulate recording completion after 3 seconds
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowWaveform(false);
    
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    
    // Simulate pronunciation analysis
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      setPronunciationScore(score);
    }, 1000);
  };

  const playAudio = () => {
    setIsPlayingAudio(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2000);
  };

  const markPhraseComplete = () => {
    const newCompleted = [...completedPhrases];
    newCompleted[currentPhraseIndex] = true;
    setCompletedPhrases(newCompleted);
    
    const progress = (newCompleted.filter(Boolean).length / lesson.content.phrases.length) * 100;
    onProgressUpdate(progress);
  };

  const nextPhrase = () => {
    if (currentPhraseIndex < lesson.content.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setPronunciationScore(null);
      setRecordingTime(0);
    }
  };

  const prevPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1);
      setPronunciationScore(null);
      setRecordingTime(0);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent pronunciation! 🌟';
    if (score >= 80) return 'Good job! Keep practicing 👍';
    return 'Try again for better pronunciation 💪';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <Card className="rounded-2xl shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-bold text-slate-900">
              Speaking Practice Progress
            </Typography>
            <Chip 
              label={`${currentPhraseIndex + 1} / ${lesson.content.phrases.length}`}
              className="bg-blue-100 text-blue-700 font-semibold"
            />
          </div>
          <LinearProgress 
            variant="determinate" 
            value={((completedPhrases.filter(Boolean).length) / lesson.content.phrases.length) * 100}
            className="h-3 rounded-full bg-slate-100"
            sx={{
              '& .MuiLinearProgress-bar': {
                borderRadius: '6px',
                background: 'linear-gradient(90deg, #10b981, #059669)'
              }
            }}
          />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Phrase Display */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {completedPhrases[currentPhraseIndex] && (
                <div className="flex justify-center">
                  <Chip 
                    icon={<CheckIcon />}
                    label="Completed"
                    className="bg-green-100 text-green-700 font-semibold"
                  />
                </div>
              )}
              
              {/* Japanese Text */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <Typography variant="h3" className="font-light text-slate-800 mb-4">
                  {currentPhrase.japanese}
                </Typography>
                <Typography variant="h6" className="text-slate-600 font-mono">
                  {currentPhrase.romaji}
                </Typography>
              </div>

              {/* English Translation */}
              <Paper className="p-4 bg-slate-50 rounded-xl">
                <Typography variant="h6" className="text-slate-700 font-medium">
                  "{currentPhrase.english}"
                </Typography>
              </Paper>

              {/* Audio Playback */}
              <div className="flex justify-center">
                <Button
                  variant="outlined"
                  startIcon={isPlayingAudio ? <VolumeIcon /> : <PlayIcon />}
                  onClick={playAudio}
                  disabled={isPlayingAudio}
                  className="rounded-xl px-6 py-3"
                >
                  {isPlayingAudio ? 'Playing...' : 'Listen'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recording Interface */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">🎤</span>
                <Typography variant="h6" className="font-bold text-slate-900">
                  Record Your Pronunciation
                </Typography>
              </div>

              {/* Recording Button */}
              <div className="relative">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording ? 'bg-red-500 scale-110' : 'bg-blue-500 hover:bg-blue-600'
                }`}>
                  <IconButton 
                    onClick={isRecording ? stopRecording : startRecording}
                    className="text-white p-4"
                    size="large"
                  >
                    {isRecording ? <MicOffIcon className="text-4xl" /> : <MicIcon className="text-4xl" />}
                  </IconButton>
                </div>
                
                {/* Recording Animation */}
                {isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border-4 border-red-400 rounded-full animate-ping opacity-30"></div>
                  </div>
                )}
              </div>

              <Typography variant="body1" className="text-slate-600">
                {isRecording ? 'Recording... Speak clearly!' : 'Tap to start recording'}
              </Typography>

              {/* Recording Time */}
              {(isRecording || recordingTime > 0) && (
                <div className="bg-slate-100 rounded-xl p-3">
                  <Typography variant="body2" className="font-mono text-slate-700">
                    {recordingTime.toFixed(1)}s
                  </Typography>
                </div>
              )}

              {/* Waveform Visualization */}
              {showWaveform && (
                <div className="flex justify-center items-end space-x-1 h-16">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-t animate-pulse"
                      style={{
                        width: '4px',
                        height: `${Math.random() * 40 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Pronunciation Score */}
              {pronunciationScore !== null && (
                <Paper className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                  <Typography variant="h5" className={`font-bold ${getScoreColor(pronunciationScore)} mb-2`}>
                    {pronunciationScore}%
                  </Typography>
                  <Typography variant="body2" className="text-slate-600">
                    {getScoreMessage(pronunciationScore)}
                  </Typography>
                </Paper>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                {pronunciationScore !== null && pronunciationScore >= 70 && !completedPhrases[currentPhraseIndex] && (
                  <Button 
                    variant="contained"
                    onClick={markPhraseComplete}
                    className="bg-green-600 hover:bg-green-700 rounded-xl px-6"
                  >
                    Mark Complete
                  </Button>
                )}
                
                {pronunciationScore !== null && pronunciationScore < 70 && (
                  <Button 
                    variant="outlined"
                    startIcon={<ReplayIcon />}
                    onClick={() => setPronunciationScore(null)}
                    className="rounded-xl"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <Card className="rounded-2xl shadow-lg mt-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outlined" 
              onClick={prevPhrase}
              disabled={currentPhraseIndex === 0}
              className="rounded-xl"
            >
              Previous Phrase
            </Button>
            
            <div className="text-center">
              <Typography variant="body2" className="text-slate-500">
                Practice each phrase until you get 70% or higher
              </Typography>
            </div>
            
            <Button 
              variant="contained" 
              onClick={nextPhrase}
              disabled={currentPhraseIndex === lesson.content.phrases.length - 1 || !completedPhrases[currentPhraseIndex]}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              Next Phrase
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
