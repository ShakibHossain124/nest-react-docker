import { useState, useEffect, useRef } from "react";
import { fetchUsers } from "../api/user.api";
import type { User } from "../types/user.types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const controllerRef = useRef<AbortController>(null)

  async function loadUsers() {
    const controller = new AbortController()
      try {
        controllerRef.current?.abort()
        controllerRef.current = controller
        setLoading(true)
        const responseData = await fetchUsers(controllerRef.current.signal);
        if(controller !== controllerRef.current)
          return
        setUsers(responseData.data);
        
      } catch (err) {
        if(controller !== controllerRef.current)
          return
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if(controller !== controllerRef.current)
          return
        setLoading(false);
        console.log("done");
      }
    }

  useEffect(() => {
    loadUsers();

    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
  };
}
