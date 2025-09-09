import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DocumentRequest {
  clientName: string;
  clientCountry: string;
  productDetails: string;
  language: string;
  documentType: string;
  userId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, clientCountry, productDetails, language, documentType, userId }: DocumentRequest = await req.json();

    console.log('Generating document:', { clientName, clientCountry, productDetails, language, documentType });

    // Initialize Hugging Face client
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'));

    // Create a detailed prompt for document generation
    const prompt = `Generate a professional ${documentType} document for export trade with the following details:

Client Information:
- Client Name: ${clientName}
- Destination Country: ${clientCountry}
- Product Details: ${productDetails}
- Document Language: ${language}

Please create a complete, professional ${documentType} document that includes all necessary fields, proper formatting, and compliance with international trade standards. The document should be in ${language} language where applicable.

Include standard fields such as:
- Invoice/Document number
- Date
- Buyer and seller information
- Product description and quantities
- Pricing and payment terms
- Shipping and delivery terms
- Required certifications and signatures

Format the document professionally with clear sections and proper business formatting.`;

    // Generate document content using Hugging Face
    const response = await hf.textGeneration({
      model: 'microsoft/DialoGPT-large', // Using a free text generation model
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
        return_full_text: false,
      },
    });

    const documentContent = response.generated_text;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save the generated document to database
    const { data: document, error } = await supabase
      .from('documents')
      .insert({
        user_id: userId,
        name: `${documentType} - ${clientName}`,
        type: documentType.toLowerCase().replace(/\s+/g, '_'),
        description: `Generated ${documentType} for ${clientName}`,
        content: documentContent,
        language: language,
        status: 'completed',
        client_name: clientName,
        client_country: clientCountry,
        product_details: productDetails,
        auto_generate: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving document:', error);
      throw new Error('Failed to save generated document');
    }

    console.log('Document generated and saved successfully:', document.id);

    return new Response(JSON.stringify({
      success: true,
      document: document,
      content: documentContent,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-document function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'An unexpected error occurred',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});