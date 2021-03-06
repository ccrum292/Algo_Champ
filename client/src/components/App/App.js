import React, {useState, useEffect, useMemo} from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import UserAndAuthContext from '../../context/AuthContext';
import TokenStore from "../../lib/TokenStore";
import API from "../../lib/API";

import Navigation from "../../components/Navigation";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import Welcome from "../../pages/Welcome";
import Dashboard from "../../pages/Dashboard";
import Leaderboard from "../../pages/LeaderBoard";
import Algo from "../../pages/Algo";
import Members from "../../pages/Members";
import AdminAlgo from "../../pages/AdminAlgo";
import CreateClass from "../../pages/CreateClass";
import Completed from "../../pages/Completed";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}))



function App(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [contextReRender, setContextReRender] = useState(false);

  useEffect(() => {
    const setUserOnPageLoad = async () => {
      const userToken = TokenStore.getToken();
      if (userToken) {
        const userData = await API.Users.getMe(TokenStore.getToken());
        if(!userData) return;
        const userContextData = {
          id: userData.data.id,
          name: userData.data.name,
          email: userData.data.email
        }
        setUser(userContextData);  
        setAuthToken(TokenStore.getToken());
      }

    }

    setUserOnPageLoad();
  }, []);

  const value = useMemo(() => ({
    user, setUser, authToken, setAuthToken, currentClass, setCurrentClass, contextReRender, setContextReRender
  }), [user, setUser, authToken, setAuthToken, currentClass, setCurrentClass, contextReRender, setContextReRender]);

  return (
    <UserAndAuthContext.Provider value={value}>
      <CssBaseline/>
      <div className={classes.root}>
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/">
            {user ? <Dashboard></Dashboard> : <Welcome></Welcome>}
          </Route>
          <Route  exact path="/register">
            <Register></Register>
          </Route>
          <Route exact path="/login">
            <Login ></Login>
          </Route>
          <Route exact path="/leaderboard">
            {user ? <Leaderboard></Leaderboard> : <Login></Login>}
          </Route>
          <Route exact path="/createclass">
            {user ? <CreateClass></CreateClass> : <Login></Login>}
          </Route>
          <Route exact path="/completed">
            {user ? <Completed></Completed> : <Login></Login>}
          </Route>
          <Route exact path="/members">
            {!currentClass ? <Login></Login> : currentClass.ClassUser.admin ? <Members></Members> : <Login></Login>}
          </Route>
          <Route exact path="/adminalgo">
            {!currentClass ? <Login></Login> : currentClass.ClassUser.admin ? <AdminAlgo></AdminAlgo> : <Login></Login>}
          </Route>
          <Route path="/algo/:id">
            {user ? <Algo></Algo> : <Login></Login>}
          </Route>
          <Route>
            <Redirect to={{
              pathname: "/"
            }} />
          </Route>
        </Switch>
      </div>
    </UserAndAuthContext.Provider>
  );
}

export default App;
