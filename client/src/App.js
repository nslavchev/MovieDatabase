import React, { useEffect, useState } from 'react';
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import Home from "./components/Home.js";
import {userContext} from "./userContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AdminPanel from './components/AdminPanel.js';
import {checkAuthentication, checkAdmin} from "./api"
import MovieDetail from './components/MovieDetail.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getIsAuthenticated = async () => {
        const result = await checkAuthentication();
        setIsAuthenticated(result.data);
    };

    const getIsAdmin = async () => {
        const result = await checkAdmin();
        setIsAdmin(result.data);
    };

    getIsAuthenticated();
    getIsAdmin();

    console.log('isAuthenticated: ' + isAuthenticated);
    console.log('isAdmin: ' + isAdmin);
}, [isAuthenticated, isAdmin]);

  return (
    <Router>
      <Switch>
        <userContext.Provider value={{auth: [isAuthenticated, setIsAuthenticated],admin: [isAdmin, setIsAdmin],}}>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route path={"/moviedetail"}>
            <MovieDetail />
          </Route>
          <Route path={"/signup"}>
            <SignUp />
          </Route>
          <Route path={"/signin"}>
            <SignIn />
          </Route>
          <Route path={"/adminpanel"}>
            <AdminPanel />
          </Route>
        </userContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;