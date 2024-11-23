"use client"
import ApiKeyManager from "@/Components/api-key-manager";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
    const router = useRouter();
    return (
        <div className="p-5">
            <ArrowBigLeft className=" cursor-pointer" onClick={() => router.push('/admin')}/>
            <div className="p-5">
                <ApiKeyManager/>
            </div>
        </div>
    );
}

export default page;