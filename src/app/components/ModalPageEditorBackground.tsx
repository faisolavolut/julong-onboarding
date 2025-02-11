import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { siteurl } from "@/lib/utils/siteurl";
import { useLocal } from "@/lib/utils/use-local";
import { FC } from "react";

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
          className={cx(
            " flex flex-col w-screen h-screen",
            css`
              max-width: 100vw;
            `
          )}
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
                  {listThemes.map((e, idx) => {
                    return (
                      <div
                        key={`theme-${idx}`}
                        className={cx(
                          "relative flex flex-col items-end mb-4 cursor-pointer justify-center w-full h-52 rounded-lg  bg-gray-50",
                          css`
                            background-image: url(${siteurl(`/${e}`)});
                            background-size: cover;
                            background-position: center;
                          `
                        )}
                        onClick={() => {
                          onChangeOpen(false);
                          if (typeof onChange === "function") onChange(e);
                        }}
                      ></div>
                    );
                  })}
                </>
              ) : (
                <>
                  {" "}
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        // onChange={handleFileChange}
                        accept=".xlsx"
                      />
                    </label>
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
