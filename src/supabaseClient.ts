import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jukrhzjjsfdhelhfzdpf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1a3Joempqc2ZkaGVsaGZ6ZHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODAwNjMsImV4cCI6MjA2NzA1NjA2M30.hVuuYcfpHiMutWhCI3aH3OAgW8Y9UxSylTrCN0Jfmlo';

export const supabase = createClient(supabaseUrl, supabaseKey);
