import { ListUIClean } from "@/lib/components/list/ListUIClean";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import ImageBetter from "@/lib/components/ui/Image";
import { InputSearch } from "@/lib/components/ui/input-search";
import { apix } from "@/lib/utils/apix";
import { events } from "@/lib/utils/event";
import { getNumber } from "@/lib/utils/getNumber";
import { isStringEmpty } from "@/lib/utils/isStringEmpty";
import { siteurl } from "@/lib/utils/siteurl";
import { useLocal } from "@/lib/utils/use-local";
import { FC, useState } from "react";
export const ModalPageAddSurvey: FC<{
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
    list: null as any,
    search: null as any,
  });

  return (
    <>
      <Dialog open={open}>
        <DialogContent
          className={cx(
            " flex flex-col w-screen h-screen md:w-2/4 md:h-5/6 max-w-screen"
          )}
          onClick={() => {
            onChangeOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Survey</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col px-6">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await local.list.reload();
                }}
              >
                <div className="relative  lg:w-full">
                  <InputSearch
                    className="bg-white search "
                    id="users-search"
                    name="users-search"
                    placeholder={`Search`}
                    delay={1000}
                    onChange={(e) => {
                      const value = e.target.value;
                      local.search = value;
                      local.render();
                      local.list.reload();
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col flex-grow ">
              <ListUIClean
                onInit={(e: any) => {
                  local.list = e;
                  local.render();
                }}
                classContainer={"border-none p-0"}
                name="themes"
                content={({ item }: any) => {
                  return (
                    <>
                      <div
                        className="flex flex-row  gap-x-2 items-center cursor-pointer border border-gray-200 shadow-md rounded-md mx-2"
                        onClick={() => {
                          onChangeOpen(false);
                          if (typeof onChange === "function") onChange(item);
                        }}
                      >
                        <div className="w-28 h-26 ml-4">
                          <ImageBetter
                            src={siteurl("/survey.png")}
                            alt="John Cena"
                            className=" w-full h-full object-cover object-right"
                            defaultSrc={siteurl("/404-img.jpg")}
                          />
                        </div>
                        <p className="text-lg md:text-xl font-bold">
                          {item?.title}
                        </p>
                      </div>
                    </>
                  );
                }}
                onLoad={async (param: any) => {
                  console.log({ param });
                  const params = await events(
                    "onload-param",
                    isStringEmpty(local.search)
                      ? param
                      : {
                          ...param,
                          search: local.search,
                        }
                  );
                  console.log({ params, param });
                  const result: any = await apix({
                    port: "onboarding",
                    value: "data.data.survey_templates",
                    path: `/api/survey-templates${params}`,
                    validate: "array",
                  });
                  return result;
                }}
                onCount={async () => {
                  const param = {
                    paging: 1,
                    take: 1,
                  };
                  console.log({ param });
                  console.log(
                    isStringEmpty(local.search)
                      ? param
                      : {
                          ...param,
                          search: local.search,
                        }
                  );
                  const params = await events(
                    "onload-param",
                    isStringEmpty(local.search)
                      ? param
                      : {
                          ...param,
                          search: local.search,
                        }
                  );
                  console.log({ params, param });
                  const result: any = await apix({
                    port: "onboarding",
                    value: "data.data.total",
                    path: `/api/survey-templates${params}`,
                    validate: "object",
                  });
                  return getNumber(result);
                }}
              />
            </div>
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
