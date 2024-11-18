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
import axios from 'axios';
import { message } from 'antd';
import logo from '../../images/logo.jpeg';

const Login = () => {
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
    e.preventDefault();

    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    } else {
      console.log("Data before API call:", data);
      axios.post('http://localhost:8001/api/user/login', data)
        .then((res) => {
          console.log("Data before API call:", data);
          if (res.data.success) { 
            message.success(res.data.message);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));

            switch (isLoggedIn.type) {
              case "Admin":
                navigate("/adminhome");
                break;
              case "Renter":
                navigate("/renterhome");
                break;
              case "Owner":
                navigate("/ownerhome");
                if (isLoggedIn.granted === 'ungranted') {
                  // message.error('Your account is not yet confirmed by the admin');
                } else {
                  navigate("/ownerhome");
                }
                break;
              default:
                navigate("/renterhome");
                break;
            }
            setTimeout(()=>{
              window.location.reload()
            },1000)
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
          }
          navigate("/login");
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


      <Container component="main" maxWidth="sm" style={{ backgroundColor: "#f5f5f5", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", padding: "30px", marginTop: '10rem' }}>
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
      Log In
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate style={{ marginTop: "20px", width: "100%" }}>
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
          Log In
        </Button>
      </Box>
      <Grid container style={{ marginTop: "15px" , textAlign:'center',width:'100%' }}>
        <Grid item>Forgot password? 
          <Link style={{ color: "#0b0b2b", fontWeight: "bold" }} to={'/forgotpassword'}>
            {" Click here"}
          </Link>
        </Grid>
        <Grid item>Don't have an account?
          <Link style={{ color: "#0b0b2b", fontWeight: "bold" }} to={'/register'}>
            {" Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>

    </>
  )
}

export default Login
