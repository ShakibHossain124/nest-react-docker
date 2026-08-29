import { useState } from "react";

type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};

const initialUsers: User[] = [
  { id: 1, name: "Shakib", isAdmin: true },
  { id: 2, name: "Ahmed", isAdmin: false },
];

export function UserManager() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  return (
    <>
      {users.length !== 0 ? (
        users.map((user) => (
          <div key={user.id}>
            id: {user.id}: {user.name} -{" "}
            {user.isAdmin ? <span>admin</span> : ""}
            <button
              onClick={() => {
                setUsers((prevUser) =>
                  prevUser.filter((e) => e.id !== user.id),
                );
              }}
            >
              delete
            </button>
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
      <button
        onClick={() => {
          setUsers((prev) => [
            ...prev,
            { id: 3, name: "hossain", isAdmin: false },
          ]);
        }}
      >
        add
      </button>
    </>
  );
}
