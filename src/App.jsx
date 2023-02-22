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
        dot(value);
        break;
      case "AC":
        clear();
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

    setInput(operator)
    setOutput(outputCopy + operator)
  }

  function handleNumber(digit) {
    let inputCopy = input;
    let outputCopy = output;

    if (inputCopy === '0' && digit === '0') {
      inputCopy = '';
      outputCopy = '';
    }

    if (inputCopy === '0' && digit !== '0') {
      inputCopy = '';
    }
    
    if(operators.includes(input)) {
      inputCopy = '';
    }

    if (calculated) {
      outputCopy = '';
      inputCopy = '';
      setCalculated(false)
    } 


    setInput(inputCopy + digit)
    setOutput(outputCopy + digit)
  }

  function dot(dot) {
    let inputCopy = input;
    let outputCopy = output;

    if(inputCopy === '0') {
      outputCopy = input;
    }

    if(inputCopy.includes(dot)) {
      return; 
    }

    setInput(inputCopy + dot)
    setOutput(outputCopy + dot)
  }

  function clear() {
    setOutput("");
    setInput("0");
    setCalculated(false)
  }

  function evaluate() {
    let outputCopy = output;

    const result = eval(outputCopy).toString();
    setInput(result)
    setOutput(result)
    setCalculated(true)
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
