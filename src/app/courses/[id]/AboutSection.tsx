
'use client';

interface AboutSectionProps {
  course: any;
}

export default function AboutSection({ course }: AboutSectionProps) {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - What You'll Learn */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What You'll Learn 🎯
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                This comprehensive course is designed to take you from absolute beginner to conversational Japanese speaker in just 30 days.
              </p>
            </div>

            <div className="space-y-4">
              {course.whatYouLearn.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-1">
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-lg"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Course Goals & Visual */}
          <div className="space-y-8">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://readdy.ai/api/search-image?query=Japanese%20student%20celebrating%20success%20in%20language%20learning%2C%20holding%20certificate%2C%20surrounded%20by%20Japanese%20cultural%20elements%2C%20cherry%20blossoms%2C%20traditional%20and%20modern%20Japan%20symbols%2C%20bright%20and%20motivational%20scene%2C%20educational%20achievement%20theme&width=550&height=400&seq=learning-success&orientation=landscape"
                  alt="Learning Success"
                  className="w-full h-96 object-cover object-center"
                />
              </div>
              
              {/* Achievement Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-medal-fill text-white text-2xl"></i>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-900">N5 Ready</div>
                  <div className="text-xs text-slate-600">Certificate</div>
                </div>
              </div>
            </div>

            {/* Course Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-robot-line text-white text-xl"></i>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">AI Tutor</h4>
                <p className="text-sm text-slate-600">Personalized feedback</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-mic-line text-white text-xl"></i>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Speech Practice</h4>
                <p className="text-sm text-slate-600">Native pronunciation</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-heart-line text-white text-xl"></i>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Cultural Context</h4>
                <p className="text-sm text-slate-600">Real-world usage</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-gamepad-line text-white text-xl"></i>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Gamified</h4>
                <p className="text-sm text-slate-600">Fun & engaging</p>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-lightbulb-line text-white text-xl"></i>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Learning Tip</h4>
                  <p className="text-slate-700 italic leading-relaxed">
                    "The best time to plant a tree was 20 years ago. The second best time is now. Start your Japanese journey today!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
