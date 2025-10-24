
'use client';

import React, { useEffect, useState } from 'react';

import { useState, useEffect } from 'react';

interface ErrorPattern {
  pattern: string;
  frequency: number;
  lastOccurrence: string;
  predictedNext: string;
  severity: 'low' | 'medium' | 'high';
  preventionTip: string;
}

export function ErrorPredictionAI() {
  const [patterns, setPatterns] = useState<ErrorPattern[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);

  useEffect(() => {
    analyzeErrorPatterns();
    const interval = setInterval(analyzeErrorPatterns, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  const analyzeErrorPatterns = () => {
    try {
      const errorLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      
      // Group errors by message pattern
      const patternMap = new Map<string, number>();
      errorLogs.forEach((error: any) => {
        const pattern = extractPattern(error.message);
        patternMap.set(pattern, (patternMap.get(pattern) || 0) + 1);
      });

      // Identify frequent patterns
      const frequentPatterns: ErrorPattern[] = [];
      patternMap.forEach((frequency, pattern) => {
        if (frequency >= 3) {
          const relatedErrors = errorLogs.filter((e: any) => 
            extractPattern(e.message) === pattern
          );
          
          frequentPatterns.push({
            pattern,
            frequency,
            lastOccurrence: relatedErrors[0]?.timestamp || new Date().toISOString(),
            predictedNext: predictNextOccurrence(relatedErrors),
            severity: frequency > 10 ? 'high' : frequency > 5 ? 'medium' : 'low',
            preventionTip: generatePreventionTip(pattern)
          });
        }
      });

      setPatterns(frequentPatterns);

      // Generate predictions
      const newPredictions = frequentPatterns
        .filter(p => p.severity === 'high')
        .map(p => `⚠️ ${p.pattern} likely to occur ${p.predictedNext}`);
      
      setPredictions(newPredictions);
    } catch (error) {
      console.error('Error analysis failed:', error);
    }
  };

  const extractPattern = (message: string): string => {
    // Remove specific details to get pattern
    return message
      .replace(/\d+/g, 'N')
      .replace(/['"]/g, '')
      .replace(/\s+/g, ' ')
      .substring(0, 100);
  };
  };

  const predictNextOccurrence = (errors: any[]): string => {
    if (errors.length < 2) return 'soon';
    
    const times = errors.map((e: any) => new Date(e.timestamp).getTime());
    const intervals = [];
    for (let i = 1; i < times.length; i++) {
      intervals.push(times[i-1] - times[i]);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const hours = Math.round(avgInterval / (1000 * 60 * 60));
    
    return hours < 1 ? 'within minutes' : 
           hours < 24 ? `in ~${hours} hours` : 
           `in ~${Math.round(hours / 24)} days`;
  };

  const generatePreventionTip = (pattern: string): string => {
    if (pattern.includes('network') || pattern.includes('fetch')) {
      return 'Enable offline mode or implement retry logic';
    }
    if (pattern.includes('undefined') || pattern.includes('null')) {
      return 'Add null checks and default values';
    }
    if (pattern.includes('hook')) {
      return 'Ensure hooks are called at component top level';
    }
    if (pattern.includes('render')) {
      return 'Optimize component render performance';
    }
    return 'Review error stack trace for specific fix';
  };

  if (patterns.length === 0) return null;

  return (
    <div style={{ padding: '20px', background: '#1f2937', borderRadius: '12px', color: 'white' }}>
      <h3 style={{ marginBottom: '16px' }}>🔮 Error Prediction AI</h3>
      <div style={{ marginBottom: '16px' }}>
        <h4>Predicted Issues:</h4>
        {predictions.map((pred, idx) => (
          <div key={idx} style={{ padding: '8px', background: 'rgba(255,0,0,0.1)', borderRadius: '8px', margin: '8px 0' }}>
            {pred}
          </div>
        ))}
      </div>
      <div>
        <h4>Error Patterns:</h4>
        {patterns.map((p, idx) => (
          <div key={idx} style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', margin: '8px 0' }}>
            <div><strong>{p.pattern}</strong></div>
            <div>Frequency: {p.frequency} | Severity: {p.severity}</div>
            <div style={{ color: '#10b981', marginTop: '4px' }}>💡 {p.preventionTip}</div>
          </div>
        ))}
      </div>
    </div>
  );ull;

  return (
    <div className="fixed top-20 right-4 max-w-md z-40">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white rounded-xl shadow-2xl p-6 border border-purple-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Error Prediction</h3>
            <p className="text-xs text-purple-200">Pattern Analysis Active</p>
          </div>
        </div>

        {predictions.length > 0 && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-400 rounded-lg">
            <p className="font-semibold text-sm mb-2">🔮 Predictions:</p>
            {predictions.map((pred, i) => (
              <p key={i} className="text-xs mb-1">{pred}</p>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {patterns.slice(0, 5).map((pattern, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded font-bold ${
                  pattern.severity === 'high' ? 'bg-red-500' :
                  pattern.severity === 'medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}>
                  {pattern.severity.toUpperCase()}
                </span>
                <span className="text-xs text-purple-200">×{pattern.frequency}</span>
              </div>
              <p className="text-sm mb-2 font-mono">{pattern.pattern}</p>
              <p className="text-xs text-purple-200 italic">💡 {pattern.preventionTip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
