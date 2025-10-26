
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Brain, Activity, Users, Trophy, TrendingUp, Newspaper, Radio } from 'lucide-react';
import { 
  MLPredictionInterface,
  LiveMatchTracker,
  AchievementSystem,
  SmartNewsFeed,
  PortalDashboard
} from '@/app/components';

interface TabConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  badge?: number;
}

interface UnifiedSportsHubProps {
  initialTab?: string;
  showPortalView?: boolean;
}

export function UnifiedSportsHub({ 
  initialTab = 'overview',
  showPortalView = false 
}: UnifiedSportsHubProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [stats, setStats] = useState({
    totalPredictions: 0,
    accuracy: 0,
    liveMatches: 0,
    piCoins: 0,
    achievements: 0,
    rank: 'Novice'
  });

  // Memoized tab configuration
  const tabs: TabConfig[] = useMemo(() => [
    {
      id: 'overview',
      name: 'Overview',
      icon: <Activity className="w-5 h-5" />,
      component: showPortalView ? <PortalDashboard /> : <OverviewSection stats={stats} onTabChange={setActiveTab} />
    },
    {
      id: 'predictions',
      name: 'AI Predictions',
      icon: <Brain className="w-5 h-5" />,
      component: <MLPredictionInterface />
    },
    {
      id: 'live',
      name: 'Live Matches',
      icon: <Radio className="w-5 h-5" />,
      component: <LiveMatchTracker />,
      badge: stats.liveMatches
    },
    {
      id: 'news',
      name: 'News Feed',
      icon: <Newspaper className="w-5 h-5" />,
      component: <SmartNewsFeed />
    },
    {
      id: 'social',
      name: 'Social Hub',
      icon: <Users className="w-5 h-5" />,
      component: <SocialSection />
    },
    {
      id: 'rewards',
      name: 'Achievements',
      icon: <Trophy className="w-5 h-5" />,
      component: <AchievementSystem currentUser={{ id: '1', username: 'User', email: 'user@example.com', role: 'user', piCoins: stats.piCoins }} />
    }
  ], [stats, showPortalView]);

  const currentTab = useMemo(() => 
    tabs.find(tab => tab.id === activeTab) || tabs[0],
    [tabs, activeTab]
  );

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const [predictionsRes, matchesRes] = await Promise.allSettled([
        fetch('/api/predictions?limit=100'),
        fetch('/api/matches/live')
      ]);

      const predictions = predictionsRes.status === 'fulfilled' ? await predictionsRes.value.json() : { predictions: [] };
      const matches = matchesRes.status === 'fulfilled' ? await matchesRes.value.json() : { matches: [] };

      setStats({
        totalPredictions: predictions.predictions?.length || 0,
        accuracy: calculateAccuracy(predictions.predictions || []),
        liveMatches: matches.matches?.length || 0,
        piCoins: typeof window !== 'undefined' ? parseInt(localStorage.getItem('pi_coins_balance') || '0') : 0,
        achievements: typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('user_achievements') || '[]')).filter((a: any) => a.unlocked).length : 0,
        rank: 'Champion'
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const calculateAccuracy = (predictions: any[]) => {
    const completed = predictions.filter(p => p.status === 'completed');
    const correct = completed.filter(p => p.isCorrect);
    return completed.length > 0 ? Math.round((correct.length / completed.length) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white p-6 sticky top-0 z-50 backdrop-blur-xl bg-opacity-95">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">🏟️ Sports Central</h1>
          <p className="text-blue-100">Your AI-Powered Sports Analytics Hub</p>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="Predictions" value={stats.totalPredictions} color="purple" />
            <StatCard label="Accuracy" value={`${stats.accuracy}%`} color="green" />
            <StatCard label="Live" value={stats.liveMatches} color="red" />
            <StatCard label="Pi Coins" value={`π${stats.piCoins}`} color="yellow" />
            <StatCard label="Rank" value={stats.rank} color="orange" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-[168px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentTab.component}
      </main>
    </div>
  );
}

// Supporting Components
function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colorMap: Record<string, string> = {
    purple: 'text-purple-400',
    green: 'text-green-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400',
    orange: 'text-orange-400'
  };

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${colorMap[color]}`}>{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function TabButton({ tab, isActive, onClick }: { tab: TabConfig; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
        isActive
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
          : 'bg-white/10 text-gray-300 hover:bg-white/20'
      }`}
    >
      {tab.icon}
      <span>{tab.name}</span>
      {tab.badge !== undefined && tab.badge > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{tab.badge}</span>
      )}
    </button>
  );
}

function OverviewSection({ stats, onTabChange }: { stats: any; onTabChange: (tab: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back, Champion! 🎯</h2>
        <p className="text-gray-300">Here's what's happening in your sports analytics world</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="AI Predictions"
          description="Generate ML-powered predictions"
          icon={<Brain className="w-8 h-8 text-purple-400" />}
          gradient="from-purple-500/20 to-pink-500/20"
          onClick={() => onTabChange('predictions')}
        />
        <QuickActionCard
          title="Live Tracking"
          description={`${stats.liveMatches} matches in progress`}
          icon={<Activity className="w-8 h-8 text-green-400" />}
          gradient="from-green-500/20 to-emerald-500/20"
          onClick={() => onTabChange('live')}
        />
        <QuickActionCard
          title="Social Hub"
          description="Connect with community"
          icon={<Users className="w-8 h-8 text-orange-400" />}
          gradient="from-orange-500/20 to-red-500/20"
          onClick={() => onTabChange('social')}
        />
        <QuickActionCard
          title="Rewards"
          description={`${stats.achievements} achievements unlocked`}
          icon={<Trophy className="w-8 h-8 text-yellow-400" />}
          gradient="from-yellow-500/20 to-amber-500/20"
          onClick={() => onTabChange('rewards')}
        />
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, icon, gradient, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${gradient} backdrop-blur-xl rounded-xl p-6 border border-white/10 cursor-pointer hover:scale-105 transition-transform`}
    >
      {icon}
      <h3 className="text-white font-bold mb-1 mt-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function SocialSection() {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-bold mb-4">Community Hub</h3>
      <p className="text-gray-400">Connect with other sports enthusiasts and share predictions.</p>
    </div>
  );
}
