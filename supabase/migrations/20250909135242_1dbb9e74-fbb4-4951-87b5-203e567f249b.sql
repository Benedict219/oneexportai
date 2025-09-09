-- Enable RLS on document_templates table
ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read document templates since they are public templates
CREATE POLICY "Anyone can view document templates" 
ON public.document_templates 
FOR SELECT 
USING (true);

-- Only system/admin should be able to modify templates, but for now we'll allow authenticated users
CREATE POLICY "Authenticated users can create templates" 
ON public.document_templates 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update templates" 
ON public.document_templates 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete templates" 
ON public.document_templates 
FOR DELETE 
USING (auth.uid() IS NOT NULL);