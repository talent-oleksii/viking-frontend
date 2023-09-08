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
import JSZip from "jszip";

const UploadModal = ({ showUploadModal, setShowUploadModal }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState("image"); // other possible value is "audio"
  const [mommyUploaded, setMommyUploaded] = useState(false);
  const [zipContent, setZipContent] = useState(null);

  const onImageDrop1 = useCallback(async (acceptedFiles) => {
    const zip = new JSZip();

    // Check if at least 3 files have been uploaded
    if (acceptedFiles.length < 3) {
      toast.error("Please upload at least 3 photos");
      return;
    }

    // Use Promise.all to make sure all files are processed before ZIP generation
    await Promise.all(
      acceptedFiles.map(async (file) => {
        // Validate file size
        if (file.size > 5242880) {
          toast.error("File size exceeds the 5MB size limit");
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please only upload image files");
          return;
        }

        setMommyUploaded(true);

        const fileData = await file.arrayBuffer();
        zip.file(file.name, fileData);
      })
    );

    console.log("Number of files in ZIP: ", Object.keys(zip.files).length);

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: "blob" });
    // Set ZIP content in state
    setZipContent(content);
  }, []);

  const {
    getRootProps: getImageRootProps1,
    getInputProps: getImageInputProps1,
  } = useDropzone({ onDrop: onImageDrop1, noDragEventsBubbling: true });

  const [clickedDiv, setClickedDiv] = useState(null);
  const [orderOption, setOrderOption] = useState("");
  const [email, setEmail] = useState("");

  // Function to handle input change
  const handleChange = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  const [mommyLink, setMommyLink] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadMommyImage = async () => {
    setLoading(true);
    const emailPrefix = email.split("@")[0];

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(emailPrefix, zipContent, {
        cacheControl: "3600",
        upsert: true,
      });

    console.log(data);
    console.log(error);

    console.log(
      `https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/uploads/${emailPrefix}`
    );

    setMommyLink(
      `https://remwbrfkzindyqlksvyv.supabase.co/storage/v1/object/public/uploads/${emailPrefix}`
    );
  };

  useEffect(() => {
    if (mommyLink) {
      // assuming mommyLink is the state variable being set
      console.log("zip uploaded");
      updateTable();
    }
  }, [mommyLink]);

  const updateTable = async () => {
    console.log("inside update table");
    console.log(mommyLink);
    const emailPrefix = email.split("@")[0];
    console.log(emailPrefix);

    const { data, error } = await supabase
      .from("users")
      .upsert({
        email: email,
        partial: emailPrefix,
        order: orderOption,
        zip: mommyLink,
      },
      { onConflict: 'email' })
      .select();

    console.log(data);
    console.log(error);

    setLoading(false);
    setShowUploadModal(false);

    if (orderOption === 8) {
      clickBuyLink1();
    } else {
      clickBuyLink2();
    }
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
                src="/images/vikinglogo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full sm:mb-2 mb-2"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-clash text-2xl font-bold">Upload Photos</h3>
            <Balancer className="text-sm text-gray-500 leading-6 sm:pb-0 pb-0.5">
              Choose 3 to 5 photos of yourself.
            </Balancer>
          </div>
          <form className="grid gap-5 bg-gray-50 px-4 sm:pt-8 sm:pb-8 pt-7 pb-5 md:px-16">
            <div>
              <div className="flex items-center justify-between">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Your photos
                </p>
              </div>
              {mommyUploaded ? (
                <div className="flex flex-col items-center justify-center w-full h-20 sm:h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white text-gray-400 text-xs">
                  File Uploaded ✅
                </div>
              ) : (
                <div
                  {...getImageRootProps1()}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-20 sm:h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white"
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

            <button
              disabled={!mommyUploaded}
              onClick={() => {
                event.preventDefault();
                if (currentStep === "image") {
                  setCurrentStep("audio");
                  va.track("Next Step Button");
                }
              }}
              className={`${
                !mommyUploaded
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
                src="/images/vikinglogo.png"
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
                    setOrderOption(8);
                  }}
                >
                  <div className="">2 Viking Photos</div>
                  <div className="">$8</div>
                </div>
                <div
                  className={`border ${
                    clickedDiv === 2 ? "border-black" : "border-gray-300"
                  } rounded-md bg-white w-full px-3 py-2 flex justify-between text-sm text-gray-900`}
                  onClick={() => {
                    setClickedDiv(clickedDiv === 2 ? null : 2);
                    setOrderOption(20);
                  }}
                >
                  <div className="">20 Viking Photos</div>
                  <div className="">$20</div>
                </div>
              </div>
            </div>

            <button
              disabled={email.length === 0 || orderOption.length === 0}
              onClick={() => {
                event.preventDefault();
                uploadMommyImage();
                // console.log("clicked");
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
