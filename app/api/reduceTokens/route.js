import { createClient } from '@supabase/supabase-js'

export async function POST(request) {

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SERVICE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    // Access auth admin api
    const adminAuthClient = supabase.auth.admin

    const body = await request.json();
    const email = body.email;
    const newTokenValue = body.newTokenValue;
    console.log(email)
    console.log(newTokenValue)
    
    const { data, error } = await supabase
        .from('users')
        .update({ tokens: newTokenValue })
        .eq('email', email)
        .select()

    if (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Database operation failed' }), { status: 500 });
      } else {
        console.log(data)
        return new Response(JSON.stringify({ data }));
      }      
}