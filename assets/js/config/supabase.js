
const SUPABASE_URL = 'https://slgewvtutxboqwjcttoe.supabase.co';           // GANTI!
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZ2V3dnR1dHhib3F3amN0dG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzIxOTksImV4cCI6MjA4Nzg0ODE5OX0.0g_RnfVyl6VbzlzKLJzMme-MQbEJgQcUy2YYBfkv9Uo';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// INITIALIZE CLIENT
// ============================================================

try {
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized:', SUPABASE_URL);
} catch (error) {
    console.error('Failed to create Supabase client:', error);
    throw error;
}

console.log('Supabase client initialized');