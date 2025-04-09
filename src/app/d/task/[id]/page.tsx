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
import { normalDate } from "@/lib/utils/date";

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
    refresh: () => {
      local.ready = false;
      local.render();
      setTimeout(() => {
        local.ready = true;
        local.render();
      }, 100);
    },
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
              return {
                ...res,
                cover: res?.cover_path,
                cover_path: res?.cover_path_origin,
              };
            }
            const result: any = await apix({
              port: "onboarding",
              value: "data.data.covers",
              path: `/api/covers?page=1&page_size=1`,
              validate: "array",
            });
            return {
              employee_id: id,
              kanban: "TO_DO",
              priority: "HIGH",
              status: "ACTIVE",
              cover: result?.[0]?.path,
              cover_path: result?.[0]?.path_origin,
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
                path: `/api/employee-tasks/${local.selected.id}`,
                method: "get",
              });
              const data = res?.employee_task_checklists || [];
              const check = data.filter((e: any) => e?.verified_by);
              // const progress = Math.ceil((check?.length / data?.length) * 100);
              return {
                ...res,
                cover: res?.cover_path,
                cover_path: res?.cover_path_origin,
                // progress: progress > 100 ? 100 : progress,
              };
            }
            const result: any = await apix({
              port: "onboarding",
              value: "data.data.covers",
              path: `/api/covers?page=1&page_size=1`,
              validate: "array",
            });
            return {
              employee_id: id,
              priority: "HIGH",
              status: "ACTIVE",
              cover: result?.[0]?.path,
              cover_path: result?.[0]?.path_origin,
            };
          }}
          onSubmit={async (fm) => {
            const data = fm?.data;
            const form = convertForm({
              data: data?.employee_task_checklists,
              task: (item, form) => {
                console.log("employee_task_checklists[id]", item?.id);
                if (item?.id) {
                  form.append("employee_task_checklists[id]", item?.id);
                  form.append("employee_task_checklists[name]", item?.name);
                  if (item?.is_checked === "YES" && item?.verified_by) {
                    form.append("employee_task_checklists[is_checked]", "YES");
                    form.append(
                      "employee_task_checklists[verified_by]",
                      item?.verified_by
                    );
                  }
                } else {
                  form.append("employee_task_checklists[name]", item?.name);
                }
              },
            });
            const file = convertForm({
              data: data?.employee_task_attachments,
              task: (item, form) => {
                if (item?.id) {
                } else {
                  form.append("employee_task_attachments[file]", item?.data);
                }
              },
            });
            const result = {
              ...data,
              checklist: form,
              start_date: normalDate(data?.start_date),
              end_date: normalDate(data?.end_date),
              verified_by: get_user("employee.id"),
              file,
            };
            delete result["employee_task_attachments"];
            delete result["employee_task_checklists"];
            delete result["proof"];
            console.log({ result });
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
          refresh={async () => {
            local.ready = false;
            local.render();
            setTimeout(() => {
              local.ready = true;
              local.render();
            }, 100);
          }}
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
        <div className="relative flex flex-col flex-grow overflow-x-scroll">
          <div className="absolute md:relative h-full w-full top-0 left-0  flex flex-row md:grid md:grid-cols-4 gap-4 flex-grow pb-3">
            <ListUI
              className="w-[300px] md:w-full"
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
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "TO_DO",
                  param: param,
                });
                return result;
              }}
              onCount={async () => {
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "TO_DO",
                  mode: "count",
                });
                return result;
              }}
            />
            <ListUI
              name="in_progress"
              className="w-[300px] md:w-full"
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
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "IN_PROGRESS",
                  param: param,
                });
                return result;
              }}
              onCount={async () => {
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "IN_PROGRESS",
                  mode: "count",
                });
                return result;
              }}
            />
            <ListUI
              name="need_review"
              className="w-[300px] md:w-full"
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
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "NEED_REVIEW",
                  param: param,
                });
                return result;
              }}
              onCount={async () => {
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "NEED_REVIEW",
                  mode: "count",
                });
                return result;
              }}
            />
            <ListUI
              name="completed"
              className="w-[300px] md:w-full"
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
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "COMPLETED",
                  param: param,
                });
                return result;
              }}
              onCount={async () => {
                const result: any = await getDataKanban({
                  employee_id: id,
                  status: "COMPLETED",
                  mode: "count",
                });
                return result;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const getDataKanban = async ({
  employee_id,
  status,
  param,
  mode = "list",
}: {
  employee_id: string | any;
  status: "TO_DO" | "IN_PROGRESS" | "NEED_REVIEW" | "COMPLETED";
  param?: any;
  mode?: "count" | "list";
}) => {
  if (mode === "count") {
    const result: any = await apix({
      port: "onboarding",
      value: "data.data.total",
      path: `/api/employee-tasks/employee-kanban?employee_id=${employee_id}&kanban=${status}&page=1&page_size=1`,
      validate: "object",
    });
    return getNumber(result);
  }
  const params = await events("onload-param", {
    ...param,
    kanban: status,
    employee_id: employee_id,
  });
  const res = await apix({
    port: "onboarding",
    value: "data.data.employee_tasks",
    path: `/api/employee-tasks/employee-kanban${params}`,
    method: "get",
    validate: "array",
  });
  return res;
};
export default Page;
