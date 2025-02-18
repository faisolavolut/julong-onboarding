import { Field } from "@/lib/components/form/Field";
import { Form } from "@/lib/components/form/Form";
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
import { siteurl } from "@/lib/utils/siteurl";
import { useLocal } from "@/lib/utils/use-local";
import { FC, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { IoMdSave } from "react-icons/io";
import { MdChecklist, MdOutlineEdit } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcSurvey } from "react-icons/fc";
import { TiAttachment } from "react-icons/ti";
import { cloneFM } from "@/lib/utils/cloneFm";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { ModalPageEditorBackground } from "./ModalPageEditorBackground";

export const ModalPageTemplateTask: FC<{
  open: boolean;
  onChangeOpen: (event: boolean) => void;
}> = ({ open, onChangeOpen }) => {
  const [openEditorBackground, setOpenEditorBackground] = useState(false);
  const local = useLocal({
    tbl: null as any,
    open: false,
    fase: "start" as "start" | "preview" | "upload",
    preview: "",
    filename: "",
    extension: "",
    file: null as any,
    count: 0 as number,
  });

  return (
    <>
      <ModalPageEditorBackground
        open={openEditorBackground}
        onChangeOpen={(event) => setOpenEditorBackground(event)}
      />
      <Dialog open={open}>
        <DialogContent
          className={cx(" flex flex-col w-screen h-screen max-w-screen")}
          onClick={() => {
            onChangeOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Template Task</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col flex-grow items-start">
            <ScrollArea className="w-full h-full flex flex-col gap-y-2">
              <Form
                onSubmit={async (fm: any) => {}}
                onLoad={async () => {
                  return {};
                }}
                showResize={false}
                header={(fm: any) => {
                  return <></>;
                }}
                children={(fm: any) => {
                  return (
                    <>
                      <div className="flex flex-col flex-grow gap-y-4">
                        <div className={cx("w-full flex flex-row ")}>
                          <div className="flex items-center justify-center w-full">
                            <div
                              className={cx(
                                "relative flex flex-col items-end justify-center w-full h-64 rounded-lg  bg-gray-50",
                                css`
                                  background-image: url(${siteurl(
                                    "/template-1.png"
                                  )});
                                  background-size: cover;
                                  background-position: center;
                                `
                              )}
                            >
                              <div className="w-full flex-grow flex-row">
                                <ButtonBetter
                                  tooltip="Edit Backgound"
                                  variant="outline"
                                  size="icon"
                                  className="m-4"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    setOpenEditorBackground(true);
                                  }}
                                >
                                  <MdOutlineEdit className="text-xl" />
                                </ButtonBetter>
                              </div>
                              <div className="flex flex-row w-full p-4">
                                <div
                                  className={cx(
                                    "flex flex-row flex-wrap px-4 py-2"
                                  )}
                                >
                                  <div className="flex-grow text-white grid gap-4 md:gap-6 md:grid-cols-2">
                                    <div>
                                      <Field
                                        style="underline"
                                        fm={fm}
                                        name={"title"}
                                        label={"title"}
                                        type={"text"}
                                        classField="text-white focus-within:border-b focus-within:border-b-white"
                                        className="text-white placeholder:text-white text-2xl md:text-4xl"
                                        hidden_label={true}
                                        placeholder="Add title"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={cx(
                            "w-full flex flex-row border-b border-gray-300 pb-1"
                          )}
                        >
                          <div className="flex flex-row items-center gap-x-2 font-bold text-md">
                            <TbListDetails />
                            Details
                          </div>
                          <div className="flex flex-row flex-grow items-center justify-end gap-x-2">
                            <ButtonBetter>
                              <IoMdSave className="text-xl" />
                              Save
                            </ButtonBetter>
                          </div>
                        </div>
                        <div className={cx("w-full flex flex-row")}>
                          <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8 flex-grow">
                            <div>
                              <Field
                                fm={fm}
                                name={"due_date"}
                                label={"Due Date"}
                                type={"date"}
                              />
                            </div>
                            <div>
                              <Field
                                fm={fm}
                                name={"priority"}
                                label={"Priority"}
                                type={"dropdown"}
                                onLoad={async () => {
                                  const res: any = await apix({
                                    port: "recruitment",
                                    value: "data.data.template_questions",
                                    path: "/api/template-questions",
                                    validate: "dropdown",
                                    keys: {
                                      label: "name",
                                    },
                                  });
                                  return [
                                    {
                                      label: "High",
                                      value: "high",
                                    },
                                    {
                                      label: "Medium",
                                      value: "medium",
                                    },
                                    {
                                      label: "Low",
                                      value: "low",
                                    },
                                  ];
                                }}
                              />
                            </div>

                            <div>
                              <Field
                                fm={fm}
                                name={"status"}
                                label={"Status"}
                                type={"dropdown"}
                                onLoad={async () => {
                                  return [
                                    {
                                      label: "High",
                                      value: "high",
                                    },
                                    {
                                      label: "Medium",
                                      value: "medium",
                                    },
                                    {
                                      label: "Low",
                                      value: "low",
                                    },
                                  ];
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <Field
                                fm={fm}
                                name={"description"}
                                label={"Description"}
                                type={"textarea"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={cx(
                            "w-full flex flex-row border-b border-gray-300 pb-1"
                          )}
                        >
                          <div className="flex flex-row items-center gap-x-2 font-bold text-md">
                            <MdChecklist className="text-xl" />
                            Checklists
                          </div>
                          <div className="flex flex-row flex-grow items-center justify-end gap-x-2">
                            <ButtonBetter
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                const data = fm?.data?.template_question || [];
                                data.push({});
                                fm.data.template_question = data;
                                fm.render();
                                console.log(fm.data.template_question);
                              }}
                            >
                              <HiPlus className="text-xl" />
                              Add
                            </ButtonBetter>
                          </div>
                        </div>

                        <div className={cx("w-full flex flex-col gap-y-2")}>
                          {fm?.data?.template_question?.length ? (
                            <>
                              {fm?.data?.template_question.map(
                                (e: any, idx: number) => {
                                  let fm_row = cloneFM(fm, e);
                                  return (
                                    <div
                                      className="w-80 max-w-full"
                                      key={`question_${idx}`}
                                    >
                                      <Field
                                        style="underline"
                                        fm={fm_row}
                                        name={"option"}
                                        label={"option"}
                                        hidden_label={true}
                                        type={"text"}
                                        placeholder="Add Option"
                                        prefix={
                                          <div className="text-md flex flex-row items-center font-bold text-gray-500">
                                            <Checkbox
                                              className="border border-primary"
                                              checked={false}
                                              onClick={(e) => {}}
                                            />{" "}
                                          </div>
                                        }
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div
                          className={cx(
                            "w-full flex flex-row border-b border-gray-300 pb-1"
                          )}
                        >
                          <div className="flex flex-row items-center gap-x-2 font-bold text-md">
                            <FcSurvey className="text-xl" />
                            Survey
                          </div>
                          <div className="flex flex-row flex-grow items-center justify-end gap-x-2">
                            <ButtonBetter>
                              <HiPlus className="text-xl" />
                              Add
                            </ButtonBetter>
                          </div>
                        </div>
                        <div
                          className={cx(
                            "w-full flex flex-row border-b border-gray-300 pb-1"
                          )}
                        >
                          <div className="flex flex-row items-center gap-x-2 font-bold text-md">
                            <TiAttachment className="text-xl" />
                            Attachments
                          </div>
                        </div>

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
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload the attachments
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
                      </div>
                    </>
                  );
                }}
              />
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
