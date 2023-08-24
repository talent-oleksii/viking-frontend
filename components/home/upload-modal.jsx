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
} from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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
    name: "Dave Chappelle",
    voice: "Ux3zQNOEa6p5OrVDvDQg",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/DaveChappelle.png",
  },
  {
    id: 12,
    name: "David Attenborough",
    voice: "darvxZ8nbegIsml3JzHE",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/DavidAttenborough.png",
  },
  {
    id: 13,
    name: "Mr. Beast",
    voice: "8tLZVGiprGSE6loUugVn",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/MrBeast.png",
  },
  {
    id: 14,
    name: "PewDiePie",
    voice: "UGyPczvPYUG4Y9LggyfP",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/PewDiePie.png",
  },
  {
    id: 15,
    name: "Tyler1",
    voice: "Dv1BOCBQlnc8M4ScVami",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Tyler1.png",
  },
  {
    id: 16,
    name: "Rhett",
    voice: "CoUWMfWqybep0ohr7ovz",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Rhett.png",
  },
  {
    id: 17,
    name: "Link",
    voice: "KLkUYLGguaZpj1DphApp",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Link.png",
  },
  {
    id: 18,
    name: "Rick (Rick and Morty)",
    voice: "TroRXDONusuG2rSlJzad",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/RickSanchez.png",
  },
  {
    id: 19,
    name: "Cartman (South Park)",
    voice: "zGyBxNBnX49YaKNIjSUV",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Cartman.png",
  },
  {
    id: 20,
    name: "Peter (Family Guy)",
    voice: "mUfA3cGcljTCdjbdwvWe",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Peter.png",
  },
  {
    id: 21,
    name: "Goku (DragonBall)",
    voice: "wwbPutfxYldkBoau8Tje",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/Goku.png",
  },
  {
    id: 22,
    name: "Sam Bankman-Fried",
    voice: "hljHFmiJdSi6Dj1mvKL1",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/SamBankmanFried.png",
  },
  {
    id: 23,
    name: "Elizabeth Holmes",
    voice: "ykAlY5SOqHlTI0g3805B",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/ElizabethHolmes.png",
  },
  {
    id: 24,
    name: "British Dude",
    voice: "p4QIF9bdt8tfF7wOT9hd",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/BritishDude.png",
  },
  {
    id: 25,
    name: "Narrator Dude",
    voice: "ziJHcegLub9IYwGTwR6h",
    avatar:
      "https://auth.voice-clone.ai/storage/v1/object/public/avatars/NarratorDude.png",
  },
  {
    id: 26,
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
  const router = useRouter();
  const [data, setData] = useState({
    image: null,
  });
  const [fileSizeTooBig, setFileSizeTooBig] = useState(false);

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
    { src: "/images/trump.jpg", id: "image1" },
    { src: "/images/trump.jpg", id: "image2" },
    { src: "/images/trump.jpg", id: "image3" },
    { src: "/images/trump.jpg", id: "image4" },
    { src: "/images/trump.jpg", id: "image5" },
    { src: "/images/trump.jpg", id: "image6" },
  ];

  // const handleImageClick = async (imageId) => {
  //   try {
  //     const response = await fetch("/api/your-endpoint", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ imageId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(data);

  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error.message);
  //   }
  // };

  const [currentStep, setCurrentStep] = useState("image"); // other possible value is "audio"

  const [selected, setSelected] = useState(people[0]);
  const textRef = useRef();
  const [message, setMessage] = useState("");

  return (
    <Modal showModal={showUploadModal} setShowModal={setShowUploadModal}>
      {currentStep === "iimage" ? (
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://extrapolate.app">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-display text-2xl font-bold">Choose Image</h3>
            <p className="text-sm text-gray-500">
              Select an image, or upload your own.
            </p>
          </div>
          <form
            className="grid gap-5 bg-gray-50 px-4 py-8 md:px-16"
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify(data),
              }).then(async (res) => {
                if (res.status === 200) {
                  const { key } = await res.json();
                  router.push(`/p/${key}`);
                } else {
                  setSaving(false);
                  alert("Something went wrong. Please try again later.");
                }
              });
            }}
          >
            <div id="select image" className="mb-4">
              <p className="block text-sm font-medium text-gray-700 pb-2">
                Select image
              </p>
              <div className="grid grid-cols-3 gap-2">
                {images.map((image) => (
                  <img
                    key={image.id}
                    src={image.src}
                    alt=""
                    className="rounded-md w-full cursor-pointer"
                    onClick={() => handleImageClick(image.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="block text-sm font-medium text-gray-700">
                  Upload image
                </p>
                {fileSizeTooBig && (
                  <p className="text-sm text-red-500">
                    File size too big (max 5MB)
                  </p>
                )}
              </div>
              <label
                htmlFor="image-upload"
                className="group relative mt-2 flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
              >
                <div
                  className="absolute z-[5] h-full w-full rounded-md"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    setFileSizeTooBig(false);
                    const file =
                      e.dataTransfer.files && e.dataTransfer.files[0];
                    if (file) {
                      if (file.size / 1024 / 1024 > 5) {
                        setFileSizeTooBig(true);
                      } else {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setData((prev) => ({
                            ...prev,
                            image: e.target?.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }
                  }}
                />
                <div
                  className={`${
                    dragActive ? "border-2 border-black" : ""
                  } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
                    data.image
                      ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                      : "bg-white opacity-100 hover:bg-gray-50"
                  }`}
                >
                  <UploadCloud
                    className={`${
                      dragActive ? "scale-110" : "scale-100"
                    } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                  />
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Drag and drop or click to upload.
                  </p>
                  <span className="sr-only">Image upload</span>
                </div>
                {data.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.image}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                  />
                )}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onChangePicture}
                />
              </div>
            </div>

            <button
              disabled={saveDisabled}
              onClick={() => {
                if (currentStep === "image") {
                  setCurrentStep("audio");
                }
              }}
              className={`${
                saveDisabled
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white hover:bg-white hover:text-black"
              } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
            >
              {saving ? (
                <LoadingDots color="#808080" />
              ) : (
                <p className="text-sm">Next step</p>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://extrapolate.app">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-display text-2xl font-bold">Add Voice</h3>
            <p className="text-sm text-gray-500">
              Generate voice clip, or upload your own.
            </p>
          </div>
          <form
            className="grid gap-5 bg-gray-50 px-4 py-8 md:px-16"
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify(data),
              }).then(async (res) => {
                if (res.status === 200) {
                  const { key } = await res.json();
                  router.push(`/p/${key}`);
                } else {
                  setSaving(false);
                  alert("Something went wrong. Please try again later.");
                }
              });
            }}
          >
            <div id="select voice" className="">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">
                      Select voice
                    </Listbox.Label>
                    <div className="relative mt-2">
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
                        <Listbox.Options className="absolute z-10 mt-1 max-h-[66vh] sm:max-h-[370px] w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-0"
                  placeholder="You can type any language!"
                  ref={textRef}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value.length > 250) {
                      toast.error("Max length 250 characters");
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="block text-sm font-medium text-gray-700">
                  Upload audio
                </p>
                {fileSizeTooBig && (
                  <p className="text-sm text-red-500">
                    File size too big (max 5MB)
                  </p>
                )}
              </div>
              <label
                htmlFor="image-upload"
                className="group relative mt-2 flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
              >
                <div
                  className="absolute z-[5] h-full w-full rounded-md"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    setFileSizeTooBig(false);
                    const file =
                      e.dataTransfer.files && e.dataTransfer.files[0];
                    if (file) {
                      if (file.size / 1024 / 1024 > 5) {
                        setFileSizeTooBig(true);
                      } else {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setData((prev) => ({
                            ...prev,
                            image: e.target?.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }
                  }}
                />
                <div
                  className={`${
                    dragActive ? "border-2 border-black" : ""
                  } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
                    data.image
                      ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                      : "bg-white opacity-100 hover:bg-gray-50"
                  }`}
                >
                  <UploadCloud
                    className={`${
                      dragActive ? "scale-110" : "scale-100"
                    } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                  />
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Drag and drop or click to upload.
                  </p>
                  <span className="sr-only">Image upload</span>
                </div>
                {data.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.image}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                  />
                )}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onChangePicture}
                />
              </div>
            </div>

            <button
              disabled={saveDisabled}
              className={`${
                saveDisabled
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white hover:bg-white hover:text-black"
              } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-1`}
            >
              {saving ? (
                <LoadingDots color="#808080" />
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
