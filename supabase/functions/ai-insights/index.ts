import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InsightsRequest {
  trade_data: any;
  product_name?: string;
  hs_code: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { trade_data, product_name, hs_code }: InsightsRequest = await req.json();
    
    console.log('Generating AI insights for:', { hs_code, product_name });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare the prompt with trade data
    const prompt = `You are a trade analytics assistant specialized in international trade data analysis. 

Analyze the following trade data for ${product_name || 'product'} (HS Code: ${hs_code}) and provide:

1. **Top 3 Key Insights**: Most important findings from the data
2. **Market Trends & Risks**: Current trends and potential risks in this market
3. **Actionable Recommendations**: Specific advice for exporters looking to enter or expand in this market

Trade Data:
${JSON.stringify(trade_data, null, 2)}

Please provide a comprehensive analysis in a clear, structured format that would be valuable for business decision-making.`;

    console.log('Calling OpenAI API...');
    
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert international trade analyst with deep knowledge of global markets, trade flows, and export strategies. Provide actionable insights based on trade data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', errorText);
      return new Response(JSON.stringify({ 
        error: 'Failed to generate insights',
        details: errorText 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openAIData = await openAIResponse.json();
    const insights = openAIData.choices[0].message.content;

    console.log('AI insights generated successfully');

    const response = {
      insights,
      hs_code,
      product_name,
      generated_at: new Date().toISOString(),
      model_used: 'gpt-4o-mini'
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-insights function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});