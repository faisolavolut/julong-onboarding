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
          header: "Name",
          renderCell: ({ row, name }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "employee_kanban_progress.total_task",
          header: "Total Task",
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "employee_kanban_progress.to_do",
          header: "To Do",
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "employee_kanban_progress.in_progress",
          header: "In Progress",
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "employee_kanban_progress.need_review",
          header: "Need Review",
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "employee_kanban_progress.completed",
          header: "Completed",
          renderCell: ({ row, name }: any) => {
            return <>{formatMoney(getNumber(getValue(row, name)))}</>;
          },
        },
        {
          name: "action",
          header: "Action",
          filter: false,
          sortable: false,
          renderCell: ({ row }: any) => {
            // const id = row?.id || "858451f3-ac12-4a5c-be9f-411765b70802";
            const id = "858451f3-ac12-4a5c-be9f-411765b70802";
            return (
              <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                <ButtonBetterTooltip
                  href={`/d/task/${id}`}
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
        const params = await events("onload-param", param);
        const result: any = await apix({
          port: "portal",
          value: "data.data.employees",
          path: `/api/employees${params}`,
          validate: "array",
        });
        return result;
      }}
      onCount={async (params) => {
        const result: any = await apix({
          port: "portal",
          value: "data.data.total",
          path: `/api/employees${params}`,
          validate: "object",
        });
        return getNumber(result);
      }}
      onInit={async (list: any) => {}}
    />
  );
}

export default Page;
