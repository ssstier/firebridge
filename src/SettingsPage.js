import React from 'react';
import { Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const SettingsPage = ({ currentColor, changeNavBarColor }) => {
  const handleColorChange = (event) => {
    changeNavBarColor(event.target.value);
  };

  return (
    <Box p={3}>
      <FormControl fullWidth>
        <InputLabel id="navbar-color-label">Navbar Color</InputLabel>
        <Select
          labelId="navbar-color-label"
          id="navbar-color"
          value={currentColor}
          label="Navbar Color"
          onChange={handleColorChange}
        >
          <MenuItem value="default">White</MenuItem>
          <MenuItem value="primary">Blue</MenuItem>
          <MenuItem value="secondary">Purple</MenuItem>
          <MenuItem value="success">Green</MenuItem>
          <MenuItem value="warning">Orange</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SettingsPage;
