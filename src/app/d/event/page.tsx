"use client";
import { apix } from "@/lib/utils/apix";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";
import { getStatusLabel } from "@/constants/status-mpp";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { ButtonLink } from "@/lib/components/ui/button-link";
import { HiPlus } from "react-icons/hi";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
  });

  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      local.can_add = getAccess("create-applicant-result", roles);
      local.can_edit = getAccess("edit-applicant-result", roles);
      local.render();
    };
    run();
  }, []);
  return (
    <TableUI
      title="Events"
      name="mpr"
      header={{
        sideLeft: (data: any) => {
          // return <></>;

          return (
            <div className="flex flex-row flex-grow">
              <ButtonLink className="bg-primary" href={"/d/event/new"}>
                <div className="flex items-center gap-x-0.5">
                  <HiPlus className="text-xl" />
                  <span className="capitalize">Add New</span>
                </div>
              </ButtonLink>
            </div>
          );
        },
      }}
      column={[
        {
          name: "name",
          header: () => <span>Event Name</span>,
          renderCell: ({ row, name }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "due_date",
          header: () => <span>Due Date</span>,
          renderCell: ({ row, name }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "assignees",
          header: () => <span>Assignees</span>,
          renderCell: ({ row, name }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "status",
          header: () => <span>Status Recruitment</span>,
          renderCell: ({ row, name }: any) => {
            return <>{getStatusLabel(getValue(row, name))}</>;
          },
        },
        {
          name: "action",
          header: () => <span>Action</span>,
          sortable: false,
          renderCell: ({ row }: any) => {
            return (
              <div className="flex items-center gap-x-0.5 whitespace-nowrap"></div>
            );
          },
        },
      ]}
      onLoad={async (param: any) => {
        // const params = await events("onload-param", param);
        // const result: any = await apix({
        //   port: "recruitment",
        //   value: "data.data.mp_request_header",
        //   path: `/api/mp-requests${params}`,
        //   validate: "array",
        // });
        return [{}, {}, {}, {}];
        // return result;
      }}
      onCount={async () => {
        const result: any = await apix({
          port: "recruitment",
          value: "data.data.total",
          path: `/api/mp-requests?page=1&page_size=1`,
          validate: "object",
        });
        return getNumber(result);
      }}
      onInit={async (list: any) => {}}
    />
  );
}

export default Page;
