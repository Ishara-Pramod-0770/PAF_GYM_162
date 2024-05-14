import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Grid, InputLabel, TablePagination, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { editWorkoutPlan, fetchWorkoutPlanById } from '../../api/WorkoutPlansApi';
import { fetchArmExercises, fetchBackExercises, fetchChestExercises, fetchCoreExercises, fetchLegExercises, fetchShoulderExercises } from '../../api/ExerciseApi';
import SelectExerciseModal from './SelectExerciseModal';
import Snackbar from '@mui/material/Snackbar';

export default function EditWorkoutPlan() {
  // Retrieve the rows state from local storage or initialize it if not found
  const [rows, setRows] = useState(() => {
    const storedRows = localStorage.getItem('workoutPlanRows');
    return storedRows ? JSON.parse(storedRows) : [];
  });
  const [workoutPlanData, setWorkoutPlanData] = useState({})
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [title, setTitle] = useState()
  const [dateCreated, setDateCreated] = useState()
  const [userName, setUserName] = useState()
  const [age, setAge] = useState()
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [exercises, setExercises] = useState([])
  const location = useLocation();
  const workoutPlanId = location.state.workoutId || {};
  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - selectedExercises.length) : 0;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('workoutPlanRows', JSON.stringify(rows));
    getWorkoutPlanDetails()
    if(value === "1"){
      getChestExercises()
    }else if(value === "2"){
      getArmExercises()
    }else if(value === "3"){
      getLegExercises()
    }else if(value === "4"){
      getCoreExercises()
    }else if(value === "5"){
      getShoulderExercises()
    }else if(value === "6"){
      getBackExercises()
    }
  }, [rows]);

  const getWorkoutPlanDetails = () =>{
    fetchWorkoutPlanById(workoutPlanId)
    .then((res) =>{
      setWorkoutPlanData(res.data)
      setTitle(res.data.title)
      setAge(res.data.age)
      setDateCreated(res.data.dateCreated)
      setUserName(res.data.userName)
      setSelectedExercises(res.data.exercises)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const getChestExercises = () =>{
    fetchChestExercises("chest")
    .then((res) =>{
      setExercises(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const getLegExercises = () =>{
    fetchLegExercises("legs")
    .then((res) =>{
      setExercises(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const getArmExercises = () =>{
    fetchArmExercises("arms")
    .then((res) =>{
      setExercises(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const getCoreExercises = () =>{
    fetchCoreExercises("core")
    .then((res) =>{
      setExercises(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const getShoulderExercises = () =>{
    fetchShoulderExercises("shoulders")
    .then((res) =>{
      setExercises(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const getBackExercises = () =>{
    fetchBackExercises("back")
    .then((res) =>{
      setExercises(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }
  
  // Function to add a new row to the table
  const addRow = (row) => {
    const newRow = {
      exerciseId: row.exerciseId,
      exercise: row.exercise,
      reps:'08',
      sets:'02',
      focusMuscleGroup: row.focusMuscleGroup
    };
    console.log(newRow)
    let currentValue = value
    setValue(currentValue)
    // Check if the exerciseId already exists in rows
    const exerciseExists = selectedExercises.some(item => item.exerciseId === row.exerciseId);

    if (exerciseExists) {
      let message = "Exercise already exists!";
      handleAlertClick(message, 'error');
    } else {
      // Add the new row if it doesn't already exist
      setSelectedExercises([...selectedExercises, newRow]);
      let message = "Exercise added successfully!";
      handleAlertClick(message, 'success');
    }
  };

  // Function to remove a row from the table
  const removeRow = (idToRemove) => {
    const updatedRows = selectedExercises.filter(row => row.exerciseId !== idToRemove);
    setSelectedExercises(updatedRows);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleBack = () => {
    navigate(-1);
    localStorage.removeItem('workoutPlanRows')
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDateChange = (date) => {
    setDateCreated(date);
  };

  const handleUserNameChange = (value) => {
    setUserName(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };

  // Function to handle changes in reps input
  const handleRepsChange = (id, value) => {
    const updatedRows = selectedExercises.map(row => {
      if (row.exerciseId === id) {
        return { ...row, reps: value };
      }
      return row;
    });
    setSelectedExercises(updatedRows);
  };
  
  // Function to handle changes in sets input
  const handleSetsChange = (id, value) => {
    const updatedRows = selectedExercises.map(row => {
      if (row.exerciseId === id) {
        return { ...row, sets: value };
      }
      return row;
    });
    setSelectedExercises(updatedRows);
  };

  // Function to handle save action
  const handleUpdate = () => {
    const exerciseData = selectedExercises.map(row => ({
      exerciseId: row.exerciseId,
      exercise: row.exercise,
      reps: row.reps,
      sets: row.sets,
      focusMuscleGroup: row.focusMuscleGroup
    }));

    const updatedWorkoutPlanData = {
      userId:'66351b211ad1e9229490cd57', //Will be replaced with the logged in userID
      title: title,
      dateCreated: dateCreated,
      userName: userName,
      age: age,
      exercises:exerciseData,
      status:"PRIVATE"
    }
    setSelectedExercises(exerciseData);
    editWorkoutPlan(workoutPlanId, updatedWorkoutPlanData)
    .then((res) =>{
        console.log(res)
        console.log("Successfully Updated Workout Plan")
    }).catch((error) =>{
        console.log("WorkoutPlan Update Failed!")
    })
    localStorage.removeItem('workoutPlanRows');
    navigate("/workout-plans")
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

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
                EDIT WORKOUT PLAN
            </h1>
        </section><br/>

        <Paper elevation={2} sx={{padding:5}}>
          <form>
          <Grid container spacing={2}>
            <Grid item xs={2}>
                <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                height="5vh"
                >
                  <InputLabel>Title</InputLabel>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <TextField fullWidth id="outlined-basic" variant="outlined" value={title} onChange={(e) => handleTitleChange(e.target.value)}/>
            </Grid>
            <Grid item xs={2}>
                <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                height="5vh"
                >
                    <InputLabel>Date Created</InputLabel>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <TextField fullWidth type='date'  id="outlined-basic" variant="outlined" value={dateCreated} onChange={(e) => handleDateChange(e.target.value)}/>
            </Grid>
            <Grid item xs={2}>
                <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                height="5vh"
                >
                  <InputLabel>UserName</InputLabel>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <TextField fullWidth id="outlined-basic" variant="outlined" value={userName} onChange={(e) => handleUserNameChange(e.target.value)}/>
            </Grid>
            <Grid item xs={2}>
                  <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="left"
                  height="5vh"
                  >
                      <InputLabel>Age</InputLabel>
                  </Box>
              </Grid>
            <Grid item xs={4}>
                <TextField fullWidth id="outlined-basic" variant="outlined" value={age} onChange={(e) => handleAgeChange(e.target.value)}/>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button startIcon={<AddCircleOutlineIcon />} variant="contained" color="primary" onClick={handleOpen}>ADD EXERCISES</Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}><br/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell align="left"><b>Exercise</b></TableCell>
                            <TableCell align="left"><b>Reps</b></TableCell>
                            <TableCell align="left"><b>Sets</b></TableCell>
                            <TableCell align="left"><b>Actions</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {selectedExercises.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                            key={row.exerciseId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="left">{row.exerciseId}</TableCell>
                            <TableCell align="left">{row.exercise}</TableCell>
                            <TableCell align="left">
                                <TextField fullWidth id="outlined-basic" label="Reps" variant="outlined" value={row.reps} onChange={(e) => handleRepsChange(row.exerciseId, e.target.value)}/>
                            </TableCell>
                            <TableCell align="left">
                                <TextField fullWidth id="outlined-basic" label="Sets" variant="outlined" value={row.sets} onChange={(e) => handleSetsChange(row.exerciseId, e.target.value)}/>
                            </TableCell>
                            <TableCell align="left">
                                <Button startIcon={<DeleteIcon />} variant='outlined' color="error" onClick={()=> removeRow(row.exerciseId)}>REMOVE</Button>
                            </TableCell>
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
                        count={selectedExercises.length}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </TableContainer>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right', paddingRight:'20px' }}>
                <Button startIcon={<SaveIcon/>} variant="contained" color="primary" onClick={handleUpdate}>SAVE DETAILS</Button>
            </Grid>
          </Grid><br/><br/>
          </form>
          </Paper>
        <SelectExerciseModal
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          addRow={addRow} 
          value={value}
          getChestExercises={getChestExercises} 
          getArmExercises={getArmExercises}
          getLegExercises={getLegExercises}
          getCoreExercises={getCoreExercises}
          getShoulderExercises={getShoulderExercises}
          getBackExercises={getBackExercises}
          exercises={exercises}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          page={page}
        />
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