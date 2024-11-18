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
import AddProperty from './AddProperty';
import AllProperties from './AllProperties';
import AllBookings from './AllBookings';
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
const OwnerHome = () => {
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
    <Navbar.Brand>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo} // Replace with the actual logo source
          alt="RentEase Logo"
          style={{ height: '60px', width: 'auto' }}
        />
        <h2
          style={{
            fontFamily: 'Homemade Apple',
            marginTop: '1rem',
            marginLeft: '1rem',
          }}
          className="text-white"
        >
          DreamHome
        </h2>
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto">
        {/* Placeholder for additional navigation links if needed */}
      </Nav>
      <Nav className="align-items-center">
        <h5
          className="text-white"
          style={{ fontFamily: 'Roboto', fontSize: '18px', marginBottom: 0 }}
        >
          Hi {user.userData.name}
        </h5>
        <Link
          onClick={handleLogOut}
          to={'/'}
          className="nav-link text-white mx-4"
          style={{ fontSize: '20px' }}
        >
          Log Out
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>



      <Box sx={{ width: '100%' }} style={{ marginTop: '10rem' }}>
  <Box
    sx={{
      borderBottom: 1,
      borderColor: '#0b0b2b',
      backgroundColor: '#0b0b2b',
    }}
  >
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="basic tabs example"
      TabIndicatorProps={{
        style: {
          backgroundColor: 'white', // Tab indicator line color
        },
      }}
      textColor="inherit" // Ensure text remains white
    >
      <Tab
        label="Add Property"
        {...a11yProps(0)}
        sx={{
          color: 'white', // Tab text color
          fontSize: '1rem',
          fontWeight: 'bold',
          '&.Mui-selected': { color: 'white' }, // Active tab styling
        }}
      />
      <Tab
        label="All Properties"
        {...a11yProps(1)}
        sx={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          '&.Mui-selected': { color: 'white' },
        }}
      />
      <Tab
        label="All Bookings"
        {...a11yProps(2)}
        sx={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          '&.Mui-selected': { color: 'white' },
        }}
      />
    </Tabs>
  </Box>


        <CustomTabPanel value={value} index={0}>
          <AddProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperties />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default OwnerHome

