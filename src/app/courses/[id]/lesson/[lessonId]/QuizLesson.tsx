
'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, LinearProgress, Chip, Paper } from '@mui/material';
import { CheckCircle as CheckIcon, Cancel as CancelIcon, Quiz as QuizIcon } from '@mui/icons-material';

interface QuizLessonProps {
  lesson: any;
  onProgressUpdate: (progress: number) => void;
}

// Mock quiz data
const quizQuestions = [
  {
    id: 1,
    question: "What does 'こんにちは' mean?",
    options: ["Good morning", "Hello/Good afternoon", "Good evening", "Goodbye"],
    correct: 1,
    explanation: "'こんにちは (Konnichiwa)' is the standard greeting used from late morning through late afternoon."
  },
  {
    id: 2,
    question: "Which Hiragana character represents the 'a' sound?",
    options: ["い", "あ", "う", "え"],
    correct: 1,
    explanation: "'あ' is the first character in the Hiragana syllabary and represents the 'a' sound."
  },
  {
    id: 3,
    question: "How do you say 'Nice to meet you' in Japanese?",
    options: ["はじめまして", "ありがとう", "すみません", "おはよう"],
    correct: 0,
    explanation: "'はじめまして (Hajimemashite)' is used when meeting someone for the first time."
  },
  {
    id: 4,
    question: "What is the correct stroke count for the character 'う'?",
    options: ["1 stroke", "2 strokes", "3 strokes", "4 strokes"],
    correct: 2,
    explanation: "The Hiragana character 'う' is written with 3 strokes."
  },
  {
    id: 5,
    question: "Which phrase is used for 'Good evening'?",
    options: ["おはよう", "こんにちは", "こんばんは", "おやすみ"],
    correct: 2,
    explanation: "'こんばんは (Konbanwa)' is used to greet someone in the evening."
  }
];

export default function QuizLesson({ lesson, onProgressUpdate }: QuizLessonProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (showResult ? 1 : 0)) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      onProgressUpdate(100);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    onProgressUpdate(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return { message: "Excellent work! 🌟", color: "text-green-600" };
    if (percentage >= 70) return { message: "Good job! 👍", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Keep practicing! 💪", color: "text-yellow-600" };
    return { message: "Review the lesson and try again 📚", color: "text-red-600" };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl mb-4 block">🎉</span>
              <Typography variant="h4" className="font-bold text-slate-900 mb-2">
                Quiz Completed!
              </Typography>
              <Typography variant="h6" className={`font-semibold ${scoreMessage.color}`}>
                {scoreMessage.message}
              </Typography>
            </div>

            {/* Score Display */}
            <Paper className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-6">
              <Typography variant="h2" className="font-bold text-slate-800 mb-2">
                {score}/{quizQuestions.length}
              </Typography>
              <Typography variant="body1" className="text-slate-600">
                {Math.round((score / quizQuestions.length) * 100)}% Correct
              </Typography>
            </Paper>

            {/* Question Review */}
            <div className="space-y-3 mb-6">
              {quizQuestions.map((question, index) => (
                <div key={question.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <Typography variant="body2" className="text-slate-700">
                    Question {index + 1}
                  </Typography>
                  {answers[index] === question.correct ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <CancelIcon className="text-red-500" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="outlined"
                onClick={handleRetakeQuiz}
                className="rounded-xl px-6"
              >
                Retake Quiz
              </Button>
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
                href={`/courses/${lesson.courseId}`}
              >
                Back to Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <Card className="rounded-2xl shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <QuizIcon className="text-blue-600" />
              <Typography variant="h6" className="font-bold text-slate-900">
                Quiz Progress
              </Typography>
            </div>
            <Chip 
              label={`${currentQuestionIndex + 1} / ${quizQuestions.length}`}
              className="bg-blue-100 text-blue-700 font-semibold"
            />
          </div>
          <LinearProgress 
            variant="determinate" 
            value={progress}
            className="h-3 rounded-full bg-slate-100"
            sx={{
              '& .MuiLinearProgress-bar': {
                borderRadius: '6px',
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8">
          {!showResult ? (
            <>
              <Typography variant="h5" className="font-bold text-slate-900 mb-6">
                {currentQuestion.question}
              </Typography>

              <FormControl component="fieldset" className="w-full">
                <RadioGroup
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerSelect(parseInt(e.target.value))}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <Paper 
                      key={index}
                      className={`p-4 rounded-xl transition-all duration-200 hover:bg-blue-50 cursor-pointer ${
                        selectedAnswer === index ? 'bg-blue-100 border-2 border-blue-500' : 'bg-slate-50'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <FormControlLabel
                        value={index}
                        control={<Radio className="text-blue-600" />}
                        label={
                          <Typography variant="body1" className="text-slate-800 font-medium">
                            {option}
                          </Typography>
                        }
                        className="m-0 w-full"
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </FormControl>

              <div className="flex justify-center mt-8">
                <Button
                  variant="contained"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-3"
                >
                  Submit Answer
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Result Display */}
              <div className="text-center space-y-6">
                <div className={`text-6xl ${selectedAnswer === currentQuestion.correct ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedAnswer === currentQuestion.correct ? '✅' : '❌'}
                </div>

                <Typography variant="h5" className={`font-bold ${selectedAnswer === currentQuestion.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                </Typography>

                <Paper className="p-4 bg-blue-50 rounded-xl text-left">
                  <Typography variant="subtitle2" className="font-semibold text-blue-900 mb-2">
                    Explanation:
                  </Typography>
                  <Typography variant="body2" className="text-blue-800">
                    {currentQuestion.explanation}
                  </Typography>
                </Paper>

                {selectedAnswer !== currentQuestion.correct && (
                  <Paper className="p-4 bg-green-50 rounded-xl">
                    <Typography variant="body2" className="text-green-800">
                      <strong>Correct Answer:</strong> {currentQuestion.options[currentQuestion.correct]}
                    </Typography>
                  </Paper>
                )}

                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-3"
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
