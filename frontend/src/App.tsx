import { useState } from "react";
import "./App.css";
// import { Card } from "./components/Card";
// import { NavBar } from "./components/NavBar";
// import { Counter } from "./components/Counter";
// import { CounterEffect } from "./components/CounterEffect";
// import { FetchUsers } from "./components/FetchUsers";
// import { RefFocus } from "./components/RefFocus";
// import { ThemeProvider } from "./components/ThemeProvider";
// import { UserCard } from "./components/UserCard";
// import { UserForm } from "./components/UserForm";
// import { UserManager } from "./components/UserManager";

import { NavBar } from "./contextComponents/NavBar";
import { type User, UserProvider } from "./contexts/UserContext";
// export type User = {
//   name: string;
//   email: string;
//   age: number;
//   isAdmin: boolean;
// };

function App() {
  const [users, setUsers] = useState<User>({
    id: 1,
    name: "shakib",
    email: "s@g.com",
  });
  return (
    <>
      {/* <Card></Card> */}
      {/* <UserCard
          user={{
            name: "shakib",
            email: "shakib@gmail.com",
            age: 25,
            isAdmin: true,
          }}
        ></UserCard>
        <Counter />
        <UserManager />
        <UserForm /> 
        <CounterEffect></CounterEffect> */}
      {/* <FetchUsers></FetchUsers> */}
      {/* <RefFocus></RefFocus> */}

      {/* <ThemeProvider>
        <div>Hello world!</div>
        <NavBar></NavBar>
      </ThemeProvider> */}
      <UserProvider users={users} setUsers={setUsers}>
        <NavBar></NavBar>
      </UserProvider>
    </>
  );
}

export default App;
