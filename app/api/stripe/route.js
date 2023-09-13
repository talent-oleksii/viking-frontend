import Stripe from "stripe";

const stripe = new Stripe(
    "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"
  );

export async function POST(request) {
  const { email, emailPrefix, orderOption } = await request.json();
  console.log(email);
  console.log(emailPrefix);
  console.log(orderOption);

  // Determine priceID
  let priceID = 0;
  if (orderOption == "8") {
    priceID = "price_1NpP52J0xJPb1lZKeUH1vw9i";
  } else {
    priceID = "price_1NpP64J0xJPb1lZKtqDfPTnZ";
  }
  console.log("Price ID: ", priceID);

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `https://aiviking.com/${emailPrefix}`,
      line_items: [{ price: priceID, quantity: 1 }],
      mode: "payment",
      customer_email: email,
    });

    // const data = await response.json();
    console.log(session);
    console.log(session.url);

    return new Response(JSON.stringify(session.url));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
