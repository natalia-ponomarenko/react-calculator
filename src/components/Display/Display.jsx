import React from "react";

export function Display({ input, output }) {
  return ( 
    <div className="calculator__display">
    <div className="calculator__display-wrapper">
      <div id="output">{output}</div>
      <div id="display">{input}</div>
    </div>
  </div>
  );
}
