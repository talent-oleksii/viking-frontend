export async function POST(request) {

    const subscription_id = await request.text();
    console.log(subscription_id)
  
    try {
      const response = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${subscription_id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEMON_KEY}`,
        },
      })

      console.log('success cancel subscription')
      return new Response(JSON.stringify('done'));
  
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
    }
  }