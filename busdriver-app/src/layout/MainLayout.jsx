import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Typography } from "@mui/material";
import PageContainer from "../components/PageContainer";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import { useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-height: 676px)');

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) => {
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatted = date.toLocaleDateString('fr-FR', optionsDate);
    const timeFormatted = date.toLocaleTimeString('fr-FR');
    return `${dateFormatted} - ${timeFormatted}`;
  };

  return (
    <PageContainer direction="column" justCont="start" alignItm="start">
      <CssBaseline />

      {/* Conteneur global avec padding */}
      <Box sx={{ width: '100%', padding: '30px', paddingBottom: '0px' }}>
  {/* Logo en haut à gauche */}
  <Box sx={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 3, position: 'sticky', top: '30px' }}>
    <Logo width={142} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Typography
        variant="body2"
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#343434',
          ml: 2,
          textTransform: 'capitalize',
        }}
      >
        {formatDateTime(currentTime)}
      </Typography>
      {isMobile && (
        <IconButton onClick={() => setMobileOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}
      <DarkModeIcon sx={{ color: '#343434' }} />
    </Box>
  </Box>

  {/* Contenu principal en ligne : Sidebar + Outlet */}
  <Box sx={{ display: "flex", marginTop: '7.8rem'}}>
    {/* Sidebar */}
    <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

    {/* Main content */}
    <Box sx={{ flexGrow: 1}}>
      <Outlet />
    </Box>
  </Box>
</Box>

    </PageContainer>
  );
};

export default MainLayout;
