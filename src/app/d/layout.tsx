"use client";
import "@/app/globals.css";
import { configMenu } from "./config-menu";
import { useEffect, useState } from "react";
import get from "lodash.get";
import { useLocal } from "@/lib/utils/use-local";
import api from "@/lib/utils/axios";
import { userRoleMe } from "@/lib/utils/getAccess";
import { filterMenuByPermission } from "@/lib/utils/filterMenuByPermission";
import { Skeleton } from "@/lib/components/ui/Skeleton";
import { SidebarProvider } from "@/lib/context/SidebarContext";
import { Navbar } from "flowbite-react";
import { siteurl } from "@/lib/utils/siteurl";
import SidebarBetterTree from "@/lib/components/partials/SidebarBetter";
import { SheetBetter } from "@/lib/components/ui/sheet";
import { IoIosArrowBack } from "react-icons/io";
import { Menu } from "@/lib/svg/Menu";
import { Bell, Home } from "lucide-react";
import { NotificationSheet } from "@/lib/components/ui/notification";
import { ButtonLink } from "@/lib/components/ui/button-link";

interface RootLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [mini, setMini] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const local = useLocal({
    user: null as any,
    data: [] as any[],
    ready: false,
  });
  useEffect(() => {
    setIsClient(true);
    const localMini = localStorage.getItem("mini");
    if (!localMini) {
      localStorage.setItem("mini", mini ? "true" : "false");
    } else {
      setMini(localMini === "true" ? true : false);
    }
    if (typeof location === "object") {
      const newPage = window.location.pathname;
      setCurrentPage(newPage);
    }
    const run = async () => {
      try {
        const user = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
        );
        local.user = user?.data?.data;
        if (typeof window === "object") {
          const w = window as any;
          w.user = user?.data?.data;
        }
        const roles = await userRoleMe();
        const permision = get(roles, "[0].permissions");
        const menuMe = filterMenuByPermission(configMenu, permision);
        local.data = menuMe;
        local.ready = true;
        local.render();
        if (!user?.data.data) {
          navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
        }
      } catch (e) {
        navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
      }
    };
    run();
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className=" flex-col p-3 bg-layer hidden md:flex">
        <div className=" flex-col flex-grow rounded-2xl shadow-md flex">
          <Navbar fluid className="pb-0 bg-white relative rounded-t-2xl">
            <div className="w-full p-1 pb-0">
              <div
                className={`flex items-center ${
                  mini ? "justify-center" : "justify-between"
                }`}
              >
                <div
                  className={`flex items-center ${
                    mini ? "justify-center" : "p-2"
                  }`}
                >
                  {mini ? (
                    <div className="w-10">
                      <img
                        src={siteurl("/logo.png")}
                        alt="John Cena"
                        className=" w-full h-full object-cover "
                      />
                    </div>
                  ) : (
                    <Navbar.Brand
                      href="/"
                      className="flex flex-row items-center justify-center"
                    >
                      <img
                        alt=""
                        src={siteurl("/logo-full.png")}
                        className="w-32"
                      />
                      <span className="self-center whitespace-nowrap text-2xl font-semibold text-black"></span>
                    </Navbar.Brand>
                  )}
                </div>
              </div>
            </div>
          </Navbar>
          {!local.ready ? (
            <div className="relative bg-primary w-64">
              <div
                className={cx(
                  "absolute",
                  css`
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  `
                )}
              >
                <div className="flex flex-grow flex-row items-center justify-center">
                  <div className="flex flex-col gap-y-2">
                    <div className="flex flex-row gap-x-2">
                      <Skeleton className="h-24 flex-grow" />
                      <Skeleton className="h-24 flex-grow" />
                    </div>
                    <Skeleton className="h-24 w-[230px]" />
                    <div className="flex flex-row gap-x-2">
                      <Skeleton className="h-24 flex-grow" />
                      <Skeleton className="h-24 flex-grow" />
                    </div>
                    <Skeleton className="h-24 w-[230px]" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SidebarProvider>
              <SidebarBetterTree
                data={local.data}
                minimaze={() => {
                  setMini(!mini);
                }}
                mini={mini}
              />
            </SidebarProvider>
          )}
        </div>
      </div>
      <div className="flex  bg-layer flex-grow flex-col ">
        <div className="flex flex-col md:flex-row  flex-grow">
          <div
            id="main-content"
            className="flex-grow  relative overflow-y-auto flex flex-row"
          >
            <div className="w-full h-full absolute top-0 lef-0 flex flex-row  p-4 pb-0 pt-0 pr-0  pl-1 md:pl-3">
              {isClient ? (
                <main className="flex-grow flex flex-col">{children}</main>
              ) : (
                <>Loading</>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* MENU MOBILE */}
      <div
        className={cx(
          "flex md:hidden flex-row  sticky bottom-0 left-0",
          css`
            z-index: 1;
          `
        )}
      >
        <div
          className={cx(
            "w-full bg-white shadow-md border border-primary text-white flex justify-around py-3 rounded-t-2xl flex-row items-center",
            css`
              z-index: 1;
            `
          )}
        >
          <div className="flex flex-row items-center">
            <ButtonLink
              variant="clean"
              href="/d/home"
              onClick={() => {
                setCurrentPage("/d/home");
              }}
            >
              <div
                className={cx(
                  currentPage === "/d/home" ? "text-primary" : "text-gray-500"
                )}
              >
                <Home className="w-6 h-6" />
              </div>
            </ButtonLink>
          </div>

          <div className={cx("text-gray-500 flex flex-row items-center")}>
            <NotificationSheet
              className="text-gray-500"
              children={<Bell size={24} />}
            />
          </div>
          <SheetBetter
            open={isOpen}
            contentOpen={
              <div>
                <Menu className="w-6 h-6 text-gray-500" />
              </div>
            }
            side="left"
            onOpenChange={(event) => {
              setOpen(event);
            }}
            showClose={false}
            className="p-0"
          >
            <div className="flex flex-col h-full">
              <div className="flex flex-row py-4 items-center  px-6 ">
                <div
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="flex flex-row items-center gap-x-2 text-gray-500 cursor-pointer"
                >
                  <IoIosArrowBack className="h-6 w-6" />
                  Back
                </div>
              </div>
              <div className="flex flex-col gap-y-2 flex-grow">
                <SidebarProvider>
                  <SidebarBetterTree
                    data={local.data}
                    minimaze={() => {
                      setMini(!mini);
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}
                    mini={false}
                  />
                </SidebarProvider>
              </div>
            </div>
          </SheetBetter>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
