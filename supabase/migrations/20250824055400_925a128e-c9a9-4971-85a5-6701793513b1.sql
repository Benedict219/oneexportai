-- Add RLS policies for company_subscriptions table to restrict access to company owners only

-- Policy for INSERT: Only company owners can create subscription records for their companies
CREATE POLICY "Owner can create company subscription" 
ON public.company_subscriptions
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM companies c 
    WHERE c.id = company_subscriptions.company_id 
    AND c.owner_user_id = auth.uid()
  )
);

-- Policy for UPDATE: Only company owners can update their company's subscription
CREATE POLICY "Owner can update company subscription" 
ON public.company_subscriptions
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 
    FROM companies c 
    WHERE c.id = company_subscriptions.company_id 
    AND c.owner_user_id = auth.uid()
  )
);

-- Policy for DELETE: Only company owners can delete their company's subscription
CREATE POLICY "Owner can delete company subscription" 
ON public.company_subscriptions
FOR DELETE
USING (
  EXISTS (
    SELECT 1 
    FROM companies c 
    WHERE c.id = company_subscriptions.company_id 
    AND c.owner_user_id = auth.uid()
  )
);