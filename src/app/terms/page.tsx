'use client';

import React, { useState } from 'react';
import { X, Search, Smartphone, Tag, Gift } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Fade,
  Box,
  Container,
  Divider
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className={`${value === index ? 'block' : 'hidden'}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

const TermsModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);


  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAcceptAndContinue = () => {
    alert('Terms accepted! Modal would normally close here.');
  };

  const privacySections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support. This includes your name, email address, profile information, and learning progress data."
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our educational services, personalize your learning experience, communicate with you about your account and our services, and ensure the security of our platform."
    },
    {
      title: "Information Sharing and Disclosure",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our platform and serving our users."
    },
    {
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "Your Rights and Choices",
      content: "You have the right to access, update, or delete your personal information. You can also opt out of certain communications from us. Contact us if you wish to exercise any of these rights or have questions about your data."
    },
    {
      title: "Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to enhance your experience on our platform, analyze usage patterns, and provide personalized content. You can control cookie preferences through your browser settings."
    },
    {
      title: "Children's Privacy",
      content: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it."
    },
    {
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date. We encourage you to review this policy periodically."
    }
  ];

  const features = [
    {
      icon: <Search className="text-blue-600" size={24} />,
      title: "Easy Search & Booking",
      description: "Book flights, hotels and holiday packages worldwide"
    },
    {
      icon: <Smartphone className="text-blue-600" size={24} />,
      title: "Mobile Experience",
      description: "Access our services through website or mobile app"
    },
    {
      icon: <Tag className="text-blue-600" size={24} />,
      title: "Special Offers",
      description: "Enjoy free trips, air ticket discounts and other rewards"
    },
    {
      icon: <Gift className="text-blue-600" size={24} />,
      title: "Rewards Program",
      description: "Earn Coins through booking that can be used for discounts"
    }
  ];

  const tabs = [
    { label: "General Policy", id: 0 },
    { label: "Booking Terms", id: 1 },
    { label: "Privacy Policy", id: 2 },
    { label: "Cancellations", id: 3 }
  ];

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Terms & Privacy Policy
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Tomolearn Terms & Policy covers how we handle your data.
            </p>
          </div>
          <Link href="/">
            <button
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </Link>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* General Policy Tab */}
          <TabPanel value={activeTab} index={0}>
            <div className="p-6 space-y-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  About TomoLearn
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  At TomoLearn, we think travel should be exciting and affordable. That's why we team up with
                  hundreds of airlines to bring you the best deals on both domestic and international flights. Let
                  us help you make your dream trip a reality!
                </p>
              </div>

              <hr className="border-gray-200" />

              {/* Key Features Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Key Features TomoLearn
                </h3>

                <div className="grid gap-6 md:gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Help Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600">
                  Contact our customer service team at{' '}
                  <span className="text-blue-600 font-medium">support@TomoLearn</span>
                </p>
              </div>
            </div>
          </TabPanel>

          {/* Booking Terms Tab */}
          <TabPanel value={activeTab} index={1}>
            <div className="p-6">
              <div className="text-center py-12">
                <Search className="text-gray-300 mx-auto mb-4" size={64} />
                <h3 className="text-lg text-gray-500 mb-2">
                  Booking Terms
                </h3>
                <p className="text-sm text-gray-400">
                  This section contains booking terms and conditions.
                  Content will be available soon.
                </p>
              </div>
            </div>
          </TabPanel>

          {/* Privacy Policy Tab */}
          <TabPanel value={activeTab} index={2}>
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="text-center py-6 sm:py-8 lg:py-12">
                <Container maxWidth="lg">
                  <Box className="max-w-4xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
                    <Fade in timeout={800}>
                      <Box className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <div className="flex justify-center mb-4 sm:mb-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                            <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 p-3 sm:p-4 rounded-full">
                              <svg className="w-8 h-8 sm:w-10 md:w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <Typography
                          variant="h2"
                          component="h1"
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 sm:mb-6"
                        >
                          Privacy Policy
                        </Typography>
                        <Typography
                          variant="h6"
                          className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0"
                        >
                          Your privacy is our cornerstone. This comprehensive policy explains how TomoLearn
                          collects, uses, and safeguards your personal information with complete transparency.
                        </Typography>
                        <div className="mt-8 mb-2">
                          <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
                        </div>
                        <Typography variant="body2" className="text-gray-500 flex items-center justify-center gap-2 mt-4 text-xs sm:text-sm">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Last updated: January 2025
                        </Typography>
                      </Box>
                    </Fade>

                    <Fade in timeout={1000}>
                      <Box className="space-y-3 sm:space-y-4">
                        {privacySections.map((section, index) => (
                          <Accordion
                            key={index}
                            className="shadow-lg border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                            sx={{
                              '&:before': { display: 'none' },
                              '&.Mui-expanded': {
                                margin: { xs: '12px 0', sm: '16px 0' },
                                borderColor: '#00BCD4',
                                borderWidth: 2,
                                boxShadow: '0 10px 25px rgba(0, 188, 212, 0.15)'
                              },
                              borderRadius: { xs: '8px !important', sm: '12px !important' }
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <div className="bg-cyan-100 rounded-full p-1 transition-all duration-300 hover:bg-cyan-200">
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              }
                              sx={{
                                backgroundColor: '#f8fafc',
                                borderLeft: { xs: '3px solid #00BCD4', sm: '4px solid #00BCD4' },
                                minHeight: { xs: '64px', sm: '72px' },
                                px: { xs: 2, sm: 3 },
                                '&.Mui-expanded': {
                                  backgroundColor: '#e0f7fa',
                                  borderLeft: { xs: '3px solid #0097A7', sm: '4px solid #0097A7' }
                                },
                                '&:hover': {
                                  backgroundColor: '#f0f9ff'
                                },
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="bg-cyan-500 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <Typography
                                  variant="h6"
                                  className="font-semibold text-gray-900 flex-1 text-sm sm:text-base lg:text-lg"
                                >
                                  {section.title}
                                </Typography>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails className="bg-white border-t border-gray-100 px-4 sm:px-6">
                              <div className="py-3 sm:py-4">
                                <Typography
                                  variant="body1"
                                  className="text-gray-700 leading-relaxed text-sm sm:text-base"
                                  sx={{ lineHeight: { xs: 1.6, sm: 1.7 } }}
                                >
                                  {section.content}
                                </Typography>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </Box>
                    </Fade>

                    <Fade in timeout={1200}>
                      <Box className="mt-8 sm:mt-10 lg:mt-12">
                        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-cyan-200 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5"></div>
                          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl from-cyan-200/20 to-transparent rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12"></div>

                          <div className="relative p-4 sm:p-6 lg:p-8">
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <Typography variant="h6" className="font-bold text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">
                                  Questions About This Policy?
                                </Typography>
                                <Typography variant="body1" className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                                  If you have any questions about this Privacy Policy or our data practices,
                                  we're here to help. Reach out to our privacy team for immediate assistance.
                                </Typography>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                  <a
                                    href="mailto:privacy@tomolearn.com"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                                  >
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="truncate">privacy@tomolearn.com</span>
                                  </a>
                                  <button className="inline-flex items-center justify-center gap-2 border-2 border-cyan-600 text-cyan-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-cyan-600 hover:text-white transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                                    </svg>
                                    Live Chat Support
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Fade>

                    {/* Trust Indicators */}
                    <Fade in timeout={1400}>
                      <Box className="mt-8 sm:mt-10 lg:mt-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-md border hover:shadow-lg transition-all duration-300">
                            <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <Typography variant="h6" className="font-semibold text-gray-900 mb-2 text-sm sm:text-base lg:text-lg">
                              GDPR Compliant
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                              Fully compliant with European data protection regulations
                            </Typography>
                          </div>

                          <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-md border hover:shadow-lg transition-all duration-300">
                            <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <Typography variant="h6" className="font-semibold text-gray-900 mb-2 text-sm sm:text-base lg:text-lg">
                              End-to-End Encryption
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                              Your data is encrypted at rest and in transit
                            </Typography>
                          </div>

                          <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
                            <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <Typography variant="h6" className="font-semibold text-gray-900 mb-2 text-sm sm:text-base lg:text-lg">
                              Zero Data Selling
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                              We never sell your personal information to third parties
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </Fade>
                  </Box>
                </Container>
              </div>
            </div>
          </TabPanel>

          {/* Cancellations Tab */}
          <TabPanel value={activeTab} index={3}>
            <div className="p-6">
              <div className="text-center py-12">
                <Tag className="text-gray-300 mx-auto mb-4" size={64} />
                <h3 className="text-lg text-gray-500 mb-2">
                  Cancellations
                </h3>
                <p className="text-sm text-gray-400">
                  This section contains cancellation policies and procedures.
                  Content will be available soon.
                </p>
              </div>
            </div>
          </TabPanel>
        </div>

        {/* Footer with CTA */}
      </div>
    </div>
  );
};

export default TermsModal;