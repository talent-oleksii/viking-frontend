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
  const scrolled = useScroll(50);
  const router = useRouter();

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
                window.location.reload();
                va.track("Place Order Button");
              }}
              className="block px-4 py-1.5 text-white bg-black rounded-lg text-sm"
            >
              Instructions
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
          {/* <motion.a
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            href="https://twitter.com/intent/tweet?text=Follow%20these%20steps%20to%20earn%20free%20credits%20%F0%9F%91%87%0A%0A1.%20Link%20deepfake.pics%0A%0A2.%20Upload%20your%20video%0A%0A%28send%20me%20a%20DM%20after%20you%27re%20done%20%40tobytabi%29"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-5 sm:px-5 py-2 transition-colors hover:bg-blue-200"
            onClick={() => {
              va.track("Share on Twitter Button");
            }}
          >
            <p className="text-sm font-semibold text-[#1d9bf0]">Instructions</p>
          </motion.a> */}
          {/* <motion.h1
            className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-clash text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div>View your photos</div>
          </motion.h1> */}
          <motion.p
            className="border border-[#1d9bf0] w-full sm:max-w-xl mt-10 text-center rounded-2xl px-4 py-12 sm:py-20 text-[#1d9bf0] bg-blue-100 flex flex-col gap-8 sm:gap-8"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div>
              <span className="sm:hidden text-sm">
                Your photos will be accessible at <br />
                www.futurebaby.pics/your_email_before_@_sign.
              </span>
              <span className="hidden sm:block text-lg">
                Your photos will be accessible at
                www.futurebaby.pics/your_email_before_@_sign.
              </span>
            </div>
            <div>
              <span className="text-xs sm:text-sm">
                (e.g. If your email is toby@gmail.com, then go to
                www.futurebaby.pics/toby)
              </span>
            </div>
          </motion.p>
          {/* <motion.div
            // className="group relative mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-2xl border border-gray-200 sm:h-[600px] sm:w-[600px]"
            className="group relative mx-auto mt-10 w-full overflow-hidden rounded-2xl border border-gray-200 focus:ring-0"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div className="">hello</div>
          </motion.div> */}
        </motion.div>
        <motion.div></motion.div>
      </main>
    </div>
  );
}