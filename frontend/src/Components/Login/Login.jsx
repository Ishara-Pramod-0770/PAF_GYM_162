import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, TextField, Button, InputAdornment } from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import loginimg from './loginimg.jpg'


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can perform login logic without Redux
    console.log("Logging in with username:", username, "and password:", password);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#3f51b5', textAlign: 'center', marginBottom: '2rem' }}>
  Welcome to Anytime Fitness
</Typography>

              <img src={loginimg} alt="login" style={{ maxWidth: "100%" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />

                <Link to='/home'>
                <Button type="submit" variant="contained" color="primary" fullWidth size="large" style={{ marginTop: "1rem", bgcolor:"#1e88e5" }}>
                  LOGIN
                </Button>
                </Link>

              </form>
              <hr />
              <Typography variant="body2" color="textSecondary" component={Link} to="/forgotpassword">
                Forgot Password?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
