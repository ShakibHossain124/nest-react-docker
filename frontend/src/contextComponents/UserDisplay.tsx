import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

export function UserDisplay() {
  const context = useContext(userContext);
  if (context === null) throw new Error("context was not provided");
  const { users } = context;
  return (
    <div>
      {users?.id}
      <br></br>
      {users?.name}
      <br></br>
      {users?.email}
      <br></br>
    </div>
  );
}
