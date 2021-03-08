import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'


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
          <Button color="inherit">
            <Link className={classes.link} to="/login">
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={classes.link} to="/register">
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

    </div>
  );
}