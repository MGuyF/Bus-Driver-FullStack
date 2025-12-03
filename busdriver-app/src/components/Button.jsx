import React from 'react';
import { Button } from '@mui/material';  // Importer le composant Button de MUI

const CustomButton = ({ onClick, children, variant = "contained", color = "primary" }) => {
  return (
    <Button 
      variant={variant} 
      color={color} 
      onClick={onClick}
      sx={{
        margin: "10px",  // Par exemple, ajout d'une marge
        padding: "10px 20px",  // Taille du bouton
        borderRadius: "5px",  // Bordures arrondies
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
