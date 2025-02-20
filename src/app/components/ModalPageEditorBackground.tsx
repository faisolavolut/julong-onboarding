import { ListUIClean } from "@/lib/components/list/ListUIClean";
import { ButtonBetter } from "@/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { apix } from "@/lib/utils/apix";
import getCroppedImg from "@/lib/utils/cropImage";
import { events } from "@/lib/utils/event";
import { getNumber } from "@/lib/utils/getNumber";
import { siteurl } from "@/lib/utils/siteurl";
import { useLocal } from "@/lib/utils/use-local";
import { FC, useState } from "react";
import Cropper from "react-easy-crop";
export const ModalPageEditorBackground: FC<{
  open: boolean;
  onChangeOpen: (event: boolean) => void;
  onChange?: (data?: any) => void;
}> = ({ open, onChangeOpen, onChange }) => {
  const listThemes = [
    "template-1.png",
    "template-2.png",
    "template-3.png",
    "template-4.png",
  ];
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
    setCropArea(croppedAreaPixels);
  };
  const local = useLocal({
    tbl: null as any,
    open: false,
    fase: "start" as "start" | "preview" | "upload",
    preview: "",
    filename: "",
    extension: "",
    file: null as any,
    count: 0 as number,
    tab: "themes" as "themes" | "upload",
  });

  return (
    <>
      <Dialog open={open}>
        <DialogContent
          className={cx(" flex flex-col w-screen h-screen max-w-7xl")}
          onClick={() => {
            onChangeOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Themes</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col flex-grow items-start">
            <div className="mb-2 flex flex-row w-full items-center gap-x-2 font-bold text-md border-b border-gray-300">
              <div
                className={cx(
                  "px-4  cursor-pointer",
                  local.tab === "themes" &&
                    "border-b-2 border-primary text-primary"
                )}
                onClick={() => {
                  local.tab = "themes";
                  local.render();
                }}
              >
                Themes
              </div>
              <div
                className={cx(
                  "px-4 cursor-pointer",
                  local.tab === "upload" &&
                    "border-b-2 border-primary text-primary"
                )}
                onClick={() => {
                  local.tab = "upload";
                  local.render();
                }}
              >
                Upload
              </div>
            </div>
            <ScrollArea className="w-full h-full flex flex-col gap-y-4">
              {local.tab === "themes" ? (
                <>
                  <ListUIClean
                    name="themes"
                    content={({ item }: any) => {
                      return (
                        <>
                          <div
                            className={cx(
                              "relative flex flex-col items-end mb-4 cursor-pointer justify-center w-full h-52 rounded-lg  bg-gray-50",
                              css`
                                background-image: url(${siteurl(
                                  `${item?.path}`
                                )});
                                background-size: cover;
                                background-position: center;
                              `
                            )}
                            onClick={() => {
                              onChangeOpen(false);
                              const result = {
                                path_origin: item?.path_origin,
                                path: item?.path,
                              };
                              if (typeof onChange === "function")
                                onChange(result);
                            }}
                          ></div>
                        </>
                      );
                    }}
                    onLoad={async (param: any) => {
                      const params = await events("onload-param", param);
                      const result: any = await apix({
                        port: "onboarding",
                        value: "data.data.covers",
                        path: `/api/covers${params}`,
                        validate: "array",
                      });
                      console.log({ result });
                      return result;
                    }}
                    onCount={async () => {
                      const result: any = await apix({
                        port: "onboarding",
                        value: "data.data.total",
                        path: `/api/covers?page=1&page_size=1`,
                        validate: "object",
                      });
                      return getNumber(result);
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="flex flex-col flex-grow h-full items-center justify-center w-full">
                    {image ? (
                      <>
                        <div className="relative w-full  flex-grow bg-black">
                          <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={16 / 5}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                          />
                        </div>
                        <div className="flex flex-row items-center justify-end w-full py-2 gap-x-2">
                          <ButtonBetter
                            className="px-6 border border-primary"
                            variant={"outline"}
                            onClick={async () => {
                              setImage(null);
                            }}
                          >
                            Clear
                          </ButtonBetter>
                          <ButtonBetter
                            className="px-6"
                            onClick={async () => {
                              try {
                                const croppedImage = (await getCroppedImg(
                                  image,
                                  cropArea,
                                  0
                                )) as any;
                                const convertBlobUrlToFile = async (
                                  blobUrl: string,
                                  fileName: string
                                ) => {
                                  const response = await fetch(blobUrl);
                                  const blob = await response.blob();
                                  return new File([blob], fileName, {
                                    type: blob.type,
                                  });
                                };
                                const res = await convertBlobUrlToFile(
                                  croppedImage,
                                  "cropped-image.jpg"
                                );
                                const result = await apix({
                                  port: "onboarding",
                                  path: "/api/covers/upload",
                                  value: "data.data",
                                  method: "post",
                                  type: "form",
                                  data: {
                                    file: res,
                                  },
                                });
                                if (result && typeof onChange === "function")
                                  onChange(result);
                                console.log("donee", URL.createObjectURL(res));
                              } catch (e) {
                                console.error(e);
                              }
                            }}
                          >
                            Done
                          </ButtonBetter>
                        </div>
                      </>
                    ) : (
                      <label
                        htmlFor="dropzone-image"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload the walpaper
                            </span>
                          </p>
                          <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">
                              Recommended ratio: 16:9 for best display
                            </span>
                          </p>
                        </div>
                        <input
                          id="dropzone-image"
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                      </label>
                    )}
                  </div>
                </>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
function generateRandomColor(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString(); // Return a string representation of the hash
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
