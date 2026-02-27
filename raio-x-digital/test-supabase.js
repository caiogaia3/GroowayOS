require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await sb.from('reports').insert({
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    slug: 'test-slug',
    data: { test: true }
  });
  console.log("Error:", error);
  console.log("Data:", data);
}
test();
