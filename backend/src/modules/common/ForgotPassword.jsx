import React, { useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import logo from '../../images/logo.jpeg';

const ForgotPassword = () => {
   const navigate = useNavigate()
   const [data, setData] = useState({
      email: '',
      password: '',
      confirmPassword: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (data.email === "" || data.password === "" || data.confirmPassword === "") {
         alert("Please fill all fields")
      } else {
         if (data.password === data.confirmPassword) {
            await axios.post("http://localhost:8001/api/user/forgotpassword", data)
               .then((res) => {
                  if (res.data.success) {
                     alert('Your password has been changed!')
                     navigate('/login')
                  } else {
                     alert(res.data.message)
                  }
               })
               .catch((err) => {
                  if (err.response && err.response.status === 401) {
                     alert("User doesn't exist");
                  }
                  navigate("/register");
               });
         }

      }


   };
   return (
      <>
        <Navbar
  expand="lg"
  style={{
    backgroundColor: '#0b0b2b',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  }}
  className="navbar-dark py-3 shadow-lg fixed-top"
>
  <Container fluid>
    <Navbar.Brand>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="RentEase Logo"
          style={{ height: '60px', width: 'auto' }} // Replace 'logo' with the actual logo source
        />
        <h2
          style={{
            fontFamily: 'Homemade Apple',
            marginTop: '1rem',
            marginLeft: '1rem',
            color: 'white',
          }}
        >
          RentEase
        </h2>
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto"></Nav>
      <Nav>
        <Link
          to="/"
          className="nav-link text-white mx-4"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
        >
          Home
        </Link>
        <Link
          to="/login"
          className="nav-link text-white mx-4"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="nav-link text-white mx-4"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
        >
          Register
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

<Container
  component="main"
  maxWidth="sm"
  style={{
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    marginTop: '10rem',
  }}
>
  <Box
    sx={{
      marginTop: 4,
      marginBottom: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ bgcolor: '#0b0b2b' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography
      component="h1"
      variant="h5"
      style={{ marginTop: '10px', fontWeight: 'bold', color: '#0b0b2b' }}
    >
      Forgot Password?
    </Typography>
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      style={{ marginTop: '20px', width: '100%' }}
    >
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={data.email}
        onChange={handleChange}
        autoComplete="email"
        autoFocus
        variant="outlined"
        InputLabelProps={{ style: { color: '#0b0b2b' } }}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        value={data.password}
        onChange={handleChange}
        label="New Password"
        type="password"
        id="password"
        autoComplete="new-password"
        variant="outlined"
        InputLabelProps={{ style: { color: '#0b0b2b' } }}
      />
      <TextField
        margin="normal"
        fullWidth
        name="confirmPassword"
        value={data.confirmPassword}
        onChange={handleChange}
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
        variant="outlined"
        InputLabelProps={{ style: { color: '#0b0b2b' } }}
      />
      <Box mt={3} style={{ textAlign: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          style={{
            width: '200px',
            backgroundColor: '#0b0b2b',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '25px',
            padding: '10px',
          }}
        >
          Change Password
        </Button>
      </Box>
      <Grid container style={{ marginTop: '15px', textAlign: 'center', width: '100%' }}>
        <Grid item style={{ marginTop: '10px'}}>
          Remembered your password?{' '}
          <Link style={{ color: '#0b0b2b', fontWeight: 'bold' }} to={'/login'}>
            Login
          </Link>
        </Grid>
        <Grid item style={{ marginTop: '10px' }}>
          Don't have an account?{' '}
          <Link style={{ color: '#0b0b2b', fontWeight: 'bold' }} to={'/register'}>
            Sign Up
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>

      </>
   )
}

export default ForgotPassword
