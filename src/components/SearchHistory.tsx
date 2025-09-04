import React, { useState, useEffect } from 'react';
import { History, Search, Calendar, BarChart3, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SearchRecord {
  id: string;
  product_name: string;
  hs_code: string;
  search_params: any;
  result_data: any;
  created_at: string;
}

interface SearchHistoryProps {
  onLoadSearch: (searchData: any) => void;
  triggerRefresh?: boolean;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onLoadSearch, triggerRefresh }) => {
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSearches = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('searches')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching searches:', error);
        toast({
          title: "Error",
          description: "Failed to load search history.",
          variant: "destructive",
        });
        return;
      }

      setSearches(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSearch = async (searchId: string) => {
    try {
      const { error } = await supabase
        .from('searches')
        .delete()
        .eq('id', searchId);

      if (error) {
        console.error('Error deleting search:', error);
        toast({
          title: "Error",
          description: "Failed to delete search.",
          variant: "destructive",
        });
        return;
      }

      setSearches(searches.filter(s => s.id !== searchId));
      toast({
        title: "Success",
        description: "Search deleted successfully.",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSearches();
  }, [triggerRefresh]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Search History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted/50 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <History className="h-5 w-5" />
          Recent Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        {searches.length === 0 ? (
          <div className="text-center py-8">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No searches yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start by searching for a product or HS code
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {searches.map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-secondary/20 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">
                      {search.product_name || 'Product Search'}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {search.hs_code}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(search.created_at)}
                    </span>
                    {search.result_data?.total_trade_value && (
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        ${(search.result_data.total_trade_value / 1000000).toFixed(1)}M
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onLoadSearch(search)}
                    className="text-primary border-primary/30 hover:bg-primary/10"
                  >
                    Load
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSearch(search.id)}
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchHistory;