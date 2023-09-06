import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  ChangeEvent,
  Fragment,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDropzone } from "react-dropzone";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";
import Balancer from "react-wrap-balancer";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import va from "@vercel/analytics";

const UploadModal = ({ showUploadModal, setShowUploadModal }) => {
  const supabase = createClientComponentClient();

  const router = useRouter();

  // const [imageLoading, setImageLoading] = useState(false);
  const [imageButton, setImageButton] = useState(false);

  const [currentStep, setCurrentStep] = useState("image"); // other possible value is "audio"

  const [mommyUploaded, setMommyUploaded] = useState(false);
  const [daddyUploaded, setDaddyUploaded] = useState(false);

  const [mommyImage, setMommyImage] = useState(null);
  const [daddyImage, setDaddyImage] = useState(null);

  const onImageDrop1 = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log("inside");
      // Validate file size
      if (file.size > 5242880) {
        toast.error("File size exceeds the 5MB size limit");
        return;
      }

      // Validate file type
      console.log(file.type);
      if (!file.type.startsWith("image/")) {
        toast.error("Please only upload image files");
        return;
      }

      setMommyUploaded(true);
      setMommyImage(file);
    });
  }, []);

  const {
    getRootProps: getImageRootProps1,
    getInputProps: getImageInputProps1,
  } = useDropzone({ onDrop: onImageDrop1, noDragEventsBubbling: true });

  const onImageDrop2 = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      // Validate file size
      if (file.size > 5242880) {
        toast.error("File size exceeds the 5MB size limit");
        return;
      }

      // Validate file type
      console.log(file.type);
      if (!file.type.startsWith("image/")) {
        toast.error("Please only upload image files");
        return;
      }

      setDaddyUploaded(true);
      setDaddyImage(file);
    });
  }, []);

  const {
    getRootProps: getImageRootProps2,
    getInputProps: getImageInputProps2,
  } = useDropzone({ onDrop: onImageDrop2, noDragEventsBubbling: true });

  const [clickedDiv, setClickedDiv] = useState(null);
  const [orderOption, setOrderOption] = useState("");

  const [email, setEmail] = useState("");

  // Function to handle input change
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const [mommyLink, setMommyLink] = useState("");
  const [daddyLink, setDaddyLink] = useState("");

  const [loading, setLoading] = useState(false);

  const uploadMommyImage = async () => {
    setLoading(true);
    const emailPrefix = email.split("@")[0];
    const newFileName = `mom_${emailPrefix}`;
    console.log(emailPrefix);
    console.log(newFileName);

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(newFileName, mommyImage, {
        cacheControl: "3600",
        upsert: true,
      });

    console.log(data);

    console.log(
      `https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/uploads/${newFileName}`
    )
    setMommyLink(
      `https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/uploads/${newFileName}`
    );
  };

  useEffect(() => {
    if (mommyLink) {
      // assuming mommyLink is the state variable being set
      uploadDaddyImage();
      console.log("mommy uploaded");
    }
  }, [mommyLink]);

  const uploadDaddyImage = async () => {
    const emailPrefix = email.split("@")[0];
    const newFileName = `dad_${emailPrefix}`;
    console.log(emailPrefix);
    console.log(newFileName);

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(newFileName, daddyImage, {
        cacheControl: "3600",
        upsert: true,
      });

    console.log(data);

    console.log(
      `https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/uploads/${newFileName}`
    )
    setDaddyLink(
      `https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/uploads/${newFileName}`
    );
  };

  useEffect(() => {
    if (daddyLink) {
      // assuming mommyLink is the state variable being set
      updateTable();
      console.log("daddy uploaded");
    }
  }, [daddyLink]);

  const updateTable = async () => {
    console.log(mommyLink);
    console.log(daddyLink);

    const { data, error } = await supabase
      .from("users")
      .upsert({
        email: email,
        order: orderOption,
        mom: mommyLink,
        dad: daddyLink,
      })
      .select();

    setLoading(false);
    // setShowUploadModal(false);

    if (orderOption === 9) {
      clickBuyLink1();
    } else {
      clickBuyLink2();
    }

    console.log(data);
    console.log(error);
  };

  const clickBuyLink1 = () => {
    LemonSqueezy.Url.Open(
      "https://futurebaby.lemonsqueezy.com/checkout/buy/c1755095-3c27-471a-b10d-d47e4d5adc07?embed=1"
    );
  };

  const clickBuyLink2 = () => {
    LemonSqueezy.Url.Open(
      "https://futurebaby.lemonsqueezy.com/checkout/buy/079c4a46-a961-4ed7-ae5e-94ba3db77ee2?embed=1"
    );
  };

  return (
    <Modal showModal={showUploadModal} setShowModal={setShowUploadModal}>
      <Toaster richColors position="top-right" />
      {currentStep === "image" ? (
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-1.5 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://extrapolate.app">
              <img
                src="https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/meta/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full sm:mb-2 mb-2"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-clash text-2xl font-bold">Parent Photos</h3>
            <Balancer className="text-sm text-gray-500 leading-6 sm:pb-0 pb-0.5">
              Upload a single photo from each parent.
            </Balancer>
          </div>
          <form className="grid gap-5 bg-gray-50 px-4 sm:pt-8 sm:pb-8 pt-7 pb-5 md:px-16">
            <div>
              <div className="flex items-center justify-between">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Mommy's photo
                </p>
              </div>
              {mommyUploaded ? (
                <div className="flex flex-col items-center justify-center w-full h-16 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white text-gray-400 text-xs">
                  File Uploaded ✅
                </div>
              ) : (
                <div
                  {...getImageRootProps1()}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-16 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white"
                >
                  <div className="flex sm:flex-col items-center justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 mb-1 text-gray-400 hidden sm:block"
                      fill="none"
                      stroke="#b5c6d1"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="text-xs text-gray-400">Upload File</p>
                  </div>
                  <input
                    {...getImageInputProps1()}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Daddy's photo
                </p>
              </div>
              {daddyUploaded ? (
                <div className="flex flex-col items-center justify-center w-full h-16 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white text-gray-400 text-xs">
                  File Uploaded ✅
                </div>
              ) : (
                <div
                  {...getImageRootProps2()}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-16 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white"
                >
                  <div className="flex sm:flex-col items-center justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 mb-1 text-gray-400 hidden sm:block"
                      fill="none"
                      stroke="#b5c6d1"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="text-xs text-gray-400">Upload File</p>
                  </div>
                  <input
                    {...getImageInputProps2()}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <button
              disabled={!mommyUploaded || !daddyUploaded}
              onClick={() => {
                event.preventDefault();
                if (currentStep === "image") {
                  setCurrentStep("audio");
                  va.track("Next Step Button");
                }
              }}
              className={`${
                !mommyUploaded || !daddyUploaded
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white"
              } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
            >
              <p className="text-sm">Next step</p>
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-1.5 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://extrapolate.app">
              <img
                src="https://tghnhiheiaeenfaurxtp.supabase.co/storage/v1/object/public/meta/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full sm:mb-2 mb-2"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-clash text-2xl font-bold">Order Details</h3>
            <p className="text-sm text-gray-500 leading-6 sm:pb-0 pb-0.5">
              Please make sure to enter the correct email.
            </p>
          </div>
          <form className="grid gap-5 bg-gray-50 px-4 sm:pt-8 sm:pb-8 pt-7 pb-5 md:px-16">
            <div id="email" className="">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="text"
                autoComplete="off"
                id="small-input"
                className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md bg-white sm:text-sm focus:outline-0 focus:ring-0"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div id="order" className="">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="order"
                  className="block text-sm font-medium text-gray-900"
                >
                  Order options
                </label>
              </div>
              <div id="select" className="flex flex-col gap-2">
                <div
                  className={`border ${
                    clickedDiv === 1 ? "border-black" : "border-gray-300"
                  } rounded-md bg-white w-full px-3 py-2 flex justify-between text-sm text-gray-900`}
                  onClick={() => {
                    setClickedDiv(clickedDiv === 1 ? null : 1);
                    setOrderOption(9);
                  }}
                >
                  <div className="">2 Photos → 1 Boy + 1 Girl</div>
                  <div className="">$9</div>
                </div>
                <div
                  className={`border ${
                    clickedDiv === 2 ? "border-black" : "border-gray-300"
                  } rounded-md bg-white w-full px-3 py-2 flex justify-between text-sm text-gray-900`}
                  onClick={() => {
                    setClickedDiv(clickedDiv === 2 ? null : 2);
                    setOrderOption(19);
                  }}
                >
                  <div className="">10 Photos → 5 Boys + 5 Girls</div>
                  <div className="">$19</div>
                </div>
              </div>
            </div>

            <button
              disabled={email.length === 0 || orderOption.length === 0}
              onClick={() => {
                event.preventDefault();
                uploadMommyImage();
                console.log("clicked");
              }}
              className={`${
                email.length === 0 || orderOption.length === 0
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white"
              } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
            >
              {loading ? (
                <BeatLoader size={8} color="#898989" />
              ) : (
                <p className="text-sm">Submit Order</p>
              )}
            </button>
          </form>
        </div>
      )}
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
