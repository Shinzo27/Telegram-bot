"use client";

import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useRouter } from "next/navigation";
import Loader from "@/Components/ui/Loader";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  username: string;
  userId: string,
  isBlocked: boolean,
  location: string,
}
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch(`${backendUrl}/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId: string, status: boolean) => {
    setLoading(true);
    if(status === false) {
      try {
        const response = await fetch(`${backendUrl}/blockUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const updatedUser = await response.json();
        setUsers(updatedUser.users);
        toast.success("User blocked successfully");
        router.push('/')
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if (status === true) {
      try {
        const response = await fetch(`${backendUrl}/unblockUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const updatedUser = await response.json();
        setUsers(updatedUser.users);
        toast.success("User unblocked successfully");
        router.push("/");
      } catch (error) {
      console.log(error);   
      } finally {
        setLoading(false);
      }
    }
  };

  return loading ? <Loader/> : (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="mb-4">
        <Label htmlFor="search-users">Search Users</Label>
        <Input
          id="search-users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter username"
          className="mt-1"
        />
      </div>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.userId} className="flex justify-between items-center">
            <span>{user.username}</span>
            <Button
              onClick={() => handleToggleStatus(user.userId, user.isBlocked)}
              variant={user.isBlocked ? "destructive" : "default"}
            >
              {!user.isBlocked ? "Block" : "Unblock"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManager;
