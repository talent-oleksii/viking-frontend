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

const ImageWithLogo = ({ className, children }) => {
  return <div className={`relative ${className} items-center justify-center flex`}>
    {children}
    {/* <div className="flex absolute z-10 bottom-[15px] left-1/2 transform -translate-x-1/2 items-center justify-center opacity-60">
      <img
        src="/images/vikinglogo.png"
        width="30"
        height="30"
        className="mr-2.5 rounded-sm"
      ></img>
      <p className="text-white font-medium">Viking.ai</p>
    </div> */}
  </div>
}

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
        className={`fixed top-0 w-full ${scrolled ? " bg-white/10 backdrop-blur-xl" : "bg-white/0"
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
            <div className="text-white font-medium">AiViking.com</div>
          </Link>
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={() => {
                setShowUploadModal(true);
                va.track("Place Order Button");
              }}
              className="block px-4 py-1.5 text-white rounded-lg text-sm"
            >
              Order Now
            </button> */}
            <a
              className="block px-4 py-1.5 text-white rounded-lg text-sm"
              href="https://ai-viking.getrewardful.com/signup"
              target="_self"
            >
              Affiliate links
            </a>
          </div>
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        <UploadModal />
        <motion.div
          className="z-10 max-w-5xl sm:px-5 xl:px-0"
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
          <motion.div
            className="mb-8 flex items-center justify-center"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <p className="px-4 py-2 text-white bg-[green] rounded-full text-base -tracking-[.15px]">New Spring pictures included!</p>
          </motion.div>
          <motion.h1
            className="max-w-2xl mx-auto bg-gradient-to-br from-white to-stone-500 bg-clip-text text-center font-Norse text-6xl leading-[4rem] sm:text-8xl font-extrabold sm:font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-9xl md:leading-[6rem] pb-[2px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >

            <div>become a viking</div>
          </motion.h1>
          <motion.p
            className="mt-4 text-center text-white md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              <span className="sm:hidden -tracking-[.15px]">
                Get 20 pictures of you as a viking!
              </span>
              <span className="hidden sm:inline text-2xl -tracking-[.15px]">
                Get 20 pictures of you as a viking!
              </span>
            </Balancer>
          </motion.p>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="flex items-center flex-col justify-center"
          >
            <button
              className="group mx-auto mt-6 sm:mt-7 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-[#00FFC2] bg-black px-12 py-5 text-sm text-white transition-colors"
              onClick={() => {
                setShowUploadModal(true);
                va.track("Image / Video");
              }}
            >
              <Upload className="h-5 w-5 text-white/80" />
              <div className="text-white/80">Upload Photo</div>
            </button>

            {/* <div className="hidden sm:block">
              <p className="mt-2.5 text-center text-lg text-white/50">
                11,000+ viking photos generated so far!
              </p>
              <p className="text-lg mt-[10px] text-white/50 text-center">All examples were created with AI Viking</p>
              <p className="text-lg text-white/50 text-center">from the shown portraits</p>
            </div> */}
            <h4 className="text-lg text-white -tracking-[.2px] my-6 gap-4">Perfect for:</h4>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <p className="text-white text-white text-base sm:text-lg -tracking-[.15px]"><span className="mx-1">{'\u2022'}</span> Profile pictures!</p>
                <p className="text-white text-white text-base sm:text-lg -tracking-[.15px]"><span className="mx-1">{'\u2022'}</span> Fun gift!</p>
              </div>
              <div className="col-span-1">
                <p className="text-white text-white text-base sm:text-lg -tracking-[.15px]"><span className="mx-1">{'\u2022'}</span> Facebook posts!</p>
                <p className="text-white text-white text-base sm:text-lg -tracking-[.15px]"><span className="mx-1">{'\u2022'}</span> Christmas cards!</p>
              </div>
            </div>
          </motion.div>
          <div className="hidden sm:block">
            <motion.div className="mt-4 sm:mt-4 grid sm:grid-cols-2 gap-8 sm:gap-16 relative">
              <img
                src="/images/12.jpg"
                className="rounded-[20px] w-[585px] h-[500px] object-cover object-top"
                alt=""
              />
              <ImageWithLogo>
                <img
                  src="/images/2.png"
                  className="rounded-[20px] w-[500px] h-[500px] object-cover object-top"
                  alt=""
                />
              </ImageWithLogo>
              <img
                src="/images/1.jpg"
                className="rounded-[20px] w-[585px] h-[500px] object-cover object-top"
                alt=""
              />
              <ImageWithLogo>
                <img
                  src="/images/7.png"
                  className="rounded-[20px] w-[585px] h-[500px] object-cover object-top"
                  alt=""
                />
              </ImageWithLogo>
              <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[48%] top-[22%]">
                <path d="M25.7743 5.34129L28.2357 1.07805C28.3324 0.911257 28.4752 0.775951 28.647 0.688409C28.8188 0.600868 29.0122 0.56482 29.2039 0.584602C29.3957 0.604385 29.5776 0.679156 29.7279 0.79992C29.8781 0.920683 29.9903 1.0823 30.0509 1.26532L34.8974 16.0098C34.9426 16.1443 34.9587 16.2869 34.9446 16.4282C34.9305 16.5694 34.8864 16.706 34.8155 16.829C34.7445 16.9519 34.6482 17.0583 34.5329 17.1412C34.4176 17.224 34.2861 17.2814 34.1469 17.3095L18.9596 20.4759C18.7709 20.5149 18.5748 20.4986 18.3951 20.4289C18.2154 20.3591 18.0597 20.2389 17.9467 20.0828C17.8336 19.9266 17.7682 19.7411 17.7581 19.5485C17.748 19.356 17.7938 19.1647 17.8899 18.9975L20.3438 14.7473L20.1532 14.6372C14.6041 11.4335 7.19917 12.935 1.70569 18.4285C1.63357 18.4974 1.55154 18.5552 1.46232 18.5999L1.41383 18.6239C1.32814 18.6616 1.23759 18.6871 1.14483 18.6996L1.09516 18.7056C1.00116 18.7143 0.906413 18.7101 0.813537 18.6932L0.74856 18.6557C0.704375 18.6474 0.660878 18.6358 0.618428 18.621L0.510133 18.5585C0.443452 18.5188 0.381616 18.4715 0.325878 18.4175L0.304221 18.4049L0.269565 18.3849L0.198612 18.2978L0.151144 18.2299L0.100684 18.1372L0.0650541 18.0589L0.0350967 17.9607L0.0149656 17.8856C0.00983453 17.8475 0.00689944 17.8091 0.00617764 17.7707L0.00154022 17.6987C0.00301615 17.6584 0.00692853 17.6182 0.0132539 17.5784L0.0216113 17.5139C0.030698 17.4774 0.0418442 17.4414 0.0549871 17.4061C0.0674946 17.3844 0.0800011 17.3628 0.095009 17.3368C0.487234 16.4132 0.934902 15.5142 1.43557 14.6447C6.92817 5.10123 17.7697 1.00869 25.7743 5.34129Z" fill="#CCCCCC" />
              </svg>
              <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[48%] top-[73%]">
                <path d="M25.7743 5.34129L28.2357 1.07805C28.3324 0.911257 28.4752 0.775951 28.647 0.688409C28.8188 0.600868 29.0122 0.56482 29.2039 0.584602C29.3957 0.604385 29.5776 0.679156 29.7279 0.79992C29.8781 0.920683 29.9903 1.0823 30.0509 1.26532L34.8974 16.0098C34.9426 16.1443 34.9587 16.2869 34.9446 16.4282C34.9305 16.5694 34.8864 16.706 34.8155 16.829C34.7445 16.9519 34.6482 17.0583 34.5329 17.1412C34.4176 17.224 34.2861 17.2814 34.1469 17.3095L18.9596 20.4759C18.7709 20.5149 18.5748 20.4986 18.3951 20.4289C18.2154 20.3591 18.0597 20.2389 17.9467 20.0828C17.8336 19.9266 17.7682 19.7411 17.7581 19.5485C17.748 19.356 17.7938 19.1647 17.8899 18.9975L20.3438 14.7473L20.1532 14.6372C14.6041 11.4335 7.19917 12.935 1.70569 18.4285C1.63357 18.4974 1.55154 18.5552 1.46232 18.5999L1.41383 18.6239C1.32814 18.6616 1.23759 18.6871 1.14483 18.6996L1.09516 18.7056C1.00116 18.7143 0.906413 18.7101 0.813537 18.6932L0.74856 18.6557C0.704375 18.6474 0.660878 18.6358 0.618428 18.621L0.510133 18.5585C0.443452 18.5188 0.381616 18.4715 0.325878 18.4175L0.304221 18.4049L0.269565 18.3849L0.198612 18.2978L0.151144 18.2299L0.100684 18.1372L0.0650541 18.0589L0.0350967 17.9607L0.0149656 17.8856C0.00983453 17.8475 0.00689944 17.8091 0.00617764 17.7707L0.00154022 17.6987C0.00301615 17.6584 0.00692853 17.6182 0.0132539 17.5784L0.0216113 17.5139C0.030698 17.4774 0.0418442 17.4414 0.0549871 17.4061C0.0674946 17.3844 0.0800011 17.3628 0.095009 17.3368C0.487234 16.4132 0.934902 15.5142 1.43557 14.6447C6.92817 5.10123 17.7697 1.00869 25.7743 5.34129Z" fill="#CCCCCC" />
              </svg>
            </motion.div>
            <motion.div className="mt-4 sm:mt-4 grid sm:grid-cols-8 gap-8 sm:gap-8">
              <ImageWithLogo className="col-span-3">
                <img
                  src="/images/9.png"
                  className="rounded-[20px] w-[585px] h-[500px] object-cover object-top"
                  alt=""
                />
              </ImageWithLogo>
              <ImageWithLogo className="col-span-2">
                <img
                  src="/images/6.png"
                  className="rounded-[20px] w-[500px] h-[500px] object-cover object-top col-span-2"
                  alt=""
                />
              </ImageWithLogo>
              <ImageWithLogo className="col-span-3">
                <img
                  src="/images/8.png"
                  className="rounded-[20px] w-[585px] h-[500px] object-cover object-top col-span-3"
                  alt=""
                />
              </ImageWithLogo>

            </motion.div>
            <motion.div className="mt-4 grid sm:grid-cols-8 gap-8 sm:gap-8">
              <ImageWithLogo className='col-span-3'>
                <img
                  src="/images/5.png"
                  className="rounded-[20px] w-[585px] h-[500px] object-cover object-top"
                  alt=""
                />
              </ImageWithLogo>
              <ImageWithLogo className='col-span-3'>
                <img
                  src="/images/3.png"
                  className="rounded-[20px] w-[500px] h-[500px] object-cover object-top col-span-3"
                  alt=""
                />
              </ImageWithLogo>
              <ImageWithLogo className="col-span-2">
                <img
                  src="/images/10.png"
                  className="rounded-[20px] w-[585px] h-[500px] object-cover object-top col-span-2"
                  alt=""
                />
              </ImageWithLogo>
            </motion.div>
          </div>
          <div className="block sm:hidden mt-[30px] ">
            <div className="flex items-center justify-center flex-col">
              <img
                src="/images/12.jpg"
                className="border-[2px] border-white rounded-lg h-[150px] w-[150px] object-cover object-top"
              />
            </div>
            <div className="flex justify-center items-center mt-3">
              <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-8">
                <path d="M6.11887 16.4263L1.03201 16.4263C0.832779 16.4266 0.637897 16.4827 0.470808 16.5877C0.303718 16.6927 0.171537 16.8421 0.0901663 17.0181C0.0087952 17.194 -0.0183007 17.389 0.0121384 17.5795C0.0425774 17.77 0.129255 17.9479 0.261744 18.0919L10.9524 29.6613C11.0494 29.7678 11.1688 29.853 11.3025 29.9114C11.4362 29.9698 11.5812 30 11.7278 30C11.8745 30 12.0195 29.9698 12.1532 29.9114C12.2869 29.853 12.4063 29.7678 12.5033 29.6613L23.1836 18.0919C23.3161 17.9479 23.4028 17.77 23.4332 17.5795C23.4637 17.389 23.4366 17.194 23.3552 17.0181C23.2738 16.8421 23.1416 16.6927 22.9745 16.5877C22.8075 16.4827 22.6126 16.4266 22.4133 16.4263L17.342 16.4263L17.342 16.2062C17.342 9.79875 22.5116 4.1366 30.2659 2.12583C30.3649 2.09785 30.459 2.0557 30.5451 2.00078L30.5916 1.97078C30.6696 1.91543 30.7392 1.84977 30.7984 1.7757L30.8294 1.73568C30.8857 1.65861 30.9309 1.57447 30.9638 1.48559L30.9638 1.41056C30.9792 1.36815 30.9913 1.32468 31 1.28051L31 1.15547C30.9989 1.07787 30.9885 1.00065 30.969 0.925377L30.969 0.900368L30.969 0.860352L30.9276 0.755314L30.8914 0.680283L30.8346 0.590249L30.7829 0.520222L30.7105 0.445193L30.6536 0.390174C30.6222 0.366692 30.5894 0.344979 30.5554 0.325146L30.4934 0.285132C30.4566 0.266257 30.4186 0.249554 30.3797 0.235114L30.3176 0.210106C30.2802 0.199706 30.2423 0.191357 30.2039 0.185097C30.178 0.185097 30.1522 0.185097 30.1212 0.185097C29.0921 0.0630061 28.0563 0.0011985 27.0194 2.36145e-05C15.6412 -0.0149829 6.37734 7.32782 6.11887 16.4263Z" fill="#CCCCCC" />
              </svg>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-8">
                <path d="M24.0785 16.4263L29.0013 16.4263C29.1941 16.4266 29.3827 16.4827 29.5444 16.5877C29.7061 16.6927 29.834 16.8421 29.9127 17.0181C29.9915 17.194 30.0177 17.389 29.9883 17.5795C29.9588 17.77 29.8749 17.9479 29.7467 18.0919L19.4009 29.6613C19.307 29.7678 19.1915 29.853 19.0621 29.9114C18.9328 29.9698 18.7924 30 18.6505 30C18.5085 30 18.3682 29.9698 18.2388 29.9114C18.1094 29.853 17.9939 29.7678 17.9001 29.6613L7.56425 18.0919C7.43603 17.9479 7.35215 17.77 7.32269 17.5795C7.29324 17.389 7.31946 17.194 7.3982 17.0181C7.47695 16.8421 7.60487 16.6927 7.76657 16.5877C7.92827 16.4827 8.11686 16.4266 8.30967 16.4263L13.2174 16.4263L13.2174 16.2062C13.2174 9.79875 8.21461 4.1366 0.710398 2.12583C0.614615 2.09785 0.523556 2.0557 0.440245 2.00078L0.395224 1.97078C0.31972 1.91543 0.252356 1.84977 0.195109 1.7757L0.165093 1.73568C0.110589 1.6586 0.0668265 1.57447 0.0350177 1.48559L0.0350177 1.41056C0.0201136 1.36815 0.00841015 1.32468 6.5198e-07 1.28051L6.46514e-07 1.15547C0.00104587 1.07787 0.0111186 1.00065 0.0300166 0.925376L0.0300166 0.900369L0.0300166 0.860351L0.0700385 0.755315L0.105061 0.680284L0.160088 0.590248L0.210118 0.520221L0.280158 0.445192L0.335189 0.390174C0.365597 0.366693 0.397336 0.34498 0.430243 0.325147L0.490275 0.285133C0.525921 0.266256 0.562674 0.249553 0.600337 0.235114L0.660369 0.210105C0.696557 0.199704 0.733306 0.191356 0.770434 0.185098C0.795449 0.185098 0.82046 0.185098 0.850478 0.185098C1.8464 0.0630067 2.84879 0.001199 3.85216 2.21238e-05C14.8633 -0.0149835 23.8284 7.32781 24.0785 16.4263Z" fill="#CCCCCC" />
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3 mt-1">
                <ImageWithLogo>
                  <img
                    src="/images/2.png"
                    className="rounded-[20px] h-[300px] object-cover object-top"
                  />
                </ImageWithLogo>
                <ImageWithLogo>
                  <img
                    src="/images/5.png"
                    className="rounded-[20px] h-[300px] object-cover object-top"
                  />
                </ImageWithLogo>
              </div>
            </div>
            <div className="flex items-center justify-center sm:hidden mt-[40px] flex-col">

              <img
                src="/images/1.jpg"
                className="border-[2px] border-white rounded-lg h-[150px] w-[150px] object-cover object-top"
              />
            </div>
            <div className="flex justify-center items-center mt-3">
              <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-8">
                <path d="M6.11887 16.4263L1.03201 16.4263C0.832779 16.4266 0.637897 16.4827 0.470808 16.5877C0.303718 16.6927 0.171537 16.8421 0.0901663 17.0181C0.0087952 17.194 -0.0183007 17.389 0.0121384 17.5795C0.0425774 17.77 0.129255 17.9479 0.261744 18.0919L10.9524 29.6613C11.0494 29.7678 11.1688 29.853 11.3025 29.9114C11.4362 29.9698 11.5812 30 11.7278 30C11.8745 30 12.0195 29.9698 12.1532 29.9114C12.2869 29.853 12.4063 29.7678 12.5033 29.6613L23.1836 18.0919C23.3161 17.9479 23.4028 17.77 23.4332 17.5795C23.4637 17.389 23.4366 17.194 23.3552 17.0181C23.2738 16.8421 23.1416 16.6927 22.9745 16.5877C22.8075 16.4827 22.6126 16.4266 22.4133 16.4263L17.342 16.4263L17.342 16.2062C17.342 9.79875 22.5116 4.1366 30.2659 2.12583C30.3649 2.09785 30.459 2.0557 30.5451 2.00078L30.5916 1.97078C30.6696 1.91543 30.7392 1.84977 30.7984 1.7757L30.8294 1.73568C30.8857 1.65861 30.9309 1.57447 30.9638 1.48559L30.9638 1.41056C30.9792 1.36815 30.9913 1.32468 31 1.28051L31 1.15547C30.9989 1.07787 30.9885 1.00065 30.969 0.925377L30.969 0.900368L30.969 0.860352L30.9276 0.755314L30.8914 0.680283L30.8346 0.590249L30.7829 0.520222L30.7105 0.445193L30.6536 0.390174C30.6222 0.366692 30.5894 0.344979 30.5554 0.325146L30.4934 0.285132C30.4566 0.266257 30.4186 0.249554 30.3797 0.235114L30.3176 0.210106C30.2802 0.199706 30.2423 0.191357 30.2039 0.185097C30.178 0.185097 30.1522 0.185097 30.1212 0.185097C29.0921 0.0630061 28.0563 0.0011985 27.0194 2.36145e-05C15.6412 -0.0149829 6.37734 7.32782 6.11887 16.4263Z" fill="#CCCCCC" />
              </svg>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-8">
                <path d="M24.0785 16.4263L29.0013 16.4263C29.1941 16.4266 29.3827 16.4827 29.5444 16.5877C29.7061 16.6927 29.834 16.8421 29.9127 17.0181C29.9915 17.194 30.0177 17.389 29.9883 17.5795C29.9588 17.77 29.8749 17.9479 29.7467 18.0919L19.4009 29.6613C19.307 29.7678 19.1915 29.853 19.0621 29.9114C18.9328 29.9698 18.7924 30 18.6505 30C18.5085 30 18.3682 29.9698 18.2388 29.9114C18.1094 29.853 17.9939 29.7678 17.9001 29.6613L7.56425 18.0919C7.43603 17.9479 7.35215 17.77 7.32269 17.5795C7.29324 17.389 7.31946 17.194 7.3982 17.0181C7.47695 16.8421 7.60487 16.6927 7.76657 16.5877C7.92827 16.4827 8.11686 16.4266 8.30967 16.4263L13.2174 16.4263L13.2174 16.2062C13.2174 9.79875 8.21461 4.1366 0.710398 2.12583C0.614615 2.09785 0.523556 2.0557 0.440245 2.00078L0.395224 1.97078C0.31972 1.91543 0.252356 1.84977 0.195109 1.7757L0.165093 1.73568C0.110589 1.6586 0.0668265 1.57447 0.0350177 1.48559L0.0350177 1.41056C0.0201136 1.36815 0.00841015 1.32468 6.5198e-07 1.28051L6.46514e-07 1.15547C0.00104587 1.07787 0.0111186 1.00065 0.0300166 0.925376L0.0300166 0.900369L0.0300166 0.860351L0.0700385 0.755315L0.105061 0.680284L0.160088 0.590248L0.210118 0.520221L0.280158 0.445192L0.335189 0.390174C0.365597 0.366693 0.397336 0.34498 0.430243 0.325147L0.490275 0.285133C0.525921 0.266256 0.562674 0.249553 0.600337 0.235114L0.660369 0.210105C0.696557 0.199704 0.733306 0.191356 0.770434 0.185098C0.795449 0.185098 0.82046 0.185098 0.850478 0.185098C1.8464 0.0630067 2.84879 0.001199 3.85216 2.21238e-05C14.8633 -0.0149835 23.8284 7.32781 24.0785 16.4263Z" fill="#CCCCCC" />
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3 mt-1">
                <ImageWithLogo>
                  <img
                    src="/images/7.png"
                    className="rounded-[20px] h-[300px] object-cover object-top"
                  />
                </ImageWithLogo>
                <ImageWithLogo>
                  <img
                    src="/images/8.png"
                    className="rounded-[20px] h-[300px] object-cover object-top"
                  />
                </ImageWithLogo>
              </div>
            </div>
            <div className="mt-6 grid px-4 gap-6">
              <ImageWithLogo>
                <img
                  src="/images/6.png"
                  className="rounded-[20px] h-[400px] w-full object-cover object-top"
                />
              </ImageWithLogo>
              <ImageWithLogo>
                <img
                  src="/images/3.png"
                  className="rounded-[20px] h-[400px] w-full object-cover object-top"
                />
              </ImageWithLogo>
              <ImageWithLogo>
                <img
                  src="/images/9.png"
                  className="rounded-[20px] h-[400px] w-full object-cover object-top"
                />
              </ImageWithLogo>
              <ImageWithLogo>
                <img
                  src="/images/10.png"
                  className="rounded-[20px] h-[400px] w-full object-cover object-top"
                />
              </ImageWithLogo>
            </div>
          </div>
        </motion.div>
        <div className="mt-5 sm:mt-9">
          <a href="mailto:support@aiviking.com" className="flex justify-center items-center">
            <img
              src="/images/vikinglogo.png"
              width="30"
              height="30"
              className="mr-2.5 rounded-sm"
            ></img>
            <span className="text-white font-medium text-md">support@aiviking.com</span>
          </a>
        </div>
      </main>
    </>
  );
}
