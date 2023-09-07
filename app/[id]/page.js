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
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");
  const [image7, setImage7] = useState("");
  const [image8, setImage8] = useState("");
  const [image9, setImage9] = useState("");
  const [image10, setImage10] = useState("");

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("partial", params.id);

    console.log(data);
    console.log(data[0].image1);
    setImage1(data[0].image1);
    setImage2(data[0].image2);
    setImage3(data[0].image3);
    setImage4(data[0].image4);
    setImage5(data[0].image5);
    setImage6(data[0].image6);
    setImage7(data[0].image7);
    setImage8(data[0].image8);
    setImage9(data[0].image9);
    setImage10(data[0].image10);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  console.log(params);

  const scrolled = useScroll(50);
  const router = useRouter();

  return (
    <div className="">
      <Toaster richColors position="top-center" />
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
            <img
              src="/images/logo.png"
              alt="Logo image of a chat bubble"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></img>
            <p>FutureBaby</p>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                router.push("/");
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
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="cursor-pointer mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-5 sm:px-5 py-2 transition-colors hover:bg-blue-200"
            onClick={() => {
              navigator.clipboard.writeText("FRIEND25");
              toast.success("Discount code copied to clipboard");
              va.track("Give Friend Discount");
            }}
          >
            <p className="text-sm font-semibold text-[#1d9bf0]">
              Give a friend 25% discount
            </p>
          </motion.div>
          <motion.h1
            className="max-w-2xl mx-auto bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-dm text-[2.5rem] leading-[2.72rem] sm:text-5xl font-extrabold sm:font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div>View your photos</div>
          </motion.h1>
          <motion.p
            className="mt-5 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>
              <span className="sm:hidden">
                Baby photos will appear here when ready.
                <br />
                Could take up to 2 hours.
              </span>
              <span className="hidden sm:inline">
                Baby photos will appear here once they are ready. <br />
                Could take up to 2 hours.
              </span>
            </Balancer>
          </motion.p>
          <motion.div
            className="max-w-[1000px] mt-10 sm:mt-16 grid sm:grid-cols-2 gap-6 sm:gap-4"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <img
              src={`https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/uploads/mom_${params.id}`}
              alt=""
              className="rounded-2xl"
            />
            <img
              src={`https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/uploads/dad_${params.id}`}
              alt=""
              className="rounded-2xl"
            />
            <img src={image1} alt="" className="rounded-2xl" />
            <img src={image1} alt="" className="rounded-2xl" />
            <img src={image3} alt="" className="rounded-2xl" />
            <img src={image4} alt="" className="rounded-2xl" />
            <img src={image5} alt="" className="rounded-2xl" />
            <img src={image6} alt="" className="rounded-2xl" />
            <img src={image7} alt="" className="rounded-2xl" />
            <img src={image8} alt="" className="rounded-2xl" />
            <img src={image9} alt="" className="rounded-2xl" />
            <img src={image10} alt="" className="rounded-2xl" />
          </motion.div>
        </motion.div>
        <motion.div></motion.div>
      </main>
    </div>
  );
}

export default PredictionPage;
