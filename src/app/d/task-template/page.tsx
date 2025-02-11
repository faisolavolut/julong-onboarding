"use client";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect, useState } from "react";
import { get_user } from "@/lib/utils/get_user";
import { PinterestLayout } from "@/lib/components/ui/PinterestLayout";
import JobCard from "@/app/components/JobCard";
import { PaginationPage } from "@/lib/components/tablelist/TableList";
import get from "lodash.get";
import { ButtonBetter } from "@/lib/components/ui/button";
import { HiPlus } from "react-icons/hi";
import { ModalPageTemplateTask } from "@/app/components/ModalPageTemplateTask";

function Page() {
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const local = useLocal({
    open: false,
    ready: false,
    access: true,
    data: [] as any[],
    count: 0,
    page: 1,
    maxPage: 100,
  });
  useEffect(() => {
    setIsClient(true);
    const run = async () => {
      try {
        const res = await apix({
          port: "recruitment",
          value: "data.data.job_postings",
          path: `/api${
            get_user("id") ? `/` : `/no-auth/`
          }job-postings?page=1&page_size=15&status=IN PROGRESS`,
          method: "get",
        });

        const count = await apix({
          port: "recruitment",
          value: "data.data.total",
          path: `/api${
            get_user("id") ? `/` : `/no-auth/`
          }job-postings?page=1&page_size=8&status=IN PROGRESS`,
          method: "get",
        });
        local.data = res;
        local.count = count;
        local.maxPage = Math.ceil(getNumber(count) / 15);
        local.render();
      } catch (ex) {}
    };
    run();
  }, []);
  const gotoPage = () => {
    if (isClient) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set(
        "page",
        !getNumber(local.page) ? "1" : `${getNumber(local.page)}`
      );
      window.history.pushState({}, "", currentUrl);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col flex-grow">
      <ModalPageTemplateTask
        open={open}
        onChangeOpen={(e) => {
          setOpen(e);
        }}
      />
      <div className="w-full p-4 py-6 pr-6 pl-3 ">
        <div className="flex flex-row  text-2xl font-bold">Task Template</div>
      </div>
      <div className="w-full p-4 py-6 pr-6 pl-3 flex flex-row">
        <div className="flex flex-grow">
          <ButtonBetter onClick={() => setOpen(true)}>
            <HiPlus className="text-xl" />
            Add New
          </ButtonBetter>
        </div>
        <div className="flex flex-grow"></div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-grow pb-4 justify-start">
          <div className="flex ">
            <PinterestLayout
              gap={4}
              data={local.data}
              child={(item, idx, data, key) => {
                return <JobCard data={item} />;
              }}
              col={4}
            />
          </div>
        </div>

        {local?.maxPage <= 1 ? (
          <></>
        ) : (
          <PaginationPage
            list={local}
            count={local.count}
            onNextPage={() => {
              local.page = local.page + 1;
              local.render();
              gotoPage();
            }}
            onPrevPage={() => {
              local.page = local.page - 1;
              local.render();
              gotoPage();
            }}
            disabledNextPage={
              getNumber(get(local, "page")) ===
                getNumber(get(local, "maxPage")) ||
              getNumber(get(local, "maxPage")) === 1
            }
            disabledPrevPage={getNumber(get(local, "page")) === 1}
            page={getNumber(get(local, "page"))}
            setPage={(page: any) => {}}
            countPage={1}
            countData={local.count}
            take={15}
            onChangePage={(page: number) => {
              local.page = page;
              local.render();
              gotoPage();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
