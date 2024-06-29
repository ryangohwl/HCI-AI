import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { Tldraw } from "tldraw";

function App() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw />
    </div>
  );
}

export default App;
