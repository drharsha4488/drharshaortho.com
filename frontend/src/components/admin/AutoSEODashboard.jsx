import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  FileText, 
  Lightbulb, 
  Check, 
  X, 
  Clock,
  RefreshCw,
  Target,
  ArrowRight,
  ChevronRight,
  Loader2,
  Zap,
  BarChart3,
  Calendar,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Star,
  Lock,
  Globe,
  Send,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const AutoSEODashboard = () => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lastGenerated, setLastGenerated] = useState(null);
  
  // IndexNow state
  const [indexNowStatus, setIndexNowStatus] = useState(null);
  const [indexingAll, setIndexingAll] = useState(false);
  const [indexResult, setIndexResult] = useState(null);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/seo/dashboard`);
      if (response.ok) {
        const data = await response.json();
        setDashboard(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  }, []);

  // Fetch suggestions
  const fetchSuggestions = useCallback(async (filter = 'all') => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/admin/seo/suggestions?limit=50`;
      if (filter === 'high') url += '&priority=high';
      if (filter === 'pending') url += '&status=auto_suggested';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    setLoading(false);
  }, []);

  // Load data on mount
  useEffect(() => {
    const loadInitialData = async () => {
      await fetchDashboard();
      await fetchSuggestions();
      await fetchIndexNowStatus();
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch IndexNow status
  const fetchIndexNowStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/seo/indexnow/status`);
      if (response.ok) {
        const data = await response.json();
        setIndexNowStatus(data);
      }
    } catch (error) {
      console.error('Error fetching IndexNow status:', error);
    }
  };

  // Submit all pages to IndexNow
  const submitAllToIndexNow = async () => {
    setIndexingAll(true);
    setIndexResult(null);
    try {
      const response = await fetch(`${API_URL}/api/admin/seo/indexnow/submit-all-pages`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        setIndexResult(data);
        await fetchIndexNowStatus();
      }
    } catch (error) {
      console.error('Error submitting to IndexNow:', error);
      setIndexResult({ success: false, error: error.message });
    }
    setIndexingAll(false);
  };

  // Auto-generate suggestions
  const runAutoGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/seo/auto-generate`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        setLastGenerated(data);
        // Refresh data
        await fetchDashboard();
        await fetchSuggestions(activeFilter);
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
    setGenerating(false);
  };

  // Update suggestion status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/seo/suggestions/${id}/status?status=${status}`, {
        method: 'PUT'
      });
      if (response.ok) {
        fetchSuggestions(activeFilter);
        fetchDashboard();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Delete suggestion
  const deleteSuggestion = async (id) => {
    if (!confirm('Delete this suggestion?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/seo/suggestions/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchSuggestions(activeFilter);
        fetchDashboard();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'approved': return <Check className="w-4 h-4 text-blue-500" />;
      case 'rejected': return <X className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden Pages Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <EyeOff className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900">🔒 Hidden SEO Pages Strategy</h3>
            <p className="text-sm text-purple-700 mt-1">
              Auto-generated pages are <strong>hidden from the main website</strong> but <strong>visible to Google</strong>. 
              This means:
            </p>
            <ul className="text-sm text-purple-600 mt-2 space-y-1">
              <li>✅ Google can find and index these pages via sitemap</li>
              <li>✅ Users can access them via direct links from search results</li>
              <li>✅ Competitors cannot easily scan/copy your SEO strategy</li>
              <li>✅ Your main website stays clean and professional</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Header with Auto-Generate Button */}
      <div className="bg-gradient-to-r from-primary to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Zap className="w-8 h-8" />
              Automated SEO Engine
            </h2>
            <p className="mt-1 opacity-90">
              AI-powered keyword research & blog topic suggestions - fully automated!
            </p>
            {dashboard?.last_run && (
              <p className="mt-2 text-sm opacity-75">
                Last run: {new Date(dashboard.last_run).toLocaleString()}
              </p>
            )}
          </div>
          <Button 
            onClick={runAutoGenerate}
            disabled={generating}
            className="bg-white text-primary hover:bg-gray-100 px-6 py-3 text-lg"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate New Suggestions
              </>
            )}
          </Button>
        </div>

        {/* Generation Result */}
        {lastGenerated && (
          <div className="mt-4 bg-white/20 rounded-lg p-4">
            <p className="font-medium">✅ {lastGenerated.message}</p>
            <p className="text-sm opacity-90">
              Keywords researched: {lastGenerated.keywords_researched} | 
              New topics: {lastGenerated.new_topics_generated}
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboard?.stats?.by_priority?.high || 0}</p>
              <p className="text-sm text-gray-500">High Priority</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboard?.stats?.by_status?.pending || 0}</p>
              <p className="text-sm text-gray-500">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboard?.stats?.by_status?.approved || 0}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboard?.stats?.by_status?.published || 0}</p>
              <p className="text-sm text-gray-500">Published</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top High Priority Suggestions */}
      {dashboard?.top_suggestions?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-red-500" />
            🔥 Top High-Priority Topics (Write These First!)
          </h3>
          <div className="space-y-3">
            {dashboard.top_suggestions.map((topic, idx) => (
              <div 
                key={topic.id} 
                className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-medium">{topic.title}</p>
                    <p className="text-sm text-gray-500">Keyword: {topic.target_keyword}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateStatus(topic.id, 'approved')}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">All Topic Suggestions</h3>
            <div className="flex items-center gap-2">
              {['all', 'high', 'pending'].map(filter => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    fetchSuggestions(filter);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeFilter === filter
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter === 'high' ? 'High Priority' : 'Pending'}
                </button>
              ))}
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => fetchSuggestions(activeFilter)}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No suggestions yet.</p>
              <p className="text-sm">Click the Generate New Suggestions button to start!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {suggestions.map((topic) => (
                <div key={topic.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(topic.status)}
                        <h4 className="font-medium">{topic.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(topic.priority)}`}>
                          {topic.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Target: <span className="font-medium">{topic.target_keyword}</span>
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">{topic.meta_description}</p>
                      
                      {/* Outline Preview */}
                      <details className="mt-2">
                        <summary className="text-sm text-primary cursor-pointer hover:underline">
                          View Outline ({topic.outline?.length || 0} sections)
                        </summary>
                        <ul className="mt-2 ml-4 text-sm text-gray-600 space-y-1">
                          {topic.outline?.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <ChevronRight className="w-3 h-3" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {topic.status === 'auto_suggested' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => updateStatus(topic.id, 'approved')}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => updateStatus(topic.id, 'rejected')}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {topic.status === 'approved' && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateStatus(topic.id, 'published')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark Published
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => deleteSuggestion(topic.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">🤖 How the Automated SEO Engine Works</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm text-blue-700">
          <div className="flex items-start gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">1</span>
            <p><strong>Keyword Research:</strong> Scans Google for trending orthopedic searches</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">2</span>
            <p><strong>Priority Scoring:</strong> Ranks keywords by business value (cost, local searches)</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">3</span>
            <p><strong>Topic Generation:</strong> Creates blog titles, meta descriptions, and outlines</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">4</span>
            <p><strong>Review & Publish:</strong> You approve topics and track publishing status</p>
          </div>
        </div>
      </div>

      {/* IndexNow Instant Indexing */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-green-900 text-lg flex items-center gap-2">
                🚀 IndexNow - Instant Search Engine Indexing
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Submit all your pages directly to Bing, Yandex, and other search engines for instant indexing. 
                No waiting for crawlers!
              </p>
              
              {indexNowStatus && (
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded-full ${indexNowStatus.enabled ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {indexNowStatus.enabled ? '✅ Enabled' : '❌ Disabled'}
                  </span>
                  <span className="text-green-600">
                    Total Submissions: <strong>{indexNowStatus.total_submissions || 0}</strong>
                  </span>
                </div>
              )}

              {/* Recent submission result */}
              {indexResult && (
                <div className={`mt-3 p-3 rounded-lg ${indexResult.success ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                  {indexResult.success ? (
                    <p className="text-green-800 font-medium">
                      ✅ Successfully submitted {indexResult.total_urls} URLs to search engines!
                    </p>
                  ) : (
                    <p className="text-red-800 font-medium">
                      ❌ Error: {indexResult.error || 'Submission failed'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <Button 
            onClick={submitAllToIndexNow}
            disabled={indexingAll}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 flex-shrink-0"
          >
            {indexingAll ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Indexing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit All Pages
              </>
            )}
          </Button>
        </div>

        {/* How IndexNow Works */}
        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-xs text-green-600 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Supported by: Bing, Yandex, Seznam.cz, Naver, and more search engines
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoSEODashboard;
