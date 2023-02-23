import "./App.scss";
import { useState } from "react";
import { ButtonList } from "./components/ButtonList/ButtonList";
import { Display } from "./components/Display/Display";
import { operators, numbers } from "./variables";
import React from "react";

function App() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("0");
  const [calculated, setCalculated] = useState(false);

  function handleInput(value) {
    const operator = operators.find((operator) => operator === value);
    const number = numbers.find((number) => number === value);
    switch (value) {
      case operator:
        handleOperation(value);
        break;
      case number:
        handleNumber(value);
        break;
      case ".":
        separator(value);
        break;
      case "AC":
        clear();
        break;
      case "C":
        clearLast();
        break;
      case "=":
        evaluate();
        break;
      default:
        setInput("error");
    }
  }

  function handleOperation(operator) {
    let outputCopy = output;

    if (calculated) {
      outputCopy = input;
      setCalculated(false);
    }

    const isPreviousOperator = output[output.length - 1] === operator;

    if (isPreviousOperator) {
      return;
    }

    const last = outputCopy[outputCopy.length - 1];
    if (operator !== "-" && (last === "*" || last === "/" || last === "+")) {
      outputCopy = outputCopy.slice(0, -1);
    } else if (last === "-" && operator !== "-") {
      outputCopy = outputCopy.replace(/[\+\-\*\/]/g, "");
    }

    setInput(operator);
    setOutput(outputCopy + operator);
  }

  function handleNumber(digit) {
    let inputCopy = input;
    let outputCopy = output;

    if ((inputCopy === "0" && (digit === "0" || digit !== "0")) || calculated) {
      inputCopy = "";
      outputCopy = "";
    }

    if (operators.includes(input)) {
      inputCopy = "";
    }

    if (input.length === 9) {
      return;
    }

    setInput(inputCopy + digit);
    setOutput(outputCopy + digit);
  }

  function separator(separator) {
    let inputCopy = input;
    let outputCopy = output;

    if (inputCopy === "0") {
      outputCopy = input;
    }

    if (inputCopy.includes(separator)) {
      return;
    }

    setInput(inputCopy + separator);
    setOutput(outputCopy + separator);
  }

  function clearLast() {
    let inputCopy = input;
    let outputCopy = output;

    if (inputCopy.length !== 0) {
      outputCopy = output.slice(0, -1);
      inputCopy = input.slice(0, -1);
    } else {
      return;
    }

    setInput(inputCopy);
    setOutput(outputCopy);
  }

  function clear() {
    setOutput("");
    setInput("0");
    setCalculated(false);
  }

  function evaluate() {
    const result = eval(output).toString();
    setInput(result);
    setOutput(result);
    setCalculated(true);
  }

  return (
    <div className="wrapper">
      <div className="calculator">
        <Display input={input} output={output} />
        <ButtonList handleInput={handleInput} />
      </div>
    </div>
  );
}

export default App;
