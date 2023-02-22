import React from "react";

export function Button({ value, id, handleInput }) {
  return (
    <div
      className="calculator__button"
      id={id}
      onClick={() => handleInput(value)}
    >
      {value}
    </div>
  );
}
