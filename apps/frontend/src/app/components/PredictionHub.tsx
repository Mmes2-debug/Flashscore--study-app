
'use client';

import React, { useState, useEffect } from 'react';
import { MLPredictionInterface } from './MLPredictionInterface';
import { ConfidenceSlider } from './ConfidenceSlider';
import { PredictionPreview } from './PredictionPreview';
import { Brain, TrendingUp, BarChart3, Zap } from 'lucide-react';

interface PredictionHubProps {
  showMLInterface?: boolean;
  showModelDashboard?: boolean;
  showLivePredictions?: boolean;
}

export const PredictionHub: React.FC<PredictionHubProps> = ({
  showMLInterface = true,
  showModelDashboard = true,
  showLivePredictions = true
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'live' | 'model'>('generate');
  const [mlStatus, setMlStatus] = useState<'online' | 'offline' | 'loading'>('loading');

  useEffect(() => {
    checkMLStatus();
  }, []);

  const checkMLStatus = async () => {
    try {
      const response = await fetch('/api/ml/status');
      const data = await response.json();
      setMlStatus(data.success ? 'online' : 'offline');
    } catch {
      setMlStatus('offline');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-500" />
            Prediction Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI-powered sports predictions & analytics
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
          mlStatus === 'online' ? 'bg-green-100 text-green-800' : 
          mlStatus === 'offline' ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            mlStatus === 'online' ? 'bg-green-500' : 
            mlStatus === 'offline' ? 'bg-red-500' : 
            'bg-yellow-500'
          } animate-pulse`} />
          <span className="font-semibold text-sm">
            ML Service {mlStatus === 'loading' ? 'Checking...' : mlStatus.charAt(0).toUpperCase() + mlStatus.slice(1)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
        {showMLInterface && (
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'generate'
                ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Zap className="w-5 h-5" />
            Generate Prediction
          </button>
        )}
        {showLivePredictions && (
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'live'
                ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Live Predictions
          </button>
        )}
        {showModelDashboard && (
          <button
            onClick={() => setActiveTab('model')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'model'
                ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Model Dashboard
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeTab === 'generate' && showMLInterface && (
          <div className="animate-in fade-in duration-300">
            <MLPredictionInterface />
          </div>
        )}

        {activeTab === 'live' && showLivePredictions && (
          <div className="animate-in fade-in duration-300">
            <LivePredictionsFeed />
          </div>
        )}

        {activeTab === 'model' && showModelDashboard && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Model Dashboard Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced ML model analytics and performance metrics will be available here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LivePredictionsFeed: React.FC = () => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch('/api/predictions?limit=10');
      const data = await response.json();
      if (data.success) {
        setPredictions(data.predictions || []);
      }
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading predictions...</div>;
  }

  if (predictions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No live predictions available</p>
        <button
          onClick={fetchPredictions}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {predictions.slice(0, 6).map((pred, index) => (
        <PredictionPreview key={pred.matchId || index} prediction={{
          id: pred.matchId || `pred-${index}`,
          match: `${pred.homeTeam} vs ${pred.awayTeam}`,
          prediction: pred.predictedWinner || pred.prediction,
          confidence: pred.confidence || 0,
          homeTeam: pred.homeTeam,
          awayTeam: pred.awayTeam,
          league: pred.league || 'Unknown League',
          date: pred.matchDate || new Date().toISOString(),
          probabilities: pred.probabilities,
          modelVersion: pred.model_version
        }} />
      ))}
    </div>
  );
};

export default PredictionHub;
