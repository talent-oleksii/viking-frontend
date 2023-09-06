"use client";
import Link from "next/link";
import Image from "next/image";
import va from "@vercel/analytics";

import { useEffect, useState, useRef, useContext, Fragment } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DotLoader, MoonLoader } from "react-spinners";
import { Toaster, toast } from "sonner";
import { Drawer } from "vaul";
import Masonry from "react-masonry-css";

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

  const handleMouseEnter = (e) => {
    const video = e.currentTarget; // Use currentTarget to get the element the event is attached to
    video.setAttribute("controls", "controls");
  };

  const handleMouseLeave = (e) => {
    const video = e.currentTarget;
    video.removeAttribute("controls");
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
          <Link
            href="/"
            className="flex items-center font-dm font-bold text-2xl"
          >
            <Image
              src="/images/logo.png"
              alt="Logo image of a chat bubble"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>FutureBaby</p>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setShowUploadModal(true);
                va.track("Place Order Button");
              }}
              className="block px-4 py-1.5 text-white bg-black rounded-lg text-sm"
            >
              Order Now
            </button>
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
          <motion.a
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            href="https://twitter.com/TobyTabi"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-5 sm:px-5 py-2 transition-colors hover:bg-blue-200"
            onClick={() => {
              va.track("Introducing Deepfake Button");
            }}
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
              Meet FutureBaby
            </p>
          </motion.a>
          <motion.h1
            className="max-w-2xl mx-auto bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-dm text-[2.6rem] leading-[2.74rem] sm:text-5xl font-extrabold sm:font-bold tracking-[-0.02em] text-transparent drop-shadow-sm sm::text-7xl sm:leading-[5rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>See your future baby photos with AI</Balancer>
          </motion.h1>
          <motion.p
            className="mt-5 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              <span className="sm:hidden">
                Upload a single photo from each parent.
              </span>
              <span className="hidden sm:inline">
                Upload a single photo from each parent.
              </span>
            </Balancer>
          </motion.p>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="-mb-3 sm:-mb-3"
          >
            <button
              className="group mx-auto mt-6 sm:mt-7 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors"
              onClick={() => {
                setShowUploadModal(true);
                va.track("Image / Video");
              }}
            >
              <Upload className="h-5 w-5 text-white" />
              <p>Upload Photo</p>
            </button>
            <p className="mt-2.5 text-center text-xs text-gray-500">
              11,000+ baby photos generated so far!
            </p>
          </motion.div>
          <motion.div
            className="mt-11 sm:mt-20 w-full"
            // className="group relative mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-2xl border border-gray-200 sm:h-[600px] sm:w-[600px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <img src="/images/elon_aoc.png" alt="" />
          </motion.div>
          <motion.div>
            {/* <div class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <img
                    class="h-11 w-11 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg"
                  />
                  <div class="ml-1.5 text-sm leading-tight">
                    <span class="text-black dark:text-white font-bold block ">
                      Visualize Value
                    </span>
                    <span class="text-gray-500 dark:text-gray-400 font-normal block">
                      @visualizevalue
                    </span>
                  </div>
                </div>
                <svg
                  class="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                  </g>
                </svg>
              </div>
              <p class="text-black dark:text-white block text-xl leading-snug mt-3">
                “No one ever made a decision because of a number. They need a
                story.” — Daniel Kahneman
              </p>
              <img
                class="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
              />
              <p class="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                10:05 AM · Dec 19, 2020
              </p>
              <div class="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
              <div class="text-gray-500 dark:text-gray-400 flex mt-3">
                <div class="flex items-center mr-6">
                  <svg
                    class="fill-current h-5 w-auto"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                    </g>
                  </svg>
                  <span class="ml-3">615</span>
                </div>
                <div class="flex items-center mr-6">
                  <svg
                    class="fill-current h-5 w-auto"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                    </g>
                  </svg>
                  <span class="ml-3">93 people are Tweeting about this</span>
                </div>
              </div>
            </div> */}
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
