import React, { useState, useEffect } from 'react';
import { 
  Search, 
  TrendingUp, 
  FileText, 
  Lightbulb, 
  Plus, 
  Check, 
  X, 
  Clock,
  RefreshCw,
  Sparkles,
  BookOpen,
  Target,
  ArrowRight,
  Copy,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const KeywordResearchTool = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [seedKeyword, setSeedKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [trendingKeywords, setTrendingKeywords] = useState([]);
  const [generatedTopics, setGeneratedTopics] = useState([]);
  const [savedTopics, setSavedTopics] = useState([]);
  const [contentIdeas, setContentIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // Fetch saved data on mount
  useEffect(() => {
    fetchSavedTopics();
    fetchContentIdeas();
  }, []);

  const fetchSavedTopics = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/blog-topics`);
      if (response.ok) {
        const data = await response.json();
        setSavedTopics(data);
      }
    } catch (error) {
      console.error('Error fetching saved topics:', error);
    }
  };

  const fetchContentIdeas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/content-ideas`);
      if (response.ok) {
        const data = await response.json();
        setContentIdeas(data);
      }
    } catch (error) {
      console.error('Error fetching content ideas:', error);
    }
  };

  const searchKeywords = async () => {
    if (!seedKeyword.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/keywords/autocomplete/${encodeURIComponent(seedKeyword)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error searching keywords:', error);
    }
    setLoading(false);
  };

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/keywords/trending`);
      if (response.ok) {
        const data = await response.json();
        setTrendingKeywords(data.trending_keywords || []);
      }
    } catch (error) {
      console.error('Error fetching trending:', error);
    }
    setLoading(false);
  };

  const generateTopics = async () => {
    if (selectedKeywords.length === 0) {
      alert('Please select at least one keyword');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/keywords/generate-blog-topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedKeywords)
      });
      if (response.ok) {
        const data = await response.json();
        setGeneratedTopics(data.topics || []);
        setActiveTab('topics');
      }
    } catch (error) {
      console.error('Error generating topics:', error);
    }
    setLoading(false);
  };

  const saveTopic = async (topic) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/blog-topics/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topic)
      });
      if (response.ok) {
        fetchSavedTopics();
        alert('Topic saved!');
      }
    } catch (error) {
      console.error('Error saving topic:', error);
    }
  };

  const updateTopicStatus = async (topicId, status) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/blog-topics/${topicId}/status?status=${status}`, {
        method: 'PUT'
      });
      if (response.ok) {
        fetchSavedTopics();
      }
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const toggleKeywordSelection = (keyword) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Keyword Research & Blog Suggestions
        </h2>
        <p className="text-gray-500 mt-1">Find trending keywords and generate blog topic ideas</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'search', label: 'Keyword Search', icon: Search },
          { id: 'trending', label: 'Trending', icon: TrendingUp },
          { id: 'topics', label: 'Generated Topics', icon: Lightbulb },
          { id: 'saved', label: 'Saved Topics', icon: BookOpen },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.id === 'trending' && trendingKeywords.length === 0) {
                fetchTrending();
              }
            }}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.id === 'saved' && savedTopics.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {savedTopics.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Keyword Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={seedKeyword}
                  onChange={(e) => setSeedKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchKeywords()}
                  placeholder="Enter a seed keyword (e.g., knee replacement, ACL surgery)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <Button onClick={searchKeywords} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
              </Button>
            </div>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Quick search:</span>
              {['knee replacement', 'hip replacement', 'ACL surgery', 'back pain', 'shoulder pain'].map(kw => (
                <button
                  key={kw}
                  onClick={() => {
                    setSeedKeyword(kw);
                    setTimeout(() => searchKeywords(), 100);
                  }}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Results */}
            {suggestions.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Keyword Suggestions ({suggestions.length})</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateTopics}
                    disabled={selectedKeywords.length === 0}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Topics ({selectedKeywords.length})
                  </Button>
                </div>
                <div className="grid gap-2 max-h-96 overflow-y-auto">
                  {suggestions.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => toggleKeywordSelection(item.keyword)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedKeywords.includes(item.keyword)
                          ? 'bg-primary/10 border border-primary'
                          : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedKeywords.includes(item.keyword)
                            ? 'bg-primary border-primary text-white'
                            : 'border-gray-300'
                        }`}>
                          {selectedKeywords.includes(item.keyword) && <Check className="w-3 h-3" />}
                        </div>
                        <span>{item.keyword}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(item.keyword);
                        }}
                        className="p-1.5 hover:bg-gray-200 rounded"
                        title="Copy keyword"
                      >
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Trending Orthopedic Keywords</h3>
              <Button variant="outline" size="sm" onClick={fetchTrending} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-2">
                {trendingKeywords.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleKeywordSelection(item.keyword)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedKeywords.includes(item.keyword)
                        ? 'bg-primary/10 border border-primary'
                        : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>{item.keyword}</span>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{item.category}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.keyword);
                      }}
                      className="p-1.5 hover:bg-gray-200 rounded"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedKeywords.length > 0 && (
              <div className="pt-4 border-t">
                <Button onClick={generateTopics} disabled={loading}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Blog Topics ({selectedKeywords.length} keywords)
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Generated Topics Tab */}
        {activeTab === 'topics' && (
          <div className="space-y-4">
            {generatedTopics.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No topics generated yet.</p>
                <p className="text-sm">Search for keywords and click "Generate Topics"</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-medium">Generated Blog Topics ({generatedTopics.length})</h3>
                {generatedTopics.map((topic, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{topic.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">Target: {topic.target_keyword}</p>
                      </div>
                      <Button size="sm" onClick={() => saveTopic(topic)}>
                        <Plus className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">{topic.meta_description}</p>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Suggested Outline:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {topic.outline.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center">{i + 1}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Topics Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedTopics.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No saved topics yet.</p>
                <p className="text-sm">Generate and save topics to track your content calendar</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedTopics.map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{topic.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          topic.status === 'published' ? 'bg-green-100 text-green-700' :
                          topic.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                          topic.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {topic.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{topic.target_keyword}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={topic.status}
                        onChange={(e) => updateTopicStatus(topic.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="suggested">Suggested</option>
                        <option value="approved">Approved</option>
                        <option value="in_progress">In Progress</option>
                        <option value="published">Published</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordResearchTool;
