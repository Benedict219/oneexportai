import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TradeRequest {
  hs_code: string;
  year?: number;
  country?: string;
  product_name?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { hs_code, year = 2022, country, product_name }: TradeRequest = await req.json();
    
    console.log('Fetching trade data for:', { hs_code, year, country, product_name });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get authenticated user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Authentication error:', authError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch data from UN Comtrade API
    const comtradeUrl = `https://comtradeapi.un.org/data/v1/get/C/A/HS?cmdCode=${hs_code}&freq=A&px=HS&ps=${year}&r=all&p=0&rg=all&cc=H0&fmt=json&max=250`;
    
    console.log('Fetching from UN Comtrade:', comtradeUrl);
    
    let comtradeData = [];
    try {
      const comtradeResponse = await fetch(comtradeUrl);
      if (comtradeResponse.ok) {
        const comtradeResult = await comtradeResponse.json();
        comtradeData = comtradeResult.data || [];
      }
    } catch (error) {
      console.error('Error fetching from UN Comtrade:', error);
    }

    // Process and aggregate the data
    const exporters = new Map();
    const importers = new Map();
    const yearlyData = new Map();

    comtradeData.forEach((record: any) => {
      const reporterDesc = record.reporterDesc || 'Unknown';
      const partnerDesc = record.partnerDesc || 'Unknown';
      const tradeValue = parseFloat(record.primaryValue) || 0;
      const tradeFlow = record.flowDesc;
      const recordYear = record.period;

      // Aggregate exporters (reporters with export flow)
      if (tradeFlow === 'Export' && reporterDesc !== 'World' && tradeValue > 0) {
        exporters.set(reporterDesc, (exporters.get(reporterDesc) || 0) + tradeValue);
      }

      // Aggregate importers (partners with import flow)
      if (tradeFlow === 'Import' && partnerDesc !== 'World' && tradeValue > 0) {
        importers.set(partnerDesc, (importers.get(partnerDesc) || 0) + tradeValue);
      }

      // Aggregate yearly data
      if (tradeFlow === 'Export' && reporterDesc !== 'World') {
        const key = `${recordYear}`;
        yearlyData.set(key, (yearlyData.get(key) || 0) + tradeValue);
      }
    });

    // Convert to arrays and sort
    const topExporters = Array.from(exporters.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, value]) => ({ country, value: Math.round(value) }));

    const topImporters = Array.from(importers.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, value]) => ({ country, value: Math.round(value) }));

    const yearlyTrend = Array.from(yearlyData.entries())
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .map(([year, value]) => ({ year: parseInt(year), value: Math.round(value) }));

    const tradeData = {
      hs_code,
      product_name,
      year,
      top_exporters: topExporters,
      top_importers: topImporters,
      yearly_trend: yearlyTrend,
      total_trade_value: topExporters.reduce((sum, item) => sum + item.value, 0),
      data_source: 'UN Comtrade API',
      fetched_at: new Date().toISOString()
    };

    // Save search to database
    try {
      const { error: insertError } = await supabase
        .from('searches')
        .insert({
          user_id: user.id,
          product_name,
          hs_code,
          search_params: { year, country },
          result_data: tradeData
        });

      if (insertError) {
        console.error('Error saving search:', insertError);
      }
    } catch (error) {
      console.error('Error saving to database:', error);
    }

    return new Response(JSON.stringify(tradeData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-trade function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});