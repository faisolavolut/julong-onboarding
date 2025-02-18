"use client";
import { apix } from "@/lib/utils/apix";
import { events } from "@/lib/utils/event";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { IoEye } from "react-icons/io5";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { ButtonBetterTooltip } from "@/lib/components/ui/button";
import { formatMoney } from "@/lib/components/form/field/TypeInput";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    tab: "on_going",
    list: [
      { id: "on_going", name: "On Going", count: 0 },
      { id: "completed", name: "Completed", count: 0 },
    ],
  });

  useEffect(() => {
    const run = async () => {
      local.render();
    };
    run();
  }, []);

  return (
    <TableUI
      title="Employee"
      name="mpr"
      header={{
        sideLeft: (data: any) => {
          return <></>;
        },
      }}
      column={[
        {
          name: "name",
          header: () => <span>Name</span>,
          renderCell: ({ row, name }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "total_task",
          header: () => <span>Total Task</span>,
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "todo",
          header: () => <span>To Do</span>,
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "in_progress",
          header: () => <span>In Progress</span>,
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "need_review",
          header: () => <span>Need Review</span>,
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "completed",
          header: () => <span>Completed</span>,
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "action",
          header: () => <span>Action</span>,
          sortable: false,
          renderCell: ({ row }: any) => {
            return (
              <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                <ButtonBetterTooltip
                  href={`/d/task/${row?.id}`}
                  tooltip={"View Task Employee"}
                  className="bg-primary"
                >
                  <div className="flex items-center gap-x-2">
                    <IoEye className="text-lg" />
                  </div>
                </ButtonBetterTooltip>
              </div>
            );
          },
        },
      ]}
      onLoad={async (param: any) => {
        return [
          { id: 1, name: "Employee 1" },
          { id: 2, name: "Employee 2" },
          { id: 3, name: "Employee 3" },
          { id: 4, name: "Employee 4" },
        ];
        const params = await events("onload-param", param);
        const result: any = await apix({
          port: "recruitment",
          value: "data.data.mp_request_header",
          path: `/api/mp-requests${params}`,
          validate: "array",
        });
        return result;
      }}
      onCount={async () => {
        return 4;
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
