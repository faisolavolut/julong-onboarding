"use client";
import { Field } from "@/lib/components/form/Field";
import { FormBetter } from "@/lib/components/form/FormBetter";
import { Alert } from "@/lib/components/ui/alert";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import { ButtonContainer } from "@/lib/components/ui/button";
import { apix } from "@/lib/utils/apix";
import { normalDate } from "@/lib/utils/date";
import { events } from "@/lib/utils/event";
import { useLocal } from "@/lib/utils/use-local";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";

function Page() {
  const [value, onChange] = useState<readonly any[]>([]);
  const labelPage = "Event";
  const urlPage = `/d/event`;
  const local = useLocal({
    can_add: false,
    ready: false as boolean,
    search: null as any,
  });

  useEffect(() => {
    const run = async () => {
      local.can_add = true;
      local.ready = true;
      local.render();
    };
    run();
  }, []);
  const loadOptions = async (
    searchQuery: any,
    loadedOptions: any,
    { page }: any
  ) => {
    const params = await events("onload-param", {
      paging: page,
      take: 10,
      search: searchQuery,
    });
    const result: any = await apix({
      port: "portal",
      value: "data.data.employees",
      path: `/api/employees${params}`,
      validate: "array",
    });
    const responseJSON = result;
    return {
      options: responseJSON,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: searchQuery ? 2 : page + 1,
      },
    };
  };
  if (local.ready && !local.can_add) return notFound();

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
                    title: "New",
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
          method: "post",
          data: {
            ...result,
          },
        });
        if (res) navigate(`${urlPage}/${res?.id}/edit`);
      }}
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
                      const params = await events("onload-param", param);

                      const res: any = await apix({
                        port: "onboarding",
                        value: "data.data.data",
                        path: `/api/template-tasks${params}`,
                        validate: "array",
                        keys: {
                          label: "name",
                        },
                      });
                      return res;
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
                      const params = await events("onload-param", param);
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
