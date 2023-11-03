"use client";
import Link from "next/link";
import Image from "next/image";
import va from "@vercel/analytics";

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
import { useRouter } from "next/navigation";

function PredictionPage({ params }) {
  const supabase = createClientComponentClient();
  const scrolled = useScroll(50);
  const router = useRouter();
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const checkImages = async () => {
      const promises = [];
      const newExistingImages = [];

      const { data } = await supabase
      .from('users')
      .select()
      .eq('training_id', params.id);

      const partial = data[0].partial;

      for (let i = 1; i <= 20; i++) {
        const imageUrl = `https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/results/${partial}${i}.png?${new Date().getTime()}`;

        const promise = fetch(imageUrl, { method: "HEAD" })
          .then((response) => {
            if (response.ok) {
              newExistingImages.push(imageUrl);
            }
          })
          .catch((error) => {
            console.error(`Error checking image ${i}:`, error);
          });

        promises.push(promise);
      }

      await Promise.all(promises);
      setExistingImages(newExistingImages);
    };

    checkImages();
  }, []);

  return (
    <div className="">
      <Toaster position="top-center" />
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
              Order Again
            </button>
          </div>
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        <motion.div
          className="z-10 max-w-4xl px-5 xl:px-0"
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
            className="cursor-pointer mx-auto mb-5 sm:mb-10 flex max-w-fit items-center justify-center space-x-2 overflow-hidden transition-colors"
            onClick={() => {
              navigator.clipboard.writeText("FRIEND25");
              toast.success("Discount code copied to clipboard");
              va.track("Give Friend Discount");
            }}
          >
            <span className="inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-white/50 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-sm font-medium text-white/70 backdrop-blur-3xl">
              Give a friend 25% off
            </span>
          </motion.div>
          <motion.h1
            className="max-w-4xl mx-auto bg-gradient-to-br from-white to-stone-500 bg-clip-text text-center font-Norse text-[3.65rem] sm:text-8xl font-extrabold sm:font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-9xl md:leading-[6rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div>View Your Photos</div>
          </motion.h1>
          <motion.p
            className="mt-1.5 sm:mt-6 text-center text-white/50 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              <span className="sm:hidden">
                Your photos will appear here within 1 hour.
                <br />
                Feel free to come back later.
              </span>
              <span className="hidden sm:inline">
                Your photos will appear here within one hour. <br />
                Feel free to leave and come back later.
              </span>
            </Balancer>
          </motion.p>
          <motion.div
            className="mt-10 sm:mt-16 grid sm:grid-cols-2 gap-6 sm:gap-6"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            {existingImages.length > 0 ? (
              existingImages.map((url, index) => (
                <img className="rounded-2xl" key={index} src={url} alt={`Image ${index + 1}`} />
              ))
            ) : (
              <p></p>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default PredictionPage;
