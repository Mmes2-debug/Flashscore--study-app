"use client";

import React from 'react';
import Link from "next/link";
import { useMobile } from '../hooks/useMobile';

export default function HomePage() {
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Icon/Logo */}
          <div className="mb-8 animate-bounce-slow">
            <div className="text-8xl md:text-9xl mb-6">🏆</div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Welcome to
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sports Central
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
            AI-Powered Sports Intelligence • Live Predictions • Real-time Analytics
          </p>

          {/* CTA Button */}
          <Link href="/features">
            <button className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-lg md:text-xl font-semibold shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-3">
                Explore Features
                <svg 
                  className="w-6 h-6 group-hover:translate-x-2 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>

              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </button>
          </Link>

          {/* Feature Pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {[
              { icon: "🤖", text: "AI Predictions" },
              { icon: "⚡", text: "Live Tracking" },
              { icon: "🎯", text: "87% Accuracy" },
              { icon: "🛡️", text: "Kids Safe" }
            ].map((feature, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white font-medium hover:bg-white/20 transition-all cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { value: "2.3K+", label: "Active Users" },
            { value: "8.5K+", label: "Predictions" },
            { value: "78.5%", label: "Accuracy" },
            { value: "12", label: "Top Streak" }
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}