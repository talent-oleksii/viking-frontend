import { createClient } from '@supabase/supabase-js'


export async function POST(request) {

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SERVICE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    
    const adminAuthClient = supabase.auth.admin

    const email = await request.text();
    console.log(email)

    try {
        // Update user to inactive
        const { data: userData, error: userError } = await supabase
            .from('users')
            .update({ is_active: false })
            .eq('email', email);
        
        // Set subscription_id to null
        const { error: deleteError } = await supabase
            .from('users')
            .update({ subscription_id: null })
            .eq('email', email);

        // Set variant_id to null
        const { error: deleteError2 } = await supabase
        .from('users')
        .update({ variant_id: null })
        .eq('email', email);
        
        // Check if there are any errors
        if (userError || deleteError) {
            throw new Error(userError?.message || deleteError?.message);
        }

        return new Response(JSON.stringify({ received: true }));
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
    }
}