import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          setCount(count + 1);
          setCount((prev) => prev + 1);
        }}
      >
        +
      </button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount((prev) => prev + 3)}>+</button>
    </>
  );
}
