"use client";

import React, { Suspense } from 'react';
import { Trophy, Star, Coins, TrendingUp } from 'lucide-react';

const AchievementSystem = React.lazy(() => 
  import('@/app/components/AchievementSystem').then(m => ({ default: m.AchievementSystem }))
);

export default function AchievementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      <div className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl p-8 border border-amber-500/30">
        <div className="flex items-center gap-4 mb-4">
          <Trophy className="w-12 h-12 text-amber-400" />
          <div>
            <h1 className="text-4xl font-bold text-white">Rewards & Achievements</h1>
            <p className="text-gray-300">Earn badges, collect coins, and track your progress</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-600/20 to-yellow-600/20 backdrop-blur-xl rounded-xl p-6 border border-amber-500/30">
          <Coins className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Pi Coins</h3>
          <p className="text-3xl font-bold text-amber-400">1,250</p>
          <p className="text-gray-400 text-sm">Your balance</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/20 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30">
          <Star className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Achievements</h3>
          <p className="text-3xl font-bold text-blue-400">15/50</p>
          <p className="text-gray-400 text-sm">Unlocked</p>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl rounded-xl p-6 border border-green-500/30">
          <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Streak</h3>
          <p className="text-3xl font-bold text-green-400">7 days</p>
          <p className="text-gray-400 text-sm">Current streak</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30">
          <Trophy className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Level</h3>
          <p className="text-3xl font-bold text-purple-400">12</p>
          <p className="text-gray-400 text-sm">Pro Predictor</p>
        </div>
      </div>

      <Suspense fallback={
        <div className="h-screen bg-gray-800/50 backdrop-blur-xl rounded-2xl animate-pulse" />
      }>
        <AchievementSystem />
      </Suspense>

      <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">How to Earn Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-green-400">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Make Predictions</h3>
              <p className="text-gray-400 text-sm">Earn coins for every prediction you make</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Complete Achievements</h3>
              <p className="text-gray-400 text-sm">Unlock badges and bonus rewards</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Daily Streak</h3>
              <p className="text-gray-400 text-sm">Login daily to maintain your streak</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Learn & Improve</h3>
              <p className="text-gray-400 text-sm">Complete educational quizzes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
