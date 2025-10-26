
"use client";

import React, { useState, useEffect } from 'react';
import { Brain, Activity, Users, Trophy, TrendingUp, Target, Zap, Star } from 'lucide-react';
import { 
  MLPredictionInterface,
  LiveMatchTracker,
  AchievementSystem,
  SmartNewsFeed
} from '@/app/components';

interface DashboardStats {
  totalPredictions: number;
  accuracy: number;
  liveMatches: number;
  piCoins: number;
  achievements: number;
  rank: string;
}

export function PortalDashboard() {
  const [activeSection, setActiveSection] = useState<'overview' | 'predictions' | 'live' | 'social' | 'rewards'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalPredictions: 0,
    accuracy: 0,
    liveMatches: 0,
    piCoins: 0,
    achievements: 0,
    rank: 'Novice'
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const predictions = await fetch('/api/predictions?limit=100');
      const predData = await predictions.json();
      
      const matches = await fetch('/api/matches/live');
      const matchData = await matches.json();

      setStats({
        totalPredictions: predData.predictions?.length || 0,
        accuracy: calculateAccuracy(predData.predictions || []),
        liveMatches: matchData.matches?.length || 0,
        piCoins: typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('pi_coins_balance') || '0') : 0,
        achievements: typeof localStorage !== 'undefined' ? (JSON.parse(localStorage.getItem('user_achievements') || '[]')).filter((a: any) => a.unlocked).length : 0,
        rank: 'Champion'
      });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  const calculateAccuracy = (predictions: any[]) => {
    const completed = predictions.filter(p => p.status === 'completed');
    const correct = completed.filter(p => p.isCorrect);
    return completed.length > 0 ? Math.round((correct.length / completed.length) * 100) : 0;
  };

  const sections = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'predictions',
      name: 'AI Predictions',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'live',
      name: 'Live Tracking',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'social',
      name: 'Social Hub',
      icon: <Users className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'rewards',
      name: 'Rewards',
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🏟️ Sports Central Portal</h1>
          <p className="text-blue-100">Your AI-Powered Sports Analytics Hub</p>
        </div>
      </div>

      {/* Stats Overview Bar */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.totalPredictions}</div>
              <div className="text-xs text-gray-400">Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.accuracy}%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.liveMatches}</div>
              <div className="text-xs text-gray-400">Live Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">π{stats.piCoins}</div>
              <div className="text-xs text-gray-400">Pi Coins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.rank}</div>
              <div className="text-xs text-gray-400">Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-2 py-4">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {section.icon}
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome Back, Champion! 🎯</h2>
                  <p className="text-gray-300">Here's what's happening in your sports analytics world</p>
                </div>
                <Zap className="w-12 h-12 text-yellow-400" />
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                onClick={() => setActiveSection('predictions')}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30 cursor-pointer hover:scale-105 transition-transform"
              >
                <Brain className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-bold mb-1">AI Predictions</h3>
                <p className="text-gray-400 text-sm">Generate ML-powered predictions</p>
              </div>

              <div 
                onClick={() => setActiveSection('live')}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-xl p-6 border border-green-500/30 cursor-pointer hover:scale-105 transition-transform"
              >
                <Activity className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-white font-bold mb-1">Live Tracking</h3>
                <p className="text-gray-400 text-sm">{stats.liveMatches} matches in progress</p>
              </div>

              <div 
                onClick={() => setActiveSection('social')}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-xl p-6 border border-orange-500/30 cursor-pointer hover:scale-105 transition-transform"
              >
                <Users className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="text-white font-bold mb-1">Social Hub</h3>
                <p className="text-gray-400 text-sm">Connect with community</p>
              </div>

              <div 
                onClick={() => setActiveSection('rewards')}
                className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-xl rounded-xl p-6 border border-yellow-500/30 cursor-pointer hover:scale-105 transition-transform"
              >
                <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="text-white font-bold mb-1">Rewards</h3>
                <p className="text-gray-400 text-sm">{stats.achievements} achievements unlocked</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Recent Predictions
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm font-semibold">Man City vs Arsenal</div>
                        <div className="text-gray-400 text-xs">Home Win • 78% confidence</div>
                      </div>
                      <div className="text-green-400 text-xs font-bold">✓ Won</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Latest Achievements
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: '🎯', title: 'First Prediction', reward: 25 },
                    { icon: '🔥', title: 'Hot Streak', reward: 50 },
                    { icon: '🏆', title: 'Accuracy Expert', reward: 100 }
                  ].map((achievement, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="text-white text-sm font-semibold">{achievement.title}</div>
                      </div>
                      <div className="text-yellow-400 text-xs font-bold">+π{achievement.reward}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'predictions' && (
          <div className="space-y-6">
            <MLPredictionInterface />
          </div>
        )}

        {activeSection === 'live' && (
          <div className="space-y-6">
            <LiveMatchTracker />
          </div>
        )}

        {activeSection === 'social' && (
          <div className="space-y-6">
            <SmartNewsFeed />
            
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-400" />
                Community Challenges
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Weekend Warriors', participants: 234, prize: 500 },
                  { name: 'Champions League Expert', participants: 156, prize: 1000 }
                ].map((challenge, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">{challenge.name}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{challenge.participants} participants</span>
                      <span className="text-yellow-400 font-bold">π{challenge.prize} prize</span>
                    </div>
                    <button className="mt-3 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                      Join Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'rewards' && (
          <div className="space-y-6">
            <AchievementSystem 
              currentUser={{ id: '1', username: 'User', email: 'user@example.com', role: 'user', piCoins: stats.piCoins }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
