import Stripe from "stripe";


const uuid = require('uuid');

const stripe = new Stripe(
    // "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"
    process.env.STRIPE_SECRET_KEY
  );

export async function POST(request) {
  const { email, emailPrefix, orderOption } = await request.json();
  console.log(email);
  console.log(emailPrefix);
  console.log(orderOption);

  // Determine priceID
  let priceID;
  if (orderOption == 8) {
    // priceID = "price_1NpP52J0xJPb1lZKeUH1vw9i";
    // priceID = 'price_1O7DD8J0xJPb1lZK9tf8LNc5';
    priceID = process.env.PRICE_8;
  } else {
    // priceID = "price_1NpP64J0xJPb1lZKtqDfPTnZ";
    // priceID = 'price_1O7DDgJ0xJPb1lZKO9CuKwLN';
    priceID = process.env.PRICE_20;
  }
  console.log("Price ID: ", priceID);

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `https://aiviking.com/${uuid.v4()}`,
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
