import React from 'react';
import { Box } from '@mui/material';
import background from "../assets/images/busDRIVER_bg.png" // 🔁 Chemin fixe vers ton image

const PageContainer = React.forwardRef(({ children, direction = 'row', justCont = 'center', alignItm = 'center' }, ref) => {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: direction,
    justifyContent: justCont,
    alignItems: alignItm,
    color: 'white',
    backgroundColor: '#fff',
    backgroundAttachment: 'fixed',
  };

  return <Box style={containerStyle} ref={ref}>{children}</Box>;
});

export default PageContainer;
