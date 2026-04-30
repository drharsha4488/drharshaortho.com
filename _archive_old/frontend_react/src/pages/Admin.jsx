import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OrganicGrowthDashboard from '@/components/admin/OrganicGrowthDashboard';
import {
  Lock, LogOut, RefreshCw, Activity, TrendingUp, BarChart3, Layers,
  Eye, Calendar, Users, Globe, MessageSquare, Target,
  FileText, Plus, Edit, X, Search, Trash2, ExternalLink
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('growth');
  const navigate = useNavigate();

  // Analytics state
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // CMS Pages state
  const [cmsPages, setCmsPages] = useState([]);
  const [cmsLoading, setCmsLoading] = useState(false);
  const [showCmsForm, setShowCmsForm] = useState(false);
  const [editingCmsPage, setEditingCmsPage] = useState(null);
  const [cmsFilter, setCmsFilter] = useState('all');
  const [cmsSearch, setCmsSearch] = useState('');
  const [seedingContent, setSeedingContent] = useState(false);
  const [cmsForm, setCmsForm] = useState({
    slug: '', type: 'general', title: '', meta_title: '', meta_description: '',
    keywords: '', content: { hero: { title: '', subtitle: '' }, introduction: '', sections: [] }, status: 'draft'
  });

  useEffect(() => {
    const session = sessionStorage.getItem('adminAuth');
    if (session === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      fetchCmsPages();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/analytics`);
      if (res.ok) setAnalytics(await res.json());
    } catch (err) { console.error(err); }
    setAnalyticsLoading(false);
  };

  const fetchCmsPages = async () => {
    setCmsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/cms/pages`);
      if (res.ok) setCmsPages(await res.json());
    } catch (err) { console.error(err); }
    setCmsLoading(false);
  };

  const seedCmsContent = async () => {
    if (!window.confirm('Seed initial CMS content? Existing pages will be skipped.')) return;
    setSeedingContent(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/cms/seed-content`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (res.ok) fetchCmsPages();
    } catch (err) { console.error(err); }
    setSeedingContent(false);
  };

  const handleCmsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...cmsForm, keywords: cmsForm.keywords.split(',').map(k => k.trim()).filter(Boolean) };
      const url = editingCmsPage ? `${API_URL}/api/admin/cms/pages/${editingCmsPage.id}` : `${API_URL}/api/admin/cms/pages`;
      const res = await fetch(url, {
        method: editingCmsPage ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) { fetchCmsPages(); resetCmsForm(); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleEditCmsPage = (page) => {
    setEditingCmsPage(page);
    setCmsForm({
      slug: page.slug, type: page.type, title: page.title,
      meta_title: page.meta_title || '', meta_description: page.meta_description || '',
      keywords: (page.keywords || []).join(', '),
      content: page.content || { hero: { title: '', subtitle: '' }, introduction: '', sections: [] },
      status: page.status
    });
    setShowCmsForm(true);
  };

  const handleDeleteCmsPage = async (pageId) => {
    if (!window.confirm('Delete this page?')) return;
    await fetch(`${API_URL}/api/admin/cms/pages/${pageId}`, { method: 'DELETE' });
    fetchCmsPages();
  };

  const resetCmsForm = () => {
    setShowCmsForm(false);
    setEditingCmsPage(null);
    setCmsForm({
      slug: '', type: 'general', title: '', meta_title: '', meta_description: '',
      keywords: '', content: { hero: { title: '', subtitle: '' }, introduction: '', sections: [] }, status: 'draft'
    });
  };

  const filteredCmsPages = cmsPages.filter(page => {
    const matchesFilter = cmsFilter === 'all' || page.type === cmsFilter || page.status === cmsFilter;
    const matchesSearch = page.title?.toLowerCase().includes(cmsSearch.toLowerCase()) || page.slug?.toLowerCase().includes(cmsSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  };

  // ─── LOGIN SCREEN ─────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal to-charcoal/90 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-serif font-semibold text-charcoal" data-testid="admin-title">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Dr. Harsha Orthopedic Centre</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" placeholder="Enter admin password" value={password}
                onChange={(e) => setPassword(e.target.value)} className="h-12" required data-testid="admin-password-input" />
              <Button type="submit" className="w-full h-12" disabled={loading} data-testid="admin-login-btn">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              <button onClick={() => navigate('/')} className="text-primary hover:underline">Back to Website</button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── DASHBOARD ────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-serif font-semibold text-lg">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Dr. Harsha Orthopedic Centre</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => { fetchAnalytics(); fetchCmsPages(); }} data-testid="refresh-btn">
                <RefreshCw className="w-4 h-4 mr-2" />Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="logout-btn">
                <LogOut className="w-4 h-4 mr-2" />Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          {[
            { id: 'growth', label: 'Organic Growth', icon: <TrendingUp className="w-4 h-4 inline mr-2" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4 inline mr-2" /> },
            { id: 'cms', label: 'CMS Pages', icon: <Layers className="w-4 h-4 inline mr-2" /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} data-testid={`${tab.id}-tab`}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Organic Growth Tab */}
        {activeTab === 'growth' && <OrganicGrowthDashboard />}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsTab analytics={analytics} loading={analyticsLoading} onRetry={fetchAnalytics} formatDate={formatDate} />
        )}

        {/* CMS Pages Tab */}
        {activeTab === 'cms' && (
          <CmsPagesTab
            pages={filteredCmsPages} loading={cmsLoading} search={cmsSearch} setSearch={setCmsSearch}
            filter={cmsFilter} setFilter={setCmsFilter} seedContent={seedCmsContent} seedingContent={seedingContent}
            showForm={showCmsForm} setShowForm={setShowCmsForm} form={cmsForm} setForm={setCmsForm}
            editing={editingCmsPage} onSubmit={handleCmsSubmit} onEdit={handleEditCmsPage}
            onDelete={handleDeleteCmsPage} onReset={resetCmsForm} saving={loading} formatDate={formatDate}
          />
        )}
      </main>
    </div>
  );
};

// ─── ANALYTICS TAB COMPONENT ────────────────────────
const AnalyticsTab = ({ analytics, loading, onRetry, formatDate }) => {
  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!analytics) return (
    <div className="text-center py-12 text-muted-foreground">
      <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-30" />
      <p>Unable to load analytics</p>
      <Button onClick={onRetry} variant="outline" className="mt-4">Try Again</Button>
    </div>
  );

  const ov = analytics.overview || {};
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6" data-testid="analytics-section">
      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Views', value: ov.total_views, icon: <Eye className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-100', color: 'text-charcoal' },
          { label: 'Today', value: ov.today_views, icon: <TrendingUp className="w-5 h-5 text-green-600" />, bg: 'bg-green-100', color: 'text-green-600' },
          { label: 'This Week', value: ov.week_views, icon: <BarChart3 className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-100', color: 'text-blue-600' },
          { label: 'This Month', value: ov.month_views, icon: <Calendar className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-100', color: 'text-purple-600' },
          { label: 'Unique Visitors', value: ov.unique_visitors, icon: <Users className="w-5 h-5 text-orange-600" />, bg: 'bg-orange-100', color: 'text-orange-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-muted-foreground">{s.label}</p><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p></div>
              <div className={`w-10 h-10 ${s.bg} rounded-full flex items-center justify-center`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Views + Top Pages */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />Daily Views (Last 7 Days)</h3>
          <div className="h-48 flex items-end gap-2">
            {(analytics.daily_views || []).map((day, i) => {
              const max = Math.max(...(analytics.daily_views || []).map(d => d.views), 1);
              const h = (day.views / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-secondary rounded-t-lg relative group" style={{ height: '160px' }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/70 rounded-t-lg" />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-charcoal text-white text-xs px-2 py-1 rounded">{day.views}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-primary" />Top Pages</h3>
          {(analytics.top_pages || []).length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No page data yet</p> : (
            <div className="space-y-3">
              {analytics.top_pages.slice(0, 5).map((page, i) => {
                const maxV = analytics.top_pages[0]?.views || 1;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="truncate max-w-[200px] text-muted-foreground">{page.page || '/'}</span>
                      <span className="font-medium">{page.views}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(page.views / maxV) * 100}%` }}
                        transition={{ delay: 0.4 + i * 0.05 }} className="h-full bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Engagement */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-green-600" />Conversion Rate</h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-green-600">{analytics.engagement?.conversion_rate || 0}%</p>
            <p className="text-sm text-muted-foreground mt-2">Visitors to Appointments</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" />AI Chat Engagement</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">{analytics.engagement?.total_chats || 0}</p>
              <p className="text-sm text-muted-foreground">Total Chats</p>
            </div>
            <div className="bg-accent/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-accent">{analytics.engagement?.recent_chats || 0}</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-primary" />Top Referrers</h3>
          {(analytics.top_referrers || []).filter(r => r.referrer).length === 0
            ? <p className="text-sm text-muted-foreground text-center py-8">No referrer data yet</p>
            : <div className="space-y-2">{analytics.top_referrers.filter(r => r.referrer).map((ref, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground truncate max-w-[200px]">{(ref.referrer || 'Direct').replace(/^https?:\/\//, '').split('/')[0]}</span>
                  <span className="text-sm font-medium bg-secondary px-2 py-1 rounded">{ref.count}</span>
                </div>
              ))}</div>
          }
        </div>
      </div>

      {/* Content Overview */}
      {analytics.content_stats && (
        <div className="bg-gradient-to-r from-charcoal to-charcoal/90 rounded-xl p-6 text-white">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Layers className="w-5 h-5" />Content Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { v: analytics.content_stats.total_cms_pages, l: 'CMS Pages' },
              { v: analytics.content_stats.published_pages, l: 'Published', c: 'text-green-400' },
              { v: analytics.content_stats.draft_pages, l: 'Drafts', c: 'text-yellow-400' },
              { v: analytics.content_stats.total_blogs, l: 'Blog Posts' },
              { v: analytics.content_stats.seo_suggestions, l: 'SEO Topics' },
              { v: analytics.content_stats.approved_seo, l: 'Approved', c: 'text-green-400' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className={`text-2xl font-bold ${s.c || ''}`}>{s.v}</p>
                <p className="text-xs text-gray-300">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ─── CMS PAGES TAB COMPONENT ───────────────────────
const CmsPagesTab = ({ pages, loading: cmsLoading, search, setSearch, filter, setFilter,
  seedContent, seedingContent, showForm, setShowForm, form, setForm,
  editing, onSubmit, onEdit, onDelete, onReset, saving, formatDate }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6" data-testid="cms-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Content Management</h2>
          <p className="text-sm text-muted-foreground">{pages.length} pages</p>
        </div>
        <div className="flex gap-2">
          {pages.length < 5 && (
            <Button onClick={seedContent} variant="outline" className="gap-2" disabled={seedingContent} data-testid="seed-content-btn">
              <RefreshCw className={`w-4 h-4 ${seedingContent ? 'animate-spin' : ''}`} />{seedingContent ? 'Seeding...' : 'Seed Content'}
            </Button>
          )}
          <Button onClick={() => setShowForm(true)} className="gap-2" data-testid="create-page-btn">
            <Plus className="w-4 h-4" />Create Page
          </Button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" data-testid="cms-search-input" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'published', 'draft', 'condition', 'treatment', 'seo_landing', 'blog', 'general'].map(opt => (
            <button key={opt} onClick={() => setFilter(opt)} data-testid={`cms-filter-${opt}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                filter === opt ? 'bg-primary text-white' : 'bg-white text-muted-foreground hover:bg-secondary border border-border'
              }`}>{opt}</button>
          ))}
        </div>
      </div>

      {/* CMS Form Modal */}
      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onReset}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Page' : 'Create New Page'}</h3>
              <button onClick={onReset}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Title *</label>
                  <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Page title" required /></div>
                <div><label className="block text-sm font-medium mb-1">Slug *</label>
                  <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="url-slug" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="general">General</option><option value="condition">Condition</option>
                    <option value="treatment">Treatment</option><option value="seo_landing">SEO Landing</option><option value="blog">Blog Post</option>
                  </select></div>
                <div><label className="block text-sm font-medium mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="draft">Draft</option><option value="published">Published</option>
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Meta Title</label>
                <Input value={form.meta_title} onChange={e => setForm({ ...form, meta_title: e.target.value })} placeholder="SEO title" /></div>
              <div><label className="block text-sm font-medium mb-1">Meta Description</label>
                <Input value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} placeholder="SEO description" /></div>
              <div><label className="block text-sm font-medium mb-1">Keywords (comma-separated)</label>
                <Input value={form.keywords} onChange={e => setForm({ ...form, keywords: e.target.value })} placeholder="keyword1, keyword2" /></div>
              <div><label className="block text-sm font-medium mb-1">Introduction</label>
                <textarea value={form.content.introduction || ''} onChange={e => setForm({ ...form, content: { ...form.content, introduction: e.target.value } })}
                  placeholder="Opening paragraph..." className="w-full px-3 py-2 rounded-md border border-input bg-background min-h-[120px]" /></div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={onReset}>Cancel</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Saving...' : (editing ? 'Update Page' : 'Create Page')}</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Pages Table */}
      {cmsLoading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <Layers className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <p className="text-muted-foreground mb-4">No pages found</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={seedContent} disabled={seedingContent}><RefreshCw className={`w-4 h-4 mr-2 ${seedingContent ? 'animate-spin' : ''}`} />{seedingContent ? 'Seeding...' : 'Seed Content'}</Button>
            <Button onClick={() => setShowForm(true)} variant="outline"><Plus className="w-4 h-4 mr-2" />Create Page</Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Updated</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3"><p className="font-medium text-foreground">{page.title}</p><p className="text-xs text-muted-foreground">/{page.slug}</p></td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      page.type === 'condition' ? 'bg-blue-100 text-blue-700' :
                      page.type === 'treatment' ? 'bg-green-100 text-green-700' :
                      page.type === 'seo_landing' ? 'bg-purple-100 text-purple-700' :
                      page.type === 'blog' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                    }`}>{page.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{page.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{formatDate(page.updated_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {page.status === 'published' && (
                        <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-primary"><ExternalLink className="w-4 h-4" /></a>
                      )}
                      <button onClick={() => onEdit(page)} className="p-1.5 text-muted-foreground hover:text-primary" data-testid={`edit-page-${page.slug}`}><Edit className="w-4 h-4" /></button>
                      <button onClick={() => onDelete(page.id)} className="p-1.5 text-muted-foreground hover:text-red-500" data-testid={`delete-page-${page.slug}`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Admin;
