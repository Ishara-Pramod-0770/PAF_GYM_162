import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Grid, Modal, TablePagination, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteWorkoutPlan, editWorkoutPlan, fetchWorkoutPlanById } from '../../api/WorkoutPlansApi';
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ShieldIcon from '@mui/icons-material/Shield';
import Snackbar from '@mui/material/Snackbar';

export default function ViewWorkoutPlan() {
  const location = useLocation();
  const [rows] = useState(() => {
    const storedRows = localStorage.getItem('workoutPlanRows');
    return storedRows ? JSON.parse(storedRows) : [];
  });
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [exercises, setExercises] = useState([])
  const [workoutPlanData, setWorkoutPlanData] = useState([])
  const workoutPlanId = location.state.workoutId || {};
  const userId = '66351b211ad1e9229490cd57'
  const [isEditable, setIsEditable] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [open, setOpen] = useState(false);
  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - exercises.length) : 0;

  useEffect(() => {
    localStorage.setItem('workoutPlanRows', JSON.stringify(rows));
    getWorkoutPlanDetails()
  }, [rows]);

  const getWorkoutPlanDetails = () =>{
    fetchWorkoutPlanById(workoutPlanId)
    .then((res) =>{
      setWorkoutPlanData(res.data)
      setExercises(res.data.exercises)
      if(userId !== res.data.userId){
        setIsEditable(false)
      }else{
        setIsEditable(true)
      }
    }).catch((error) =>{
      console.log(error)
    })
  }

  const handleBack = () => {
    navigate(-1);
    localStorage.removeItem('workoutPlanRows')
  }

  const handleEditNavigation = (workoutId) => {
    navigate("/edit-workout-plan", {state: {workoutId: workoutId}});
    console.log(workoutId)
  };  

  const handleStatusChange = (type) =>{
    if(type === 'PRIVATE'){
        workoutPlanData.status = 'PRIVATE'
        editWorkoutPlan(workoutPlanId, workoutPlanData)
        .then((res) =>{
            let message = "Status Successfully Changed to PRIVATE"
            getWorkoutPlanDetails()
            handleAlertClick(message, 'success')
        }).catch((error) =>{
            console.log(error)
            let message = "Status change failed!"
            handleAlertClick(message, 'error')
        })
    }else{
        workoutPlanData.status = 'PUBLIC'
        editWorkoutPlan(workoutPlanId, workoutPlanData)
        .then((res) =>{
            let message = "Status Successfully Changed to PUBLIC"
            getWorkoutPlanDetails()
            handleAlertClick(message, 'success')
        }).catch((error) =>{
            console.log(error)
            let message = "Status change failed!"
            handleAlertClick(message, 'error')
        })
    }
  }

  const handleDelete = () => {
    deleteWorkoutPlan(workoutPlanId)
    .then((res) =>{
        let message = "Workout plan deleted successfully!"
        handleAlertClick(message, 'success')
    }).catch((error) =>{
        console.log(error)
        let message = "Workout plan delete failed!"
        handleAlertClick(message, 'error')
    })
    navigate("/workout-plans");
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleAlertClick = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message)
    setAlertSeverity(type)
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <div className="container">
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
          <KeyboardBackspaceIcon
              className="cursor-pointer"
              onClick={handleBack}
          />
          <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
              VIEW WORKOUT PLAN
          </h1>
      </section><br/>

      <Paper elevation={2} sx={{padding:5}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{textAlign:'center'}}>
              <Typography variant="h5" gutterBottom> <b> {workoutPlanData.title}</b></Typography><br/>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom><b>DATE CREATED</b></Typography> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom>: {workoutPlanData.dateCreated}</Typography> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom><b>CREATED BY</b></Typography> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom>: {workoutPlanData.userName}</Typography> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom><b>AGE</b></Typography> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom>: {workoutPlanData.age}</Typography> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom><b>PLAN STATUS</b></Typography> 
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h7" gutterBottom> : {workoutPlanData.status}</Typography> 
            </Grid>
            
            <Grid item xs={12} style={{ textAlign: 'center' }}><br/>
              <TableContainer component={Paper} elevation={2}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell align="left"><b>Exercise</b></TableCell>
                            <TableCell align="left"><b>Reps</b></TableCell>
                            <TableCell align="left"><b>Sets</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {exercises.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                            key={row.exerciseId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="left">{row.exerciseId}</TableCell>
                              <TableCell align="left">{row.exercise}</TableCell>
                              <TableCell align="left">{row.reps}</TableCell>
                              <TableCell align="left">{row.sets}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 89 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  <TablePagination
                      page={page}
                      rowsPerPageOptions={[5, 10, 15]}
                      count={exercises.length}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  </TableContainer>
            </Grid>
              
            {isEditable && (
              <>
                {workoutPlanData.status === 'PRIVATE' ? (
                  <Grid item xs={4} style={{ textAlign: 'center', paddingRight:'20px' }}>
                    <Button startIcon={<ShareIcon/>} variant="contained" color="primary" onClick={()=>handleStatusChange("PUBLIC")}>SHARE TO PUBLIC</Button>
                  </Grid>
                ) : (
                  <Grid item xs={4} style={{ textAlign: 'center', paddingRight:'20px' }}>
                    <Button startIcon={<ShieldIcon/>} variant="contained" color="primary" onClick={()=>handleStatusChange("PRIVATE")}>MAKE PRIVATE</Button>
                  </Grid>
                )}
                <Grid item xs={4} style={{ textAlign: 'center', paddingRight:'20px' }}>
                  <Button startIcon={<EditIcon/>} variant="contained" color="primary" onClick={()=> handleEditNavigation(workoutPlanId)}>EDIT DETAILS</Button>
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'center', paddingRight:'20px' }}>
                  <Button startIcon={<DeleteIcon/>} variant="contained" color="error" onClick={handleOpen}>DELETE PLAN</Button>
                </Grid>
              </>
            )}
        </Grid>
        </Paper>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh',
              }}
          >
              <Paper sx={{ padding: 5, width: "30%" }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      <b>DELETE WORKOUT PLAN</b>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      You are about to permanently delete the workout plan you have created. Are you sure you want to proceed to delete this workout plan?
                  </Typography><br />
                  <Grid  container spacing={2}>
                      <Grid item xs={12} sx={{ textAlign: 'right', paddingTop: '15px' }}>
                          <Button sx={{marginRight:2}} variant='contained' color='primary' onClick={handleClose}>CLOSE</Button>
                          <Button variant='contained' color='error' onClick={handleDelete}>DELETE</Button>
                      </Grid>
                  </Grid>
              </Paper>
          </Box>
        </Modal>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}