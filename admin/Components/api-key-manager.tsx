"use client";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ApiKey {
  id: string;
  key: string;
  name: string;
}

const ApiKeyManager = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");

  const handleAddKey = async () => {
    const response = await fetch("/api/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newKeyName }),
    });
    const newKey = await response.json();
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
  };

  const handleDeleteKey = async (id: string) => {
    await fetch(`/api/api-keys/${id}`, { method: "DELETE" });
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">API Key Management</h2>
      <div className="mb-4">
        <Label htmlFor="new-key-name">Enter New Weather Api</Label>
        <div className="flex mt-1">
          <Input
            id="new-key-name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleAddKey}>Add Key</Button>
        </div>
      </div>
      <ul className="space-y-2">
        {apiKeys.map((key) => (
          <li key={key.id} className="flex justify-between items-center">
            <span>
              {key.name}: {key.key}
            </span>
            <Button
              variant="destructive"
              onClick={() => handleDeleteKey(key.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiKeyManager;
