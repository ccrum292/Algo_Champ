import React, {useState, useEffect, useMemo} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import UserAndAuthContext from '../../context/AuthContext';
import TokenStore from "../../lib/TokenStore";
import API from "../../lib/API";

import Navigation from "../../components/Navigation";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import Welcome from "../../pages/Welcome";


function App() {

  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const setUserOnPageLoad = async () => {
      const userData = await API.Users.getMe(TokenStore.getToken());
      if(!userData) return;
      setUser(userData);
      setAuthToken(TokenStore.getToken());
    }

    setUserOnPageLoad();
  }, []);

  const value = useMemo(() => ({
    user, setUser, authToken, setAuthToken
  }), [user, setUser, authToken, setAuthToken]);

  return (
    <UserAndAuthContext.Provider value={value}>
      <Navigation></Navigation>
      <Switch>
        <Route exact path="/">
          <Welcome></Welcome>
        </Route>
        <Route exact path="/register">
          <Register></Register>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
      </Switch>
    </UserAndAuthContext.Provider>
  );
}

export default App;
