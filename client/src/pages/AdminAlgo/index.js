import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
                <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
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
                <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Typography className={classes.heading}>Users</Typography>
                    <Typography className={classes.secondaryHeading}>
                      You are currently not an owner
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                      diam eros in elit. Pellentesque convallis laoreet laoreet.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography className={classes.heading}>Advanced settings</Typography>
                    <Typography className={classes.secondaryHeading}>
                      Filtering has been entirely disabled for whole web server
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                      vitae egestas augue. Duis vel est augue.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleAccordionChange('panel4')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography className={classes.heading}>Personal data</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                      vitae egestas augue. Duis vel est augue.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          </Grid>
        </Container>
  );
}