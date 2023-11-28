import { Dialog, Transition } from '@headlessui/react';
import Modal from "@/components/shared/modal";
import {
  useState,
  useCallback,
  useMemo,
  useRef,
  Fragment,
} from "react";
import { useDropzone } from "react-dropzone";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CustomDialog from "./CustomDialog";
import JSZip from "jszip";
import axios from 'axios';

import Stripe from "stripe";
import PrevDialog from "./PrevDialog";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const uuid = require('uuid');

const UploadModal = ({ showUploadModal, setShowUploadModal }) => {
  const supabase = createClientComponentClient();
  const selectImageRef = useRef(null);
  const desktopModalRef = useRef(null);

  const [currentStep, setCurrentStep] = useState("gender"); // "gender, picture, price, email"
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);
  const [prevUrl, setPrevUrl] = useState('');
  const [zipContent, setZipContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState('loading');
  const [showText, setShowText] = useState('Analysing...');


  const [clickedDiv, setClickedDiv] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [orderOption, setOrderOption] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");

  const onImageDrop1 = useCallback(async (acceptedFiles) => {
    const zip = new JSZip();
    // Extract the first image
    const firstImage = acceptedFiles[0];

    setShowModal(true);
    setState('loading');
    // Check if this image can be 

    try {
      const formData = new FormData();
      formData.append('image', firstImage);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data === 'impossible') {
        // alert("Your picture didn't work! Take another one and make sure your entire face can be seen with a plain background");
        setState('error');
        setTimeout(() => setShowModal(false), 2000);
        // setShowModal(false);
        return;
      }
    } catch (error) {
      console.log('checking error:', error);
      setState('error');
      setTimeout(() => setShowModal(false), 2000);
      // setShowModal(false);
      return;
    }


    setShowText('Uploading...');

    await Promise.all(
      acceptedFiles.map(async (file, index) => {
        if (file.size > 15360000) {
          toast.error("File size exceeds the 15MB size limit");
          return;
        }
        if (!file.type.startsWith("image/")) {
          toast.error("Please only upload image files");
          return;
        }
        const fileData = await file.arrayBuffer();

        // Rename the file but keep the extension.
        const splitName = file.name.split(".");
        const extension = splitName.pop(); // Get the extension
        const newName = `${index + 1}.src.${extension}`; // Create a new name with the extension

        zip.file(newName, fileData);
      })
    );
    setState('complete');
    setShowText("Complete!");
    const content = await zip.generateAsync({ type: "blob" });
    setZipContent(content);
    setTimeout(() => setShowModal(false), 3000);
    setShowModal(false);

    setPrevUrl(sex === 'man' ? 'https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/samples/sample_man.png' : 'https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/samples/sample_woman.png');
    setPrevLoading(true);
    setShowPreviewDialog(true);

    const formData = new FormData();
    formData.append('image', firstImage);
    formData.append('sex', sex);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-sample`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(data => {
      console.log('url:', data.data);
      setPrevUrl(data.data);
    }).catch(err => {
      console.log('err:', err);
    }).finally(() => {
      setTimeout(() => {
        setPrevLoading(false)
      }, [1500]);
    });

  }, [sex]);


  const {
    getRootProps: getImageRootProps1,
    getInputProps: getImageInputProps1,
  } = useDropzone({ onDrop: onImageDrop1, noDragEventsBubbling: true });

  const handleChange = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  const [mommyLink, setMommyLink] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadMommyImage = async () => {

    const emailPrefix = email.split("@")[0];

    for (let i = 0; i < 20; i++) {
      await supabase.storage
        .from("results")
        .remove(`${emailPrefix}${i}.png`);
    }

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`${emailPrefix}.zip`, zipContent, {
        cacheControl: "3600",
        upsert: true,
      });

    setMommyLink(
      `https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/uploads/${emailPrefix}.zip`
    );
  };

  const updateTable = async (uid) => {
    const emailPrefix = email.split("@")[0];

    const { data, error } = await supabase
      .from("users")
      .upsert(
        {
          email: email,
          partial: emailPrefix,
          order: orderOption,
          zip: mommyLink,
          sex: sex,
          training_id: uid,
        },
        { onConflict: "email" }
      )
      .select();
  };

  const getStripe = async (order, referral) => {
    const emailPrefix = email.split("@")[0];

    const uuid4 = uuid.v4();

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          emailPrefix: emailPrefix,
          orderOption: order,
          randomUrl: uuid4,
          referral,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for StripeLink`
        );
      }

      const data = await response.json();
      console.log(data);
      return {
        url: data,
        uid: uuid4,
      };
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal showModal={showUploadModal} setShowModal={setShowUploadModal}>
      <Toaster richColors position="top-right" />
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 relative bg-black">
        <form className="grid gap-3 bg-gray-50 px-4 sm:pt-8 sm:pb-8 pt-7 pb-5 md:px-16">
          {
            currentStep === 'gender' &&
            <>
              <div className="">
                <p className="block text-black text-center mb-2 text-[25px] font-bold">
                  Choose Your Gender
                </p>
                <div className="flex gap-3 w-full my-3">
                  <button
                    onClick={() => {
                      event.preventDefault();
                      setClickedButton(clickedDiv === 1 ? null : 1);
                      console.log('is called?');
                      setSex("man");
                    }}
                    className={`border border-black  ${clickedButton === 1 ? "bg-black text-white" : "bg-white text-black"
                      } w-full text-center text-sm py-2 rounded-lg`}
                  >
                    Man
                  </button>
                  <button
                    onClick={() => {
                      event.preventDefault();
                      setClickedButton(clickedDiv === 2 ? null : 2);
                      setSex("woman");
                    }}
                    className={`border border-black  ${clickedButton === 2 ? "bg-black text-white" : "bg-white text-black"
                      } w-full text-center text-sm py-2 rounded-lg`}
                  >
                    Woman
                  </button>
                </div>
              </div>
              <button
                disabled={!sex}
                onClick={() => {
                  event.preventDefault();
                  setCurrentStep("picture");
                }}
                className={`${!sex
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white"
                  } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
              >
                <p className="text-sm">Next</p>
              </button>
            </>
          }
          {
            currentStep === 'picture' && <>
              <div>
                <button className="absolute left-[20px] top-[20px]" onClick={() => setCurrentStep("gender")}>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="7.32034" y1="0.384111" x2="1.32034" y2="5.38411" stroke="black" />
                    <line x1="6.16915" y1="10.8763" x2="0.646471" y2="5.35358" stroke="black" />
                  </svg>

                </button>
                <div className="flex flex-col items-center justify-between my-2">
                  <h2 className="text-[25px] font-bold text-black text-center mb-1">Upload Your Picture</h2>
                  <p className="block text-sm font-medium text-gray-800 mb-2">
                    Plain Background, With your Entire Face Visible
                  </p>
                </div>
                <CustomDialog
                  open={showModal}
                  state={state}
                  text={showText}
                  onClose={() => { setShowModal(false); }}
                />
                {
                  <>
                    {
                      showInfoDialog &&
                      (
                        <Dialog
                          ref={desktopModalRef}
                          onClose={() => { }}
                          className="absolute inset-0 z-40 min-h-screen flex items-center justify-center md:flex bg-black/[.9] rounded-[15px]"
                          open={showInfoDialog}
                          onMouseDown={(e) => {
                            if (desktopModalRef.current === e.target) {
                              setShowInfoDialog(false);
                            }
                          }}
                        >
                          <div className='bg-white rounded-[15px] px-7 pt-6 pb-4'>
                            <h3 className="text-[24px] leading-6 text-black font-bold">
                              For best results:
                            </h3>
                            <p className='text-[15px] text-black w-[230px] mt-4'>
                              {'\u2022'} Upload one picture <br />
                              {'\u2022'} Neutral expression <br />
                              {'\u2022'} Remove glasses <br />
                              {'\u2022'} Look straight at the camera <br />
                              {'\u2022'} No blurry pictures <br />
                              {'\u2022'} Capture the entire face <br />
                            </p>
                            <div className='w-full text-center'>
                              <button
                                className='mt-3 rounded-[5px] px-4 py-2 border-[1px] border-gray-700'
                                onClick={() => {
                                  setShowInfoDialog(false);
                                  selectImageRef.current.click();
                                }}
                                onMouseDown={() => {
                                  setShowInfoDialog(false);
                                  selectImageRef.current.click();
                                }}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </Dialog>
                      )
                    }
                    <PrevDialog
                      open={showPreviewDialog}
                      prevUrl={prevUrl}
                      loading={prevLoading}
                      onClose={() => {
                        setShowPreviewDialog(false);
                        setCurrentStep('email');
                      }}
                    />

                    <div
                      {...getImageRootProps1()}
                      onClick={() => setShowInfoDialog(true)}
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-20 sm:h-24 border-2 border-black border-dotted rounded-lg cursor-pointer bg-white shadow-lg"
                    >
                      <div className="flex sm:flex-col items-center justify-center">
                        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.83337 23.6666C5.75432 23.6666 3.98455 22.9436 2.52408 21.4975C1.06361 20.0515 0.333374 18.2841 0.333374 16.1954C0.333374 14.2211 1.01286 12.5095 2.37183 11.0608C3.7308 9.6121 5.32696 8.83325 7.16029 8.72425C7.53423 6.29692 8.65069 4.29159 10.5097 2.70825C12.3686 1.12492 14.5321 0.333252 17 0.333252C19.7858 0.333252 22.1489 1.30349 24.0893 3.24396C26.0298 5.18443 27 7.54753 27 10.3333V11.9999H28.0257C29.6218 12.0512 30.9611 12.6372 32.0433 13.7579C33.1256 14.8786 33.6667 16.2371 33.6667 17.8333C33.6667 19.4679 33.1138 20.8487 32.0081 21.9759C30.9023 23.103 29.5321 23.6666 27.8975 23.6666H18.859C18.0919 23.6666 17.4514 23.4096 16.9375 22.8958C16.4237 22.3819 16.1667 21.7414 16.1667 20.9743V11.3012L12.6667 14.782L11.4872 13.6345L17 8.12171L22.5129 13.6345L21.3334 14.782L17.8334 11.3012V20.9743C17.8334 21.2307 17.9402 21.4657 18.1539 21.6794C18.3676 21.8931 18.6026 21.9999 18.859 21.9999H27.8334C29 21.9999 29.9862 21.5971 30.7917 20.7916C31.5973 19.986 32 18.9999 32 17.8333C32 16.6666 31.5973 15.6805 30.7917 14.8749C29.9862 14.0694 29 13.6666 27.8334 13.6666H25.3334V10.3333C25.3334 8.0277 24.5209 6.06242 22.8959 4.43742C21.2709 2.81242 19.3056 1.99992 17 1.99992C14.6945 1.99992 12.7292 2.81242 11.1042 4.43742C9.47921 6.06242 8.66671 8.0277 8.66671 10.3333H7.76929C6.22226 10.3333 4.87397 10.9027 3.72442 12.0416C2.57483 13.1805 2.00004 14.5555 2.00004 16.1666C2.00004 17.7777 2.56948 19.1527 3.70837 20.2916C4.84726 21.4305 6.22226 21.9999 7.83337 21.9999H12V23.6666H7.83337Z" fill="#0D0D0D" />
                        </svg>

                        <p className="text-xs text-black mt-2 mx-2">Upload Photo</p>
                      </div>
                      <input
                        {...getImageInputProps1()}
                        ref={selectImageRef}
                        id="dropzone-file"
                        type="file"
                        multiple={false}
                        className="hidden"
                      />
                    </div>
                  </>
                }
              </div>
            </>
          }
          {
            currentStep === 'price' && <>
              <div id="order" className="">

                <button className="absolute left-[20px] top-[20px]" onClick={() => setCurrentStep("picture")}>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="7.32034" y1="0.384111" x2="1.32034" y2="5.38411" stroke="black" />
                    <line x1="6.16915" y1="10.8763" x2="0.646471" y2="5.35358" stroke="black" />
                  </svg>

                </button>
                <div className="flex justify-center items-center mb-2">
                  <h2
                    className="text-[20px] leading-6 text-black font-bold mb-3 text-center"
                  >
                    How Many Pictures Do You Want?
                  </h2>
                </div>
                <div id="select" className="flex flex-col gap-2">
                  <button
                    className={`border ${clickedDiv === 1 ? "border-black" : "border-gray-300"
                      } rounded-md bg-white w-full px-3 py-2 flex justify-between text-sm text-gray-900`}
                    onClick={() => {
                      event.preventDefault();
                      setClickedDiv(clickedDiv === 1 ? null : 1);
                      setOrderOption(8);
                    }}
                  >
                    <div className={`${clickedDiv === 1 ? 'text-black' : 'text-gray-700'}`}>2 Viking Photos</div>
                    <div className={`${clickedDiv === 1 ? 'text-[#00A006]' : 'text-gray-700'}`}>$7</div>
                  </button>
                  <button
                    className={`border ${clickedDiv === 2 ? "border-black" : "border-gray-300"
                      } rounded-md bg-white w-full px-3 py-2 flex justify-between text-sm text-gray-900`}
                    onClick={() => {
                      event.preventDefault();
                      setClickedDiv(clickedDiv === 2 ? null : 2);
                      setOrderOption(20);
                    }}
                  >
                    <div className={`${clickedDiv === 2 ? 'text-black' : 'text-gray-700'}`}>20 Viking Photos</div>
                    <div className={`${clickedDiv === 2 ? 'text-[#00A006]' : 'text-gray-700'}`}>$9</div>
                  </button>
                </div>
                <p className='text-center w-full text-black my-2'>(This is the one you probably want)</p>
                <button
                  disabled={!orderOption}
                  onClick={async () => {
                    event.preventDefault();
                    setLoading(true);
                    let data = undefined;
                    if (window.Rewardful && window.Rewardful.referral) {
                      data = await getStripe(orderOption, window.Rewardful.referral);
                    } else {
                      data = await getStripe(orderOption, '');
                    }

                    await updateTable(data.uid);
                    await uploadMommyImage();
                    setLoading(false);
                    window.location.href = data.url;
                    // window.open(data.url, "_self");
                  }}
                  className={`${!orderOption
                    ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                    : "border-black bg-black text-white"
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-5`}
                >
                  {loading ? (
                    <BeatLoader size={8} color="#898989" />
                  ) : (
                    <p className="text-sm text-white">Make me a viking!</p>
                  )}

                </button>
              </div>
            </>
          }
          {
            currentStep === 'email' && <>
              <div id="email" className="">

                <button className="absolute left-[20px] top-[20px]" onClick={() => setCurrentStep("picture")}>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="7.32034" y1="0.384111" x2="1.32034" y2="5.38411" stroke="black" />
                    <line x1="6.16915" y1="10.8763" x2="0.646471" y2="5.35358" stroke="black" />
                  </svg>

                </button>
                <h2 className="block mb-5 text-[25px] font-bold text-black text-center">
                  Email
                </h2>
                <input
                  type="email"
                  aria-label="email"
                  autoComplete="on"
                  name="email"
                  id="small-input"
                  className="block w-full px-3 py-2 text-gray-900 border border-black rounded-md bg-white sm:text-sm focus:outline-0 focus:ring-0"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <button
                disabled={
                  email.length === 0
                }
                onClick={async () => {
                  event.preventDefault();
                  setCurrentStep("price");
                  await supabase
                    .from("users")
                    .upsert(
                      {
                        email: email
                      });
                }}

                className={`${email.length === 0
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white"
                  } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
              >
                <p className="text-sm">Next</p>
              </button>
            </>
          }
        </form>
      </div>
    </Modal>
  );
};

export function useUploadModal() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const UploadModalCallback = useCallback(() => {
    return (
      <UploadModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
      />
    );
  }, [showUploadModal, setShowUploadModal]);

  return useMemo(
    () => ({ setShowUploadModal, UploadModal: UploadModalCallback }),
    [setShowUploadModal, UploadModalCallback]
  );
}
