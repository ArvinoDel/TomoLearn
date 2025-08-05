
'use client';

import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, LinearProgress, Chip } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface SyllabusSectionProps {
  course: any;
}

export default function SyllabusSection({ course }: SyllabusSectionProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<number | false>(0);

  const handleAccordionChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'ri-video-line';
      case 'quiz':
        return 'ri-question-line';
      case 'interactive':
        return 'ri-gamepad-line';
      case 'speaking':
        return 'ri-mic-line';
      default:
        return 'ri-book-line';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'from-red-400 to-red-600';
      case 'quiz':
        return 'from-purple-400 to-purple-600';
      case 'interactive':
        return 'from-green-400 to-green-600';
      case 'speaking':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Course Syllabus & Modules 📚
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our carefully structured curriculum designed to maximize your learning efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Progress Overview */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Overall Completion</span>
                    <span className="font-semibold text-gray-900">8%</span>
                  </div>
                  <LinearProgress 
                    variant="determinate" 
                    value={8} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#00BFCF',
                        borderRadius: 4,
                      }
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-600">2</div>
                    <div className="text-xs text-slate-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">43</div>
                    <div className="text-xs text-slate-600">Remaining</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-time-line text-white text-lg"></i>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Study Time</div>
                    <div className="text-xs text-slate-600">2.5 hours completed</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-streak-line text-white text-lg"></i>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Current Streak</div>
                    <div className="text-xs text-slate-600">3 days in a row! 🔥</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Syllabus Content */}
          <div className="lg:col-span-2 space-y-4">
            {course.syllabus.map((week: any, index: number) => (
              <Accordion
                key={index}
                expanded={expandedAccordion === index}
                onChange={handleAccordionChange(index)}
                sx={{
                  borderRadius: '16px !important',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #f1f5f9',
                  '&:before': { display: 'none' },
                  marginBottom: '16px !important',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    padding: '16px 24px',
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    }
                  }}
                >
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{week.week}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{week.title}</h3>
                        <p className="text-sm text-slate-600">
                          {week.lessons} lessons • {week.duration}
                        </p>
                      </div>
                    </div>
                    
                    {week.week === 1 && (
                      <Chip
                        label="Current"
                        size="small"
                        sx={{
                          backgroundColor: '#00BFCF',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </div>
                </AccordionSummary>

                <AccordionDetails sx={{ padding: '0 24px 24px' }}>
                  <div className="space-y-3">
                    {week.topics.map((topic: any, topicIndex: number) => (
                      <div
                        key={topicIndex}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                          topic.completed
                            ? 'bg-green-50 border-green-200'
                            : week.week === 1
                            ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 bg-gradient-to-br ${getTypeColor(topic.type)} rounded-full flex items-center justify-center`}>
                            <div className="w-full h-full flex items-center justify-center">
                              <i className={`${getTypeIcon(topic.type)} text-white text-sm`}></i>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900">{topic.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>{topic.duration}</span>
                              <span>•</span>
                              <span className="capitalize">{topic.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {topic.completed ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <div className="w-full h-full flex items-center justify-center">
                                <i className="ri-check-line text-white text-sm"></i>
                              </div>
                            </div>
                          ) : week.week === 1 ? (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-full h-full flex items-center justify-center">
                                <i className="ri-play-fill text-white text-sm"></i>
                              </div>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                              <div className="w-full h-full flex items-center justify-center">
                                <i className="ri-lock-line text-gray-500 text-sm"></i>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
