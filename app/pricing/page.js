"use client";
import Link from "next/link";
import Image from "next/image";
import va from "@vercel/analytics";

import { useEffect, useState, useRef, useContext, Fragment } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DotLoader, MoonLoader } from "react-spinners";
import { Toaster, toast } from "sonner";
import { Drawer } from "vaul";
import { BeatLoader } from "react-spinners";

import useScroll from "@/lib/hooks/use-scroll";
import { useUploadModal } from "@/components/home/upload-modal";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [lemonURL, setLemonURL] = useState("");
  const router = useRouter();

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

    buyLink1();
    buyLink2();
    buyLink3();
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

  const scrolled = useScroll(50);
  const { UploadModal, setShowUploadModal } = useUploadModal();

  useEffect(() => {
    setTimeout(() => {
      window.createLemonSqueezy();
    }, 100); // 1000 milliseconds = 1 second
  }, []);

  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");

  const buyLink1 = async () => {
    try {
      const response = await fetch("/api/buyLink1", {
        method: "POST",
        body: session.user.email,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for buyLink1`
        );
      }

      const data1 = await response.json();
      console.log(data1);
      setLink1(data1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const buyLink2 = async () => {
    try {
      const response = await fetch("/api/buyLink2", {
        method: "POST",
        body: session.user.email,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for buyLink2`
        );
      }

      const data2 = await response.json();
      console.log(data2);
      setLink2(data2);
    } catch (error) {
      console.log(error.message);
    }
  };

  const buyLink3 = async () => {
    try {
      const response = await fetch("/api/buyLink3", {
        method: "POST",
        body: session.user.email,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for buyLink3`
        );
      }

      const data3 = await response.json();
      console.log(data3);
      setLink3(data3);
    } catch (error) {
      console.log(error.message);
    }
  };

  const clickBuyLink1 = () => {
    LemonSqueezy.Url.Open(link1);
  };

  const clickBuyLink2 = () => {
    LemonSqueezy.Url.Open(link2);
  };

  const clickBuyLink3 = () => {
    LemonSqueezy.Url.Open(link3);
  };

  const [cancelLoading, setCancelLoading] = useState(false);

  const cancelLemon = async (id) => {
    setCancelLoading(true);
    try {
      const response = await fetch("/api/cancelLemon", {
        method: "POST",
        body: id,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for cancelLemon`
        );
      }

      setCancelLoading(false);
      getUserData();
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.log(error.message);
      toast.error("Cancel failed");
    }
  };

  const cancelSubscription = async (email) => {
    try {
      const response = await fetch("/api/cancel", {
        method: "POST",
        body: email,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status} for Cancel`);
      }

      const data4 = await response.json();
      console.log(data4);

      // toast.success('cancel supabase')
    } catch (error) {
      console.log(error.message);
      toast.error("Cancel failed");
    }
  };

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
            <button
              onClick={() => {
                router.push("/pricing");
                va.track("Pricing Button");
              }}
              className="hidden sm:block px-4 py-1.5 text-black border border-gray-400 rounded-lg text-sm"
            >
              Pricing
            </button>
            {userInfo.variant_id === "111140" ? (
              <button
                onClick={() => {
                  router.push("/pricing");
                  va.track("Credits Button");
                }}
                className="block px-4 py-1.5 text-white bg-black rounded-lg text-sm"
              >
                Unlimited
              </button>
            ) : subscription ? (
              <button
                onClick={() => {
                  router.push("/pricing");
                  va.track("Credits Button");
                }}
                className="block px-4 py-1.5 text-white bg-black rounded-lg text-sm"
              >
                Credits: {userInfo.tokens}
              </button>
            ) : session ? (
              <div>
                <button
                  onClick={() => {
                    router.push("/pricing");
                    va.track("Pricing Button");
                  }}
                  className="sm:hidden px-4 py-1.5 text-white border bg-black rounded-lg text-sm"
                >
                  Pricing
                </button>
                <button
                  onClick={() => {
                    router.push("/pricing");
                    va.track("Credits Button");
                  }}
                  className="hidden sm:block px-4 py-1.5 text-white bg-black rounded-lg text-sm"
                >
                  Credits: {userInfo.tokens}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleGoogle();
                  va.track("Sign Up Button");
                }}
                className="block px-4 py-1.5 text-white bg-black rounded-lg text-sm"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        <UploadModal />
        <motion.div
          className="z-10 max-w-5xl px-5 xl:px-0"
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
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-5 sm:px-7 py-2 transition-colors"
          >
            <p className="text-sm font-semibold text-[#1d9bf0]">Pricing</p>
          </motion.div>
          <motion.h1
            className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-clash text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div>Deepfake anyone.</div>
          </motion.h1>
          <motion.p
            className="mt-5 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              <span className="sm:hidden">
                Just one click away. Get started now.
              </span>
              <span className="hidden sm:inline">
                You're one click away. Get started now.
              </span>
            </Balancer>
          </motion.p>
          {/* <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="-mb-3 sm:-mb-3">
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
          </motion.div> */}
          <motion.div
            className="group relative mx-auto pt-10 sm:pt-11 w-full overflow-hidden rounded-2xl focus:ring-0 "
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div
              id="pricing"
              className="flex flex-col sm:flex-row gap-8 sm:gap-6 items-start pb-2 sm:px-0 px-7"
            >
              <div className="w-full sm:w-[280px] px-8 py-7 bg-white border border-gray-200 rounded-[17px] sm:px-8 sm:py-7">
                <h5 className="mb-4 text-lg font-medium text-gray-800 ">
                  Starter
                </h5>
                <div className="flex items-baseline text-gray-900 ">
                  <span className="text-3xl font-semibold text-gray-500 ">
                    $
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    9
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500 ">
                    USD
                  </span>
                </div>
                <ul role="list" className="space-y-4 my-8">
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      10 credits / mo
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Images + videos
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      AI voices (English)
                    </span>
                  </li>
                  {/* <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-gray-400 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">
                      Available in 5 languages
                    </span>
                  </li> */}
                </ul>
                {userInfo.variant_id === 111138 ? (
                  cancelLoading ? (
                    <div className="text-black bg-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black">
                      Loading...
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        cancelLemon(userInfo.subscription_id);
                        cancelSubscription(userInfo.email);
                      }}
                      className="text-black bg-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black"
                    >
                      Cancel Plan
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      if (session) {
                        clickBuyLink1();
                        va.track("Choose Plan - Starter");
                      } else {
                        handleGoogle();
                      }
                    }}
                    className="text-white bg-black focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black"
                  >
                    Choose Plan
                  </button>
                )}
              </div>
              <div className="relative w-full sm:w-[280px] px-8 py-7 bg-white border border-sky-200 shadow-xl rounded-[17px] sm:px-8 sm:py-7">
                <small className="text-white absolute -top-3 right-5 bg-gradient-to-r from-sky-300 to-[#5C9CF4] font-normal rounded-full px-2.5 py-1 text-xs ml-auto">
                  Limited Time
                </small>
                {/* <small className="text-white absolute -top-3 right-5 bg-gradient-to-r from-sky-300 to-[#5C9CF4] font-normal rounded-full px-2.5 py-1 text-xs ml-auto">
                  12 Seats Left
                </small> */}
                {/* <small className="text-white absolute -top-3 right-5 bg-gradient-to-r from-sky-300 to-[#5C9CF4] font-normal rounded-full px-2.5 py-1 text-xs ml-auto">
                  Most Popular
                </small> */}
                <h5 className="mb-4 text-lg font-medium animate-text-shimmer text-transparent bg-clip-text bg-gradient-to-r bg-[length:250%_100%] from-sky-400 via-fuchsia-400 to-sky-400 opacity-90">
                  Legend
                </h5>
                <div className="flex items-baseline text-gray-900 ">
                  <span className="text-3xl font-semibold text-gray-500 ">
                    $
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    19
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500 ">
                    USD
                  </span>
                </div>
                <ul role="list" className="space-y-4 my-8">
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      100 credits / mo
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Images + videos
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      AI voices (Multilingual)
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Custom uploads
                    </span>
                  </li>
                  {/* <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      No watermark
                    </span>
                  </li> */}
                </ul>
                {userInfo.variant_id === 111139 ? (
                  cancelLoading ? (
                    <div className="text-black bg-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black">
                      Loading...
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        cancelLemon(userInfo.subscription_id);
                        cancelSubscription(userInfo.email);
                      }}
                      className="text-black bg-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black"
                    >
                      Cancel Plan
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      if (session) {
                        clickBuyLink2();
                        va.track("Choose Plan - Legend");
                      } else {
                        handleGoogle();
                      }
                    }}
                    className="text-white bg-black focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black"
                  >
                    Choose Plan
                  </button>
                )}
              </div>
              <div className="w-full sm:w-[280px] px-8 py-7 bg-white border border-gray-200 rounded-[17px] sm:px-8 sm:py-7">
                <h5 className="mb-4 text-lg font-medium text-gray-800 ">
                  Professional
                </h5>
                <div className="flex items-baseline text-gray-900 ">
                  <span className="text-3xl font-semibold text-gray-500 ">
                    $
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    99
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500 ">
                    USD
                  </span>
                </div>
                <ul role="list" className="space-y-4 my-8">
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Unlimited credits
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Images + videos
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      AI voices (Multilingual)
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Custom uploads
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      No watermark
                    </span>
                  </li>
                  {/* <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Professional quality
                    </span>
                  </li> */}
                  <li className="flex space-x-3 items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-neworange "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">
                      Longer videos
                    </span>
                  </li>
                </ul>
                {userInfo.variant_id === 111140 ? (
                  cancelLoading ? (
                    <div className="text-black bg-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black">
                      Loading...
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        cancelLemon(userInfo.subscription_id);
                        cancelSubscription(userInfo.email);
                      }}
                      className="text-black bg-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black"
                    >
                      Cancel Plan
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      if (session) {
                        clickBuyLink3();
                        va.track("Choose Plan - Professional");
                      } else {
                        handleGoogle();
                      }
                    }}
                    className="text-white bg-black focus:ring-0 focus:outline-none font-medium rounded-full text-sm w-full py-2.5 inline-flex justify-center text-center hover:text-black hover:bg-white border border-black"
                  >
                    Choose Plan
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div></motion.div>
      </main>
    </>
  );
}
