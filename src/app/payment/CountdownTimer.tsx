
'use client';

import { useState, useEffect } from 'react';
import { LinearProgress, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface CountdownTimerProps {
  initialTime: number; // in seconds
}

export default function CountdownTimer({ initialTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressValue = ((initialTime - timeLeft) / initialTime) * 100;
  const isWarning = timeLeft <= 300; // 5 minutes warning
  const isExpired = timeLeft <= 0;

  return (
    <Box className="w-full">
      <div className="flex items-center justify-center gap-2 mb-2">
        <AccessTimeIcon 
          className={`w-4 h-4 ${isWarning ? 'text-orange-600' : 'text-blue-600'}`} 
        />
        <span className={`font-mono text-lg font-bold ${
          isExpired ? 'text-red-600' : 
          isWarning ? 'text-orange-600' : 
          'text-blue-600'
        }`}>
          {isExpired ? '00:00' : formatTime(timeLeft)}
        </span>
      </div>
      
      <LinearProgress 
        variant="determinate" 
        value={progressValue}
        className={`h-2 rounded-full ${
          isExpired ? 'bg-red-100' : 
          isWarning ? 'bg-orange-100' : 
          'bg-blue-100'
        }`}
        sx={{
          '& .MuiLinearProgress-bar': {
            backgroundColor: isExpired ? '#dc2626' : 
                           isWarning ? '#ea580c' : 
                           '#2563eb',
            borderRadius: '4px'
          }
        }}
      />
      
      <p className={`text-xs text-center mt-2 ${
        isExpired ? 'text-red-600' : 
        isWarning ? 'text-orange-600' : 
        'text-gray-500'
      }`}>
        {isExpired ? 'QR Code expired. Please refresh to generate new code.' :
         isWarning ? 'QR Code will expire soon' :
         'Please complete payment before time expires'}
      </p>
    </Box>
  );
}
