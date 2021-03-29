import { useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import API from '../../lib/API';
import UserAndAuthContext from "../../context/AuthContext";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  tableCell: {
    fontSize: 16
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  submitMessage: {
    textAlign: "center"
  }
}));


export default function AdminStudentTable({ setLoading }) {
  const classes = useStyles();

  const { authToken, currentClass } = useContext(UserAndAuthContext);
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [deletionId, setDeletionId] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [reRender, setReRender] = useState(false);

  const getStudentData = async () => {
    try {
      setLoading(true);
      const studentData = await API.Classes.getAllUsersForClass(authToken, currentClass.id);
      setStudents(studentData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getStudentData();
  }, [reRender]);


  const handleStudentDelete = async (e) => {
    setSubmitMessage("");
    try {
      const deleteData = await API.Classes.removeStudentFromClass(authToken, currentClass.id, deletionId)
      setSubmitMessage("Removal Complete");
      setTimeout(() => {
        setModalOpen(false);
      }, 1000)
      setReRender(!reRender)
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>#</TableCell>
            <TableCell className={classes.tableCell} align="left">Name</TableCell>
            <TableCell className={classes.tableCell} align="right">Email</TableCell>
            <TableCell className={classes.tableCell} align="right">Algorithms Completed</TableCell>
            <TableCell className={classes.tableCell} align="right">Score</TableCell>
            <TableCell className={classes.tableCell} align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(({id, name, email, score, algorithmsCompleted}, i) => (
            <TableRow key={id}>
              <TableCell className={classes.tableCell}>{i + 1}</TableCell>
              <TableCell className={classes.tableCell} align="left">
                {name}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">{email}</TableCell>
              <TableCell className={classes.tableCell} align="right">{algorithmsCompleted}</TableCell>
              <TableCell className={classes.tableCell} align="right">{score}</TableCell>
              <TableCell className={classes.tableCell} align="right">
                <IconButton data-id={id} data-name={name} onClick={e => {
                  setModalText(e.currentTarget.dataset.name);
                  setDeletionId(e.currentTarget.dataset.id)
                  setModalOpen(true)
                }}>
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paperModal}>
            <Typography color="secondary" variant="h6">
              Are you sure you want to remove {modalText} from the class?
            </Typography>
            <Grid className={classes.grid} container justify="space-evenly" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                onClick={e => handleStudentDelete(e)}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={e => setModalOpen(false)}
              >
                No
              </Button>
            </Grid>
            <Typography className={classes.submitMessage} color="secondary" variant="h6">
              {submitMessage}
            </Typography> 
          </div>
        </Fade>
      </Modal>
    </TableContainer>
  );
}