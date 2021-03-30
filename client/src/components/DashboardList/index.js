import { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import API from "../../lib/API";
import UserAndAuthContext from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  backgroundPrimary: {
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  },
  none: {

  },
  fontList: {
    fontSize: 14
  },
  tableCell: {
    fontSize: 16
  },
}));

export default function DashboardList({ setLoading }) {
  const classes = useStyles();

  const { authToken, currentClass } = useContext(UserAndAuthContext);
  const [problems, setProblems] = useState([]);

  const sortForAirDate = (arr, sortNewestToOldest = true) => {
    let comp1 = -1;
    let comp2 = 1;

    if(!sortNewestToOldest) {
      comp1 = 1;
      comp2 = -1;
    }

    return arr.sort((a, b) => {
      let comparison = 0;

      if (a.airDate > b.airDate) {
        comparison = comp1;
      } else if (a.airDate < b.airDate) {
        comparison = comp2;
      }
      return comparison;
    });
  }

  const getData = async () => {
    if(!currentClass) return console.log("not there")
    console.log(authToken, currentClass.id)
    setLoading(true);
    const res = await API.Problems.getProblemsForClassDashboard(authToken, currentClass.id);
    const sortedByAirDate = sortForAirDate(res.data);
    console.log(sortedByAirDate);
    setProblems(sortedByAirDate);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [currentClass])

  const rowColor = mod => {
    if(!mod) return classes.none;
    return classes.backgroundPrimary;
  }

  return (
      // <List component="paper" aria-label="main mailbox folders">
      //   {/* <ListItem button>
      //     <ListItemIcon>
      //     </ListItemIcon>
      //     <ListItemText classes={{primary:classes.fontList}} primary="Alog Title" />
      //     <ListItemText classes={{primary:classes.fontList}} primary="Air Date" />
      //     <ListItemText classes={{primary:classes.fontList}} primary="Bonus Time" />
      //     <ListItemText classes={{primary:classes.fontList}} primary="Bonus Modifier" />

      //     <ListItemSecondaryAction>
      //       <ListItemText classes={{primary:classes.fontList}} primary="Points" />
      //     </ListItemSecondaryAction>
      //   </ListItem> */}

      //   {problems ? problems.map(problem => (
      //     <>
      //       <Divider />
      //       <ListItem className={rowColor(problem.airDateBonusModifier)} button>
      //         <ListItemIcon classes={{primary:classes.fontList}}>
      //           <CodeIcon />
      //         </ListItemIcon>
      //         <ListItemText classes={{primary:classes.fontList}} primary={problem.title} />
      //         <ListItemText classes={{primary:classes.fontList}} primary={problem.airDate} />
      //         <ListItemText classes={{primary:classes.fontList}} primary={problem.difficulty} />
      //         <ListItemText classes={{primary:classes.fontList}} primary={`${problem.airDateBonusLength} min`} />
      //         <ListItemText classes={{primary:classes.fontList}} primary={problem.airDateBonusModifier} />

      //         <ListItemSecondaryAction>
      //           <ListItemText classes={{primary:classes.fontList}} primary={problem.points} />
      //         </ListItemSecondaryAction>
      //       </ListItem>
      //     </>
      //     )): null
      //   }
      //   <Divider />
      // </List>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}></TableCell>
            <TableCell className={classes.tableCell} align="left">Algorithm</TableCell>
            <TableCell className={classes.tableCell} align="right">Air Date</TableCell>
            <TableCell className={classes.tableCell} align="right">Difficulty</TableCell>
            <TableCell className={classes.tableCell} align="right">Bonus Time Remaining</TableCell>
            <TableCell className={classes.tableCell} align="right">Bonus Modifier</TableCell>
            <TableCell className={classes.tableCell} align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map(problem => (
            <TableRow className={rowColor(problem.airDateBonusModifier)} key={problem.id}>
              <TableCell className={classes.tableCell}>
                <CodeIcon />
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                {problem.title}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">{problem.airDate}</TableCell>
              <TableCell className={classes.tableCell} align="right">{problem.difficulty}</TableCell>
              <TableCell className={classes.tableCell} align="right">{`${problem.airDateBonusLength} min`}</TableCell>
              <TableCell className={classes.tableCell} align="right">{problem.airDateBonusModifier}</TableCell>
              <TableCell className={classes.tableCell} align="right">{problem.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}