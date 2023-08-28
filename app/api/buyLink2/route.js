export async function POST(request) { 

    const email = await request.text();
    console.log(email)
  
    try {
      const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEMON_KEY}`,
        },
        body: JSON.stringify({
            data: {
              "type": "checkouts",
              "attributes": {
                "checkout_options": {
                    "embed": true,
                  },
                "checkout_data": {
                  "email": email,
                },
              },
              "relationships": {
                "store": {
                  "data": {
                    "type": "stores",
                    "id": "39148"
                  }
                },
                "variant": {
                  "data": {
                    "type": "variants",
                    "id": "111139"
                  }
                }
              }
            }
        }),
      })
  
      const data = await response.json()
      console.log(data)
  
      const url = data['data']['attributes']['url']

      console.log(`url: ${url}`);
  
      return new Response(JSON.stringify(url));
  
  
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
    }
  }