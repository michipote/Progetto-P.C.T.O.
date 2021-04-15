import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// App's root element
const rootElement = document.getElementById("root");

// App's contenxt
export const AppContext = createContext(null);


function App() {
  return (
    <>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);