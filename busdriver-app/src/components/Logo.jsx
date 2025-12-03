import React from 'react';
import { Box } from '@mui/material';
import logo from '../assets/images/busDRIVER_logo.png';

const Logo = ({ width = 60}) => {
    return (
      <Box sx={{ width }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </Box>
    );
  };

export default Logo;
