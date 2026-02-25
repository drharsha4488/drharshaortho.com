import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Activity, RefreshCw, Play, Globe, FileText, 
  CheckCircle, Clock, Zap, BookOpen, AlertCircle, Loader2 
} from 'lucide-react';

const AutomationDashboard = ({ apiUrl }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [runningCycle, setRunningCycle] = useState(false);
  const [runningSitemap, setRunningSitemap] = useState(false);
  const [customKeyword, setCustomKeyword] = useState('');
  const [generatingBlog, setGeneratingBlog] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const fetchStatus = useCallback(async () => {
    try {
      const r = await fetch(`${apiUrl}/api/admin/automation/status`);
      if (r.ok) setStatus(await r.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [apiUrl]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const runCycle = async () => {
    setRunningCycle(true);
    setLastAction(null);
    try {
      const r = await fetch(`${apiUrl}/api/admin/automation/run-now`, { method: 'POST' });
      const data = await r.json();
      setLastAction({ type: 'success', message: `Cycle complete: ${data.results?.blogs_generated} blogs published, ${data.results?.sitemap_urls} URLs in sitemap` });
      await fetchStatus();
    } catch (e) {
      setLastAction({ type: 'error', message: 'Cycle failed: ' + e.message });
    }
    setRunningCycle(false);
  };

  const regenerateSitemap = async () => {
    setRunningSitemap(true);
    try {
      const r = await fetch(`${apiUrl}/api/admin/automation/regenerate-sitemap`, { method: 'POST' });
      const data = await r.json();
      setLastAction({ type: 'success', message: `Sitemap updated: ${data.url_count} URLs. Google notified.` });
      await fetchStatus();
    } catch (e) {
      setLastAction({ type: 'error', message: 'Failed: ' + e.message });
    }
    setRunningSitemap(false);
  };

  const generateBlog = async () => {
    if (!customKeyword.trim()) return;
    setGeneratingBlog(true);
    setLastAction(null);
    try {
      const r = await fetch(`${apiUrl}/api/admin/automation/generate-blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: customKeyword }),
      });
      const data = await r.json();
      if (data.success) {
        setLastAction({ type: 'success', message: `Blog published: "${data.post.title}" → /blog/${data.post.slug}` });
        setCustomKeyword('');
        await fetchStatus();
      } else {
        setLastAction({ type: 'error', message: data.detail || 'Generation failed' });
      }
    } catch (e) {
      setLastAction({ type: 'error', message: 'Failed: ' + e.message });
    }
    setGeneratingBlog(false);
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  const ct = status?.content_totals || {};

  return (
    <div className="space-y-6" data-testid="automation-dashboard">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-yellow-300" />
              <h2 className="text-xl font-bold">SEO Automation Engine</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status?.scheduler_running ? 'bg-green-400 text-green-900' : 'bg-red-300 text-red-900'}`}>
                {status?.scheduler_running ? 'RUNNING' : 'STOPPED'}
              </span>
            </div>
            <p className="text-white/80 text-sm">
              Fully automated — generates blogs, updates sitemap, pings Google every week
            </p>
          </div>
          <button onClick={fetchStatus} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action Feedback */}
      {lastAction && (
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${lastAction.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          {lastAction.type === 'success' 
            ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          }
          <p className={`text-sm font-medium ${lastAction.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {lastAction.message}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <BookOpen className="w-6 h-6 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{ct.total_blogs || 0}</p>
          <p className="text-sm text-muted-foreground">Total Blog Posts</p>
          <p className="text-xs text-primary mt-1">{ct.auto_blogs || 0} auto-generated</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <Globe className="w-6 h-6 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{status?.sitemap?.url_count || 0}</p>
          <p className="text-sm text-muted-foreground">Sitemap URLs</p>
          <p className="text-xs text-muted-foreground mt-1">Last: {status?.sitemap?.last_generated || 'Never'}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <FileText className="w-6 h-6 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{ct.conditions || 0}</p>
          <p className="text-sm text-muted-foreground">Conditions</p>
          <p className="text-xs text-muted-foreground mt-1">{ct.treatments || 0} treatments</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <Clock className="w-6 h-6 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">
            {status?.next_run_in != null ? (status.next_run_in === 0 ? 'Now' : `${status.next_run_in}h`) : '—'}
          </p>
          <p className="text-sm text-muted-foreground">Next Auto-Run</p>
          <p className="text-xs text-muted-foreground mt-1">Every 7 days</p>
        </div>
      </div>

      {/* Last Run */}
      {status?.last_run && (
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Last Automation Run
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Time:</span>
              <p className="font-medium">{new Date(status.last_run).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Blogs Generated:</span>
              <p className="font-medium text-green-600">{status.last_results?.blogs_generated ?? '—'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Google Ping:</span>
              <p className="font-medium">{status.google_ping?.status === 200 ? '✓ Sent' : '—'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Manual Controls */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Run Full Cycle */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" /> Run Full Automation Now
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Generates 3 AI blog posts + updates sitemap + pings Google + submits to IndexNow.
          </p>
          <Button
            onClick={runCycle}
            disabled={runningCycle}
            className="w-full gap-2"
            data-testid="run-cycle-btn"
          >
            {runningCycle ? <><Loader2 className="w-4 h-4 animate-spin" /> Running...</> : <><Play className="w-4 h-4" /> Run Now</>}
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">Takes ~2-3 minutes. Also runs automatically every week.</p>
        </div>

        {/* Regenerate Sitemap */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Regenerate Sitemap
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Instantly rebuild sitemap from all CMS pages + blogs and notify Google.
          </p>
          <Button
            onClick={regenerateSitemap}
            disabled={runningSitemap}
            variant="outline"
            className="w-full gap-2"
            data-testid="regenerate-sitemap-btn"
          >
            {runningSitemap ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><RefreshCw className="w-4 h-4" /> Regenerate Sitemap</>}
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">Also auto-runs after every new blog post.</p>
        </div>
      </div>

      {/* Custom Blog Generator */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" /> Generate Blog Post on Any Topic
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enter any orthopedic keyword and AI will write + publish a full 1200-word SEO blog post instantly.
        </p>
        <div className="flex gap-3">
          <Input
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            placeholder="e.g. knee pain in young athletes, hip replacement recovery..."
            onKeyDown={(e) => e.key === 'Enter' && generateBlog()}
            data-testid="blog-keyword-input"
          />
          <Button
            onClick={generateBlog}
            disabled={generatingBlog || !customKeyword.trim()}
            className="gap-2 whitespace-nowrap"
            data-testid="generate-blog-btn"
          >
            {generatingBlog ? <><Loader2 className="w-4 h-4 animate-spin" /> Writing...</> : <><Zap className="w-4 h-4" /> Generate</>}
          </Button>
        </div>
        {generatingBlog && (
          <p className="text-xs text-muted-foreground mt-2">
            GPT-4o is writing your blog post... (~30-60 seconds)
          </p>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-secondary rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">How Automation Works</h3>
        <div className="space-y-3">
          {[
            { icon: <Clock className="w-4 h-4 text-primary" />, text: "Every 7 days: AI picks 3 fresh keywords → writes 1200-word posts → publishes live" },
            { icon: <Globe className="w-4 h-4 text-primary" />, text: "After every new post: sitemap auto-updates to include it" },
            { icon: <Zap className="w-4 h-4 text-primary" />, text: "After sitemap update: Google gets pinged immediately for fast indexing" },
            { icon: <CheckCircle className="w-4 h-4 text-primary" />, text: "IndexNow: new URLs submitted to Bing/Yandex within seconds of publishing" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationDashboard;
