import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

import UserAndAuthContext from "../../context/AuthContext";
import { useContext } from 'react';

import TokenStore from "../../lib/TokenStore";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
}));

export default function Navigation() {
  const classes = useStyles();

  const { user, setUser, setAuthToken } = useContext(UserAndAuthContext);

  const handleLogout = e => {
    e.preventDefault();
    TokenStore.clearToken();
    setUser(null);
    setAuthToken(null);

  }

  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" >
            <Link className={classes.link} to="/">
              Algo_Champ
            </Link>
          </Typography>
          { !user ? 
          <>
            <Button to="/login" component={Link} color="inherit">
                Login
            </Button>
            <Button to="/register" component={Link} color="inherit">
                Register
            </Button>
          </>
          : 
            <Button onClick={e => handleLogout(e)} color="inherit">
              Logout
            </Button>
          }
        </Toolbar>
      </AppBar>

    </div>
  );
}