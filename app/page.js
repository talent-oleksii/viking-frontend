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
import { Router, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = createClientComponentClient();

  const scrolled = useScroll(50);
  const { UploadModal, setShowUploadModal } = useUploadModal();

  const handleMouseEnter = (e) => {
    const video = e.currentTarget;
    video.setAttribute("controls", "controls");
  };

  const handleMouseLeave = (e) => {
    const video = e.currentTarget;
    video.removeAttribute("controls");
  };

  return (
    <>
      <div
        className={`fixed top-0 w-full ${
          scrolled ? " bg-white/10 backdrop-blur-xl" : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link
            href="/"
            className="flex items-center font-dm font-bold text-xl sm:text-2xl"
          >
            <img
              src="/images/vikinglogo.png"
              width="30"
              height="30"
              className="mr-2.5 rounded-sm"
            ></img>
            <div className="text-white font-medium">Viking.ai</div>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setShowUploadModal(true);
                va.track("Place Order Button");
              }}
              className="block px-4 py-1.5 text-white rounded-lg text-sm"
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
          {/* <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="cursor-pointer mx-auto mb-5 sm:mb-10 flex max-w-fit items-center justify-center space-x-2 overflow-hidden transition-colors"
            onClick={() => {
              console.log("clicked");
              // router.push("/gallery");
            }}
          >
            <span className="inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-white/50 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-sm font-medium text-white/70 backdrop-blur-3xl">
              Matthew Iversen is a scammer
            </span>
          </motion.div> */}
          <motion.h1
            className="max-w-2xl mx-auto bg-gradient-to-br from-white to-stone-500 bg-clip-text text-center font-Norse text-6xl leading-[4rem] sm:text-8xl font-extrabold sm:font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-9xl md:leading-[6rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div>become a viking</div>
          </motion.h1>
          <motion.p
            className="mt-5 text-center text-white/50 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              <span className="sm:hidden">
                Transform yourself into a Viking.
              </span>
              <span className="hidden sm:inline">
                Transform yourself into a Viking.
              </span>
            </Balancer>
          </motion.p>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="-mb-3 sm:-mb-3"
          >
            <button
              className="group mx-auto mt-6 sm:mt-7 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-[#3E3E3E] bg-black px-5 py-2 text-sm text-white transition-colors"
              onClick={() => {
                setShowUploadModal(true);
                va.track("Image / Video");
              }}
            >
              <Upload className="h-5 w-5 text-white/80" />
              <div className="text-white/80">Upload Photo</div>
            </button>
            <p className="mt-2.5 text-center text-xs text-white/50">
              11,000+ viking photos generated so far!
            </p>
          </motion.div>
          <motion.div className="mt-11 sm:mt-11 grid sm:grid-cols-2 gap-8 sm:gap-4">
            <img
              src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonn.png"
              alt=""
            />
            <img
              src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/womann.png"
              alt=""
            />
          </motion.div>
          <motion.div
            className="mt-8 sm:mt-4 w-full"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero1.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero2.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero3.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero4.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero5.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero6.JPEG"
                alt=""
              />
            </div>
          </motion.div>
          {/* <motion.div
            className="mt-11 sm:mt-20 w-full"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero1.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking4.png"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero5.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero4.JPEG"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking3.png"
                alt=""
              />
              <img
                className="rounded-xl"
                src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/hero6.JPEG"
                alt=""
              />
            </div>
          </motion.div> */}
        </motion.div>
      </main>
    </>
  );
}
