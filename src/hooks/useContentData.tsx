
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type ContentItem = {
  id: string;
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
};

export function useContentData(page: string, section?: string) {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let query = supabase
          .from('page_content')
          .select('*')
          .eq('page', page);
        
        if (section) {
          query = query.eq('section', section);
          const { data, error } = await query.single();
          
          if (error) {
            if (error.code === 'PGRST116') {
              // No rows returned error
              setContent(null);
            } else {
              throw error;
            }
          } else {
            setContent(data as ContentItem);
          }
        } else {
          const { data, error } = await query;
          
          if (error) throw error;
          
          setContents(data as ContentItem[]);
        }
      } catch (err: any) {
        console.error('Error fetching content:', err);
        setError(err.message || 'Erro ao carregar conteúdo');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [page, section]);

  return { content, contents, loading, error };
}
