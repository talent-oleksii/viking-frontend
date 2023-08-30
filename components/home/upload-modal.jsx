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
  const [session, setSession] = useState(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [lemonURL, setLemonURL] = useState("");

  useEffect(() => {
    // Get the initial session state when component first loads
    setSession(supabase.auth.session);

    // Subscribe to session changes (logged in or logged out)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        // console.log('New session:', newSession);
        setSession(newSession);
        setIsSessionLoaded(true); // Setting the session as loaded
      }
    );

    // Unsubscribe when unmounting the component
    // return () => {
    //   authListener.unsubscribe();
    // };
  }, []);

  useEffect(() => {
    checkSubscription();
    getUserData();
  }, [session]);

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const checkSubscription = async () => {
    if (!session || !session.user) {
      console.log("No session or user found");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("is_active")
      .eq("email", session.user.email);

    console.log(session.user.email);

    // console.log(data);
    // console.log(data[0].is_active);

    if (data[0].is_active === true) {
      setSubscription(true);
      console.log("Subscription is active");
    } else {
      setSubscription(false);
      console.log("Subscription is not active");
    }
  };

  const getUserData = async () => {
    if (!session) {
      console.log("No session found");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", session.user.email);

    console.log(session.user.email);
    console.log(data);
    console.log(data[0].tokens);

    setUserInfo(data[0]);
  };

  const reduceTokens = async () => {
    let newTokenValue = userInfo.tokens - 1;
    let email = userInfo.email;

    try {
      const response = await fetch("/api/reduceTokens", {
        method: "POST",
        body: JSON.stringify({
          newTokenValue,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status} for reduceAmount`
        );
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.log(error.message);
      toast.error("reduceAmount error");
    }
  };

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
      highResSrc: "/images/trump2.png",
      thumbnailSrc: "/images/Ttrump2.png",
      id: "trump",
    },
    {
      highResSrc: "/images/biden.png",
      thumbnailSrc: "/images/Tbiden.png",
      id: "biden",
    },
    {
      highResSrc: "/images/elon.png",
      thumbnailSrc: "/images/Telon.png",
      id: "elon",
    },
    {
      highResSrc: "/images/tucker.png",
      thumbnailSrc: "/images/Ttucker.png",
      id: "tucker",
    },
    {
      highResSrc: "/images/rogan.png",
      thumbnailSrc: "/images/Trogan.png",
      id: "rogan",
    },
    {
      highResSrc: "/images/beast.png",
      thumbnailSrc: "/images/Tbeast.png",
      id: "beast",
    },
    {
      highResSrc: "/images/kanye.png",
      thumbnailSrc: "/images/Tkanye.png",
      id: "kanye",
    },
    {
      highResSrc: "/images/kim.png",
      thumbnailSrc: "/images/Tkim.png",
      id: "kim",
    },
    {
      highResSrc: "/images/lebron.png",
      thumbnailSrc: "/images/Tlebron.png",
      id: "lebron",
    },
  ];

  const [imageFormData, setImageFormData] = useState(null);
  const [audioFormData, setAudioFormData] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [base64Image, setBase64Image] = useState(null);

  // const [imageLoading, setImageLoading] = useState(false);
  const [imageButton, setImageButton] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleImageClick = async (imageSrc) => {
    // setImageLoading(true);
    setImageButton(true);

    console.log(`Image Source URL: ${imageSrc}`);
    setSelectedImage(imageSrc);

    const imgElement = new window.Image(); // use window.Image here
    imgElement.src = imageSrc;

    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgElement, 0, 0);

      // Convert canvas to base64 data URI
      const base64Image = canvas.toDataURL("image/jpeg");

      // Store the base64 encoded image in state
      setBase64Image(base64Image);
      console.log(`Base64 Image: ${base64Image}`);

      // setImageLoading(false);
    };
  };

  const [currentStep, setCurrentStep] = useState("image"); // other possible value is "audio"

  const [selected, setSelected] = useState(people[0]);
  useEffect(() => {
    voiceRef.current = selected.voice;
    console.log(selected.voice);
  }, [selected]);

  const voiceRef = useRef();
  const textRef = useRef();
  const [message, setMessage] = useState("");

  const [imageUploaded, setImageUploaded] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);

  const onImageDrop = useCallback((acceptedFiles) => {
    if (userInfo.variant_id !== 111139 && userInfo.variant_id !== 111140) {
      toast.error("Upgrade your plan to upload custom files");
      console.log(userInfo.variant_id);
      return;
    } else {
      acceptedFiles.forEach((file) => {
        // Validate file type
        console.log(file.type);
        if (!file.type.startsWith("image/")) {
          toast.error("Please only upload image files under 4MB");
          return;
        }

        va.track("Upload custom media");

        const reader = new FileReader();

        reader.onload = async () => {
          const dataUrl = reader.result;

          // Now dataUrl is a Base64 encoded Data URL you can use
          // Update state or send to server as needed
          setBase64Image(dataUrl);
          setImageUploaded(true);

          // Log base64 image content for debugging
          console.log(`Base64 Image: ${dataUrl}`);
        };

        reader.readAsDataURL(file);
      });
    }
  }, []);

  const [base64Audio, setBase64Audio] = useState(null);

  const onAudioDrop = useCallback((acceptedFiles) => {
    if (userInfo.variant_id !== 111139 && userInfo.variant_id !== 111140) {
      toast.error("Upgrade your plan to upload custom files");
      console.log(userInfo.variant_id);
      return;
    } else {
      acceptedFiles.forEach((file) => {
        // Validate file type
        console.log(file.type);
        if (file.type !== "audio/mpeg" && file.type !== "audio/mp3") {
          toast.error("Please only upload MP3 files");
          return;
        }

        va.track("Upload custom audio");

        // setAudioUploading(true);
        const reader = new FileReader();

        reader.onload = async () => {
          const dataUrl = reader.result; // This will contain the Base64-encoded Data URI

          // Create an AudioContext
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();

          // Convert Base64 to ArrayBuffer
          const base64 = dataUrl.split(",")[1];
          const binaryString = atob(base64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          // Decode the audio data
          audioContext
            .decodeAudioData(bytes.buffer)
            .then((audioBuffer) => {
              const duration = audioBuffer.duration; // Get duration in seconds
              if (duration >= 20) {
                toast.error("Upgrade to upload MP3 longer than 20 seconds");
                return;
              }

              // Update audio state
              setBase64Audio(dataUrl); // Store the Data URI in the state
              setAudioUploaded(true);
              // setAudioUploading(false);
            })
            .catch((error) => {
              toast.error("Failed to decode audio file.");
              console.error(error);
            });
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
      });
    }
  }, []);

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({ onDrop: onImageDrop });

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps } =
    useDropzone({ onDrop: onAudioDrop });

  const [shouldReplicate, setShouldReplicate] = useState(false);

  useEffect(() => {
    if (base64Audio && shouldReplicate) {
      replicate();
      setShouldReplicate(false); // Reset the flag
    }
  }, [base64Audio, shouldReplicate]);

  const TTS = async () => {
    const text = textRef.current.value;
    const selectedVoice = voiceRef.current;

    console.log(text);
    console.log(selectedVoice);

    try {
      const response = await fetch("/api/TTS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          voice: selectedVoice,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      // Create a blob from the response
      const audioBlob = await response.blob();

      // Convert blob to Base64 Data URI
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64Audio = reader.result;

        // Save the Base64 audio Data URI into state
        setBase64Audio(base64Audio);
        setShouldReplicate(true);

        // // Optionally, play the audio
        // const audioElement = new Audio(base64Audio);
        // audioElement.play();
      };
    } catch (error) {
      console.log(error.message);
    } finally {
      // setTTSLoading(false);
    }
  };

  const replicate = async () => {
    console.log("inside replicate");

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        body: JSON.stringify({
          image: base64Image,
          audio: base64Audio,
        }),
      });

      if (!response.ok) {
        throw new Error("Replicate failed");
      }

      await reduceTokens();

      // Handle response data here
      const videoURL = await response.json(); // Assuming the server returns just the video URL
      console.log(videoURL);
      saveURL(videoURL);

      const parts = videoURL.split("/");
      const videoID = parts[parts.length - 2]; // Extract the unique ID from the URL

      router.push(`/${videoID}`);
    } catch (error) {
      console.log(error.message);
      toast.error("Error processing. Please try again.");
    }
  };

  const saveURL = async (videoURL) => {
    const { data, error } = await supabase.from("videos").insert({
      email: session.user.email,
      url: videoURL,
    });
  };

  return (
    <Modal showModal={showUploadModal} setShowModal={setShowUploadModal}>
      <Toaster richColors position="top-right" />
      {currentStep === "image" ? (
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://extrapolate.app">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full sm:mb-0 mb-2"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-clash text-2xl font-bold">Choose Media</h3>
            <Balancer className="text-sm text-gray-500 leading-6 sm:pb-0 pb-0.5">
              Select sample media, or upload your own.
              <span className="hidden sm:inline">
                <br />
              </span>
              <span className="hidden sm:inline">
                Works with images and videos.
              </span>
            </Balancer>
          </div>
          <form className="grid gap-5 bg-gray-50 px-4 sm:pt-8 sm:pb-8 pt-7 pb-5 md:px-16">
            <div id="select image" className="">
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Select media
              </p>
              <div className="grid grid-cols-3 gap-2">
                {images.map((image) => (
                  <img
                    key={image.id} // Add this line
                    src={image.thumbnailSrc}
                    alt=""
                    className={`rounded-md w-full cursor-pointer ${
                      selectedImage && selectedImage !== image.highResSrc
                        ? "opacity-30"
                        : "opacity-100"
                    }`}
                    onClick={() => handleImageClick(image.highResSrc)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Upload media (optional)
                </p>
              </div>
              {imageUploaded ? (
                <div className="flex flex-col items-center justify-center w-full h-12 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white text-gray-400 text-xs">
                  Image Uploaded ✅
                </div>
              ) : (
                <label
                  {...getImageRootProps()}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-12 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white"
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
                    {...getImageInputProps()}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              disabled={!imageButton}
              onClick={() => {
                event.preventDefault();
                if (currentStep === "image") {
                  setCurrentStep("audio");
                  va.track("Next Step Button");
                }
              }}
              className={`${
                !imageButton
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
          <div className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://extrapolate.app">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full sm:mb-0 mb-2"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-clash text-2xl font-bold">Add Voice</h3>
            <p className="text-sm text-gray-500 leading-6 sm:pb-0 pb-0.5">
              Generate audio clips, or upload your own.
            </p>
          </div>
          <form className="grid gap-5 bg-gray-50 px-4 sm:pt-8 sm:pb-8 pt-7 pb-5 md:px-16">
            <div id="select voice" className="">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700 mb-2">
                      Select voice
                    </Listbox.Label>
                    <div className="relative">
                      <Listbox.Button className="bg-white border pl-3 py-2.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-newblue focus:border-newblue block w-full">
                        <span className="flex items-center">
                          <img
                            src={selected.avatar}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span className="ml-3 block truncate">
                            {selected.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-[66vh] sm:max-h-[380px] w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {people.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <img
                                      src={person.avatar}
                                      alt=""
                                      className="h-5 w-5 flex-shrink-0 rounded-full"
                                    />
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {person.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            <div id="message" className="">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-900"
                >
                  What do you want to say?
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  rows="6"
                  maxLength="250"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-0 focus:ring-0"
                  placeholder="You can generate speech in any language!"
                  ref={textRef}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value.length > 249) {
                      toast.error(
                        "Upgrade plan to type more than 250 characters"
                      );
                    }
                  }}
                />
              </div>
            </div>

            <div id="upload audio">
              <div className="flex items-center justify-between mb-2">
                <p className="block text-sm font-medium text-gray-700">
                  Upload audio (optional)
                </p>
              </div>
              {audioUploaded ? (
                <div className="flex flex-col items-center justify-center w-full h-12 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white text-gray-400 text-xs">
                  Audio Uploaded ✅
                </div>
              ) : (
                <label
                  {...getAudioRootProps()}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-12 sm:h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white"
                >
                  <div className="flex flex-col items-center justify-center">
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
                    <p className="text-xs text-gray-400">
                      Tip: Clone any voice at voice-clone.ai
                    </p>
                  </div>
                  <input
                    {...getAudioInputProps()}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              disabled={!base64Audio && !message.trim()}
              onClick={() => {
                event.preventDefault();
                if (userInfo.tokens > 0) {
                  setGenerating(true);
                  message.trim() ? TTS() : replicate();
                  va.track("Generate Button");
                } else {
                  router.push("/pricing");
                  va.track("Generate Button - No Credits");
                }
              }}
              className={`${
                !base64Audio && !message.trim()
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white"
              } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
            >
              {generating ? (
                <BeatLoader size={8} color="#898989" />
              ) : (
                <p className="text-sm">Generate</p>
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
