"use client";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect, useState } from "react";
import { PinterestLayout } from "@/lib/components/ui/PinterestLayout";
import JobCard from "@/app/components/JobCard";
import { PaginationPage } from "@/lib/components/tablelist/TableList";
import get from "lodash.get";
import { ButtonBetter } from "@/lib/components/ui/button";
import { HiPlus } from "react-icons/hi";
import { ModalPageTemplateTask } from "@/app/components/ModalPageTemplateTask";
import { events } from "@/lib/utils/event";
import { actionToast } from "@/lib/utils/action";
import { get_params_url } from "@/lib/utils/getParamsUrl";
import { InputSearch } from "@/lib/components/ui/input-search";
function Page() {
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const take = 6;
  const local = useLocal({
    open: false,
    ready: false,
    access: true,
    search: null as any,
    selected: null as any,
    data: [] as any[],
    count: 0,
    page: 1,
    maxPage: 100,
    reload: async () => {
      try {
        await actionToast({
          task: async () => {
            local.ready = false;
            local.render();
            const params = await events("onload-param", {
              paging: local.page,
              take: take,
              search: local.search,
            });
            const res = await apix({
              port: "onboarding",
              value: "data.data.data",
              path: `/api/template-tasks${params}`,
              method: "get",
              validate: "array",
            });
            const paramCount = await events("onload-param", {
              paging: 1,
              take: 1,
              search: local.search,
            });
            const count = await apix({
              port: "onboarding",
              value: "data.data.meta.total",
              path: `/api/template-tasks${paramCount}`,
              method: "get",
            });
            local.data = res;
            local.count = count;
            local.maxPage = Math.ceil(getNumber(count) / take);
            local.render();
          },

          after: () => {
            local.ready = true;
            local.render();
          },
          failed: () => {
            local.ready = true;
            local.data = [];
            local.render();
          },
          msg_load: "Get data ",
          msg_error: "Get data failed ",
          msg_succes: "Get data success ",
        });
      } catch (ex) {}
    },
  });
  useEffect(() => {
    setIsClient(true);
    const run = async () => {
      const page = get_params_url("page");
      local.page = getNumber(page) ? getNumber(page) : 1;
      local.render();
      await local.reload();
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
      local.reload();
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
        onSubmit={async () => {
          setOpen(false);
          local.page = 1;
          local.render();
          await local.reload();
        }}
        onLoad={async () => {
          if (local.selected) {
            const res = await apix({
              port: "onboarding",
              value: "data.data",
              path: `/api/template-tasks/${local.selected.id}`,
              method: "get",
            });
            console.log({
              ...res,
              cover: res?.cover_path,
              cover_path: res?.cover_path_origin,
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
            priority: "HIGH",
            status: "ACTIVE",
            cover: result?.[0]?.path,
            cover_path: result?.[0]?.path_origin,
          };
        }}
      />
      <div className="w-full p-4 py-6 pr-6 pl-3 pb-1">
        <div className="flex flex-row  text-2xl font-bold">Task Template</div>
      </div>
      <div className="w-full p-4 py-6 pr-6 pl-3 flex flex-row pt-2">
        <div className="flex flex-grow">
          <ButtonBetter
            onClick={() => {
              local.selected = null;
              local.render();
              setOpen(true);
            }}
          >
            <HiPlus className="text-xl" />
            Add New
          </ButtonBetter>
        </div>
        <div className="flex flex-grow justify-end">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await local.reload();
            }}
          >
            <div className="relative  lg:w-56">
              <InputSearch
                className="bg-white search "
                id="users-search"
                name="users-search"
                placeholder={`Search`}
                delay={1000}
                onChange={(e) => {
                  const value = e.target.value;
                  local.search = value;
                  local.render();
                  local.reload();
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col flex-grow px-2 pb-2">
        {local.ready ? (
          <>
            <div className="flex flex-grow pb-4 flex-col">
              <div className="flex">
                <PinterestLayout
                  gap={4}
                  data={local.data}
                  child={(item, idx, data, key) => {
                    return (
                      <JobCard
                        data={item}
                        onClick={async () => {
                          local.selected = item;
                          local.render();
                          setOpen(true);
                        }}
                      />
                    );
                  }}
                  col={3}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-grow pb-4 justify-center items-center">
              <div className="flex-grow flex-grow flex flex-row items-center justify-center">
                <div className="spinner-better"></div>
              </div>
            </div>
          </>
        )}

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
            take={take}
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
