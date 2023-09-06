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

const people = [
  {
    id: 1,
    name: "Donald Trump",
    voice: "E5TC2TzJpUIjQRDauan9",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/DonaldTrump.png",
  },
  {
    id: 2,
    name: "Joe Biden",
    voice: "kpYWTjYU8l7h9F4Q5rgF",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/JoeBiden.png",
  },
  {
    id: 3,
    name: "Barack Obama",
    voice: "BMrscVX7eiwr7cGoWnx2",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/BarackObama.png",
  },
  {
    id: 4,
    name: "Hillary Clinton",
    voice: "QehRPxYW9AgtVuUDRahc",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/HillaryClinton.png",
  },
  {
    id: 5,
    name: "AOC",
    voice: "y21LDcuFRgPGbl72mTPG",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/AOC.png",
  },
  {
    id: 6,
    name: "Tucker Carlson",
    voice: "H6NVzDsPUDoK4bBgAts3",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/TuckerCarlson.png",
  },
  {
    id: 7,
    name: "Joe Rogan",
    voice: "5IhD23A0QTLC3YTeT6fp",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/JoeRogan.png",
  },
  {
    id: 8,
    name: "Elon Musk",
    voice: "aI1cKUH3kXwhUuQMap7X",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/ElonMusk.png",
  },
  {
    id: 9,
    name: "Kanye West",
    voice: "Ext1QmHVUpMABOcWpESB",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/KanyeWest.png",
  },
  {
    id: 10,
    name: "Kim Kardashian",
    voice: "oiXPdrDkdNTFZJ1IxxPh",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/KimKardashian.png",
  },
  {
    id: 11,
    name: "Stephen A. Smith",
    voice: "WhkICMWc7j2ap0fJVHMR",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/StephenASmith.png",
  },
  {
    id: 12,
    name: "Dave Chappelle",
    voice: "Ux3zQNOEa6p5OrVDvDQg",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/DaveChappelle.png",
  },
  {
    id: 13,
    name: "David Attenborough",
    voice: "darvxZ8nbegIsml3JzHE",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/DavidAttenborough.png",
  },
  {
    id: 14,
    name: "Logan Paul",
    voice: "FsKi3TxVF6yhGDQeV5vY",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/LoganPaul.png",
  },
  {
    id: 15,
    name: "Mr. Beast",
    voice: "8tLZVGiprGSE6loUugVn",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/MrBeast.png",
  },
  {
    id: 16,
    name: "PewDiePie",
    voice: "UGyPczvPYUG4Y9LggyfP",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/PewDiePie.png",
  },
  {
    id: 17,
    name: "Tyler1",
    voice: "Dv1BOCBQlnc8M4ScVami",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Tyler1.png",
  },
  {
    id: 18,
    name: "Rhett",
    voice: "CoUWMfWqybep0ohr7ovz",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Rhett.png",
  },
  {
    id: 19,
    name: "Link",
    voice: "KLkUYLGguaZpj1DphApp",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Link.png",
  },
  {
    id: 20,
    name: "Rick (Rick and Morty)",
    voice: "TroRXDONusuG2rSlJzad",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/RickSanchez.png",
  },
  {
    id: 21,
    name: "Cartman (South Park)",
    voice: "zGyBxNBnX49YaKNIjSUV",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Cartman.png",
  },
  {
    id: 22,
    name: "Peter (Family Guy)",
    voice: "mUfA3cGcljTCdjbdwvWe",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Peter.png",
  },
  {
    id: 23,
    name: "Goku (DragonBall)",
    voice: "wwbPutfxYldkBoau8Tje",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Goku.png",
  },
  {
    id: 24,
    name: "Sam Bankman-Fried",
    voice: "hljHFmiJdSi6Dj1mvKL1",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/SamBankmanFried.png",
  },
  {
    id: 25,
    name: "Elizabeth Holmes",
    voice: "ykAlY5SOqHlTI0g3805B",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/ElizabethHolmes.png",
  },
  {
    id: 26,
    name: "British Dude",
    voice: "p4QIF9bdt8tfF7wOT9hd",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/BritishDude.png",
  },
  {
    id: 27,
    name: "Narrator Dude",
    voice: "ziJHcegLub9IYwGTwR6h",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/NarratorDude.png",
  },
  {
    id: 28,
    name: "Girlfriend (19+)",
    voice: "CYblCq7uaxtBek0cNmMF",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Girlfriend.png",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UploadModal = ({ showUploadModal, setShowUploadModal }) => {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const [data, setData] = useState({
    image: null,
  });
  const [fileSizeTooBig, setFileSizeTooBig] = useState(true);

  const [dragActive, setDragActive] = useState(false);

  const onChangePicture = useCallback(
    (event) => {
      setFileSizeTooBig(false);
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 5) {
          setFileSizeTooBig(true);
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result }));
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setData]
  );

  const [saving, setSaving] = useState(false);

  const saveDisabled = useMemo(() => {
    return !data.image || saving;
  }, [data.image, saving]);

  const images = [
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/yilongmusk.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/yilongmusk.png",
      id: "yilongmusk",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/donaldtrump.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/donaldtrump.png",
      id: "donaldtrump",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/kimkardashian.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/kimkardashian.png",
      id: "kimkardashian",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/tuckercarlson.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/tuckercarlson.png",
      id: "tuckercarlson",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/aoc.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/aoc.png",
      id: "aoc",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/kanyewest.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/kanyewest.png",
      id: "kanyewest",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/joebiden.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/joebiden.png",
      id: "joebiden",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/stephenasmith.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/stephenasmith.png",
      id: "stephenasmith",
    },
    {
      link: "https://auth.deepfake.pics/storage/v1/object/public/watermark/loganpaul.mp4",
      thumbnail:
        "https://auth.deepfake.pics/storage/v1/object/public/modal_posters/loganpaul.png",
      id: "loganpaul",
    },
  ];

  // const [imageLoading, setImageLoading] = useState(false);
  const [imageButton, setImageButton] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [currentStep, setCurrentStep] = useState("image"); // other possible value is "audio"


  const voiceRef = useRef();
  const textRef = useRef();
  const [message, setMessage] = useState("");

  const [imageUploaded, setImageUploaded] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);

  const [mommyUploaded, setMommyUploaded] = useState(false);
  const [daddyUploaded, setDaddyUploaded] = useState(false);

  const [mommyImage, setMommyImage] = useState(null);
  const [daddyImage, setDaddyImage] = useState(null);

  const onImageDrop1 = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        console.log('inside')
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
    },
    []
  );

  const onImageDrop2 = useCallback(
    (acceptedFiles) => {
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
    },
    []
  );

  const {
    getRootProps: getImageRootProps1,
    getInputProps: getImageInputProps1,
  } = useDropzone({ onDrop: onImageDrop1 });

  const {
    getRootProps: getImageRootProps2,
    getInputProps: getImageInputProps2,
  } = useDropzone({ onDrop: onImageDrop2 });

  const [clickedDiv, setClickedDiv] = useState(null);
  const [orderOption, setOrderOption] = useState("");

  const [email, setEmail] = useState("");

  // Function to handle input change
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const [mommyLink, setMommyLink] = useState("");
  const [daddyLink, setDaddyLink] = useState("");

  const uploadMommyImage = async () => {
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

    console.log(
      `https://auth.deepfake.pics/storage/v1/object/public/uploads/${newFileName}`
    );
    setMommyLink(
      `https://auth.deepfake.pics/storage/v1/object/public/uploads/${newFileName}`
    );
    uploadDaddyImage();
  };

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

    console.log(
      `https://auth.deepfake.pics/storage/v1/object/public/uploads/${newFileName}`
    );
    setDaddyLink(
      `https://auth.deepfake.pics/storage/v1/object/public/uploads/${newFileName}`
    );
    // updateTable();
  };

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

    console.log(data);
    console.log(error);
  };

  const clickBuyLink1 = () => {
    LemonSqueezy.Url.Open(
      "https://stockimage.lemonsqueezy.com/checkout/buy/e162129e-c41d-400d-8208-e3ff3582486c?embed=1"
    );
  };

  const clickBuyLink2 = () => {
    LemonSqueezy.Url.Open(
      "https://stockimage.lemonsqueezy.com/checkout/buy/e162129e-c41d-400d-8208-e3ff3582486c?embed=1"
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
                src="https://auth.deepfake.pics/storage/v1/object/public/modal_posters/logo.png"
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
                <label
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
                </label>
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
                <label
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
                </label>
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
              {/* {imageLoading ? (
                <BeatLoader size="8" color="#808080" />
              ) : (
                <p className="text-sm">Next step</p>
              )} */}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-1.5 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://extrapolate.app">
              <img
                src="https://auth.deepfake.pics/storage/v1/object/public/modal_posters/logo.png"
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
                clickBuyLink1();
                setShowUploadModal(false);
                console.log("clicked");
              }}
              className={`${
                email.length === 0 || orderOption.length === 0
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white"
              } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
            >
              {generating ? (
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
