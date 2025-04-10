"use client";
import { apix } from "@/lib/utils/apix";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { ButtonLink } from "@/lib/components/ui/button-link";
import get from "lodash.get";
import { events } from "@/lib/utils/event";
import { dayDate } from "@/lib/utils/date";
import { IoEye } from "react-icons/io5";
import { RiDownloadCloudLine } from "react-icons/ri";
import { ButtonBetter } from "@/lib/components/ui/button";
import { actionToast } from "@/lib/utils/action";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
  });

  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      local.can_add = getAccess("create-survey", roles);
      local.can_edit = getAccess("edit-survey", roles);
      local.render();
    };
    run();
  }, []);
  return (
    <TableUI
      title="Survey Result"
      name="mpr"
      header={{
        sideLeft: (data: any) => {
          return <></>;
        },
        sideRight: (data: any) => {
          return (
            <div className="flex flex-row flex-grow">
              <ButtonBetter
                className="bg-primary"
                onClick={async () => {
                  await actionToast({
                    task: async () => {
                      // const res = await apix({
                      //   port: "recruitment",
                      //   method: "get",
                      //   value: "data",
                      //   options: {
                      //     responseType: "blob",
                      //     headers: {
                      //       Accept:
                      //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Memastikan format yang benar
                      //     },
                      //   },
                      //   path: `/api/applicants/job-posting/${id_posting}/export`,
                      // });
                      // const url = window.URL.createObjectURL(new Blob([res]));
                      // const link = document.createElement("a");
                      // link.href = url;
                      // link.setAttribute("download", "export-applicant.xlsx");
                      // document.body.appendChild(link);
                      // link.click();
                    },
                    msg_load: "Download Survey Result",
                    msg_error: "Download Survey Result Failed",
                    msg_succes: "Download Survey Result Success",
                  });
                }}
              >
                <div className="flex items-center gap-x-0.5">
                  <RiDownloadCloudLine className="text-xl" />
                  <span className="capitalize">Export</span>
                </div>
              </ButtonBetter>
            </div>
          );
        },
      }}
      column={[
        {
          name: "survey_template.title",
          header: "Title Survey",
          renderCell: ({ row, name }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "employee_name",
          header: "Employee",
          renderCell: ({ row, name }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "date_submitted",
          header: "Date Submitted",
          type: "date",
          renderCell: ({ row, name }: any) => {
            return <>{dayDate(getValue(row, name))}</>;
          },
        },
        {
          name: "action",
          header: "Action",
          filter: false,
          sortable: false,
          renderCell: ({ row }: any) => {
            return (
              <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                <ButtonLink
                  className="bg-primary"
                  href={`/d/survey-result/${get(row, "id")}/view`}
                >
                  <div className="flex items-center gap-x-2">
                    <IoEye className="text-lg" />
                  </div>
                </ButtonLink>
              </div>
            );
          },
        },
      ]}
      onLoad={async (param: any) => {
        const params = await events("onload-param", param);
        const result: any = await apix({
          port: "onboarding",
          value: "data.data.survey_templates",
          path: `/api/employee-tasks/survey${params}`,
          validate: "array",
        });
        return result;
      }}
      onCount={async (param) => {
        const result: any = await apix({
          port: "onboarding",
          value: "data.data.total",
          path: `/api/employee-tasks/survey${param}`,
          validate: "object",
        });
        return getNumber(result);
      }}
      onInit={async (list: any) => {}}
    />
  );
}

export default Page;
