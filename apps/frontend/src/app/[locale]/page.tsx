
"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Radio, 
  Users, 
  Baby, 
  Trophy, 
  Newspaper
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      id: 'predictions',
      title: 'AI Predictions',
      icon: <Brain className="w-8 h-8" />,
      href: 'predictions'
    },
    {
      id: 'live',
      title: 'Live Matches',
      icon: <Radio className="w-8 h-8" />,
      href: 'live'
    },
    {
      id: 'social',
      title: 'Social',
      icon: <Users className="w-8 h-8" />,
      href: 'social/feed'
    },
    {
      id: 'kids',
      title: 'Kids Mode',
      icon: <Baby className="w-8 h-8" />,
      href: 'kids-mode'
    },
    {
      id: 'rewards',
      title: 'Rewards',
      icon: <Trophy className="w-8 h-8" />,
      href: 'rewards/achievements'
    },
    {
      id: 'news',
      title: 'News',
      icon: <Newspaper className="w-8 h-8" />,
      href: 'news'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Sports Hub</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link 
              key={feature.id}
              href={feature.href}
              className="p-6 rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 hover:border-gray-600 transition-colors"
            >
              <div className="text-blue-400 mb-3">{feature.icon}</div>
              <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
