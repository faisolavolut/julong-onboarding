"use client";
import { apix } from "@/lib/utils/apix";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import { events } from "@/lib/utils/event";
import JobCard from "@/app/components/JobCard";
import { ListUI } from "@/lib/components/list/ListUI";
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
      const roles = await userRoleMe();
      local.can_add = getAccess("create-mpr", roles);
      local.can_edit = getAccess("edit-mpr", roles);
      const result: any = await apix({
        port: "recruitment",
        value: "data.data.total",
        path: `/api/mp-requests?page=1&page_size=1`,
        validate: "object",
      });
      const completed: any = await apix({
        port: "recruitment",
        value: "data.data.total",
        path: `/api/mp-requests?page=1&page_size=1`,
        validate: "object",
      });
      local.list = [
        { id: "on_going", name: "On Going", count: getNumber(result) },
        { id: "completed", name: "Completed", count: getNumber(completed) },
      ];
      local.render();
    };
    run();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <div className="w-full p-4 py-6 pr-6 pl-3 ">
        <div className="flex flex-row  text-2xl font-bold">Progress Task</div>
        <BreadcrumbBetterLink
          data={[
            {
              title: "List Job Posting",
              url: "/d/interview/result-interview",
            },
            {
              title: "List Applicant",
              // url: "/d/interview/result-interview/" + id_posting,
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 flex-grow pb-3">
        <ListUI
          name="todo"
          title={({ ui, count }: any) => {
            console.log(formatMoney(getNumber(count)));
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
                <JobCard data={item} />
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
              value: "data.data.total",
              path: `/api/organizations?page=1&page_size=1`,
              validate: "object",
            });
            return getNumber(result);
          }}
        />
        <ListUI
          name="in_progress"
          title={({ ui, count }: any) => {
            console.log(formatMoney(getNumber(count)));
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
                <JobCard data={item} />
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
              value: "data.data.total",
              path: `/api/organizations?page=1&page_size=1`,
              validate: "object",
            });
            return getNumber(result);
          }}
        />
        <ListUI
          name="need_review"
          title={({ ui, count }: any) => {
            console.log(formatMoney(getNumber(count)));
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
                <JobCard data={item} />
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
              value: "data.data.total",
              path: `/api/organizations?page=1&page_size=1`,
              validate: "object",
            });
            return getNumber(result);
          }}
        />
        <ListUI
          name="completed"
          title={({ ui, count }: any) => {
            console.log(formatMoney(getNumber(count)));
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
                <JobCard data={item} />
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
              value: "data.data.total",
              path: `/api/organizations?page=1&page_size=1`,
              validate: "object",
            });
            return getNumber(result);
          }}
        />
      </div>
    </div>
  );
}

export default Page;
