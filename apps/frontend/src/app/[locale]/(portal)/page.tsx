"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Brain, 
  Radio, 
  Users, 
  Baby, 
  Trophy, 
  Newspaper,
  TrendingUp,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  gradient: string;
  badge?: string;
}

export default function PortalPage() {
  const t = useTranslations();

  const features: FeatureCard[] = [
    {
      id: 'predictions',
      title: 'AI Predictions',
      description: 'Get AI-powered match predictions with confidence scores',
      icon: <Brain className="w-12 h-12" />,
      href: '/predictions',
      color: 'text-purple-400',
      gradient: 'from-purple-500/20 to-purple-600/20',
      badge: 'ML Powered'
    },
    {
      id: 'live',
      title: 'Live Tracking',
      description: 'Follow live matches with real-time scores and statistics',
      icon: <Radio className="w-12 h-12" />,
      href: '/live',
      color: 'text-green-400',
      gradient: 'from-green-500/20 to-emerald-600/20',
      badge: 'Live'
    },
    {
      id: 'social',
      title: 'Social Hub',
      description: 'Connect with friends, join challenges, and share predictions',
      icon: <Users className="w-12 h-12" />,
      href: '/social/feed',
      color: 'text-blue-400',
      gradient: 'from-blue-500/20 to-blue-600/20'
    },
    {
      id: 'kids',
      title: 'Kids Mode',
      description: 'Safe, educational sports content for young learners',
      icon: <Baby className="w-12 h-12" />,
      href: '/kids-mode',
      color: 'text-pink-400',
      gradient: 'from-pink-500/20 to-rose-600/20',
      badge: 'COPPA Safe'
    },
    {
      id: 'rewards',
      title: 'Rewards',
      description: 'Earn achievements and Pi Coins for participation',
      icon: <Trophy className="w-12 h-12" />,
      href: '/rewards/achievements',
      color: 'text-amber-400',
      gradient: 'from-amber-500/20 to-yellow-600/20'
    },
    {
      id: 'news',
      title: 'Sports News',
      description: 'Latest news, analysis, and expert insights',
      icon: <Newspaper className="w-12 h-12" />,
      href: '/news',
      color: 'text-indigo-400',
      gradient: 'from-indigo-500/20 to-indigo-600/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sports Central
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your premium sports prediction platform with AI-powered insights, 
            live tracking, and community features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Link 
              key={feature.id}
              href={feature.href}
              className="group relative"
            >
              <div className={`
                h-full p-8 rounded-2xl border-2 border-gray-700/50
                bg-gradient-to-br ${feature.gradient}
                backdrop-blur-xl
                hover:border-gray-600 hover:scale-105
                transition-all duration-300 ease-out
                cursor-pointer
              `}>
                
                {feature.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                      {feature.badge}
                    </span>
                  </div>
                )}

                <div className={`${feature.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                  {feature.title}
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <TrendingUp className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-gray-700/50">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-white/10 rounded-xl">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Safe & Secure Platform</h3>
              <p className="text-gray-300 mb-4">
                We prioritize your safety with COPPA-compliant kids mode, secure authentication, 
                and responsible gaming features. Learn while you predict!
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold border border-green-500/30">
                  ✅ COPPA Compliant
                </span>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/30">
                  ✅ Secure Authentication
                </span>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
                  ✅ Educational Focus
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            ✨ Powered by AI | 📊 Real-time Data | 🏆 Community Driven
          </p>
        </div>
      </div>
    </div>
  );
}
