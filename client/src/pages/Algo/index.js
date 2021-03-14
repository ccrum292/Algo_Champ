import React from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';


import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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
  outerGrid: {
    height: 600
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
  fixedHeightConsole: {
    height: 240,
  },
  tableDiv: {
    flexGrow: 1,
  },
  secondSmallPaper: {
    marginTop: theme.spacing(2),
  }
}));

export default function Algo(props) {
  const classes = useStyles();

  let params = useParams();
  console.log("params",params);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeightConsole);
  const tableDivPaper = clsx(classes.paper, classes.tableDiv, classes.secondSmallPaper);
  return (
        <Container component="main" maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer}></div>
          <Grid container spacing={3} className={classes.outerGrid}>
            <Grid container justify="space-between"  direction="column" item xs={12} md={7} lg={8}>
              <Paper className={fixedHeightPaper2}>
                Algo
              </Paper>
              <Paper className={tableDivPaper}>
                Console 
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              
                <Paper className={fixedHeightPaper}>
                </Paper>
              

              
            </Grid>
          </Grid>
        </Container>
  );
}