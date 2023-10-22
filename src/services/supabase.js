import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kkzczaopcyxsonceturz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtremN6YW9wY3l4c29uY2V0dXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyODcxNDEsImV4cCI6MjAxMDg2MzE0MX0.BaqwHjqzlD2KYZwUJ4N9gHk0xxOp5Br-fe--hHVq0z8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
