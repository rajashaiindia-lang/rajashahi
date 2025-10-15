'use client';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] py-6 border-b-4 border-yellow-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 transition-all text-yellow-200 font-semibold flex items-center gap-2"
            >
              ← Back to Home
            </a>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              ℹ️ ABOUT US
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-8">
        {/* Main Content Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-gray-700 shadow-2xl">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] p-6 rounded-2xl border-4 border-yellow-600 shadow-lg mb-6">
              <h2 className="text-5xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                RAJASHAHI
              </h2>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg text-center text-yellow-200 font-semibold">
              Welcome to Rajashahi Chart - Your Trusted Source for Accurate Results
            </p>

            <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-base">
                Rajashahi is a popular matka game that has been entertaining enthusiasts for generations. Our platform provides real-time updates, historical charts, and accurate results to help players stay informed and make better decisions. We are committed to maintaining transparency and delivering timely information to our valued community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-lg p-6 border border-blue-600/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-xl font-bold text-blue-400">Accurate Results</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Get real-time updates with precise jodi numbers and panna results published instantly.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-lg p-6 border border-green-600/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">📊</span>
                  <h3 className="text-xl font-bold text-green-400">Historical Charts</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Access comprehensive monthly charts and analyze patterns to enhance your understanding.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-lg p-6 border border-purple-600/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">⚡</span>
                  <h3 className="text-xl font-bold text-purple-400">Fast Updates</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Results are published immediately after declaration, ensuring you never miss an update.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded-lg p-6 border border-yellow-600/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🔒</span>
                  <h3 className="text-xl font-bold text-yellow-400">Reliable Platform</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Trusted by thousands of users who rely on our platform for authentic information daily.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-red-900/30 to-yellow-900/30 rounded-xl p-8 border-2 border-yellow-600/50 shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Our Mission</h3>
          <p className="text-gray-300 text-center leading-relaxed">
            To provide a reliable and user-friendly platform where matka enthusiasts can access accurate results, 
            historical data, and comprehensive charts. We strive to maintain the highest standards of transparency 
            and timely information delivery to serve our community better.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-gray-700 shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Get In Touch</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
        
            <div className="space-y-2">
              <div className="text-3xl">📱</div>
              <h4 className="font-semibold text-gray-300">Support</h4>
              <p className="text-sm text-gray-400">Available 24/7</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🌐</div>
              <h4 className="font-semibold text-gray-300">Website</h4>
              <p className="text-sm text-gray-400">www.rajashahi.com</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}