"use client";

import React, { Suspense } from 'react';
import { Users, MessageCircle, Trophy, Flame } from 'lucide-react';

const SocialHub = React.lazy(() => 
  import('@/app/components/SocialHub').then(m => ({ default: m.default }))
);

const ExpertFollowSystem = React.lazy(() => 
  import('@/app/components/ExpertFollowSystem').then(m => ({ default: m.ExpertFollowSystem }))
);

const AuthorsLeaderboard = React.lazy(() => 
  import('@/app/components/AuthorsLeaderboard').then(m => ({ default: m.AuthorsLeaderboard }))
);

export default function SocialFeedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30">
        <div className="flex items-center gap-4 mb-4">
          <Users className="w-12 h-12 text-blue-400" />
          <div>
            <h1 className="text-4xl font-bold text-white">Social Hub</h1>
            <p className="text-gray-300">Connect, compete, and share your predictions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Suspense fallback={
            <div className="h-96 bg-gray-800/50 backdrop-blur-xl rounded-2xl animate-pulse" />
          }>
            <SocialHub />
          </Suspense>
        </div>

        <div className="space-y-4">
          <Suspense fallback={
            <div className="h-64 bg-gray-800/50 backdrop-blur-xl rounded-2xl animate-pulse" />
          }>
            <AuthorsLeaderboard />
          </Suspense>

          <Suspense fallback={
            <div className="h-64 bg-gray-800/50 backdrop-blur-xl rounded-2xl animate-pulse" />
          }>
            <ExpertFollowSystem />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl rounded-xl p-6 border border-green-500/30">
          <Flame className="w-8 h-8 text-green-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Active Challenges</h3>
          <p className="text-3xl font-bold text-green-400">12</p>
          <p className="text-gray-400 text-sm">Compete with friends</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/20 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30">
          <MessageCircle className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Live Chats</h3>
          <p className="text-3xl font-bold text-blue-400">5</p>
          <p className="text-gray-400 text-sm">Ongoing discussions</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30">
          <Trophy className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Your Rank</h3>
          <p className="text-3xl font-bold text-purple-400">#247</p>
          <p className="text-gray-400 text-sm">Global leaderboard</p>
        </div>
      </div>
    </div>
  );
}
