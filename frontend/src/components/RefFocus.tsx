import { useRef } from "react";

export function RefFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        Focus
      </button>
    </>
  );
}
