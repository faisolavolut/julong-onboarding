"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import { useLocal } from "@/lib/utils/use-local";
import { access } from "@/lib/utils/getAccess";
import { notFound } from "next/navigation";
import { siteurl } from "@/lib/utils/siteurl";

interface RootLayoutProps {
  children: React.ReactNode;
}
const permision = ["read-mpp-dir-unit"];

const ValidateLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const local = useLocal({
    user: null as any,
    data: [] as any[],
    ready: false,
    access: false as boolean,
  });
  useEffect(() => {
    setIsClient(true);
    const run = async () => {
      try {
        let can_access = false;
        permision.map((e) => {
          if (!can_access) {
            can_access = access(e);
          }
        });
        local.access = can_access;
        local.ready = true;
        local.render();
      } catch (e) {}
    };
    run();
  }, []);
  if (!isClient) return <></>;
  if (!local.ready)
    return (
      <div className="flex-grow flex-grow flex flex-row items-center justify-center">
        <div className="spinner-better"></div>
      </div>
    );
  if (!local.access) notFound();
  return (
    <div
      className={cx(
        "flex flex-col flex-grow  flex-grow py-3  bg-cover bg-no-repeat	 bg-right-bottom",
        css`
          background-image: url("${siteurl("/bg-circle.png")}");
        `
      )}
    >
      <main className="flex-grow flex flex-col p-4 pb-0 pt-0 pr-6 pl-3">
        {children}
      </main>
    </div>
  );
  return;
};

export default ValidateLayout;
