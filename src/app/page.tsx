"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocal } from "@/lib/utils/use-local";
import ServerErrorPage from "../lib/components/comp/500";
import Link from "next/link";

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
    <div className="flex flex-col max-w-screen bg-white">
      Direct to <Link href="/d/home">Dashboard</Link>
    </div>
  );
}

export default HomePage;
