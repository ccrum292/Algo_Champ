import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { format, parseISO } from "date-fns";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import NewAlgoForm from "../../components/NewAlgoForm";
import AdminEditAlgoForm from "../../components/AdminEditAlgoForm";

import API from "../../lib/API";
import UserAndAuthContext from "../../context/AuthContext";

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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminAlgo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight, classes.secondSmallPaper);
  const tableDivPaper = clsx(classes.paper, classes.tableDiv);

  const [expanded, setExpanded] = useState(false);
  const { authToken, currentClass } = useContext(UserAndAuthContext);
  const [problemsArr, setProblemsArr] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getProblems = async () => {
    setErrorMsg("");
    try{
      const problemsData = await API.Problems.getProblemsForClass(authToken, currentClass.id)
      console.log("hello")
      const sortForAirDate = problemsData.data.sort((a, b) => {
        let comparison = 0;
  
        if (a.ClassProblem.airDate > b.ClassProblem.airDate) {
          comparison = 1;
        } else if (a.ClassProblem.airDate < b.ClassProblem.airDate) {
          comparison = -1;
        }
        return comparison;
      });
  
      console.log("sort", sortForAirDate);
  
      setProblemsArr(sortForAirDate);

    } catch (err) {
      setErrorMsg(err.message)
    };
  }


  useEffect(() => {
    getProblems();
  }, []);



  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleNewAlgorithmFormSubmit = e => {
    e.preventDefault();
    console.log("submit")
  }


  return (
        <Container component="main" maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer}></div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={tableDivPaper}>
                <Accordion expanded={expanded === 'panel0'} onChange={handleAccordionChange('panel0')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>Create New Algorithm</Typography>
                    <Typography className={classes.secondaryHeading}></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <NewAlgoForm></NewAlgoForm>
                  </AccordionDetails>
                </Accordion>
                {problemsArr ? problemsArr.map(obj => (
                  <Accordion key={obj.id} expanded={expanded === `panel${obj.id}`} 
                    onChange={handleAccordionChange(`panel${obj.id}`)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${obj.id}-content`}
                      id={`panel${obj.id}-header`}
                    >
                      <Typography className={classes.heading}>{obj.title}</Typography>
                      <Typography className={classes.secondaryHeading}>
                        Air Date: {format(parseISO(obj.ClassProblem.airDate), "MM-dd-yyyy pp")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <AdminEditAlgoForm title={obj.title} difficulty={obj.difficulty} 
                      airDate={obj.ClassProblem.airDate} airDateBonusModifier={obj.ClassProblem.airDateBonusModifier}
                      airDateBonusLength={obj.ClassProblem.airDateBonusLength} directions={obj.description} 
                      starterCode={obj.startingCode} example={obj.Examples[0].displayValue}
                      tests={obj.Tests} problemId={obj.id} exampleId={obj.Examples[0].id} />
                    </AccordionDetails>
                  </Accordion> 
                ))
                  :
                  <Typography color="secondary" variant="h6" >{errorMsg}</Typography>
                }
              </Paper>
            </Grid>
          </Grid>
        </Container>
  );
}