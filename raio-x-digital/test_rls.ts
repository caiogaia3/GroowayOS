import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRLS() {
    console.log('Testing RLS policies with ANON key...');

    // 1. Test Insert
    const testId = crypto.randomUUID();
    console.log(`\n1. Testing INSERT with ID: ${testId}`);
    const { error: insertError } = await supabase
        .from('reports')
        .insert({
            id: testId,
            data: { test: 'data', saved_at: Date.now() }
        });

    if (insertError) {
        console.error('❌ Insert failed:', insertError.message);
    } else {
        console.log('✅ Insert succeeded (Expected)');
    }

    // 2. Test Select
    console.log(`\n2. Testing SELECT for ID: ${testId}`);
    const { data: readData, error: readError } = await supabase
        .from('reports')
        .select('*')
        .eq('id', testId)
        .single();

    if (readError) {
        console.error('❌ Select failed:', readError.message);
    } else {
        console.log('✅ Select succeeded (Expected)', readData ? 'Record found' : 'No record');
    }

    // 3. Test Update
    console.log(`\n3. Testing UPDATE for ID: ${testId}`);
    const { error: updateError } = await supabase
        .from('reports')
        .update({ data: { test: 'updated' } })
        .eq('id', testId);

    if (updateError) {
        console.log('✅ Update failed/blocked (Expected):', updateError.message);
    } else {
        // Note: Supabase with RLS blocking update might return no error but update 0 rows
        const { data: checkData } = await supabase.from('reports').select('data').eq('id', testId).single();
        if (checkData?.data?.test === 'updated') {
            console.error('❌ Update SUCCESSFUL (Security Flaw - RLS bypass)');
        } else {
            console.log('✅ Update silently blocked (0 rows updated - Expected behavior for RLS)');
        }
    }

    // 4. Test Delete
    console.log(`\n4. Testing DELETE for ID: ${testId}`);
    const { error: deleteError } = await supabase
        .from('reports')
        .delete()
        .eq('id', testId);

    if (deleteError) {
        console.log('✅ Delete failed/blocked (Expected):', deleteError.message);
    } else {
        const { data: checkDeleted } = await supabase.from('reports').select('id').eq('id', testId).single();
        if (!checkDeleted) {
            console.error('❌ Delete SUCCESSFUL (Security Flaw - RLS bypass)');
        } else {
            console.log('✅ Delete silently blocked (0 rows deleted - Expected behavior for RLS)');
        }
    }
}

testRLS().catch(console.error);
