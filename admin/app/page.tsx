import ApiKeyManager from "@/Components/api-key-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import UserList from "@/Components/UserList";
import UserManager from "@/Components/UserManager";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Telegram Bot Admin Dashboard</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserList />
        </TabsContent>
        <TabsContent value="api-keys">
          <ApiKeyManager />
        </TabsContent>
        <TabsContent value="user-management">
          <UserManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
