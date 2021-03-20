import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    flexGrow: 1
  },
  fixedHeight: {
    height: 480,
  },
  tableDiv: {
    height: "100%"
  },
  secondSmallPaper: {
    marginTop: theme.spacing(2),
  },
  mb1: {
    marginBottom: theme.spacing(1)
  }
}));

export default function Students() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const tableDivPaper = clsx(classes.paper, classes.tableDiv);
  return (
        <Container component="main" maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer}></div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={tableDivPaper}>
              </Paper>
            </Grid>
            <Grid item container justify="space-between"  direction="column" xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Typography className={classes.mb1} component="h1" variant="h5">
                    Join Requests
                  </Typography>
                  <Divider />
                  <List>
                    <ListItem >
                      <ListItemText primary="Caleb Crum" />
                      <IconButton>
                        <AddCircleOutlineIcon />
                      </IconButton>
                      <IconButton>
                        <ClearIcon />
                      </IconButton>
                    </ListItem>
                  </List>
                </Paper>
            </Grid>
          </Grid>
        </Container>
  );
}