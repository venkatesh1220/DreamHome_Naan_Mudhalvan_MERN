import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

function AddProperty() {
   const [image, setImage] = useState(null);
   const [propertyDetails, setPropertyDetails] = useState({
      propertyType: 'residential',
      propertyAdType: 'rent',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });

   const handleImageChange = (e) => {
      const files = e.target.files;
      setImage(files);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   useEffect(() => {
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         propertyImages: image,
      }));
   }, [image]);

   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.append('propertyType', propertyDetails.propertyType);
      formData.append('propertyAdType', propertyDetails.propertyAdType);
      formData.append('propertyAddress', propertyDetails.propertyAddress);
      formData.append('ownerContact', propertyDetails.ownerContact);
      formData.append('propertyAmt', propertyDetails.propertyAmt);
      formData.append('additionalInfo', propertyDetails.additionalInfo);

      if (image) {
         for (let i = 0; i < image.length; i++) {
            formData.append('propertyImages', image[i]);
         }
      }

      axios.post('http://localhost:8001/api/owner/postproperty', formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
         }
      })
         .then((res) => {
            if (res.data.success) {
               message.success(res.data.message);
            } else {
               message.error(res.data.message);
            }
         })
         .catch((error) => {
            console.error('Error adding property:', error);
         });
   };

   return (
      <Container
  style={{
    backgroundColor: '#0b0b2b',
    border: '1px solid #ffffff33',
    borderRadius: '10px',
    padding: '30px',
    color: 'white',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
    fontFamily: `'Roboto', sans-serif`,
  }}
>
  <Form onSubmit={handleSubmit}>
    <Row className="mb-4">
      <Form.Group as={Col} md="4">
        <Form.Label style={{ color: 'white', fontWeight: 'bold' }}>Property Type</Form.Label>
        <Form.Select
          name="propertyType"
          value={propertyDetails.propertyType}
          onChange={handleChange}
          style={{
            backgroundColor: 'white',
            color: '#0b0b2b',
            border: '1px solid #ffffff33',
            fontSize: '16px',
          }}
        >
          <option value="choose.." disabled>
            Choose...
          </option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} md="4">
        <Form.Label style={{ color: 'white', fontWeight: 'bold' }}>Property Ad Type</Form.Label>
        <Form.Select
          name="propertyAdType"
          value={propertyDetails.propertyAdType}
          onChange={handleChange}
          style={{
            backgroundColor: 'white',
            color: '#0b0b2b',
            border: '1px solid #ffffff33',
            fontSize: '16px',
          }}
        >
          <option value="choose.." disabled>
            Choose...
          </option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} md="4">
        <Form.Label style={{ color: 'white', fontWeight: 'bold' }}>Property Full Address</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder="Address"
            required
            name="propertyAddress"
            value={propertyDetails.propertyAddress}
            onChange={handleChange}
            style={{
              backgroundColor: 'white',
              color: '#0b0b2b',
              border: '1px solid #ffffff33',
              fontSize: '16px',
            }}
          />
        </InputGroup>
      </Form.Group>
    </Row>

    <Row className="mb-4">
      <Form.Group as={Col} md="6">
        <Form.Label style={{ color: 'white', fontWeight: 'bold' }}>Property Images</Form.Label>
        <Form.Control
          type="file"
          placeholder="Upload images"
          required
          accept="image/*"
          name="images"
          multiple
          onChange={handleImageChange}
          style={{
            backgroundColor: 'white',
            color: '#0b0b2b',
            border: '1px solid #ffffff33',
            fontSize: '16px',
          }}
        />
      </Form.Group>

      <Form.Group as={Col} md="3">
        <Form.Label style={{ color: 'white', fontWeight: 'bold' }}>Owner Contact No.</Form.Label>
        <Form.Control
          type="phone"
          placeholder="Contact number"
          required
          name="ownerContact"
          value={propertyDetails.ownerContact}
          onChange={handleChange}
          style={{
            backgroundColor: 'white',
            color: '#0b0b2b',
            border: '1px solid #ffffff33',
            fontSize: '16px',
          }}
        />
      </Form.Group>

      <Form.Group as={Col} md="3">
        <Form.Label style={{ color: 'white', fontWeight: 'bold' }}>Property Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Amount"
          required
          name="propertyAmt"
          value={propertyDetails.propertyAmt}
          onChange={handleChange}
          style={{
            backgroundColor: 'white',
            color: '#0b0b2b',
            border: '1px solid #ffffff33',
            fontSize: '16px',
          }}
        />
      </Form.Group>
    </Row>

    <FloatingLabel
      label="Additional details for the Property"
      className="mt-4"
      style={{ color: 'white' }}
    >
      <Form.Control
        as="textarea"
        name="additionalInfo"
        value={propertyDetails.additionalInfo}
        onChange={handleChange}
        placeholder="Leave a comment here"
        style={{
          backgroundColor: 'white',
          color: '#0b0b2b',
          border: '1px solid #ffffff33',
          fontSize: '16px',
        }}
      />
    </FloatingLabel>

    <Button
      variant="outline-light"
      className="float-right mt-4"
      type="submit"
      style={{
        backgroundColor: '#0b0b2b',
        borderColor: '#ffffff33',
        color: 'white',
        padding: '10px 20px',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.color = '#0b0b2b';
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#0b0b2b';
        e.target.style.color = 'white';
        e.target.style.transform = 'scale(1)';
      }}
    >
      Submit Form
    </Button>
  </Form>
</Container>


   );
}

export default AddProperty;
