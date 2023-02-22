import React from "react";
import { data } from "../../variables";
import { Button } from "../Button/Button";

export function ButtonList({ handleInput }) {
  return (
    <div className="calculator__buttons">
      {data.map(({ value, id }) => (
        <Button key={id} value={value} id={id} handleInput={handleInput} />
      ))}
    </div>
  );
}
