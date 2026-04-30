import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Hook to fetch CMS page content by slug
 * Falls back to null if page not found in CMS
 */
export const useCmsPage = (slug) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`${API_URL}/api/cms/pages/${slug}`);
        
        if (res.ok) {
          const data = await res.json();
          setPage(data);
        } else if (res.status === 404) {
          // Page not in CMS, will use static fallback
          setPage(null);
        } else {
          throw new Error('Failed to fetch page');
        }
      } catch (err) {
        console.debug(`CMS page not found for slug: ${slug}, using static fallback`);
        setError(err.message);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { page, loading, error };
};

/**
 * Hook to fetch all CMS pages of a specific type
 */
export const useCmsPagesByType = (type) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!type) {
      setLoading(false);
      return;
    }

    const fetchPages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`${API_URL}/api/cms/pages/type/${type}`);
        
        if (res.ok) {
          const data = await res.json();
          setPages(data);
        } else {
          throw new Error('Failed to fetch pages');
        }
      } catch (err) {
        console.error(`Error fetching CMS pages of type ${type}:`, err);
        setError(err.message);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [type]);

  return { pages, loading, error };
};

export default { useCmsPage, useCmsPagesByType };
