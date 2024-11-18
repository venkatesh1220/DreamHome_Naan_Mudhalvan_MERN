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

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllProperties(response.data.data);
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
  <Table sx={{ minWidth: 650 }} aria-label="redesigned property table">
    <TableHead>
      <TableRow>
        {[
          'Property ID',
          'Owner ID',
          'Property Type',
          'Property Ad Type',
          'Property Address',
          'Owner Contact',
          'Property Amount',
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
      {allProperties.map((property) => (
        <TableRow
          key={property._id}
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
            {property._id}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {property.ownerId}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {property.propertyType}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {property.propertyAdType}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {property.propertyAddress}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {property.ownerContact}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {property.propertyAmt}
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
