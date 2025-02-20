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
import { MdChecklist, MdDelete, MdOutlineEdit } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcSurvey } from "react-icons/fc";
import { TiAttachment } from "react-icons/ti";
import { cloneFM } from "@/lib/utils/cloneFm";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { ModalPageEditorBackground } from "./ModalPageEditorBackground";
import { actionToast } from "@/lib/utils/action";
import { convertForm } from "@/lib/utils/convetForm";

export const ModalPageEditorTask: FC<{
  open: boolean;
  onChangeOpen: (event: boolean) => void;
  onSubmit?: (event?: any) => Promise<void> | any;
  onLoad?: () => Promise<any> | any;
}> = ({ open, onChangeOpen, onSubmit, onLoad }) => {
  const [openEditorBackground, setOpenEditorBackground] = useState(false);
  const local = useLocal({
    tbl: null as any,
    open: false,
    fm: null as any,
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
        onChange={(event) => {
          setOpenEditorBackground(false);
          local.fm.data["cover_path"] = event?.path_origin;
          local.fm.data["cover"] = event?.path;
          local.fm.render();
        }}
      />
      <Dialog open={open}>
        <DialogContent
          className={cx(" flex flex-col w-screen h-screen max-w-screen")}
          onClick={() => {
            onChangeOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col flex-grow items-start">
            <ScrollArea className="w-full h-full flex flex-col gap-y-2">
              <Form
                onSubmit={async (fm: any) => {
                  const data = fm?.data;
                  const files = data.employee_task_attachments?.length
                    ? data.employee_task_attachments.filter((e: any) => e?.data)
                    : [];
                  const form = convertForm({
                    data: data?.employee_task_checklists,
                    task: (item, form) => {
                      if (item?.id) {
                        form.append("employee_task_checklists[id]", item?.id);
                      }
                      form.append("employee_task_checklists[name]", item?.name);
                    },
                  });
                  const result = {
                    ...data,
                    "employee_task_attachments[file]": files?.length
                      ? files.map((e: any) => e.data)
                      : [],
                    checklist: form,
                  };
                  delete result["employee_task_attachments"];
                  delete result["employee_task_checklists"];
                  if (data?.id) {
                    const res = await apix({
                      port: "onboarding",
                      path: "/api/employee-tasks/update",
                      method: "put",
                      value: "data.data",
                      type: "form",
                      data: result,
                    });
                  } else {
                    const res = await apix({
                      port: "onboarding",
                      path: "/api/employee-tasks",
                      method: "post",
                      value: "data.data",
                      type: "form",
                      data: result,
                    });
                  }
                  if (typeof onSubmit === "function") await onSubmit();
                }}
                onLoad={onLoad}
                onInit={(fm: any) => {
                  local.fm = fm;
                  local.render();
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
                                    fm?.data?.cover
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
                                        name={"name"}
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
                          <div className="flex flex-row flex-grow items-center justify-end gap-x-2">
                            <ButtonBetter
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                const data =
                                  fm?.data?.employee_task_checklists || [];
                                data.push({});
                                fm.data.employee_task_checklists = data;
                                fm.render();
                                console.log(fm.data.employee_task_checklists);
                              }}
                            >
                              <HiPlus className="text-xl" />
                              Add
                            </ButtonBetter>
                          </div>
                        </div>

                        {fm?.data?.employee_task_checklists?.length ? (
                          <>
                            <div className={cx("w-full flex flex-col gap-y-2")}>
                              {fm?.data?.employee_task_checklists.map(
                                (e: any, idx: number) => {
                                  let fm_row = cloneFM(fm, e);
                                  return (
                                    <div
                                      className="w-96 max-w-full"
                                      key={`question_${idx}`}
                                    >
                                      <Field
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
                                              if (
                                                Array.isArray(
                                                  fm.data
                                                    .employee_task_checklists
                                                )
                                              ) {
                                                fm.data.employee_task_checklists =
                                                  fm.data.employee_task_checklists.filter(
                                                    (_: any, i: any) =>
                                                      i !== idx
                                                  );
                                                fm.render();
                                              }
                                            }}
                                          >
                                            <MdDelete className="w-4 h-4 text-red-500" />
                                          </div>
                                        }
                                      />
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

                        <div className="flex items-center w-full">
                          <Field
                            fm={fm}
                            hidden_label={true}
                            name={"employee_task_attachments"}
                            label={"Description"}
                            type={"multi-upload"}
                            valueKey={"path"}
                            onChange={async () => {
                              console.log(fm.data.employee_task_attachments);
                            }}
                            onDelete={async (item) => {
                              if (item?.id) {
                                await actionToast({
                                  task: async () => {
                                    await apix({
                                      port: "onboarding",
                                      path: `/api/template-task-attachments/${item?.id}`,
                                      method: "delete",
                                    });
                                  },
                                  after: () => {},
                                  msg_load: "Delete Files ",
                                  msg_error: "Delete Files failed ",
                                  msg_succes: "Delete Files success ",
                                });
                              }
                            }}
                          />
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
