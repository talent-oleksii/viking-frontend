"use client";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState, useRef, useContext, Fragment } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DotLoader, MoonLoader } from "react-spinners";
import { Toaster, toast } from "sonner";
import { Drawer } from "vaul";

import useScroll from "@/lib/hooks/use-scroll";
import { useUploadModal } from "@/components/home/upload-modal";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Upload } from "lucide-react";

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
    // return () => {
    //   authListener.unsubscribe();
    // };
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

  const scrolled = useScroll(50);
  const { UploadModal, setShowUploadModal } = useUploadModal();

  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-clash text-2xl">
            <Image
              src="/images/logo.png"
              alt="Logo image of a chat bubble"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Deepfake.Pics</p>
          </Link>
          <div className="flex items-center space-x-4">
            {/* <button className="sm:hidden px-4 py-1.5 text-white bg-black rounded-lg text-sm">
              Pricing
            </button> */}
            <button className="hidden sm:block px-4 py-1.5 text-black border border-gray-400 rounded-lg text-sm">
              Pricing
            </button>
            <button className="block px-4 py-1.5 text-white bg-black rounded-lg text-sm">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        <UploadModal />
        <motion.div
          className="z-10 max-w-2xl px-5 xl:px-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.a
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            href="https://twitter.com/TobyTabi"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-5 sm:px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 248 204"
              className="h-5 w-5 text-[#1d9bf0]"
            >
              <path
                fill="currentColor"
                d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
              />
            </svg>
            <p className="text-sm font-semibold text-[#1d9bf0]">
              Introducing Deepfake
            </p>
          </motion.a>
          <motion.h1
            className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-clash text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>Deepfakes from any image</Balancer>
          </motion.h1>
          <motion.p
            className="mt-5 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              <span className="sm:hidden">
                Make anyone say anything. Just upload image.
              </span>
              <span className="hidden sm:inline">
                Make anyone say anything. Just upload an image.
              </span>
            </Balancer>
          </motion.p>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="-mb-3 sm:-mb-3">
            <button
              className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="h-5 w-5 text-white" />
              <p>Image / Video</p>
            </button>
            <p className="mt-2.5 text-center text-xs text-gray-500">
              120.4K deepfakes generated and counting!
            </p>
          </motion.div>
          <motion.div
            className="group relative mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-2xl border border-gray-200 sm:h-[600px] sm:w-[600px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <video
              controls
              playsInline
              src="/videos/trump.mp4"
              poster="/images/trump1.png"
            ></video>
          </motion.div>
        </motion.div>
        <motion.div></motion.div>
      </main>
    </>
  );
}
