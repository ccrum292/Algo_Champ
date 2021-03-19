import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import "./style.css";
import API from "../../lib/API";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

import {UnControlled as CodeMirror} from 'react-codemirror2';
import UserAndAuthContext from '../../context/AuthContext';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/javascript/javascript.js');



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
  },
  fullCodeMirror: {
    height: "100%"
  }
}));

export default function Algo(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeightConsole);
  const tableDivPaper = clsx(classes.paper, classes.tableDiv, classes.secondSmallPaper);

  let params = useParams();
  // console.log("params",params);

  let options = {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true,
  }

  let value = '// Hello World';

  const [codeMirrorValue, setCodeMirrorValue] = useState(value);
  const { user } = useContext(UserAndAuthContext);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await API.Answers.addAnswer(codeMirrorValue, user.id, 1);
    console.log(data);

  }

  
  
  return (
        <Container component="main" maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer}></div>
          <Grid container spacing={3} className={classes.outerGrid}>
            <Grid container justify="space-between"  direction="column" item xs={12} md={7} lg={8}>
              <Paper className={fixedHeightPaper2}>
                <CodeMirror
                  className={classes.fullCodeMirror}
                  value={value}
                  options={options}
                  onChange={(editor, data, value) => {
                    setCodeMirrorValue(value);
                  }}
                />
              </Paper>
              <Paper className={tableDivPaper}>
                <Button size="large" variant="contained" color="primary" onClick={e => handleSubmit(e)}>Submit</Button>
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