import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { message } from 'antd';
import logo from '../../images/logo.jpeg';

const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!data?.name || !data?.email || !data?.password||! data?.type ) return alert("Please fill all fields");
    else {
      axios.post('http://localhost:8001/api/user/register', data)
        .then((response) => {
          console.log(data)
          if (response.data.success) {
            message.success(response.data.message);
            navigate('/login')

          } else {
            message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log("Error in api", error);
        });
    }
  };


  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#0b0b2b',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}} className="navbar-dark py-3 shadow-lg fixed-top">
  <Container fluid>
    <Navbar.Brand>
      {/* Replace the title with the logo */}
      <div style={{ display:"flex",alignItems:"center"}} >
      <img 
        src={logo}
        alt="DreamHome Logo" 
        style={{ height: '60px', width: 'auto' }} // Adjust the size as needed
      />
      <h2 style={{fontFamily: "Homemade Apple",marginTop:'1rem',marginLeft:'1rem'}} className="text-white">Dream Home</h2>
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto">
        {/* Placeholder for additional navigation links if needed */}
      </Nav>
      <Nav>
        {/* Increase button text size */}
        <Link to="/" className="nav-link text-white mx-4" style={{ fontSize: '24px' }}>
          Home
        </Link>
        <Link to="/login" className="nav-link text-white mx-4" style={{ fontSize: '24px' }}>
          Login
        </Link>
        <Link to="/register" className="nav-link text-white mx-4" style={{ fontSize: '24px' }}>
          Register
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      <Container component="main" maxWidth="sm" style={{ backgroundColor: "#f5f5f5", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", padding: "30px", marginTop:'10rem'}}>
  <Box
    sx={{
      marginTop: 4,
      marginBottom: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Avatar sx={{ bgcolor: "#0b0b2b" }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5" style={{ marginTop: "10px", fontWeight: "bold", color: "#0b0b2b" }}>
      Sign Up
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate style={{ marginTop: "20px", width: "100%" }}>
      <TextField
        margin="normal"
        fullWidth
        id="name"
        label="Renter Full Name/Owner Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        autoComplete="name"
        autoFocus
        variant="outlined"
        InputLabelProps={{ style: { color: "#0b0b2b" } }}
      />
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={data.email}
        onChange={handleChange}
        autoComplete="email"
        variant="outlined"
        InputLabelProps={{ style: { color: "#0b0b2b" } }}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        value={data.password}
        onChange={handleChange}
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        variant="outlined"
        InputLabelProps={{ style: { color: "#0b0b2b" } }}
      />
      <InputLabel id="user-type-label" style={{ marginTop: "15px", color: "#0b0b2b" }}>
        User Type
      </InputLabel>
      <Select
        labelId="user-type-label"
        id="user-type"
        name="type"
        value={data.type}
        label="type"
        onChange={handleChange}
        style={{ width: "100%", backgroundColor: "white", borderRadius: "4px", marginTop: "5px" }}
      >
        <MenuItem value="Select User" disabled>
          Select User
        </MenuItem>
        <MenuItem value="Renter">Renter</MenuItem>
        <MenuItem value="Owner">Owner</MenuItem>
      </Select>
      <Box mt={3} style={{ textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          style={{
            width: "200px",
            backgroundColor: "#0b0b2b",
            color: "white",
            fontWeight: "bold",
            borderRadius: "25px",
            padding: "10px",
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Grid container style={{ marginTop: "15px" }}>
        <Grid item>
          <Typography variant="body2" style={{ textAlign: "center", color: "#0b0b2b" }}>
            Have an account?{" "}
            <Link style={{ color: "#0b0b2b", fontWeight: "bold" }} to="/login">
              Sign In
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>

    </>
  )
}

export default Register
