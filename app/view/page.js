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

  const [email, setEmail] = useState("");

  // Function to handle input change
  const handleChange = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
                window.location.reload();
                va.track("Place Order Button");
              }}
              className="block px-4 py-1.5 text-white bg-black rounded-lg text-sm"
            >
              View Photos
            </button>
          </div>
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <motion.div
          className="z-10 w-full flex items-center justify-center max-w-2xl px-5 xl:px-0 "
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
          <motion.p
            className="w-full sm:w-[400px] mb-7"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <label className="w-full block mb-2 font-medium text-white">
              Your email
            </label>
            <input
              type="text"
              autoComplete="off"
              id="small-input"
              className="mb-4 block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md bg-white  focus:outline-0 focus:ring-0"
              value={email}
              onChange={handleChange}
              placeholder="e.g. toby@gmail.com"
            />
            <button
              disabled={!email}
              onClick={() => {
                router.push(`/${email.split("@")[0]}`);
              }}
              className={`${
                !email ? "cursor-not-allowed" : ""
              } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1 border-white/20 bg-black text-white`}
            >
              <p className="text-sm">View Photos</p>
            </button>
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
