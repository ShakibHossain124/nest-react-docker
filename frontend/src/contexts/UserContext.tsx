import { createContext, type ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface userContextValue {
  users: User;
  setUsers: React.Dispatch<React.SetStateAction<User>>;
}

export const userContext = createContext<userContextValue | null>(null);

export function UserProvider({
  children,
  users,
  setUsers,
}: {
  children: ReactNode;
  users: User;
  setUsers: React.Dispatch<React.SetStateAction<User>>;
}) {
  return (
    <userContext.Provider value={{ users, setUsers }}>
      {children}
    </userContext.Provider>
  );
}
