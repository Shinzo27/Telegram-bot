"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

interface User {
  _id: string;
  username: string;
  userId: string,
  isBlocked: boolean,
  location: string,
}
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const UserList = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${backendUrl}/getUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json()
            setUsers(data)
        }

        fetchUsers()
    }, [])

    return (
        <div>
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Is Blocked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.location}</TableCell>
              <TableCell>{user.isBlocked ? "Blocked" : "Not Blocked"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
}

export default UserList;