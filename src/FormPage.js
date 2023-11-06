/**
 * This file, `FormPage.js`, serves as a template for creating forms within the FireBridge application.
 * It provides a foundational layout and functionality for data submission to Firebase.
 * Please customize this form to fit the specific data structure and requirements of your project.
 * The fields, validations, and aesthetics can all be tailored to suit the unique needs of your data collection and user interface.
 */
import React, { useState } from 'react';
import firebase from './firebaseConfig';
import { Button, Grid, TextField, Typography, GlobalStyles } from '@mui/material';
import { styled } from '@mui/system';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'red',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: 'red',
  },
  '&& .MuiFilledInput-input': {
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  '& .Mui-focused.MuiInputLabel-filled': {
    color: 'red',
  },
  '& .Mui-focused.MuiInputLabel-outlined': {
    color: 'red',
  },
});

const MyGlobalStyles = () => (
  <GlobalStyles styles={{
    'body, html': {
      overflow: 'hidden',
    },
  }} />
);

function DataSubmissionForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleInputClick = (setErrorState) => {
    setErrorState(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (!name) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!age) {
      setAgeError(true);
      isValid = false;
    } else {
      setAgeError(false);
    }

    if (!email) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }

    const data = {
      Name: name,
      Age: age,
      Email: email,
      Phone: phone,
      City: city,
      Country: country
    };

    firebase.database().ref('/FormSubmission').push(data)
      .then(() => {
        alert("Data sent successfully");
        setName("");
        setAge("");
        setEmail("");
        setPhone("");
        setCity("");
        setCountry("");
      })
      .catch(e => {
        alert(`An error occurred: ${e}`);
      });
  };

  return (
    <>
      <MyGlobalStyles />
      <div style={{ padding: '2em', fontFamily: 'Arial, sans-serif', background: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#555' }}>FireBridge</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <CustomTextField 
              fullWidth 
              label="Full Name"
              variant="filled"
              value={name} 
              error={nameError}
              onChange={e => setName(e.target.value)}
              onClick={() => handleInputClick(setNameError)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <CustomTextField 
              fullWidth 
              label="Age"
              variant="filled"
              value={age} 
              error={ageError}
              onChange={e => setAge(e.target.value)}
              onClick={() => handleInputClick(setAgeError)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField 
              fullWidth 
              label="Email"
              variant="filled"
              value={email} 
              error={emailError}
              onChange={e => setEmail(e.target.value)}
              onClick={() => handleInputClick(setEmailError)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField 
              fullWidth 
              label="Phone"
              variant="filled"
              value={phone} 
              onChange={e => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField 
              fullWidth 
              label="Country"
              variant="filled"
              value={country} 
              onChange={e => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField 
              fullWidth 
              label="City"
              variant="filled"
              value={city} 
              onChange={e => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary"
              style={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                borderRadius: '5px',
                transition: 'transform 0.3s ease-in-out'
              }}
              onClick={handleSubmit}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default DataSubmissionForm;
