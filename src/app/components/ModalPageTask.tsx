import { Field } from "@/lib/components/form/Field";
import { Form } from "@/lib/components/form/Form";
import { ButtonContainer } from "@/lib/components/ui/button";
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
import { FC, useState } from "react";
import { MdChecklist } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcSurvey } from "react-icons/fc";
import { TiAttachment } from "react-icons/ti";
import { cloneFM } from "@/lib/utils/cloneFm";
import { ModalPageEditorBackground } from "./ModalPageEditorBackground";
import { Progress } from "@/lib/components/ui/Progress";
import { IoCameraOutline, IoCheckmarkCircle } from "react-icons/io5";
import { Alert } from "@/lib/components/ui/alert";

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
                className={" px-4"}
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
                      <div className="flex flex-col flex-grow gap-y-4 ">
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
                            <Alert
                              type={"save"}
                              msg={"Are you sure you want to save this task?"}
                              onClick={() => {
                                fm.submit();
                              }}
                            >
                              <ButtonContainer className={"bg-primary"}>
                                Save
                              </ButtonContainer>
                            </Alert>
                            <Alert
                              type={"save"}
                              msg={"Are you sure you want to revise this task?"}
                              onClick={() => {
                                fm.submit();
                              }}
                            >
                              <ButtonContainer
                                variant={"destructive"}
                                className="bg-white border border-red-500 text-red-500"
                              >
                                <span className="text-red-500">Revised</span>
                              </ButtonContainer>
                            </Alert>

                            <Alert
                              type={"save"}
                              msg={
                                "Are you sure you want to complete this task?"
                              }
                              onClick={() => {
                                fm.submit();
                              }}
                            >
                              <ButtonContainer>Complete</ButtonContainer>
                            </Alert>
                          </div>
                        </div>
                        <div className={cx("w-full flex flex-row")}>
                          <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8 flex-grow">
                            <div>
                              <Field
                                fm={fm}
                                name={"start_date"}
                                label={"Start Date"}
                                type={"date"}
                              />
                            </div>
                            <div>
                              <Field
                                fm={fm}
                                name={"end_date"}
                                label={"Due Date"}
                                type={"date"}
                              />
                            </div>
                            <div>
                              <Field
                                fm={fm}
                                name={"due_duration"}
                                label={"Due Duration"}
                                type={"money"}
                                suffix={() => (
                                  <div className="text-sm px-2">Day</div>
                                )}
                              />
                            </div>
                            <div>
                              <Field
                                fm={fm}
                                name={"priority"}
                                label={"Priority"}
                                type={"dropdown"}
                                onLoad={async () => {
                                  return [
                                    {
                                      label: "HIGH",
                                      value: "HIGH",
                                    },
                                    {
                                      label: "MEDIUM",
                                      value: "MEDIUM",
                                    },
                                    {
                                      label: "LOW",
                                      value: "LOW",
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
                                      label: "ACTIVE",
                                      value: "ACTIVE",
                                    },
                                    {
                                      label: "INACTIVE",
                                      value: "INACTIVE",
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

                        <div className="flex flex-row relative items-center gap-x-2">
                          <div className="flex flex-grow items-center flex-row ">
                            <Progress
                              value={80}
                              className={cx(
                                `w-full h-5 bg-gray-300 rounded-md`
                              )}
                              classNameIndicator={"rounded-md"}
                            />
                          </div>
                          <div className="text-md text-primary flex flex-row font-bold">
                            10%
                          </div>
                        </div>
                        {fm?.data?.template_task_checklists?.length ? (
                          <>
                            <div className={cx("w-full flex flex-col gap-y-2")}>
                              {fm?.data?.template_task_checklists.map(
                                (e: any, idx: number) => {
                                  let fm_row = cloneFM(fm, e);
                                  return (
                                    <div
                                      className="w-full flex flex-row items-center "
                                      key={`question_${idx}`}
                                    >
                                      <div className="flex flex-row items-center flex-grow">
                                        {true ? (
                                          <div className="text-primary">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              className="fill-sky-500"
                                            >
                                              <path
                                                fill="currentColor"
                                                d="m10.6 14.092l-2.496-2.496q-.14-.14-.344-.15q-.204-.01-.364.15t-.16.354q0 .194.16.354l2.639 2.638q.242.243.565.243q.323 0 .565-.243l5.477-5.477q.14-.14.15-.344q.01-.204-.15-.363q-.16-.16-.354-.16q-.194 0-.353.16L10.6 14.092ZM5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463H5.615Z"
                                              />
                                            </svg>
                                          </div>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463H5.615Zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423V5.615q0-.23-.192-.423Q18.615 5 18.385 5H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192Z"
                                            />
                                          </svg>
                                        )}

                                        <div>{e?.name}</div>
                                      </div>
                                      <div className="flex flex-row items-center">
                                        {true ? (
                                          <div
                                            className={cx(
                                              "px-2 py-1 text-xs rounded-md",
                                              true
                                                ? "bg-gray-500  text-white"
                                                : "bg-primary cursor-pointer text-white"
                                            )}
                                          >
                                            Verify
                                          </div>
                                        ) : (
                                          <div
                                            className={cx(
                                              "px-2 py-1 text-lg rounded-md text-green-500"
                                            )}
                                          >
                                            <IoCheckmarkCircle />
                                          </div>
                                        )}
                                      </div>
                                      {/* <Field
                                        classField={css`
                                          .suffix {
                                            background: transparent;
                                          }
                                        `}
                                        style="underline"
                                        fm={fm_row}
                                        name={"name"}
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
                                        suffix={
                                          <div
                                            className=" p-2 rounded-lg cursor-pointer items-center flex flex-row"
                                            onClick={() => {
                                              fm.render();
                                            }}
                                          ></div>
                                        }
                                      /> */}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
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

                        <div
                          className={cx(
                            "w-full flex flex-row border-b border-gray-300 pb-1"
                          )}
                        >
                          <div className="flex flex-row items-center gap-x-2 font-bold text-md">
                            <IoCameraOutline className="text-xl" />
                            Proof
                          </div>
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
