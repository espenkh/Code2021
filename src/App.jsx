import React, { useState } from "react";
import "./styles.css";
import Renderer from "./Renderer";
import JsonViewer from "./JsonViewer";

export default function App() {
  // Storing the initial JSON value inside of a variable.
  // This basically gives us a (const jsonValue) and a (function setJsonValue) with which changes jsonValue
  const [jsonValue, setJsonValue] = useState(
    //JSON.stringify(require("./TASK_examples/basic_example_input.json"))
    JSON.stringify(require("./data.json"))
  );

  return (
    <div className="App">
      <h1 style={{ color: "black" }}>Gutta Browse Consulting</h1>
      <div className="App-container">
        <div className="App-container__json-viewer">
          <JsonViewer jsonValue={jsonValue} setJsonValue={setJsonValue} />
        </div>
        <div className="App-container__renderer">
          <Renderer jsonValue={jsonValue} />
        </div>
      </div>
    </div>
  );
}
