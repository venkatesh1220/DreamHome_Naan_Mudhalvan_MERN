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

const AllBookings = () => {
   const [allBookings, setAllBookings] = useState([]);

   const getAllBooking = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallbookings', {
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
      getAllBooking();
   }, []);

   return (
      <div>
         <TableContainer
  component={Paper}
  style={{
    backgroundColor: '#0b0b2b',
    border: '1px solid #ffffff33',
    borderRadius: '10px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
    color: 'white',
    fontFamily: `'Roboto', sans-serif`,
    marginTop: '2rem',
  }}
>
  <Table sx={{ minWidth: 650 }} aria-label="redesigned booking table">
    <TableHead>
      <TableRow>
        {[
          'Booking ID',
          'Owner ID',
          'Property ID',
          'Tenant ID',
          'Tenant Name',
          'Tenant Contact',
          'Booking Status',
        ].map((heading) => (
          <TableCell
            key={heading}
            align="center"
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              borderBottom: '1px solid #ffffff33',
              textTransform: 'capitalize',
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
            {booking.ownerID}
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
            {booking.userID}
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
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      </div>
   );
};

export default AllBookings;
