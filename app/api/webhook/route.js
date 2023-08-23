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

  
  const databody = await request.json();
  const userEmail = databody.data.attributes.user_email;
  const eventName = databody.meta.event_name;

  console.log(databody)
  console.log(userEmail)
  console.log(eventName)

  if (eventName === 'subscription_created') {
    // Update the 'users' table
    const { data, error } = await supabase
      .from('users')
      .update({ is_active: true })
      .eq('email', userEmail);
    
    // update token value
    const { data1, error1 } = await supabase
      .from('users')
      .update({ tokens: 100 })
      .eq('email', userEmail)
      .select()

    return new Response(JSON.stringify({ received: true }));

  } else {
    if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
      const { data, error } = await supabase
        .from('users')
        .update({ is_active: false })
        .eq('email', userEmail);
      
    return new Response(JSON.stringify({ received: true }));
    }
  }
}