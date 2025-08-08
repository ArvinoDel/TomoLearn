'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Chip, Paper, Box } from '@mui/material';
import { Check as CheckIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface InteractiveLessonProps {
  lesson: {
    content: {
      characters: Array<{
        char: string;
        romaji: string;
        stroke: string;
        meaning: string;
      }>;
    };
  };
  onProgressUpdate: (progress: number) => void;
}

export default function InteractiveLesson({ lesson, onProgressUpdate }: InteractiveLessonProps) {
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedChars, setCompletedChars] = useState<boolean[]>(new Array(lesson.content.characters.length).fill(false));
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  const currentChar = lesson.content.characters[currentCharIndex];

  // Setup canvas context when component mounts or canvas ref changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas to actual display size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Configure drawing style
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.imageSmoothingEnabled = true;
      }
    }
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate coordinates relative to canvas
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const { x, y } = getCanvasCoordinates(e);
    setLastPoint({ x, y });
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !canvasRef.current || !lastPoint) return;
    
    const canvas = canvasRef.current;
    const { x, y } = getCanvasCoordinates(e);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    setLastPoint({ x, y });
  };

  const stopDrawing = (e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (e) {
      e.preventDefault();
    }
    setIsDrawing(false);
    setLastPoint(null);
    
    // End the current path
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.closePath();
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setPaths([]);
  };

  const markComplete = () => {
    const newCompleted = [...completedChars];
    newCompleted[currentCharIndex] = true;
    setCompletedChars(newCompleted);
    
    const progress = (newCompleted.filter(Boolean).length / lesson.content.characters.length) * 100;
    onProgressUpdate(progress);
  };

  const nextCharacter = () => {
    if (currentCharIndex < lesson.content.characters.length - 1) {
      setCurrentCharIndex(currentCharIndex + 1);
      clearCanvas();
    }
  };

  const prevCharacter = () => {
    if (currentCharIndex > 0) {
      setCurrentCharIndex(currentCharIndex - 1);
      clearCanvas();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Character Display */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Chip 
                label={`${currentCharIndex + 1} / ${lesson.content.characters.length}`}
                className="bg-blue-100 text-blue-700 font-semibold"
              />
              {completedChars[currentCharIndex] && (
                <Chip 
                  icon={<CheckIcon />}
                  label="Completed"
                  className="bg-green-100 text-green-700 font-semibold"
                />
              )}
            </div>
            
            {/* Large Character Display */}
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
              <span className="text-8xl font-light text-slate-800 select-none">
                {currentChar.char}
              </span>
            </div>

            {/* Character Info */}
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <Typography variant="h5" className="font-bold text-slate-900 mb-2">
                  {currentChar.romaji}
                </Typography>
                <Typography variant="body1" className="text-slate-600">
                  {currentChar.meaning}
                </Typography>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">✍️</span>
                <Typography variant="body2" className="text-slate-500">
                  {currentChar.stroke}
                </Typography>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outlined" 
              onClick={prevCharacter}
              disabled={currentCharIndex === 0}
              className="rounded-xl"
            >
              Previous
            </Button>
            
            {!completedChars[currentCharIndex] ? (
              <Button 
                variant="contained" 
                onClick={markComplete}
                className="bg-green-600 hover:bg-green-700 rounded-xl px-6"
              >
                Mark Complete
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={nextCharacter}
                disabled={currentCharIndex === lesson.content.characters.length - 1}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
              >
                Next Character
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Practice Canvas */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              <Typography variant="h6" className="font-bold text-slate-900">
                Practice Writing
              </Typography>
            </div>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />}
              onClick={clearCanvas}
              className="rounded-xl"
            >
              Clear
            </Button>
          </div>

          {/* Canvas */}
          <Paper className="p-4 bg-gray-50 rounded-xl">
            <canvas
              ref={canvasRef}
              className="w-full h-80 bg-white rounded-xl border-2 border-dashed border-gray-300 touch-none"
              style={{
                touchAction: 'none',
                cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Cg transform=\'rotate(45 10 10)\'%3E%3Crect x=\'8\' y=\'2\' width=\'4\' height=\'14\' fill=\'%23f59e0b\'/%3E%3Crect x=\'8\' y=\'16\' width=\'4\' height=\'2\' fill=\'%23374151\'/%3E%3C/g%3E%3C/svg%3E") 10 10, pointer'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <Typography variant="body2" className="text-center text-slate-500 mt-4">
              Draw the character <strong>{currentChar.char}</strong> in the canvas above
            </Typography>
          </Paper>

          {/* Practice Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <Typography variant="subtitle2" className="font-semibold text-blue-900 mb-2">
              💡 Writing Tips
            </Typography>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Follow the stroke order for proper character formation</li>
              <li>• Take your time to practice each stroke carefully</li>
              <li>• Repeat multiple times for muscle memory</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}