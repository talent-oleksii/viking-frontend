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
      {/* <div className="fixed h-screen w-full bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100" /> */}
      {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]"></div> */}
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
          {/* <motion.a
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            href="https://www.futurebaby.pics/"
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
          </motion.a> */}
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
          <motion.div
            className="mt-11 sm:mt-20 w-full"
            // className="group relative mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-2xl border border-gray-200 sm:h-[600px] sm:w-[600px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <img className="rounded-xl" src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking4.png" alt="" />
              <img className="rounded-xl" src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking3.png" alt="" />
              <img className="rounded-xl" src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking5.png" alt="" />
              <img className="rounded-xl" src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking1.png" alt="" />
              <img className="rounded-xl" src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking6.png" alt="" />
              <img className="rounded-xl" src="https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/other/elonviking2.png" alt="" />
            </div>
          </motion.div>
          <motion.div className=""> 
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
