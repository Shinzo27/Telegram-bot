"use client";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Telegram Bot Admin Dashboard</h1>
      <div className=" flex items-center gap-3">
        <Button className="mb-4" onClick={()=>router.push('/users')}>Users</Button>
        <Button className="mb-4" onClick={()=>router.push('/apiKey')}>API Key</Button>
        <Button className="mb-4" onClick={()=>router.push('/manageUser')}>User Management</Button>
      </div>
    </div>
  );
}
