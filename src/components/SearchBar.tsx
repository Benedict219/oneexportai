import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface SearchBarProps {
  onSearch: (query: string, type: 'product' | 'hs_code') => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'product' | 'hs_code'>('product');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={searchType === 'product' ? "Enter product name (e.g., turmeric)" : "Enter HS code (e.g., 0910)"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 text-lg bg-background/50 border-primary/30 focus:border-primary"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={searchType === 'product' ? 'default' : 'outline'}
              onClick={() => setSearchType('product')}
              disabled={isLoading}
              className="px-4"
            >
              Product
            </Button>
            <Button
              type="button"
              variant={searchType === 'hs_code' ? 'default' : 'outline'}
              onClick={() => setSearchType('hs_code')}
              disabled={isLoading}
              className="px-4"
            >
              HS Code
            </Button>
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            className="h-12 px-8 bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Search by product name or HS code to get comprehensive trade analytics and AI-powered insights
        </p>
      </form>
    </Card>
  );
};

export default SearchBar;