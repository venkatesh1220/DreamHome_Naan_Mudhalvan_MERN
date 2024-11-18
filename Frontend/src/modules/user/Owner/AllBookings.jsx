import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';

const AllProperty = () => {
   const [allBookings, setAllBookings] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallbookings', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllBookings(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   const handleStatus = async (bookingId, propertyId, status) => {
      try {
         const res = await axios.post('http://localhost:8001/api/owner/handlebookingstatus', { bookingId, propertyId, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         })
         if (res.data.success) {
            message.success(res.data.message)
            getAllProperty()
         }
         else {
            message.error('Something went wrong')
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <TableContainer
  component={Paper}
  style={{
    backgroundColor: '#0b0b2b',
    border: '1px solid #ffffff33',
    borderRadius: '10px',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
    color: 'white',
    fontFamily: `'Roboto', sans-serif`,
  }}
>
  <Table sx={{ minWidth: 650 }} aria-label="booking table">
    <TableHead>
      <TableRow>
        {[
          'Booking ID',
          'Property ID',
          'Tenant Name',
          'Tenant Phone',
          'Booking Status',
          'Actions',
        ].map((heading) => (
          <TableCell
            key={heading}
            align="center"
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {heading}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {allBookings.map((booking) => (
        <TableRow
          key={booking._id}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            backgroundColor: '#151538',
            '&:hover': { backgroundColor: '#212144' },
          }}
        >
          <TableCell
            component="th"
            scope="row"
            style={{
              color: 'white',
              fontSize: '15px',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {booking._id}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {booking.propertyId}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {booking.userName}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {booking.phone}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {booking.bookingStatus}
          </TableCell>
          <TableCell
            align="center"
            style={{
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {booking?.bookingStatus === 'pending' ? (
              <Button
                onClick={() => handleStatus(booking._id, booking.propertyId, 'booked')}
                variant="outline-success"
                style={{
                  color: 'white',
                  borderColor: '#dc3545',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dc3545';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Pending
              </Button>
            ) : (
              <Button
                onClick={() => handleStatus(booking._id, booking.propertyId, 'pending')}
                variant="outline-danger"
                style={{
                  color: 'white',
                  borderColor: '#28a745',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#28a745';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Approve
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      </div>
   );
};

export default AllProperty;

