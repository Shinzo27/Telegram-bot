"use client";
import { useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const ApiKeyManager = () => {
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  const handleAddKey = async () => {
    const response = await fetch(`${backendUrl}/updateApiKey`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    const newKey = await response.json();
    if(newKey.message === 'Api key updated'){
      setApiKey("");
      router.push('/');
      toast.success("Api key updated successfully!")
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">API Key Management</h2>
      <div className="mb-4">
        <Label htmlFor="new-key-name">Enter New Weather Api</Label>
        <div className="flex mt-1">
          <Input
            id="new-key-name"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleAddKey}>Add Key</Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;
