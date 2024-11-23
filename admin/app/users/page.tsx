"use client"
import UserList from "@/Components/UserList";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    return (
        <div className="p-5">
            <ArrowBigLeft className=" cursor-pointer" onClick={() => router.push('/admin')}/>
            <div className="p-5">
                <UserList/>
            </div>
        </div>
    );
}

export default page;