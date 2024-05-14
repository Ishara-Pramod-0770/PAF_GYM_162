import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import { Button, Grid, Paper, TablePagination, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchUserWorkoutPlans, fetchWorkouPlanByStatus } from '../../api/WorkoutPlansApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchAllWorkoutTemplates } from '../../api/WorkoutTemplateApi';

export default function WorkoutPlans() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [value, setValue] = useState('1');
  const [workoutPlans, setWorkoutPlans] = useState([])
  const [publicWorkoutPlans, setPublicWorkoutPlans] = useState([])
  const [workoutTemplates, setWorkoutTemplates] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - workoutTemplates.length) : 0;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() =>{
    getWorkoutPlans()
    getWorkoutTemplateData()
  }, [])

  const getWorkoutPlans = () =>{
    fetchUserWorkoutPlans('66351b211ad1e9229490cd57')
    .then((res) =>{
      setWorkoutPlans(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const getSharedWorkoutPlans = () =>{
    fetchWorkouPlanByStatus('PUBLIC')
    .then((res) =>{
      setPublicWorkoutPlans(res.data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  const handleSendToNextPage = (workoutId) => {
    navigate("/workout-plan", {state: {workoutId: workoutId}});
    console.log(workoutId)
  };

  const getWorkoutTemplateData = () =>{
    fetchAllWorkoutTemplates()
    .then((res) =>{
        setWorkoutTemplates(res.data)
    }).catch((error) =>{
        console.log(error)
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const handleSelect = (templateId) =>{
    navigate("/create-plan-from-template", {state: {templateId: templateId}});
    console.log(templateId)
  }

  return (
    <div>
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          WORKOUT PLANS
        </h1>
      </section>
      <Card sx={{padding:1}}>
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList  sx={{paddingBottom:1}} onChange={handleChange} aria-label="lab API tabs example">
              <Tab 
                label="MY WORKOUT PLANS" 
                value="1" 
                sx={{ color: 'black', fontWeight: 700 }}
              />
              <Tab 
                label="PLAN TEMPLATES" 
                value="2" 
                sx={{ color: 'black', fontWeight: 700 }}
              />
              <Tab 
                label="PUBLIC PLANS" 
                value="3" 
                onClick={getSharedWorkoutPlans}
                sx={{ color: 'black', fontWeight: 700 }}
              />
              <div style={{ flex: 1, }} />
              <Link to="/create-workout-plan">
                <Button  startIcon={<AddCircleOutlineIcon />} variant="contained" color="primary">CREATE NEW PLAN</Button>
              </Link>
            </TabList>
          </Box>
          <TabPanel value="1">
          <Typography variant="h7" gutterBottom>This displays all the workout plans you have created.</Typography><br/><br/>
          {
            workoutPlans.map((row) =>(
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography variant="h7" gutterBottom><b>{row.title.toUpperCase()}</b></Typography> 
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h7" gutterBottom><b>STATUS: </b>{row.status}</Typography> 
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper elevation={2} sx={{padding:2}}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h7" gutterBottom><b>DATE CREATED: </b>{row.dateCreated}</Typography> <br/>
                        <Typography variant="h7" gutterBottom><b>NO OF EXERCISES: </b>{row.exercises.length}</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign={'right'} sx={{marginTop:0.5}}>
                          <Button startIcon={<VisibilityIcon />} variant='contained' color='primary' onClick={()=>handleSendToNextPage(row.id)}>VIEW WORKOUT PLAN</Button>
                      </Grid>
                    </Grid>
                    </Paper>
                </AccordionDetails>
              </Accordion>
            ))
          }
          </TabPanel>
          <TabPanel value="2">
            <Typography variant="h7" gutterBottom>This displays all the workout plan templates that are currently available. You may choose any of them and customize them to fit your needs.</Typography><br/>
            <TableContainer component={Paper} elevation={2} sx={{marginTop:2}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell align="left"><b>ID</b></TableCell>
                      <TableCell align="left"><b>TITLE</b></TableCell>
                      <TableCell align="left"><b>NO OF EXERCISES</b></TableCell>
                      <TableCell align="left"><b>ACTIONS</b></TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {workoutTemplates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow
                      key={row.templateId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell align="left">{row.templateId}</TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.exercises.length}</TableCell>
                      <TableCell align="left">
                        <Button  variant='outlined' color="error" onClick={()=> handleSelect(row.templateId)}>SELECT TEMPLATE</Button>
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
              count={workoutTemplates.length}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </TableContainer>
          </TabPanel>
          <TabPanel value="3">
          <Typography variant="h7" gutterBottom>This displays all the publicly available workout plans.</Typography><br/><br/>
          {
            publicWorkoutPlans.map((row) =>(
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography variant="h7" gutterBottom><b>{row.title.toUpperCase()}</b></Typography> 
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h7" gutterBottom><b>STATUS: </b>{row.status}</Typography> 
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper elevation={2} sx={{padding:2}}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h7" gutterBottom><b>DATE CREATED: </b>{row.dateCreated}</Typography> <br/>
                        <Typography variant="h7" gutterBottom><b>NO OF EXERCISES: </b>{row.exercises.length}</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign={'right'} sx={{marginTop:0.5}}>
                          <Button startIcon={<VisibilityIcon />} variant='contained' color='primary' onClick={()=>handleSendToNextPage(row.id)} >VIEW WORKOUT PLAN</Button>
                      </Grid>
                    </Grid>
                    </Paper>
                </AccordionDetails>
              </Accordion>
            ))
          }
          </TabPanel>
        </TabContext>
      </Card>
    </div>
  )
}
