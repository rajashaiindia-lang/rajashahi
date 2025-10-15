'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError(null);
    setLoading(true);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (r.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && password) {
      login();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <a
          href="/"
          className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-all text-gray-300 font-semibold flex items-center gap-2"
        >
          ← Back to Home
        </a>
      </div>

      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] p-4 rounded-2xl border-4 border-yellow-600 shadow-lg mb-4">
            <h1 className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              ADMIN
            </h1>
          </div>
          <p className="text-gray-400 text-sm">Enter your password to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Secure Access</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-3 text-red-200 text-center animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-300 font-semibold">
              🔐 Admin Password
            </label>
            <input
              type="password"
              className="w-full p-4 text-black rounded-lg font-semibold text-lg focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            disabled={!password || loading}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              '🔓 Login to Dashboard'
            )}
          </button>

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Authorized access only. All activities are logged.
          </p>
        </div>
      </div>
    </main>
  );
}