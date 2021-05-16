import React, { createContext, useEffect, useReducer } from "react";
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
    case 'login':
      newState.user = action.payload.user
      break;
    case 'change selectedKey':
      newState.selectedKey = action.payload.selectedKey
      break;
      case 'logout':
        newState.user = action.payload.user
        break;
  }
  return newState;
}

function Index() {
  // Reducer del app
  const [state, dispatch] = useReducer(appReducer, {
    user: {
      id: null,
      nome: null,
      cognome: null,
      tipo: null
    },
    selectedKey: 'home'
  });

  useEffect(() => {
    dispatch({ type: 'login', payload: { user: JSON.parse(localStorage.getItem('user')) } });
  }, [])

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