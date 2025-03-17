"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocal } from "@/lib/utils/use-local";
import ServerErrorPage from "../lib/components/comp/500";

function HomePage() {
  const router = useRouter();
  const local = useLocal({
    ready: false,
    access: true,
    jobs: [] as any[],
  });
  useEffect(() => {
    const run = async () => {
      navigate("/d/home");
    };
    run();
  }, []);
  if (local.ready) {
    if (!local.access) return <ServerErrorPage />;
  }
  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center">
      <div className="spinner-better"></div>
    </div>
  );
}

export default HomePage;
