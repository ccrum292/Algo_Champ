import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, IconButton, Typography, Divider, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';


import { Link } from 'react-router-dom'
import UserAndAuthContext from "../../context/AuthContext";
import { useContext, useState } from 'react';

import TokenStore from "../../lib/TokenStore";
// import { mainListItems, secondaryListItems } from '';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  }, 
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
}));

export default function Navigation() {
  const classes = useStyles();

  const { user, setUser, setAuthToken } = useContext(UserAndAuthContext);
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = e => {
    e.preventDefault();
    TokenStore.clearToken();
    setUser(null);
    setAuthToken(null);

  }

  return(
    <div>
      <AppBar className={clsx(classes.appBar, navOpen && classes.appBarShift)} position="absolute">
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={() => setNavOpen(true)} className={clsx(classes.menuButton, navOpen && classes.menuButtonHidden)} edge="start"  color="inherit" aria-label="menu">
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
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !navOpen && classes.drawerPaperClose),
        }}
        open={navOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setNavOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* <List>{mainListItems}</List> */}
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>

    </div>
  );
}