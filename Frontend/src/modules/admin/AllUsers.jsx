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
import Button from '@mui/material/Button';

const AllUsers = () => {
   const [allUser, setAllUser] = useState([]);

   useEffect(() => {
      getAllUser();
   }, []);

   const getAllUser = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallusers', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllUser(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleStatus = async (userid, status) => {
      try {
         await axios.post('http://localhost:8001/api/admin/handlestatus', { userid, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         }).then((res) => {
            if (res.data.success) {
               getAllUser();
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

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
  <Table sx={{ minWidth: 650 }} aria-label="redesigned user table">
    <TableHead>
      <TableRow>
        {[
          'User ID',
          'Name',
          'Email',
          'Type',
          'Granted (Owners Only)',
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
              textTransform: 'capitalize',
            }}
          >
            {heading}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {allUser.map((user) => (
        <TableRow
          key={user._id}
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
            {user._id}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {user.name}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {user.email}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {user.type}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {user.type === 'Owner' ? user.granted : 'N/A'}
          </TableCell>
          <TableCell
            align="center"
            style={{
              color: 'white',
              borderBottom: '1px solid #ffffff33',
            }}
          >
            {user.type === 'Owner' && user.granted === 'ungranted' ? (
              <Button
                onClick={() => handleStatus(user._id, 'granted')}
                size="small"
                variant="contained"
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                Grant
              </Button>
            ) : user.type === 'Owner' && user.granted === 'granted' ? (
              <Button
                onClick={() => handleStatus(user._id, 'ungranted')}
                size="small"
                variant="outlined"
                style={{
                  borderColor: '#f44336',
                  color: '#f44336',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                Revoke
              </Button>
            ) : (
              'N/A'
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

export default AllUsers;
