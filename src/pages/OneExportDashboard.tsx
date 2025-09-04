import React, { useState } from 'react';
import { LogOut, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SearchBar from '@/components/SearchBar';
import TradeCharts from '@/components/TradeCharts';
import AIInsights from '@/components/AIInsights';
import SearchHistory from '@/components/SearchHistory';
import TradeTable from '@/components/TradeTable';
import { getHSCodeFromProduct, getProductFromHSCode, isValidHSCode } from '@/utils/hsCodeMapping';

const OneExportDashboard: React.FC = () => {
  const [tradeData, setTradeData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearch, setCurrentSearch] = useState<{ query: string; type: string } | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = async (query: string, type: 'product' | 'hs_code') => {
    setIsSearching(true);
    setCurrentSearch({ query, type });
    
    try {
      let hsCode = '';
      let productName = '';

      if (type === 'product') {
        productName = query;
        const mappedCode = getHSCodeFromProduct(query);
        if (mappedCode) {
          hsCode = mappedCode;
        } else {
          toast({
            title: "Product Not Found",
            description: `Could not find HS code for "${query}". Please try searching by HS code directly.`,
            variant: "destructive",
          });
          setIsSearching(false);
          return;
        }
      } else {
        if (!isValidHSCode(query)) {
          toast({
            title: "Invalid HS Code",
            description: "Please enter a valid HS code (2-10 digits).",
            variant: "destructive",
          });
          setIsSearching(false);
          return;
        }
        hsCode = query.replace(/\D/g, ''); // Clean non-digits
        productName = getProductFromHSCode(hsCode) || `Product with HS code ${hsCode}`;
      }

      console.log('Searching for:', { hsCode, productName });

      const { data, error } = await supabase.functions.invoke('fetch-trade', {
        body: {
          hs_code: hsCode,
          product_name: productName,
          year: 2022
        }
      });

      if (error) {
        console.error('Search error:', error);
        toast({
          title: "Search Failed",
          description: "Failed to fetch trade data. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setTradeData(data);
      setRefreshHistory(!refreshHistory);
      toast({
        title: "Search Complete",
        description: `Found trade data for ${productName}`,
      });

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleLoadSearch = (searchRecord: any) => {
    setTradeData(searchRecord.result_data);
    setCurrentSearch({
      query: searchRecord.product_name || searchRecord.hs_code,
      type: searchRecord.product_name ? 'product' : 'hs_code'
    });
    toast({
      title: "Search Loaded",
      description: `Loaded previous search for ${searchRecord.product_name || searchRecord.hs_code}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              OneExport AI
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search Section */}
        <section>
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search History */}
          <div className="lg:col-span-1">
            <SearchHistory 
              onLoadSearch={handleLoadSearch} 
              triggerRefresh={refreshHistory}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {tradeData ? (
              <Tabs defaultValue="charts" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                  <TabsTrigger value="tables">Tables</TabsTrigger>
                  <TabsTrigger value="insights">AI Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="charts" className="space-y-6">
                  <TradeCharts data={tradeData} />
                </TabsContent>

                <TabsContent value="tables" className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <TradeTable 
                      data={tradeData.top_exporters} 
                      title="Top Exporters" 
                      type="exporters"
                    />
                    <TradeTable 
                      data={tradeData.top_importers} 
                      title="Top Importers" 
                      type="importers"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <AIInsights 
                    tradeData={tradeData}
                    productName={tradeData.product_name}
                    hsCode={tradeData.hs_code}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="h-96 flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Welcome to OneExport AI</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Search for any product or HS code to get comprehensive trade analytics 
                    and AI-powered market insights.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Powered by UN Comtrade & OpenAI</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneExportDashboard;