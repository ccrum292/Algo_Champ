import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import API from '../../lib/API';
import UserAndAuthContext from "../../context/AuthContext";
import TokenStore from "../../lib/TokenStore";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subHeading: {
    margin: theme.spacing(2),
    textAlign: "center"

  }
}));

export default function Login() {
  const classes = useStyles();
  const location = useLocation();

  const { setUser, setAuthToken } = useContext(UserAndAuthContext);

  const [loginMessage, setLoginMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  
  useEffect(() => {
    if (location.state !== undefined && location.state.registration) {
      setLoginMessage("Registration was Successful, Please Login")
    }

  }, []);


  const handleSubmit = async e => {
    console.log("submit")
    e.preventDefault()

    if (email.length === 0 || password.length === 0) {
      return
    }

    try {
      const res = await API.Users.login(email, password);
  
      console.log(res);
      TokenStore.setToken(res.data.token);
      setAuthToken(res.data.token);
      const user = {
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email
      }
      setUser(user);
      setRedirect(true);

    } catch (e) {
      console.log(e);
    }



  }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Typography color="secondary" className={classes.subHeading} variant="h6">
          {loginMessage}
        </Typography>
        <form onSubmit={e => handleSubmit(e)} className={classes.form} noValidate>
          <TextField
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {redirect ? <Redirect to={{
        pathname: "/"
      }} /> : null}
    </Container>
  );
}