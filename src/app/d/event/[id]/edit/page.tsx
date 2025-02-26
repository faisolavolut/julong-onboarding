"use client";

import { getParams } from "@/lib/utils/get-params";

import { Field } from "@/lib/components/form/Field";
import { FormBetter } from "@/lib/components/form/FormBetter";
import { Alert } from "@/lib/components/ui/alert";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import { ButtonContainer } from "@/lib/components/ui/button";
import { apix } from "@/lib/utils/apix";
import { useLocal } from "@/lib/utils/use-local";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { actionToast } from "@/lib/utils/action";
import { normalDate } from "@/lib/utils/date";
import { events } from "@/lib/utils/event";

function Page() {
  const id = getParams("id");
  const labelPage = "Events";
  const urlPage = `/d/master-data/document-checking`;
  const local = useLocal({
    can_edit: false,
    ready: false as boolean,
  });

  useEffect(() => {
    const run = async () => {
      local.can_edit = true;
      local.ready = true;
      local.render();
    };
    run();
  }, []);

  if (local.ready && !local.can_edit) return notFound();

  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col py-4 pt-0 pb-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900">
                <span className="">{labelPage}</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: `List ${labelPage}`,
                    url: urlPage,
                  },
                  {
                    title: "Edit",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <Alert
                type={"save"}
                msg={"Are you sure you want to save this record?"}
                onClick={() => {
                  fm.submit();
                }}
              >
                <ButtonContainer className={"bg-primary"}>
                  <IoMdSave className="text-xl" />
                  Save
                </ButtonContainer>
              </Alert>

              <Alert
                type={"delete"}
                msg={"Are you sure you want to delete this record?"}
                onClick={async () => {
                  await actionToast({
                    task: async () => {
                      await apix({
                        port: "recruitment",
                        path: `/api/events/${id}`,
                        method: "delete",
                      });
                    },
                    after: () => {
                      navigate(urlPage);
                    },
                    msg_load: "Delete ",
                    msg_error: "Delete failed ",
                    msg_succes: "Delete success ",
                  });
                }}
              >
                <ButtonContainer variant={"destructive"}>
                  <MdDelete className="text-xl" />
                  Delete
                </ButtonContainer>
              </Alert>
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        const result = {
          ...fm.data,
          start_date: normalDate(fm?.data?.start_date),
          end_date: normalDate(fm?.data?.end_date),
          event_employees: fm.data.employees?.length
            ? fm.data.employees.map((e: any) => {
                if (e?.check) {
                  return {
                    ...e,
                    id: e?.id_event_employee,
                    employee_id: e?.id,
                  };
                }
                return {
                  employee_id: e?.id,
                };
              })
            : [],
        };
        const res = await apix({
          port: "onboarding",
          value: "data.data",
          path: "/api/events",
          method: "put",
          data: {
            ...result,
          },
        });
      }}
      onLoad={async () => {
        const data: any = await apix({
          port: "onboarding",
          value: "data.data",
          path: `/api/events/${id}`,
          validate: "object",
        });
        return {
          ...data,
          employees: data?.event_employees?.length
            ? data.event_employees.map((e: any) => {
                return {
                  ...e,
                  check: true,
                  id_event_employee: e?.id,
                  id: e?.employee_id,
                  name: e?.employee_name,
                };
              })
            : [],
        };
      }}
      showResize={false}
      header={(fm: any) => {
        return <></>;
      }}
      children={(fm: any) => {
        return (
          <>
            <div className={"flex flex-col flex-wrap px-4 py-2"}>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                <div>
                  <Field
                    fm={fm}
                    name={"name"}
                    label={"Event Name"}
                    type={"text"}
                    required={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    target={"template_task_id"}
                    name={"template_task"}
                    label={"Template"}
                    type={"dropdown-async"}
                    onLoad={async (param: any) => {
                      const params = await events("onload-param", {
                        ...param,
                        status: "ACTIVE",
                      });

                      const res: any = await apix({
                        port: "onboarding",
                        value: "data.data.data",
                        path: `/api/template-tasks${params}`,
                        validate: "array",
                        keys: {
                          label: "name",
                        },
                      });
                    }}
                    onLabel={"name"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"start_date"}
                    label={"Start Date"}
                    type={"date"}
                    required={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"end_date"}
                    label={"Due Date"}
                    type={"date"}
                    required={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"employees"}
                    label={"Assignees"}
                    type={"multi-async"}
                    required={true}
                    onLoad={async (param: any) => {
                      const params = await events("onload-param", {
                        ...param,
                        is_onboarding: "NO",
                      });
                      const result: any = await apix({
                        port: "portal",
                        value: "data.data.employees",
                        path: `/api/employees${params}`,
                        validate: "array",
                      });
                      return result;
                    }}
                    onValue={(option) => option.id}
                    onLabel={(option) => option.name}
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    fm={fm}
                    name={"description"}
                    label={"Noted"}
                    type={"textarea"}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
}

export default Page;
