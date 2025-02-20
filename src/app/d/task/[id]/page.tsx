"use client";
import { apix } from "@/lib/utils/apix";
import { access } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect, useState } from "react";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import { events } from "@/lib/utils/event";
import { ListUI } from "@/lib/components/list/ListUI";
import { formatMoney } from "@/lib/components/form/field/TypeInput";
import { ButtonBetter } from "@/lib/components/ui/button";
import { HiPlus } from "react-icons/hi";
import { ModalPageEditorTask } from "@/app/components/ModalPageEditorTask";
import { ModalPageTask } from "@/app/components/ModalPageTask";
import { TaskCard } from "@/app/components/TaskCard";
import { getParams } from "@/lib/utils/get-params";
import { convertForm } from "@/lib/utils/convetForm";
import { get_user } from "@/lib/utils/get_user";

function Page() {
  const id = getParams("id");
  const [open, setOpen] = useState(false);
  const [opentask, setOpenTask] = useState(false);
  const local = useLocal({
    can_add: false,
    can_edit: false,
    tab: "on_going",
    selected: null as any,
    list: [
      { id: "on_going", name: "On Going", count: 0 },
      { id: "completed", name: "Completed", count: 0 },
    ],
    ready: false,
  });

  useEffect(() => {
    const run = async () => {
      local.ready = true;
      local.can_add = access("create-mpr");
      local.render();
    };
    run();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row items-center w-full">
        <div className="w-full p-4 py-6 pr-6 pl-3 ">
          <div className="flex flex-row  text-2xl font-bold">Progress Task</div>
          <BreadcrumbBetterLink
            data={[
              {
                title: "List Employee",
                url: "/d/task",
              },
              {
                title: "Progress Task",
                // url: "/d/interview/result-interview/" + id_posting,
              },
            ]}
          />
        </div>
        <ModalPageEditorTask
          open={open}
          onChangeOpen={(e) => {
            setOpen(e);
          }}
          onSubmit={async () => {
            setOpen(false);
            local.render();
            local.ready = false;
            local.render();
            setTimeout(() => {
              local.ready = true;
              local.render();
            }, 100);
          }}
          onLoad={async () => {
            if (local.selected) {
              const res = await apix({
                port: "onboarding",
                value: "data.data",
                path: `/api/employee-tasks/${local.selected.id}`,
                method: "get",
              });
              console.log({
                ...res,
                cover: res?.CoverPath,
                cover_path: res?.cover_path_origin,
              });
              return {
                ...res,
                cover: res?.CoverPath,
                cover_path: res?.cover_path_origin,
              };
            }
            return {
              employee_id: id,
              priority: "HIGH",
              status: "ACTIVE",
              cover: "/template-1.png",
            };
          }}
        />
        <ModalPageTask
          open={opentask}
          onChangeOpen={(e) => {
            setOpenTask(e);
          }}
          onLoad={async () => {
            if (local.selected) {
              const res = await apix({
                port: "onboarding",
                value: "data.data",
                path: `/api/template-tasks/${local.selected.id}`,
                method: "get",
              });
              console.log({
                ...res,
                cover: res?.CoverPath,
                cover_path: res?.cover_path_origin,
              });
              return {
                ...res,
                cover: res?.CoverPath,
                cover_path: res?.cover_path_origin,
              };
            }
            return {
              employee_id: id,
              priority: "HIGH",
              status: "ACTIVE",
              cover: "/template-1.png",
            };
          }}
          onSubmit={async (fm) => {
            const data = fm?.data;
            const form = convertForm({
              data: data?.employee_task_checklists,
              task: (item, form) => {
                if (item?.id) {
                  form.append("employee_task_checklists[id]", item?.id);
                  form.append("employee_task_checklists[name]", item?.name);
                  if (item?.is_checked === "YES") {
                    form.append("employee_task_checklists[is_checked]", "YES");
                    form.append(
                      "employee_task_checklists[verified_by]",
                      get_user("employee.id")
                    );
                  }
                }
              },
            });
            const result = {
              ...data,
              checklist: form,
            };
            delete result["employee_task_attachments"];
            delete result["employee_task_checklists"];
            delete result["proof"];

            const res = await apix({
              port: "onboarding",
              path: "/api/employee-tasks/update",
              method: "put",
              value: "data.data",
              type: "form",
              data: result,
            });
            local.ready = false;
            local.render();
            setTimeout(() => {
              local.ready = true;
              local.render();
            }, 100);
          }}
          afterLoad={async (fm) => {}}
        />
        <div className="flex flex-grow flex-row justify-end items-center">
          <ButtonBetter onClick={() => setOpen(true)}>
            <HiPlus className="text-xl" />
            Add New
          </ButtonBetter>
        </div>
      </div>
      {!local.ready ? (
        <div className="flex-grow  flex-grow flex flex-row items-center justify-center">
          <div className="spinner-better"></div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 flex-grow pb-3">
          <ListUI
            name="todo"
            title={({ ui, count }: any) => {
              return (
                <div className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-[#9EADD8] text-white font-medium shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                    </div>
                    <span className="text-md font-semibold tracking-wide">
                      To Do
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-white text-blue-500 font-bold text-sm rounded-full flex items-center justify-center">
                    {getNumber(ui?.table?.count) > 99
                      ? `99+`
                      : formatMoney(getNumber(ui?.table?.count))}
                  </div>
                </div>
              );
            }}
            content={({ item }: any) => {
              return (
                <>
                  <TaskCard
                    data={item}
                    onClick={(item) => {
                      local.selected = item;
                      local.render();
                      setOpenTask(true);
                    }}
                  />
                </>
              );
            }}
            onLoad={async (param: any) => {
              const params = await events("onload-param", param);

              const res = await apix({
                port: "onboarding",
                value: "data.data.data",
                path: `/api/template-tasks${params}`,
                method: "get",
                validate: "array",
              });
              return res;
              // const result: any = await apix({
              //   port: "portal",
              //   value: "data.data.organizations",
              //   path: `/api/organizations${params}`,
              //   validate: "array",
              // });
              // return result;
            }}
            onCount={async () => {
              const result: any = await apix({
                port: "portal",
                value: "data.data",
                path: `/api/employee-tasks/count?employee_id=${id}&kanban=TO_DO`,
                validate: "object",
              });
              return getNumber(result);
            }}
          />
          <ListUI
            name="in_progress"
            title={({ ui, count }: any) => {
              return (
                <div className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-[#7C94CD] text-white font-medium shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                    </div>
                    <span className="text-md font-semibold tracking-wide">
                      In Progress
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-white text-blue-500 font-bold text-sm rounded-full flex items-center justify-center">
                    {getNumber(ui?.table?.count) > 99
                      ? `99+`
                      : formatMoney(getNumber(ui?.table?.count))}
                  </div>
                </div>
              );
            }}
            content={({ item }: any) => {
              return (
                <>
                  <TaskCard
                    data={item}
                    onClick={(item) => {
                      local.selected = item;
                      local.render();
                      setOpenTask(true);
                    }}
                  />
                </>
              );
            }}
            onLoad={async (param: any) => {
              const params = await events("onload-param", param);
              const result: any = await apix({
                port: "portal",
                value: "data.data.organizations",
                path: `/api/organizations${params}`,
                validate: "array",
              });
              return result;
            }}
            onCount={async () => {
              const result: any = await apix({
                port: "portal",
                value: "data.data",
                path: `/api/employee-tasks/count?employee_id=${id}&kanban=IN_PROGRESS`,
                validate: "object",
              });
              return getNumber(result);
            }}
          />
          <ListUI
            name="need_review"
            title={({ ui, count }: any) => {
              return (
                <div className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-[#4C5EA2] text-white font-medium shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                    </div>
                    <span className="text-md font-semibold tracking-wide">
                      Need Review
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-white text-blue-500 font-bold text-sm rounded-full flex items-center justify-center">
                    {getNumber(ui?.table?.count) > 99
                      ? `99+`
                      : formatMoney(getNumber(ui?.table?.count))}
                  </div>
                </div>
              );
            }}
            content={({ item }: any) => {
              return (
                <>
                  <TaskCard
                    data={item}
                    onClick={(item) => {
                      local.selected = item;
                      local.render();
                      setOpenTask(true);
                    }}
                  />
                </>
              );
            }}
            onLoad={async (param: any) => {
              const params = await events("onload-param", param);
              const result: any = await apix({
                port: "portal",
                value: "data.data.organizations",
                path: `/api/organizations${params}`,
                validate: "array",
              });
              return result;
            }}
            onCount={async () => {
              const result: any = await apix({
                port: "portal",
                value: "data.data",
                path: `/api/employee-tasks/count?employee_id=${id}&kanban=NEED_REVIEW`,
                validate: "object",
              });
              return getNumber(result);
            }}
          />
          <ListUI
            name="completed"
            title={({ ui, count }: any) => {
              return (
                <div className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-primary text-white font-medium shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                    </div>
                    <span className="text-md font-semibold tracking-wide">
                      Completed
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-white text-blue-500 font-bold text-sm rounded-full flex items-center justify-center">
                    {getNumber(ui?.table?.count) > 99
                      ? `99+`
                      : formatMoney(getNumber(ui?.table?.count))}
                  </div>
                </div>
              );
            }}
            content={({ item }: any) => {
              return (
                <>
                  <TaskCard
                    data={item}
                    onClick={(item) => {
                      local.selected = item;
                      local.render();
                      setOpenTask(true);
                    }}
                  />
                </>
              );
            }}
            onLoad={async (param: any) => {
              const params = await events("onload-param", param);
              const result: any = await apix({
                port: "portal",
                value: "data.data.organizations",
                path: `/api/organizations${params}`,
                validate: "array",
              });
              return result;
            }}
            onCount={async () => {
              const result: any = await apix({
                port: "portal",
                value: "data.data",
                path: `/api/employee-tasks/count?employee_id=${id}&kanban=COMPLETED`,
                validate: "object",
              });
              return getNumber(result);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Page;
