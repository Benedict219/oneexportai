-- Create users table for additional user profile data
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create searches table to store user search history
CREATE TABLE public.searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(auth_id) ON DELETE CASCADE,
  product_name TEXT,
  hs_code TEXT,
  search_params JSONB,
  result_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feedback table for user feedback on searches
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(auth_id) ON DELETE CASCADE,
  search_id UUID NOT NULL REFERENCES public.searches(id) ON DELETE CASCADE,
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- RLS policies for users table
CREATE POLICY "Users can view their own profile"
ON public.users FOR SELECT
USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert their own profile"
ON public.users FOR INSERT
WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE
USING (auth.uid() = auth_id);

-- RLS policies for searches table
CREATE POLICY "Users can view own searches"
ON public.searches FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own searches"
ON public.searches FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own searches"
ON public.searches FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own searches"
ON public.searches FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for feedback table
CREATE POLICY "Users can view own feedback"
ON public.feedback FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback"
ON public.feedback FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback"
ON public.feedback FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own feedback"
ON public.feedback FOR DELETE
USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create user profile when auth user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add indexes for better performance
CREATE INDEX idx_searches_user_id ON public.searches(user_id);
CREATE INDEX idx_searches_created_at ON public.searches(created_at DESC);
CREATE INDEX idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX idx_feedback_search_id ON public.feedback(search_id);