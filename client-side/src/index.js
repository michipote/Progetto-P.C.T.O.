import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "./components/Home";
import { Reservation } from "./components/Reservation";
import 'antd/dist/antd.css';
import "./styles.css";
import { Annulment } from "./components/Annulment";

// App's root element
const rootElement = document.getElementById("root");

// App's contenxt
export const AppContext = createContext(null);

//App's reducer
function appReducer(state, action) {
  let newState = { ...state };
  switch (action.type) {
    //actions
  }
  return newState;
}

function App() {
  // App's state
  const [state, dispatch] = useReducer(appReducer, {});

  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route path="/annulment">
              <Home children={<Annulment />} />
            </Route>
            <Route path="/reservation">
              <Home children={<Reservation />} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </>
  );
}

ReactDOM.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
  , rootElement
);

// Fetch URL
// http://localhost:63342/server-side/