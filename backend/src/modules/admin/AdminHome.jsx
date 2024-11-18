import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllUsers from './AllUsers';
import AllProperty from './AllProperty';
import AllBookings from './AllBookings';
import logo from '../../images/logo.jpeg';



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
const AdminHome = () => {
  const user = useContext(UserContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (!user) {
    return null;;
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
    <Navbar.Brand>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Replace the logo source */}
        <img
          src={logo} // Add the actual path to your logo here
          alt="RentEase Logo"
          style={{ height: '50px', width: 'auto' }}
        />
        <h2
          style={{
            fontFamily: 'Homemade Apple',
            marginTop: '0.5rem',
            marginLeft: '1rem',
            color: 'white',
          }}
        >
          DreamHome
        </h2>
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto">
        {/* Placeholder for additional links or menus */}
      </Nav>
      <Nav className="align-items-center">
        <h5
          style={{
            fontFamily: 'Roboto',
            fontSize: '18px',
            marginBottom: 0,
            color: 'white',
          }}
        >
          Hi, {user.userData.name}
        </h5>
        <Link
          onClick={handleLogOut}
          to={'/'}
          className="nav-link text-white mx-4"
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
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
      textColor="inherit" // Ensures text is visible on dark background
      centered
    >
      <Tab
        label="All Users"
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
        label="All Properties"
        {...a11yProps(1)}
        sx={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          '&.Mui-selected': { color: 'white' }, // Highlight selected tab
        }}
      />
      <Tab
        label="All Bookings"
        {...a11yProps(2)}
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

        <CustomTabPanel value={value} index={0}>
          <AllUsers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default AdminHome
