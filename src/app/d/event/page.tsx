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
import { HiOutlinePencilAlt, HiPlus } from "react-icons/hi";
import { events } from "@/lib/utils/event";
import { dayDate } from "@/lib/utils/date";
import get from "lodash.get";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
  });

  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      local.can_add = getAccess("create-events", roles);
      local.can_edit = getAccess("edit-events", roles);
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
          name: "end_date",
          header: () => <span>Due Date</span>,
          renderCell: ({ row, name }: any) => {
            return <>{dayDate(getValue(row, name))}</>;
          },
        },
        {
          name: "status",
          header: () => <span>Status</span>,
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
              <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                <ButtonLink
                  className="bg-primary"
                  href={`/d/event/${get(row, "id")}/edit`}
                >
                  <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                  </div>
                </ButtonLink>
                {/* {["ONGOING"].includes(get(row, "status")) && local?.can_edit ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/event/${get(row, "id")}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/event/${get(row, "id")}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                )} */}
              </div>
            );
          },
        },
      ]}
      onLoad={async (param: any) => {
        const params = await events("onload-param", param);
        const result: any = await apix({
          port: "onboarding",
          value: "data.data.events",
          path: `/api/events${params}`,
          validate: "array",
        });
        return result;
        // return [{}, {}, {}, {}];
      }}
      onCount={async () => {
        const result: any = await apix({
          port: "onboarding",
          value: "data.data.total",
          path: `/api/events?page=1&page_size=1`,
          validate: "object",
        });
        return getNumber(result);
      }}
      onInit={async (list: any) => {}}
    />
  );
}

export default Page;
