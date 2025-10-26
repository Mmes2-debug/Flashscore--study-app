
"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Radio, 
  Users, 
  Baby, 
  Trophy, 
  Newspaper,
  Home,
  Star
} from 'lucide-react';
import { BottomNavigation } from '@/app/components/BottomNavigation';

export default function HomePage() {
  const features = [
    {
      id: 'predictions',
      title: 'AI Predictions',
      description: 'ML-powered match forecasts',
      icon: <Brain className="w-8 h-8" />,
      href: '/predictions',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'live',
      title: 'Live Matches',
      description: '127 matches happening now',
      icon: <Radio className="w-8 h-8" />,
      href: '/live',
      badge: '127',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'social',
      title: 'Social Feed',
      description: 'Connect with fans',
      icon: <Users className="w-8 h-8" />,
      href: '/social/feed',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'kids',
      title: 'Kids Mode',
      description: 'Safe learning environment',
      icon: <Baby className="w-8 h-8" />,
      href: '/kids-mode',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'rewards',
      title: 'Achievements',
      description: 'Track your progress',
      icon: <Trophy className="w-8 h-8" />,
      href: '/rewards/achievements',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'news',
      title: 'Sports News',
      description: 'Latest updates',
      icon: <Newspaper className="w-8 h-8" />,
      href: '/news',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header Section */}
      <div className="sticky top-0 z-10 border-b" style={{ 
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Sports Hub
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                AI-Powered Sports Intelligence
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link 
              key={feature.id}
              href={feature.href}
              className="group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative p-6 flex flex-col items-center text-center gap-3">
                {/* Icon with Badge */}
                <div className="relative">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${feature.color}`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  {feature.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                      {feature.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h2>

                {/* Description */}
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 p-6 rounded-xl border" style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Platform Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">127</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Live Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">1000+</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">95%</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">50k+</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
