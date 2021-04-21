import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import "./styles.css";
import App from "./App";

// App's root element
const rootElement = document.getElementById("root");

// App's contenxt
export const AppContext = createContext(null);

// App's reducer
function appReducer(state, action) {
  let newState = { ...state };
  switch (action.type) {
    // azioni
  }
  return newState;
}

function Index() {
  // Reducer del app
  const [state, dispatch] = useReducer(appReducer, {});

  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        <App />
      </AppContext.Provider>
    </>
  );
}

// Renderizzazione dell'app
ReactDOM.render(
  <Index />
  , rootElement
);

// Fetch URL
// http://localhost:63342/server-side/