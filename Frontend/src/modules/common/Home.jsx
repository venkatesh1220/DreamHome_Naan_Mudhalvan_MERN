import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/i1.png'
import p2 from '../../images/i2.png'
import p3 from '../../images/i3.webp'
import p4 from '../../images/i4.jpg'
import logo from '../../images/logo.jpeg';
import AllPropertiesCards from '../user/AllPropertiesCards';
// import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Home = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };
   return (
      <>
         {/* <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>RentEase</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                  </Nav>
                  <Nav>
                     <Link to={'/'}>Home</Link>
                     <Link to={'/login'}>Login</Link>
                     <Link to={'/register'}>Register</Link>
                  </Nav>

               </Navbar.Collapse>
            </Container>
         </Navbar> */}







         {/* <Navbar expand="lg" className="bg-primary navbar-dark py-3 shadow-lg">
      <Container fluid>
        <Navbar.Brand>
          <h2 className="text-white">RentEase</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Link to="/" className="nav-link text-white mx-2">
              Home
            </Link>
            <Link to="/login" className="nav-link text-white mx-2">
              Login
            </Link>
            <Link to="/register" className="nav-link text-white mx-2">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}



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



         <div className='home-body'>
            {/* <Carousel activeIndex={index} onSelect={handleSelect}>
               <Carousel.Item>
                  <img
                     src={p1}
                     alt="First slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p2}
                     alt="Second slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p3}
                     alt="Third slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p4}
                     alt="Fourth slide"
                  />
               </Carousel.Item>
            </Carousel> */}



            <Carousel activeIndex={index} onSelect={handleSelect}>
  <Carousel.Item>
    <img src={p1} alt="First slide" />
  </Carousel.Item>
  <Carousel.Item>
    <img src={p2} alt="Second slide" />
  </Carousel.Item>
  <Carousel.Item>
    <img src={p3} alt="Third slide" />
  </Carousel.Item>
  <Carousel.Item>
    <img src={p4} alt="Fourth slide" />
  </Carousel.Item>
</Carousel>


         </div>


         <div className='property-content' >
            <div className='text-center' >
               <h1 className='m-1 p-5'>All Properties that may you look for</h1>
               <p style={{fontSize: 20, fontWeight: 800}}>Want to post your Property? <Link style={{ margin:'1rem 2rem'}} to={'/register'}><Button variant='outline-info' className="hover-effect-button">Register as Owner</Button></Link></p>
            </div>

            <Container>
               <AllPropertiesCards />
            </Container>
         </div>
      </>
   )
}


export default Home
