import { useEffect, useState } from "react";

export function Timer() {
  return <></>;
}

export function CounterEffect() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("tick", count, name);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, name]);

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count:{count}
      </button>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {name}
    </>
  );
}
