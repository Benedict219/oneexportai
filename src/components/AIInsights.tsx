import React, { useState, useEffect } from 'react';
import { Brain, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AIInsightsProps {
  tradeData: any;
  productName?: string;
  hsCode: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({ tradeData, productName, hsCode }) => {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { toast } = useToast();

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-insights', {
        body: {
          trade_data: tradeData,
          product_name: productName,
          hs_code: hsCode
        }
      });

      if (error) {
        console.error('Error generating insights:', error);
        toast({
          title: "Error",
          description: "Failed to generate AI insights. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setInsights(data.insights);
      setHasGenerated(true);
      toast({
        title: "Success",
        description: "AI insights generated successfully!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tradeData && !hasGenerated) {
      generateInsights();
    }
  }, [tradeData, hasGenerated]);

  const formatInsights = (text: string) => {
    // Simple formatting to make the insights more readable
    return text
      .split('\n')
      .map((line, index) => {
        if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
          return (
            <h3 key={index} className="font-semibold text-lg mt-4 mb-2 text-primary">
              {line.replace(/\*\*/g, '')}
            </h3>
          );
        }
        if (line.trim().startsWith('*')) {
          return (
            <div key={index} className="ml-4 mb-2">
              <span className="text-primary">•</span> {line.replace(/^\*\s*/, '')}
            </div>
          );
        }
        if (line.trim().match(/^\d+\./)) {
          return (
            <div key={index} className="font-medium mt-2 mb-1 text-secondary">
              {line}
            </div>
          );
        }
        if (line.trim()) {
          return (
            <p key={index} className="mb-2 text-muted-foreground">
              {line}
            </p>
          );
        }
        return <br key={index} />;
      });
  };

  return (
    <Card className="bg-gradient-to-br from-accent/5 to-secondary/5 border-accent/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-accent">
          <Brain className="h-5 w-5" />
          AI-Powered Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Generating AI insights...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Analyzing trade data and market trends
              </p>
            </div>
          </div>
        ) : insights ? (
          <div className="space-y-2">
            <div className="prose prose-sm max-w-none">
              {formatInsights(insights)}
            </div>
            <div className="flex justify-end pt-4 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={generateInsights}
                className="text-primary border-primary/30 hover:bg-primary/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate Insights
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-4">
              Get AI-powered insights for this trade data
            </p>
            <Button onClick={generateInsights} className="bg-primary hover:bg-primary/90">
              <Brain className="h-4 w-4 mr-2" />
              Generate Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;