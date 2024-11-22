"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

interface User {
    id: number
    username: string
    firstName: string
    lastName: string
    status: "active" | "blocked"
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        // Replace this with your actual API call
        const fetchUsers = async () => {
            // const response = await fetch("/api/users")
            // const data = await response.json()
            // setUsers(data)
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
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
}

export default UserList;