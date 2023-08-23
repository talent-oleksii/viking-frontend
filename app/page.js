"use client";

import { useEffect, useState, useRef, useContext, Fragment } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DotLoader, MoonLoader } from "react-spinners";
import { Toaster, toast } from "sonner";
import { Drawer } from "vaul";

export default function Home() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [lemonURL, setLemonURL] = useState("");

  useEffect(() => {
    // Get the initial session state when component first loads
    setSession(supabase.auth.session);

    // Subscribe to session changes (logged in or logged out)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        // console.log('New session:', newSession);
        setSession(newSession);
        setIsSessionLoaded(true); // Setting the session as loaded
      }
    );

    // Unsubscribe when unmounting the component
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkSubscription();
    getUserData();
  }, [session]);

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const checkSubscription = async () => {
    if (!session || !session.user) {
      console.log("No session or user found");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("is_active")
      .eq("email", session.user.email);

    console.log(session.user.email);

    // console.log(data);
    // console.log(data[0].is_active);

    if (data[0].is_active === true) {
      setSubscription(true);
      console.log("Subscription is active");
    } else {
      setSubscription(false);
      console.log("Subscription is not active");
    }
  };

  const getUserData = async () => {
    if (!session) {
      console.log("No session found");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", session.user.email);

    console.log(session.user.email);
    console.log(session);
    console.log(data);
    console.log(data[0].tokens);

    setUserInfo(data[0]);
  };

  const reduceTokens = async (reduceAmount) => {
    let newTokenValue = userInfo.tokens - reduceAmount.value;
    let email = userInfo.email;

    try {
      const response = await fetch("/api/reduceTokens", {
        method: "POST",
        body: JSON.stringify({
          newTokenValue,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for reduceAmount`
        );
      }

      const data = await response.json();
      return data;
      setUserInfo(data);
    } catch (error) {
      console.log(error.message);
      toast.error("reduceAmount error");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.createLemonSqueezy();
    }, 250); // 1000 milliseconds = 1 second
  }, []);

  const subscribe = async (email) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: email,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for Subscribe`
        );
      }

      const data = await response.json();
      console.log(data);
      setLemonURL(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const subscribe2 = () => {
    LemonSqueezy.Url.Open(lemonURL);
  };

  // const summarize = async (transcript) => {
  //   setIsSummarizing(true);
  //   console.log("Transcript:", transcript);

  //   try {
  //     const response = await fetch("/api/summarize", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         text: transcript,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(
  //         `Server responded with ${response.status} for summarize`
  //       );
  //     } else {
  //       await reduceTokens({ value: 1 }).then(async (res) => {
  //         setUserInfo(res.data[0]);
  //         const data = await response.json();
  //         console.log(data);
  //         setSummary(data);
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setIsSummarizing(false);
  //   }
  // };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      hello
    </div>
  );
}
