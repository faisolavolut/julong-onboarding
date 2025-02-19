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
import { IoMdSave } from "react-icons/io";
import { MdChecklist } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcSurvey } from "react-icons/fc";
import { TiAttachment } from "react-icons/ti";
import { cloneFM } from "@/lib/utils/cloneFm";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { ModalPageEditorBackground } from "./ModalPageEditorBackground";

export const ModalPageTask: FC<{
  open: boolean;
  onChangeOpen: (event: boolean) => void;
  onLoad: () => Promise<any>;
  afterLoad?: (fm: any) => Promise<void>;
  onSubmit: (fm: any) => Promise<void>;
}> = ({ open, onChangeOpen, onLoad, afterLoad, onSubmit }) => {
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
            <DialogTitle>Task</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col flex-grow items-start">
            <ScrollArea className="w-full h-full flex flex-col gap-y-2">
              <Form
                onSubmit={onSubmit}
                onLoad={onLoad}
                afterLoad={afterLoad}
                showResize={false}
                header={(fm: any) => {
                  return <></>;
                }}
                mode="view"
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
                              <div className="w-full flex-grow flex-row"></div>
                              <div className="flex flex-row w-full p-4">
                                <div
                                  className={cx(
                                    "flex flex-row flex-wrap px-4 py-2"
                                  )}
                                >
                                  <div className="flex-grow text-white grid gap-4 md:gap-6 md:grid-cols-2">
                                    <div className="text-white text-2xl md:text-4xl">
                                      {"NAMA TASK"}
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
                          <div className="flex flex-row flex-grow items-center justify-end gap-x-2"></div>
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
                          <div className="flex flex-row flex-grow items-center justify-end gap-x-2"></div>
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

                        <div className="flex items-center justify-center w-full"></div>
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
