import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Zap, BookOpen, Plus, Edit, Trash2, Save, X, Tag, Clock,
  Globe, Send, RefreshCw, Loader2, CheckCircle, AlertCircle,
  Lightbulb, TrendingUp, FileText, Search, ChevronDown, ChevronUp,
  Check, Star, ExternalLink, Activity, Play
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const OrganicGrowthDashboard = () => {
  // ── BLOG STATE ──────────────────────────────────────
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogSearch, setBlogSearch] = useState('');
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', tags: '', image_url: '' });
  const [savingBlog, setSavingBlog] = useState(false);

  // ── AI GENERATOR STATE ──────────────────────────────
  const [aiKeyword, setAiKeyword] = useState('');
  const [generating, setGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // ── AUTOMATION STATE ────────────────────────────────
  const [autoStatus, setAutoStatus] = useState(null);
  const [runningCycle, setRunningCycle] = useState(false);
  const [runningSitemap, setRunningSitemap] = useState(false);

  // ── SEO TOPICS STATE ────────────────────────────────
  const [seoTopics, setSeoTopics] = useState([]);
  const [seoLoading, setSeoLoading] = useState(false);
  const [generatingTopics, setGeneratingTopics] = useState(false);
  const [showTopics, setShowTopics] = useState(false);

  // ── INDEXNOW STATE ──────────────────────────────────
  const [indexNowStatus, setIndexNowStatus] = useState(null);
  const [indexing, setIndexing] = useState(false);
  const [indexResult, setIndexResult] = useState(null);

  // ── LOAD ALL DATA ───────────────────────────────────
  const fetchBlogPosts = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/api/admin/blogs`);
      if (r.ok) setBlogPosts(await r.json());
    } catch (e) { console.error(e); }
  }, []);

  const fetchAutoStatus = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/api/admin/automation/status`);
      if (r.ok) setAutoStatus(await r.json());
    } catch (e) { console.error(e); }
  }, []);

  const fetchSeoTopics = useCallback(async () => {
    setSeoLoading(true);
    try {
      const r = await fetch(`${API_URL}/api/admin/seo/suggestions?limit=20`);
      if (r.ok) { const d = await r.json(); setSeoTopics(d.suggestions || []); }
    } catch (e) { console.error(e); }
    setSeoLoading(false);
  }, []);

  const fetchIndexNowStatus = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/api/admin/seo/indexnow/status`);
      if (r.ok) setIndexNowStatus(await r.json());
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    fetchBlogPosts();
    fetchAutoStatus();
    fetchIndexNowStatus();
  }, [fetchBlogPosts, fetchAutoStatus, fetchIndexNowStatus]);

  // ── BLOG CRUD ────────────────────────────────────────
  const resetBlogForm = () => {
    setShowBlogForm(false);
    setEditingPost(null);
    setBlogForm({ title: '', excerpt: '', content: '', tags: '', image_url: '' });
  };

  const openEditBlog = (post) => {
    setEditingPost(post);
    setBlogForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: post.tags?.join(', ') || '',
      image_url: post.image_url || ''
    });
    setShowBlogForm(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setSavingBlog(true);
    try {
      const payload = {
        ...blogForm,
        tags: blogForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      const url = editingPost
        ? `${API_URL}/api/admin/blogs/${editingPost.id}`
        : `${API_URL}/api/admin/blogs`;
      await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      await fetchBlogPosts();
      resetBlogForm();
    } catch (e) { console.error(e); }
    setSavingBlog(false);
  };

  const deleteBlogPost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await fetch(`${API_URL}/api/admin/blogs/${id}`, { method: 'DELETE' });
    fetchBlogPosts();
  };

  // ── AI BLOG GENERATOR ────────────────────────────────
  const generateAIBlog = async () => {
    if (!aiKeyword.trim()) return;
    setGenerating(true);
    setAiResult(null);
    try {
      const r = await fetch(`${API_URL}/api/admin/automation/generate-blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: aiKeyword })
      });
      const data = await r.json();
      if (data.success) {
        setAiResult({ type: 'success', message: `Published: "${data.post.title}"`, slug: data.post.slug });
        setAiKeyword('');
        fetchBlogPosts();
        fetchAutoStatus();
      } else {
        setAiResult({ type: 'error', message: data.detail || 'Generation failed' });
      }
    } catch (e) {
      setAiResult({ type: 'error', message: e.message });
    }
    setGenerating(false);
  };

  // ── AUTOMATION ────────────────────────────────────────
  const runCycle = async () => {
    setRunningCycle(true);
    try {
      const r = await fetch(`${API_URL}/api/admin/automation/run-now`, { method: 'POST' });
      const d = await r.json();
      setAiResult({ type: 'success', message: `Cycle done: ${d.results?.blogs_generated} new posts, ${d.results?.sitemap_urls} sitemap URLs` });
      fetchBlogPosts();
      fetchAutoStatus();
    } catch (e) { setAiResult({ type: 'error', message: e.message }); }
    setRunningCycle(false);
  };

  const regenerateSitemap = async () => {
    setRunningSitemap(true);
    try {
      const r = await fetch(`${API_URL}/api/admin/automation/regenerate-sitemap`, { method: 'POST' });
      const d = await r.json();
      setAiResult({ type: 'success', message: `Sitemap updated: ${d.url_count} URLs. Google notified.` });
      fetchAutoStatus();
    } catch (e) { setAiResult({ type: 'error', message: e.message }); }
    setRunningSitemap(false);
  };

  // ── SEO TOPICS ────────────────────────────────────────
  const generateTopics = async () => {
    setGeneratingTopics(true);
    setShowTopics(true);
    try {
      await fetch(`${API_URL}/api/admin/seo/auto-generate`, { method: 'POST' });
      await fetchSeoTopics();
    } catch (e) { console.error(e); }
    setGeneratingTopics(false);
  };

  const updateTopicStatus = async (id, status) => {
    await fetch(`${API_URL}/api/admin/seo/suggestions/${id}/status?status=${status}`, { method: 'PUT' });
    fetchSeoTopics();
  };

  // ── INDEXNOW ─────────────────────────────────────────
  const submitToIndexNow = async () => {
    setIndexing(true);
    setIndexResult(null);
    try {
      const r = await fetch(`${API_URL}/api/admin/seo/indexnow/submit-all-pages`, { method: 'POST' });
      const d = await r.json();
      setIndexResult(d);
      fetchIndexNowStatus();
    } catch (e) { setIndexResult({ success: false, error: e.message }); }
    setIndexing(false);
  };

  const ct = autoStatus?.content_totals || {};
  const filteredPosts = blogPosts.filter(p =>
    !blogSearch || p.title?.toLowerCase().includes(blogSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* ── STATS BAR ──────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Total Posts', value: ct.total_blogs ?? blogPosts.length, sub: `${ct.auto_blogs ?? 0} AI-generated`, icon: <BookOpen className="w-5 h-5 text-primary" /> },
          { label: 'Conditions', value: ct.conditions ?? 39, sub: 'in CMS', icon: <FileText className="w-5 h-5 text-primary" /> },
          { label: 'Treatments', value: ct.treatments ?? 20, sub: 'in CMS', icon: <FileText className="w-5 h-5 text-primary" /> },
          { label: 'Sitemap URLs', value: autoStatus?.sitemap?.url_count ?? '—', sub: 'live & dynamic', icon: <Globe className="w-5 h-5 text-primary" /> },
          { label: 'Next Auto-Run', value: autoStatus?.next_run_in != null ? (autoStatus.next_run_in === 0 ? 'Now' : `${autoStatus.next_run_in}h`) : '—', sub: 'every 7 days', icon: <Clock className="w-5 h-5 text-primary" /> },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
            <div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs font-medium text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ACTION FEEDBACK ─────────────────────────── */}
      <AnimatePresence>
        {aiResult && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-start gap-3 p-4 rounded-lg border ${aiResult.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
          >
            {aiResult.type === 'success'
              ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
            <div className="flex-1">
              <p className={`text-sm font-medium ${aiResult.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{aiResult.message}</p>
              {aiResult.slug && (
                <a href={`/blog/${aiResult.slug}`} target="_blank" rel="noreferrer" className="text-xs text-green-600 underline flex items-center gap-1 mt-1">
                  View post <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <button onClick={() => setAiResult(null)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION 1: AI BLOG GENERATOR ────────────── */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-foreground text-lg">AI Blog Generator</h2>
            <p className="text-sm text-muted-foreground">Type a topic → GPT-4o writes &amp; publishes a full SEO post instantly</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Input
            value={aiKeyword}
            onChange={e => setAiKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generateAIBlog()}
            placeholder="e.g. knee replacement recovery exercises, hip pain causes in women..."
            data-testid="ai-keyword-input"
            className="bg-white"
          />
          <Button onClick={generateAIBlog} disabled={generating || !aiKeyword.trim()} className="gap-2 whitespace-nowrap" data-testid="ai-generate-btn">
            {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Writing...</> : <><Zap className="w-4 h-4" /> Generate &amp; Publish</>}
          </Button>
        </div>
        {generating && <p className="text-xs text-muted-foreground mt-2">GPT-4o is writing a 1200-word post... ~30-60 seconds</p>}

        {/* Quick automation controls */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-primary/15">
          <Button onClick={runCycle} disabled={runningCycle} variant="outline" size="sm" className="gap-2 bg-white">
            {runningCycle ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
            Run Auto-Cycle (3 posts)
          </Button>
          <Button onClick={regenerateSitemap} disabled={runningSitemap} variant="outline" size="sm" className="gap-2 bg-white">
            {runningSitemap ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            Regenerate Sitemap
          </Button>
          <span className={`text-xs px-2 py-1.5 rounded-full font-medium self-center ${autoStatus?.scheduler_running ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            Scheduler: {autoStatus?.scheduler_running ? 'RUNNING' : 'STOPPED'}
          </span>
        </div>
      </div>

      {/* ── SECTION 2: BLOG POSTS ─────────────────────── */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Blog Posts</h2>
            <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{blogPosts.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input value={blogSearch} onChange={e => setBlogSearch(e.target.value)} placeholder="Search posts..." className="pl-8 h-8 text-sm w-48" />
            </div>
            <Button onClick={() => { resetBlogForm(); setShowBlogForm(true); }} size="sm" className="gap-1.5" data-testid="new-post-btn">
              <Plus className="w-4 h-4" /> New Post
            </Button>
          </div>
        </div>

        {/* Blog Form (inline slide-down) */}
        <AnimatePresence>
          {showBlogForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-border"
            >
              <form onSubmit={handleBlogSubmit} className="p-5 space-y-4 bg-secondary/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{editingPost ? 'Edit Post' : 'New Blog Post'}</h3>
                  <button type="button" onClick={resetBlogForm}><X className="w-4 h-4 text-muted-foreground" /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-foreground mb-1 block">Title *</label>
                    <Input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="Post title" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-foreground mb-1 block">Excerpt *</label>
                    <Input value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} placeholder="Short summary" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-foreground mb-1 block">Content * (HTML supported)</label>
                    <textarea value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} className="w-full min-h-[160px] px-3 py-2 border border-border rounded-lg text-sm bg-white" placeholder="Full post content..." required />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Tags (comma-separated)</label>
                    <Input value={blogForm.tags} onChange={e => setBlogForm({ ...blogForm, tags: e.target.value })} placeholder="knee, arthritis, surgery" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Image URL</label>
                    <Input value={blogForm.image_url} onChange={e => setBlogForm({ ...blogForm, image_url: e.target.value })} placeholder="https://..." />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={resetBlogForm} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1 gap-2" disabled={savingBlog}>
                    {savingBlog ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {editingPost ? 'Update' : 'Publish'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post List */}
        {filteredPosts.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>{blogSearch ? 'No posts match your search.' : 'No blog posts yet. Generate one above!'}</p>
          </div>
        ) : (
          <div className="divide-y divide-border max-h-[480px] overflow-y-auto">
            {filteredPosts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="flex items-start gap-4 p-4 hover:bg-secondary/40 transition-colors">
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-sm text-foreground truncate">{post.title}</h3>
                    {post.auto_generated && (
                      <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full flex-shrink-0">AI</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{post.excerpt}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span>{post.published_date ? new Date(post.published_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                    {post.tags?.slice(0, 2).map((t, j) => (
                      <span key={j} className="flex items-center gap-0.5"><Tag className="w-2.5 h-2.5" />{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary"><ExternalLink className="w-3.5 h-3.5" /></Button>
                  </a>
                  <Button variant="ghost" size="icon" onClick={() => openEditBlog(post)} className="w-8 h-8 text-muted-foreground hover:text-blue-600"><Edit className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteBlogPost(post.id)} className="w-8 h-8 text-muted-foreground hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── SECTION 3: SEO TOPIC SUGGESTIONS ─────────── */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <button
          onClick={() => { setShowTopics(v => !v); if (!showTopics && seoTopics.length === 0) fetchSeoTopics(); }}
          className="w-full flex items-center justify-between p-5 hover:bg-secondary/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-foreground">SEO Topic Suggestions</h2>
            <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{seoTopics.length} topics</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={e => { e.stopPropagation(); generateTopics(); }}
              disabled={generatingTopics}
              size="sm" variant="outline" className="gap-1.5"
              data-testid="generate-topics-btn"
            >
              {generatingTopics ? <Loader2 className="w-3 h-3 animate-spin" /> : <TrendingUp className="w-3 h-3" />}
              Generate Topics
            </Button>
            {showTopics ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </button>

        <AnimatePresence>
          {showTopics && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-border">
              {seoLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : seoTopics.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Click "Generate Topics" to get AI-powered keyword suggestions.</p>
                </div>
              ) : (
                <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
                  {seoTopics.map(topic => (
                    <div key={topic.id} className="flex items-start justify-between p-4 hover:bg-secondary/30 transition-colors gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${topic.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' : topic.priority === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                            {topic.priority}
                          </span>
                          <h4 className="font-medium text-sm text-foreground">{topic.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Keyword: <strong>{topic.target_keyword}</strong></p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {topic.status === 'auto_suggested' && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => updateTopicStatus(topic.id, 'approved')} className="h-7 px-2 text-green-600 border-green-200 hover:bg-green-50">
                              <Check className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => { setAiKeyword(topic.target_keyword); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="h-7 px-2 text-xs text-primary">
                              <Zap className="w-3 h-3 mr-1" /> Write
                            </Button>
                          </>
                        )}
                        {topic.status === 'approved' && (
                          <span className="text-xs text-blue-600 flex items-center gap-1"><Check className="w-3 h-3" /> Approved</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SECTION 4: INDEXING & SITEMAP ────────────── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* IndexNow */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <Send className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-sm text-foreground">IndexNow — Instant Indexing</h3>
              <p className="text-xs text-muted-foreground">Submit all pages to Bing/Yandex now</p>
            </div>
          </div>
          {indexNowStatus && (
            <p className="text-xs text-muted-foreground mb-3">
              {indexNowStatus.enabled ? '● Enabled' : '● Disabled'} · {indexNowStatus.total_submissions || 0} total submissions
            </p>
          )}
          {indexResult && (
            <p className={`text-xs mb-3 ${indexResult.success ? 'text-green-700' : 'text-red-600'}`}>
              {indexResult.success ? `✓ Submitted ${indexResult.total_urls} URLs` : `✗ ${indexResult.error}`}
            </p>
          )}
          <Button onClick={submitToIndexNow} disabled={indexing} variant="outline" className="w-full gap-2" size="sm">
            {indexing ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...</> : <><Send className="w-3.5 h-3.5" /> Submit All Pages</>}
          </Button>
        </div>

        {/* Automation Status */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-sm text-foreground">Weekly Auto-Cycle</h3>
              <p className="text-xs text-muted-foreground">3 AI posts + sitemap + Google ping</p>
            </div>
          </div>
          {autoStatus?.last_run && (
            <p className="text-xs text-muted-foreground mb-3">
              Last run: {new Date(autoStatus.last_run).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} ·
              Next in {autoStatus.next_run_in}h
            </p>
          )}
          <div className="flex gap-2">
            <Button onClick={runCycle} disabled={runningCycle} className="flex-1 gap-2" size="sm">
              {runningCycle ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running...</> : <><Play className="w-3.5 h-3.5" /> Run Now</>}
            </Button>
            <Button onClick={regenerateSitemap} disabled={runningSitemap} variant="outline" size="sm" className="gap-2">
              {runningSitemap ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Sitemap
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrganicGrowthDashboard;
