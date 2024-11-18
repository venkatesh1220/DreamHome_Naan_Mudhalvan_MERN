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
import { Button, Form, Modal, Col, InputGroup, Row, FloatingLabel } from 'react-bootstrap';



const AllProperties = () => {
   const [image, setImage] = useState(null);
   const [editingPropertyId, setEditingPropertyId] = useState(null);
   const [editingPropertyData, setEditingPropertyData] = useState({
      propertyType: '',
      propertyAdType: '',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });
   const [allProperties, setAllProperties] = useState([]);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);

   const handleShow = (propertyId) => {
      const propertyToEdit = allProperties.find(property => property._id === propertyId);
      if (propertyToEdit) {
         setEditingPropertyId(propertyId);
         setEditingPropertyData(propertyToEdit);
         setShow(true);
      }
   };

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error('Something went wrong')
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);


   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
   }
   const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingPropertyData({ ...editingPropertyData, [name]: value });
   }

   useEffect(() => {
      setEditingPropertyData((prevDetails) => ({
         ...prevDetails,
         propertyImage: image,
      }));
   }, [image]);

   const saveChanges = async (propertyId, status) => {
      try {
         const formData = new FormData();
         formData.append('propertyType', editingPropertyData.propertyType);
         formData.append('propertyAdType', editingPropertyData.propertyAdType);
         formData.append('propertyAddress', editingPropertyData.propertyAddress);
         formData.append('ownerContact', editingPropertyData.ownerContact);
         formData.append('propertyAmt', editingPropertyData.propertyAmt);
         formData.append('additionalInfo', editingPropertyData.additionalInfo);
         formData.append('propertyImage', image);
         formData.append('isAvailable', status);
         const res = await axios.patch(`http://localhost:8001/api/owner/updateproperty/${propertyId}`, formData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         })
         if (res.data.success) {
            message.success(res.data.message)
            handleClose();
         }
      } catch (error) {
         console.log(error);
         message.error('Failed to save changes');
      }
   };

   const handleDelete = async (propertyId) => {
      let assure = window.confirm("are you sure to delete")
      if (assure) {
         try {
            const response = await axios.delete(`http://localhost:8001/api/owner/deleteproperty/${propertyId}`, {
               headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.data.success) {
               message.success(response.data.message);
               getAllProperty();
            } else {
               message.error(response.data.message);
            }
         } catch (error) {
            console.log(error);
         }
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
  <Table sx={{ minWidth: 650 }} aria-label="property table">
    <TableHead>
      <TableRow>
        {[
          'Property ID',
          'Property Type',
          'Property Ad Type',
          'Property Address',
          'Owner Contact',
          'Property Amt',
          'Property Availability',
          'Action',
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
            style={{ color: 'white', fontSize: '15px', borderBottom: '1px solid #ffffff33' }}
          >
            {property._id}
          </TableCell>
          <TableCell align="center" style={{ color: 'white', borderBottom: '1px solid #ffffff33' }}>
            {property.propertyType}
          </TableCell>
          <TableCell align="center" style={{ color: 'white', borderBottom: '1px solid #ffffff33' }}>
            {property.propertyAdType}
          </TableCell>
          <TableCell align="center" style={{ color: 'white', borderBottom: '1px solid #ffffff33' }}>
            {property.propertyAddress}
          </TableCell>
          <TableCell align="center" style={{ color: 'white', borderBottom: '1px solid #ffffff33' }}>
            {property.ownerContact}
          </TableCell>
          <TableCell align="center" style={{ color: 'white', borderBottom: '1px solid #ffffff33' }}>
            {property.propertyAmt}
          </TableCell>
          <TableCell align="center" style={{ color: 'white', borderBottom: '1px solid #ffffff33' }}>
            {property.isAvailable}
          </TableCell>
          <TableCell align="center" style={{ borderBottom: '1px solid #ffffff33' }}>
            <Button
              variant="outline-info"
              onClick={() => handleShow(property._id, 'Available')}
              style={{
                color: 'white',
                borderColor: '#007bff',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Edit
            </Button>
            <Modal show={show && editingPropertyId === property._id} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Property</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Modal Form Code Here */}
                <Form onSubmit={() => saveChanges(property._id)}>
                  {/* Form fields */}
                </Form>
              </Modal.Body>
            </Modal>
            <Button
              className="mx-2"
              variant="outline-danger"
              onClick={() => handleDelete(property._id)}
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
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      </div>
   );
};

export default AllProperties;

