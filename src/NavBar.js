// React and Hooks
import React, { useState } from 'react';

// Material-UI Component Imports
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Emotion styled component import
import styled from '@emotion/styled';

// React Router
import { Link } from 'react-router-dom';

// Emotion styled components for styling
const StyledAppBar = styled(AppBar)`
    flex-grow: 1;
    margin-bottom: 20px;
`;

const StyledIconButton = styled(IconButton)`
    margin-right: 16px;
`;

const StyledTypography = styled(Typography)`
    flex-grow: 1;
`;

const NavBar = ({ user, onLogout, color }) => {
  const [anchorEl, setAnchorEl] = useState(null); // Using the imported useState

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static" color={color}>
        <Toolbar>
            <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
            </StyledIconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/">Admin Portal</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/form">Form</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/settings">Settings</MenuItem>
            </Menu>
            <StyledTypography variant="h6">
                FireBridge
            </StyledTypography>
            {user && (
                <>
                    <StyledTypography variant="subtitle1">
                        {user.email}
                    </StyledTypography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </>
            )}
        </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;