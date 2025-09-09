-- Create documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  content TEXT,
  language TEXT DEFAULT 'English',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'pending', 'processing', 'sent', 'approved')),
  client_name TEXT,
  client_country TEXT,
  product_details TEXT,
  auto_generate BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own documents" 
ON public.documents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" 
ON public.documents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
ON public.documents 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
ON public.documents 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON public.documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create document templates table
CREATE TABLE public.document_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  template_content TEXT,
  language TEXT DEFAULT 'English',
  auto_generate BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default templates
INSERT INTO public.document_templates (name, type, description, template_content, language, auto_generate) VALUES
('Commercial Invoice', 'invoice', 'Primary billing document for international trade', 'Commercial Invoice Template Content...', 'English/Hindi', true),
('Packing List', 'packing_list', 'Detailed list of goods being exported', 'Packing List Template Content...', 'English/Tamil', true),
('Certificate of Origin', 'certificate', 'Document certifying country of manufacture', 'Certificate of Origin Template Content...', 'English', false),
('GST Invoice', 'gst_invoice', 'Tax invoice as per Indian GST regulations', 'GST Invoice Template Content...', 'Hindi/English', true),
('Shipping Bill', 'shipping_bill', 'Customs document for export clearance', 'Shipping Bill Template Content...', 'English/Bengali', true),
('E-way Bill', 'eway_bill', 'Electronic waybill for goods movement', 'E-way Bill Template Content...', 'Telugu/English', true);