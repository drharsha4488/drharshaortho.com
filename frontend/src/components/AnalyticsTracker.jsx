import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Generate a unique session ID for this browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analyticsSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analyticsSessionId', sessionId);
  }
  return sessionId;
};

const AnalyticsTracker = () => {
  const location = useLocation();
  const lastTrackedPath = useRef('');

  useEffect(() => {
    // Avoid tracking the same page twice in a row
    if (lastTrackedPath.current === location.pathname) {
      return;
    }
    
    lastTrackedPath.current = location.pathname;
    
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch(`${API_URL}/api/analytics/pageview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page_path: location.pathname,
            page_title: document.title,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            session_id: getSessionId()
          })
        });
      } catch (err) {
        // Silently fail - don't block user experience
        console.debug('Analytics tracking failed:', err);
      }
    };

    // Small delay to ensure page has loaded
    const timeoutId = setTimeout(trackPageView, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;
