import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import KeywordResearchTool from '@/components/admin/KeywordResearchTool';
import AutoSEODashboard from '@/components/admin/AutoSEODashboard';
import AutomationDashboard from '@/components/admin/AutomationDashboard';
import OrganicGrowthDashboard from '@/components/admin/OrganicGrowthDashboard';
import {
  Lock,
  LogOut,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  RefreshCw,
  Activity,
  FileText,
  Plus,
  Edit,
  Save,
  X,
  Tag,
  BarChart3,
  TrendingUp,
  Eye,
  Globe,
  MousePointerClick,
  ArrowUp,
  ArrowDown,
  Layers,
  Search,
  Filter,
  ExternalLink,
  Copy,
  Target
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('growth');
  
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, blog_posts: 0 });
  const [filter, setFilter] = useState('all');
  
  // Blog state
  const [blogPosts, setBlogPosts] = useState([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    image_url: ''
  });
  
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
    slug: '',
    type: 'general',
    title: '',
    meta_title: '',
    meta_description: '',
    keywords: '',
    content: {
      hero: { title: '', subtitle: '' },
      introduction: '',
      sections: []
    },
    status: 'draft'
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check session
  useEffect(() => {
    const session = sessionStorage.getItem('adminAuth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
      fetchStats();
      fetchBlogPosts();
      fetchAnalytics();
      fetchCmsPages();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        toast({ title: 'Welcome!', description: 'Successfully logged in' });
      } else {
        toast({ title: 'Error', description: 'Invalid password', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Login failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  // Appointments functions
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/appointments`);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        toast({ title: 'Updated', description: `Status changed to ${newStatus}` });
        fetchAppointments();
        fetchStats();
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/appointments/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        toast({ title: 'Deleted', description: 'Appointment removed' });
        fetchAppointments();
        fetchStats();
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  // Blog functions
  const fetchBlogPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/blog`);
      const data = await res.json();
      setBlogPosts(data);
    } catch (err) {
      console.error('Failed to fetch blog posts:', err);
    }
  };

  // Analytics functions
  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/analytics`);
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // CMS Pages functions
  const fetchCmsPages = async () => {
    setCmsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/cms/pages`);
      const data = await res.json();
      setCmsPages(data);
    } catch (err) {
      console.error('Failed to fetch CMS pages:', err);
    } finally {
      setCmsLoading(false);
    }
  };

  // Seed CMS content for production
  const seedCmsContent = async () => {
    if (!window.confirm('This will seed initial CMS content to the database. Existing pages with the same slugs will be skipped. Continue?')) {
      return;
    }
    
    setSeedingContent(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/cms/seed-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast({ 
          title: 'Content Seeded!', 
          description: `Created ${data.created} pages. Total: ${data.total_pages} pages.`
        });
        fetchCmsPages(); // Refresh the list
      } else {
        throw new Error(data.detail || 'Failed to seed content');
      }
    } catch (err) {
      console.error('Failed to seed CMS content:', err);
      toast({ 
        title: 'Error', 
        description: err.message || 'Failed to seed content', 
        variant: 'destructive' 
      });
    } finally {
      setSeedingContent(false);
    }
  };

  const handleCmsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...cmsForm,
        keywords: cmsForm.keywords.split(',').map(k => k.trim()).filter(Boolean)
      };
      
      const url = editingCmsPage 
        ? `${API_URL}/api/admin/cms/pages/${editingCmsPage.id}`
        : `${API_URL}/api/admin/cms/pages`;
      
      const method = editingCmsPage ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        toast({ title: 'Success', description: `Page ${editingCmsPage ? 'updated' : 'created'} successfully` });
        fetchCmsPages();
        resetCmsForm();
      } else {
        const error = await res.json();
        throw new Error(error.detail || 'Failed to save page');
      }
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditCmsPage = (page) => {
    setEditingCmsPage(page);
    setCmsForm({
      slug: page.slug,
      type: page.type,
      title: page.title,
      meta_title: page.meta_title || '',
      meta_description: page.meta_description || '',
      keywords: (page.keywords || []).join(', '),
      content: page.content || { hero: { title: '', subtitle: '' }, introduction: '', sections: [] },
      status: page.status
    });
    setShowCmsForm(true);
  };

  const handleDeleteCmsPage = async (pageId) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/cms/pages/${pageId}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        toast({ title: 'Success', description: 'Page deleted successfully' });
        fetchCmsPages();
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete page', variant: 'destructive' });
    }
  };

  const resetCmsForm = () => {
    setShowCmsForm(false);
    setEditingCmsPage(null);
    setCmsForm({
      slug: '',
      type: 'general',
      title: '',
      meta_title: '',
      meta_description: '',
      keywords: '',
      content: { hero: { title: '', subtitle: '' }, introduction: '', sections: [] },
      status: 'draft'
    });
  };

  const filteredCmsPages = cmsPages.filter(page => {
    const matchesFilter = cmsFilter === 'all' || page.type === cmsFilter || page.status === cmsFilter;
    const matchesSearch = page.title.toLowerCase().includes(cmsSearch.toLowerCase()) ||
                         page.slug.toLowerCase().includes(cmsSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(t => t.trim()).filter(t => t)
    };
    
    try {
      const url = editingPost 
        ? `${API_URL}/api/admin/blog/${editingPost.id}`
        : `${API_URL}/api/admin/blog`;
      
      const res = await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        toast({ 
          title: 'Success', 
          description: editingPost ? 'Blog post updated' : 'Blog post created' 
        });
        resetBlogForm();
        fetchBlogPosts();
        fetchStats();
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to save blog post', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/blog/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        toast({ title: 'Deleted', description: 'Blog post removed' });
        fetchBlogPosts();
        fetchStats();
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const editBlogPost = (post) => {
    setEditingPost(post);
    setBlogForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags?.join(', ') || '',
      image_url: post.image_url || ''
    });
    setShowBlogForm(true);
  };

  const resetBlogForm = () => {
    setShowBlogForm(false);
    setEditingPost(null);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      image_url: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal to-charcoal/90 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-serif font-semibold text-charcoal">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Dr. Harsha Orthopedic Centre</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              <button onClick={() => navigate('/')} className="text-primary hover:underline">
                ← Back to Website
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-secondary">
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
              <Button variant="outline" size="sm" onClick={() => { fetchAppointments(); fetchStats(); fetchBlogPosts(); fetchAnalytics(); fetchCmsPages(); }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Appts</p>
                <p className="text-2xl font-bold text-charcoal">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-4 border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Blog Posts</p>
                <p className="text-2xl font-bold text-purple-600">{stats.blog_posts || 0}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation — 3 focused tabs */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab('growth')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'growth' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            data-testid="growth-tab"
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Organic Growth
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'analytics' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'cms' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            CMS Pages
          </button>
        </div>

        {/* Organic Growth Tab */}
        {activeTab === 'growth' && <OrganicGrowthDashboard />}

          <>
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                    filter === status
                      ? 'bg-primary text-white'
                      : 'bg-white text-muted-foreground hover:bg-secondary border border-border'
                  }`}
                >
                  {status} {status === 'all' ? `(${appointments.length})` : `(${appointments.filter(a => a.status === status).length})`}
                </button>
              ))}
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-lg">Appointments</h2>
              </div>
              
              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No appointments found
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredAppointments.map((appointment, i) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-charcoal">{appointment.name}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {getStatusIcon(appointment.status)}
                              {appointment.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <a href={`tel:${appointment.phone}`} className="flex items-center gap-1 hover:text-primary">
                              <Phone className="w-4 h-4" />
                              {appointment.phone}
                            </a>
                            <a href={`mailto:${appointment.email}`} className="flex items-center gap-1 hover:text-primary">
                              <Mail className="w-4 h-4" />
                              {appointment.email}
                            </a>
                            {appointment.preferred_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Preferred: {appointment.preferred_date}
                              </span>
                            )}
                          </div>
                          
                          {appointment.message && (
                            <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <p className="line-clamp-2">{appointment.message}</p>
                            </div>
                          )}
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            Submitted: {formatDate(appointment.created_at)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <select
                            value={appointment.status}
                            onChange={(e) => updateStatus(appointment.id, e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteAppointment(appointment.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <>
            {/* Blog Form Modal */}
            {showBlogForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="font-semibold text-lg">
                      {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={resetBlogForm}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <form onSubmit={handleBlogSubmit} className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title *</label>
                      <Input
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Excerpt *</label>
                      <Input
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        placeholder="Short summary for preview"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Content *</label>
                      <textarea
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        placeholder="Full blog post content (supports HTML)"
                        className="w-full min-h-[200px] px-3 py-2 border border-border rounded-lg text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                      <Input
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                        placeholder="e.g. knee replacement, arthritis, sports injury"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Image URL</label>
                      <Input
                        value={blogForm.image_url}
                        onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={resetBlogForm} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1" disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Blog Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Blog Posts</h2>
              <Button onClick={() => setShowBlogForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* Blog List */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              {blogPosts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No blog posts yet</p>
                  <Button onClick={() => setShowBlogForm(true)} className="mt-4" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create your first post
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {blogPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {post.image_url && (
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-charcoal mb-1 truncate">{post.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{formatDate(post.published_date)}</span>
                            {post.tags?.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {post.tags.slice(0, 3).join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => editBlogPost(post)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteBlogPost(post.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnimatePresence>
            {analyticsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : analytics ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Overview Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Views</p>
                        <p className="text-2xl font-bold text-charcoal">{analytics.overview.total_views}</p>
                      </div>
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Eye className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Today</p>
                        <p className="text-2xl font-bold text-green-600">{analytics.overview.today_views}</p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">This Week</p>
                        <p className="text-2xl font-bold text-blue-600">{analytics.overview.week_views}</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold text-purple-600">{analytics.overview.month_views}</p>
                      </div>
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Unique Visitors</p>
                        <p className="text-2xl font-bold text-orange-600">{analytics.overview.unique_visitors}</p>
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Charts Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Daily Views Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white rounded-xl p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Daily Views (Last 7 Days)
                    </h3>
                    <div className="h-48 flex items-end gap-2">
                      {analytics.daily_views.map((day, i) => {
                        const maxViews = Math.max(...analytics.daily_views.map(d => d.views), 1);
                        const height = (day.views / maxViews) * 100;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-secondary rounded-t-lg relative group" style={{ height: '160px' }}>
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                                className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/70 rounded-t-lg"
                              />
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal text-white text-xs px-2 py-1 rounded">
                                {day.views}
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{day.date}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Top Pages */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Top Pages
                    </h3>
                    {analytics.top_pages.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">No page data yet</p>
                    ) : (
                      <div className="space-y-3">
                        {analytics.top_pages.slice(0, 5).map((page, i) => {
                          const maxViews = analytics.top_pages[0]?.views || 1;
                          const percentage = (page.views / maxViews) * 100;
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.35 + i * 0.05 }}
                              className="group"
                            >
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="truncate max-w-[200px] text-muted-foreground group-hover:text-foreground transition-colors">
                                  {page.page || '/'}
                                </span>
                                <span className="font-medium text-foreground">{page.views}</span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Engagement Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Conversion Rate */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white rounded-xl p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      Conversion Rate
                    </h3>
                    <div className="text-center py-4">
                      <p className="text-4xl font-bold text-green-600">{analytics.engagement?.conversion_rate || 0}%</p>
                      <p className="text-sm text-muted-foreground mt-2">Visitors → Appointments</p>
                    </div>
                  </motion.div>

                  {/* Chat Engagement */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      AI Chat Engagement
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-primary">{analytics.engagement.total_chats}</p>
                        <p className="text-sm text-muted-foreground">Total Chats</p>
                      </div>
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-accent">{analytics.engagement.recent_chats}</p>
                        <p className="text-sm text-muted-foreground">This Week</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Top Referrers */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="bg-white rounded-xl p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <MousePointerClick className="w-5 h-5 text-primary" />
                      Top Referrers
                    </h3>
                    {analytics.top_referrers.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">No referrer data yet</p>
                    ) : (
                      <div className="space-y-2">
                        {analytics.top_referrers.filter(ref => ref.referrer).map((ref, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {(ref.referrer || 'Direct').replace(/^https?:\/\//, '').split('/')[0]}
                            </span>
                            <span className="text-sm font-medium bg-secondary px-2 py-1 rounded">{ref.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Content Performance */}
                {analytics.content_performance && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Top Conditions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-xl p-6 border border-border"
                    >
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        Top Conditions (Views)
                      </h3>
                      {analytics.content_performance.top_conditions?.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">No condition page views yet</p>
                      ) : (
                        <div className="space-y-3">
                          {analytics.content_performance.top_conditions?.map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {item.path?.replace('/conditions/', '') || 'Unknown'}
                              </span>
                              <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.views}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Top Treatments */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="bg-white rounded-xl p-6 border border-border"
                    >
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        Top Treatments (Views)
                      </h3>
                      {analytics.content_performance.top_treatments?.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">No treatment page views yet</p>
                      ) : (
                        <div className="space-y-3">
                          {analytics.content_performance.top_treatments?.map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {item.path?.replace('/treatments/', '') || 'Unknown'}
                              </span>
                              <span className="text-sm font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded">{item.views}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}

                {/* Content Stats Overview */}
                {analytics.content_stats && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-charcoal to-charcoal/90 rounded-xl p-6 text-white"
                  >
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      Content Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{analytics.content_stats.total_cms_pages}</p>
                        <p className="text-xs text-gray-300">CMS Pages</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">{analytics.content_stats.published_pages}</p>
                        <p className="text-xs text-gray-300">Published</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-400">{analytics.content_stats.draft_pages}</p>
                        <p className="text-xs text-gray-300">Drafts</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{analytics.content_stats.total_blogs}</p>
                        <p className="text-xs text-gray-300">Blog Posts</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{analytics.content_stats.seo_suggestions}</p>
                        <p className="text-xs text-gray-300">SEO Topics</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">{analytics.content_stats.approved_seo}</p>
                        <p className="text-xs text-gray-300">Approved</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Appointment Stats */}
                {analytics.appointments && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="bg-white rounded-xl p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Appointment Overview
                    </h3>
                    <div className="grid grid-cols-5 gap-4">
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <p className="text-2xl font-bold text-charcoal">{analytics.appointments.total}</p>
                        <p className="text-xs text-muted-foreground">Total</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">{analytics.appointments.pending}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{analytics.appointments.confirmed}</p>
                        <p className="text-xs text-muted-foreground">Confirmed</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{analytics.appointments.completed}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{analytics.appointments.this_week}</p>
                        <p className="text-xs text-muted-foreground">This Week</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Note about tracking */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"
                >
                  <p className="text-sm text-blue-700">
                    📊 Analytics tracking is now active! Page views will start accumulating as visitors browse your website.
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Unable to load analytics data</p>
                <Button onClick={fetchAnalytics} variant="outline" className="mt-4">
                  Try Again
                </Button>
              </div>
            )}
          </AnimatePresence>
        )}

        {/* CMS Pages Tab */}
        {activeTab === 'cms' && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* CMS Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Content Management</h2>
                  <p className="text-sm text-muted-foreground">{cmsPages.length} pages total</p>
                </div>
                <div className="flex gap-2">
                  {cmsPages.length < 5 && (
                    <Button 
                      onClick={seedCmsContent} 
                      variant="outline" 
                      className="gap-2"
                      disabled={seedingContent}
                    >
                      <RefreshCw className={`w-4 h-4 ${seedingContent ? 'animate-spin' : ''}`} />
                      {seedingContent ? 'Seeding...' : 'Seed Content'}
                    </Button>
                  )}
                  <Button onClick={() => setShowCmsForm(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Page
                  </Button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search pages..."
                    value={cmsSearch}
                    onChange={(e) => setCmsSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['all', 'published', 'draft', 'condition', 'treatment', 'seo_landing', 'blog', 'general'].map((filterOption) => (
                    <button
                      key={filterOption}
                      onClick={() => setCmsFilter(filterOption)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                        cmsFilter === filterOption
                          ? 'bg-primary text-white'
                          : 'bg-white text-muted-foreground hover:bg-secondary border border-border'
                      }`}
                    >
                      {filterOption}
                    </button>
                  ))}
                </div>
              </div>

              {/* CMS Form Modal */}
              {showCmsForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={() => resetCmsForm()}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6 border-b border-border flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {editingCmsPage ? 'Edit Page' : 'Create New Page'}
                      </h3>
                      <button onClick={resetCmsForm} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <form onSubmit={handleCmsSubmit} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title *</label>
                          <Input
                            value={cmsForm.title}
                            onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                            placeholder="Page title"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Slug *</label>
                          <Input
                            value={cmsForm.slug}
                            onChange={(e) => setCmsForm({ ...cmsForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                            placeholder="url-friendly-slug"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Type</label>
                          <select
                            value={cmsForm.type}
                            onChange={(e) => setCmsForm({ ...cmsForm, type: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          >
                            <option value="general">General</option>
                            <option value="condition">Condition</option>
                            <option value="treatment">Treatment</option>
                            <option value="seo_landing">SEO Landing</option>
                            <option value="blog">Blog Post</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Status</label>
                          <select
                            value={cmsForm.status}
                            onChange={(e) => setCmsForm({ ...cmsForm, status: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Meta Title</label>
                        <Input
                          value={cmsForm.meta_title}
                          onChange={(e) => setCmsForm({ ...cmsForm, meta_title: e.target.value })}
                          placeholder="SEO title (60 characters recommended)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Meta Description</label>
                        <textarea
                          value={cmsForm.meta_description}
                          onChange={(e) => setCmsForm({ ...cmsForm, meta_description: e.target.value })}
                          placeholder="SEO description (160 characters recommended)"
                          className="w-full px-3 py-2 rounded-md border border-input bg-background min-h-[80px]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
                        <Input
                          value={cmsForm.keywords}
                          onChange={(e) => setCmsForm({ ...cmsForm, keywords: e.target.value })}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Hero Title</label>
                        <Input
                          value={cmsForm.content.hero?.title || ''}
                          onChange={(e) => setCmsForm({ 
                            ...cmsForm, 
                            content: { ...cmsForm.content, hero: { ...cmsForm.content.hero, title: e.target.value } }
                          })}
                          placeholder="Main heading on the page"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
                        <Input
                          value={cmsForm.content.hero?.subtitle || ''}
                          onChange={(e) => setCmsForm({ 
                            ...cmsForm, 
                            content: { ...cmsForm.content, hero: { ...cmsForm.content.hero, subtitle: e.target.value } }
                          })}
                          placeholder="Subheading or tagline"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Introduction</label>
                        <textarea
                          value={cmsForm.content.introduction || ''}
                          onChange={(e) => setCmsForm({ 
                            ...cmsForm, 
                            content: { ...cmsForm.content, introduction: e.target.value }
                          })}
                          placeholder="Opening paragraph for the page..."
                          className="w-full px-3 py-2 rounded-md border border-input bg-background min-h-[120px]"
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button type="button" variant="outline" onClick={resetCmsForm}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Saving...' : (editingCmsPage ? 'Update Page' : 'Create Page')}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}

              {/* CMS Pages List */}
              {cmsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredCmsPages.length === 0 ? (
                <div className="bg-white rounded-xl border border-border p-12 text-center">
                  <Layers className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
                  <p className="text-muted-foreground mb-2">No pages found</p>
                  <p className="text-sm text-muted-foreground mb-4">Get started by seeding default content or creating your first page.</p>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      onClick={seedCmsContent} 
                      variant="default" 
                      className="gap-2"
                      disabled={seedingContent}
                    >
                      <RefreshCw className={`w-4 h-4 ${seedingContent ? 'animate-spin' : ''}`} />
                      {seedingContent ? 'Seeding...' : 'Seed Default Content'}
                    </Button>
                    <Button onClick={() => setShowCmsForm(true)} variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create Page
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
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
                        {filteredCmsPages.map((page) => (
                          <tr key={page.id} className="hover:bg-secondary/30 transition-colors">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-foreground">{page.title}</p>
                                <p className="text-xs text-muted-foreground">/{page.slug}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                page.type === 'condition' ? 'bg-blue-100 text-blue-700' :
                                page.type === 'treatment' ? 'bg-green-100 text-green-700' :
                                page.type === 'seo_landing' ? 'bg-purple-100 text-purple-700' :
                                page.type === 'blog' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {page.type}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {page.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {formatDate(page.updated_at)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-2">
                                {page.status === 'published' && (
                                  <a
                                    href={`/${page.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                                    title="View page"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                <button
                                  onClick={() => handleEditCmsPage(page)}
                                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCmsPage(page.id)}
                                  className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-700">
                  <strong>💡 Tip:</strong> Pages created here are stored in the database. Future updates will allow frontend pages to fetch content dynamically from this CMS.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* SEO & Keywords Tab */}
        {activeTab === 'seo' && (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Automated SEO Dashboard - Main Feature */}
              <AutoSEODashboard />
              
              {/* Manual Keyword Research Tool (Optional) */}
              <details className="bg-white rounded-xl shadow-sm border border-gray-200">
                <summary className="p-4 font-medium cursor-pointer hover:bg-gray-50">
                  🔍 Manual Keyword Research Tool (Advanced)
                </summary>
                <div className="p-4 pt-0">
                  <KeywordResearchTool />
                </div>
              </details>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold mb-4">Quick SEO Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a 
                    href="https://search.google.com/search-console" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                    <div>
                      <p className="font-medium">Google Search Console</p>
                      <p className="text-sm text-gray-500">Monitor search performance</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                  <a 
                    href="https://analytics.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                    <div>
                      <p className="font-medium">Google Analytics</p>
                      <p className="text-sm text-gray-500">Track website traffic</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">View Sitemap</p>
                      <p className="text-sm text-gray-500">190 pages indexed</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Automation Tab */}
        {activeTab === 'automation' && (
          <AutomationDashboard apiUrl={API_URL} />
        )}
      </main>
    </div>
  );
};

export default Admin;
