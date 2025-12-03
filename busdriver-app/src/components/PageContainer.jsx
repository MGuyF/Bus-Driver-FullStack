import React from 'react';
import { Box } from '@mui/material';
import background from "../assets/images/busDRIVER_bg.png" // 🔁 Chemin fixe vers ton image

const PageContainer = ({ children, direction = 'row', justCont = 'center', alignItm = 'center' }) => {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: direction,          // ✅ Direction personnalisable ici
    justifyContent: justCont,
    alignItems: alignItm,
    color: 'white',
    backgroundColor: '#fff',
    backgroundAttachment: 'fixed',
  };

  return <Box style={containerStyle}>{children}</Box>;
};

export default PageContainer;
