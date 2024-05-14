import React from "react";
import { TextField, Button, Typography, Container, Grid, Card, CardContent, makeStyles } from "@material-ui/core";
import registerimg from './registerimg.jpg'; // Import your register image here

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  card: {
    height: "100%",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function Register() {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // You can perform your registration logic here
  };

  return (
    <Container maxWidth="md" className={classes.root}>
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#3f51b5', textAlign: 'center', marginBottom: '2rem' }}>
Sign Up
</Typography>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <img src={registerimg} alt="register" style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  variant="outlined"
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submitButton}>
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
