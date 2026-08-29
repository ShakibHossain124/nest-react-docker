import type { User } from "../App";

type UserProps = {
  user: User;
};

export function UserCard({ user }: UserProps) {
  return (
    <>
      name: {user.name} <br />
      email: {user.email} <br />
      age: {user.age} <br />
      isAdmin: {user.isAdmin} <br />
    </>
  );
}
