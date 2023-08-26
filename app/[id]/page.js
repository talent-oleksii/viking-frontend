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

function PredictionPage({ params }) {
  const videoURL = `https://pbxt.replicate.delivery/${params.id}/result_voice.mp4`;
  console.log(params);

  const scrolled = useScroll(50);

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
            href="https://twitter.com/intent/tweet?text=Just%20made%20this%20awesome%20video%20with%20deepfake.pics%20created%20by%20%40TobyTabi%20%F0%9F%94%A5%0A%0A%28please%20upload%20video%29"
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
              Share on Twitter
            </p>
          </motion.a>
          <motion.h1
            className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-clash text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div>Here's your video.</div>
          </motion.h1>
          <motion.p
            className="mt-5 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              <span className="">Share on Twitter to earn 0.5 credits.</span>
            </Balancer>
          </motion.p>
          <motion.div
            // className="group relative mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-2xl border border-gray-200 sm:h-[600px] sm:w-[600px]"
            className="group relative mx-auto mt-10 w-full overflow-hidden rounded-2xl border border-gray-200 focus:ring-0"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <video
              controls
              playsInline
              src={videoURL}
              // poster="/images/trump1.png"
            ></video>
          </motion.div>
        </motion.div>
        <motion.div></motion.div>
      </main>
    </div>
  );
}

export default PredictionPage;
