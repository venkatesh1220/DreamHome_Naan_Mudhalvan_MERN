import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllPropertiesCards from '../AllPropertiesCards';
import AllProperty from './AllProperties';
import logo from '../../../images/logo.jpeg';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const RenterHome = () => {
  const user = useContext(UserContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return null
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <div>
      <Navbar
  expand="lg"
  style={{
    backgroundColor: '#0b0b2b',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  }}
  className="navbar-dark py-3 shadow-lg fixed-top"
>
  <Container fluid>
    {/* Logo and Brand */}
    <Navbar.Brand>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo} // Replace 'logo' with the actual logo source or variable
          alt="RentEase Logo"
          style={{ height: '50px', width: 'auto' }}
        />
        <h2
          style={{
            fontFamily: 'Homemade Apple, cursive', // Distinctive font
            marginLeft: '1rem',
            color: '#FFFFFF',
          }}
        >
          DreamHome
        </h2>
      </div>
    </Navbar.Brand>

    {/* Navbar Toggler */}
    <Navbar.Toggle aria-controls="navbarScroll" />

    {/* Collapsible Section */}
    <Navbar.Collapse id="navbarScroll">
      {/* Empty space for future navigation links */}
      <Nav className="me-auto"></Nav>

      {/* User Greeting and Logout */}
      <Nav className="align-items-center">
        <h5
          className="text-white"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '18px',
            marginBottom: 0,
            marginRight: '20px',
          }}
        >
          Hi {user.userData.name}
        </h5>
        <Link
          onClick={handleLogOut}
          to={'/'}
          className="nav-link text-white"
          style={{
            fontSize: '20px',
            padding: '8px 20px',
            backgroundColor: 'transparent',
            border: '2px solid white',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#FFFFFF')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          Log Out
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


      <Box sx={{ width: '100%' }} style={{ marginTop: '10rem' }}>
  {/* Tabs Header */}
  <Box
    sx={{
      borderBottom: 1,
      borderColor: '#0b0b2b',
      backgroundColor: '#0b0b2b',
      padding: '1rem 0',
    }}
  >
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="styled tabs example"
      TabIndicatorProps={{
        style: {
          backgroundColor: 'white', // Highlight color for active tab
        },
      }}
      textColor="inherit" // Keeps text visible regardless of theme
      centered
    >
      <Tab
        label="All Properties"
        {...a11yProps(0)}
        sx={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          '&.Mui-selected': { color: 'white' }, // Highlight selected tab
        }}
      />
      <Tab
        label="Booking History"
        {...a11yProps(1)}
        sx={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          '&.Mui-selected': { color: 'white' }, // Highlight selected tab
        }}
      />
    </Tabs>
  </Box>

  {/* Tab Panels */}
  <CustomTabPanel value={value} index={0}>
    <Container
      sx={{
        padding: '2rem 1rem',
        backgroundColor: '#f5f5f5', // Subtle light background for better readability
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 10px 15px, rgba(0, 0, 0, 0.06) 0px 4px 6px',
      }}
    >
      <AllPropertiesCards loggedIn={user.userLoggedIn} />
    </Container>
  </CustomTabPanel>
  <CustomTabPanel value={value} index={1}>
    <Container
      sx={{
        padding: '2rem 1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 10px 15px, rgba(0, 0, 0, 0.06) 0px 4px 6px',
      }}
    >
      <AllProperty />
    </Container>
  </CustomTabPanel>
</Box>

    </div>
  )
}

export default RenterHome

