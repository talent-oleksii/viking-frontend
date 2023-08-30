import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  // access auth admin api
  const adminAuthClient = supabase.auth.admin;

  const databody = await request.json();
  const userEmail = databody.data.attributes.user_email;
  const eventName = databody.meta.event_name;
  const subscriptionID = databody.data.id;
  const variantID = databody.data.attributes.variant_id;

  console.log(databody);
  console.log(userEmail);
  console.log(eventName);
  console.log(subscriptionID);
  console.log(variantID);

  // // get current tokens
  // const { data0, error0 } = await supabase
  //   .from("users")
  //   .select("tokens")
  //   .eq("email", userEmail);

  // console.log(data0);
  // const currentTokens = data0[0].tokens;
  // console.log(currentTokens);

  // subscription_created
  if (eventName === "subscription_created") {
    // update is_active
    const { data, error } = await supabase
      .from("users")
      .update({ is_active: true })
      .eq("email", userEmail);

    // update subscription_id
    const { data1, error1 } = await supabase
      .from("users")
      .update({ subscription_id: subscriptionID })
      .eq("email", userEmail);

    // update variant_id
    const { data2, error2 } = await supabase
      .from("users")
      .update({ variant_id: variantID })
      .eq("email", userEmail);

    /////////////////////////////////////////

    // if variant_id is ___, then add tokens.
    if (variantID == "111138") {
      // update token value
      const { data, error } = await supabase
        .from("users")
        .update({ tokens: 10 })
        .eq("email", userEmail);
    }

    // if variant_id is ___, then add tokens.
    if (variantID == "111139") {
      // update token value
      const { data, error } = await supabase
        .from("users")
        .update({ tokens: 100 })
        .eq("email", userEmail);
    }

    // if variant_id is ___, then add tokens.
    if (variantID == "111140") {
      // update token value
      const { data, error } = await supabase
        .from("users")
        .update({ tokens: 1000 })
        .eq("email", userEmail);
    }

    return new Response(JSON.stringify({ received: true }));
  }

  // subscription_renewed
  if (eventName === "subscription_payment_success") {
    const billing_reason = databody.data.attributes.billing_reason;

    // get variant_id from email
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', userEmail);
    const newVariantID = data[0].variant_id;
    console.log(newVariantID)
    console.log(data)

    if (billing_reason === "renewal") {
      // if variant_id is ___, then add tokens.
      if (newVariantID == "111138") {
        // update token value
        const { data, error } = await supabase
          .from("users")
          .update({ tokens: 10 })
          .eq("email", userEmail);
      }

      // if variant_id is ___, then add tokens.
      if (newVariantID == "111139") {
        // update token value
        const { data, error } = await supabase
          .from("users")
          .update({ tokens: 100 })
          .eq("email", userEmail);
      }

      // if variant_id is ___, then add tokens.
      if (newVariantID == "111140") {
        // update token value
        const { data, error } = await supabase
          .from("users")
          .update({ tokens: 1000 })
          .eq("email", userEmail);
      }
    }
    return new Response(JSON.stringify({ received: true }));
  }

  // subscription_cancelled
  if (
    eventName === "subscription_cancelled" ||
    eventName === "subscription_expired"
  ) {
    const { data1, error1 } = await supabase
      .from("users")
      .update({ is_active: false })
      .eq("email", userEmail);

    const { data2, error2 } = await supabase
      .from("users")
      .update({ subscription_id: null })
      .eq("email", userEmail);

    const { data3, error3 } = await supabase
      .from("users")
      .update({ variant_id: null })
      .eq("email", userEmail);

    return new Response(JSON.stringify({ received: true }));
  }
}
