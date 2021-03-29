import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import LargeLeaderboard from "../../components/LargeLeaderbaordTable";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
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
    height: 240,
  },
  tableDiv: {
    height: "100%"
  },
  secondSmallPaper: {
    marginTop: theme.spacing(2),
  }
}));

export default function LeaderBoard() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight, classes.secondSmallPaper);
  const tableDivPaper = clsx(classes.paper, classes.tableDiv);

  const [loading, setLoading] = useState(false)

  return (
        <Container component="main" maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer}></div>
          {loading ? <LinearProgress color="secondary" /> : null}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={12}>
              <LargeLeaderboard setLoading={setLoading} />
            </Grid>
          </Grid>
        </Container>
  );
}