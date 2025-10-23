'use client';

import React, { useState, useEffect } from 'react';
import { NewsAuthorService } from '../services/newsAuthorService';
import { NewsService, NewsAuthor, NewsItem } from '../services/newsService';

interface NewsAuthorManagerProps {
  className?: string;
}

export const NewsAuthorManager: React.FC<NewsAuthorManagerProps> = ({ className = '' }) => {
  const [authors, setAuthors] = useState<NewsAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState<NewsAuthor | null>(null);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    id: '',
    name: '',
    icon: '📝',
    bio: '',
    expertise: ''
  });

  useEffect(() => {
    loadAuthors();
    loadRecentNews();
  }, []);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const fetchedAuthors = await NewsAuthorService.getAllAuthors();
      setAuthors(fetchedAuthors);
    } catch (error) {
      console.error('Failed to load authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentNews = async () => {
    try {
      const newsResponse = await NewsService.getAllNews();
      setRecentNews(newsResponse.data.slice(0, 5)); // Show latest 5 news items
    } catch (error) {
      console.error('Failed to load recent news:', error);
    }
  };

  const handleCreateAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authorData = {
        ...newAuthor,
        expertise: newAuthor.expertise.split(',').map(e => e.trim()).filter(e => e.length > 0)
      };
      
      await NewsAuthorService.createOrUpdateAuthor(authorData);
      setNewAuthor({ id: '', name: '', icon: '📝', bio: '', expertise: '' });
      setShowCreateForm(false);
      loadAuthors();
    } catch (error) {
      console.error('Failed to create author:', error);
    }
  };

  const handleGenerateAutoNews = async (authorId: string, type: string) => {
    try {
      let result = null;
      
      switch (type) {
        case 'prediction':
          result = await NewsAuthorService.simulateMaraCollaboration();
          break;
        case 'milestone':
          result = await NewsAuthorService.celebrateMilestone(authorId, Math.floor(Math.random() * 20) + 10);
          break;
        case 'analysis':
          result = await NewsAuthorService.shareAnalysis(authorId, 'Premier League Form Analysis');
          break;
      }
      
      if (result) {
        loadRecentNews(); // Refresh news list
        alert(`Auto news generated successfully for ${authors.find(a => a.id === authorId)?.name}!`);
      }
    } catch (error) {
      console.error('Failed to generate auto news:', error);
    }
  };

  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>📰</span>
          News Author Management
        </h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          {showCreateForm ? 'Cancel' : '+ Add Author'}
        </button>
      </div>

      {/* Create Author Form */}
      {showCreateForm && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Author</h3>
          <form onSubmit={handleCreateAuthor} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">ID</label>
                <input
                  value={newAuthor.id}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, id: e.target.value }))}
                  className="w-full mt-1 p-2 bg-gray-700 rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Name</label>
                <input
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full mt-1 p-2 bg-gray-700 rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Icon</label>
                <input
                  value={newAuthor.icon}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full mt-1 p-2 bg-gray-700 rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Expertise (comma separated)</label>
                <input
                  value={newAuthor.expertise}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, expertise: e.target.value }))}
                  className="w-full mt-1 p-2 bg-gray-700 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-300">Bio</label>
                <textarea
                  value={newAuthor.bio}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full mt-1 p-2 bg-gray-700 rounded"
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" className="bg-green-600 px-4 py-2 rounded">Create</button>
                <button type="button" onClick={() => setShowCreateForm(false)} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Recent News */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Recent Auto News</h3>

        {recentNews.length === 0 ? (
          <p className="text-sm text-gray-400">No recent auto-generated news</p>
        ) : (
          <div className="space-y-4">
            {recentNews.map((news) => {
              // Normalize author: backend may return either a full author object or a string id
              const author: NewsAuthor = typeof news.author === 'string'
                ? {
                    id: String(news.author),
                    name: String(news.author),
                    icon: '📝',
                    bio: '',
                    expertise: [],
                    collaborationCount: 0
                  }
                : news.author;

              return (
                <div key={news.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{author.icon}</span>
                    <span className="font-medium">{author.name}</span>
                    <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                      {news.collaborationType}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">{news.preview}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Author List */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Authors</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {authors.map(author => (
            <div key={author.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl">
                  {author.icon}
                </div>
                <div>
                  <div className="font-semibold">{author.name}</div>
                  <div className="text-xs text-gray-400">{author.expertise?.join(', ')}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleGenerateAutoNews(author.id, 'prediction')}
                  className="px-3 py-1 bg-indigo-600 rounded"
                >
                  Generate Prediction News
                </button>
                <button
                  onClick={() => handleGenerateAutoNews(author.id, 'milestone')}
                  className="px-3 py-1 bg-yellow-600 rounded"
                >
                  Celebrate Milestone
                </button>
                <button
                  onClick={() => handleGenerateAutoNews(author.id, 'analysis')}
                  className="px-3 py-1 bg-green-600 rounded"
                >
                  Share Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
