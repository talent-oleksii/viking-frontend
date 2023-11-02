import Stripe from "stripe";

const stripe = new Stripe(
    // "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"
    process.env.STRIPE_SECRET_KEY
  );

export async function POST(request) {
  const { email, emailPrefix, orderOption, randomUrl } = await request.json();
  console.log(email);
  console.log(emailPrefix);
  console.log(orderOption);

  // Determine priceID
  let priceID;
  if (orderOption == 8) {
    priceID = process.env.PRICE_8;
  } else {
    priceID = process.env.PRICE_20;
  }
  console.log("Price ID: ", priceID);

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `https://aiviking.com/${randomUrl}`,
      line_items: [{ price: priceID, quantity: 1 }],
      mode: "payment",
      customer_email: email,
      allow_promotion_codes: true,
    });

    // const data = await response.json();
    console.log(session);
    console.log(session.url);

    return new Response(JSON.stringify(session.url));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
