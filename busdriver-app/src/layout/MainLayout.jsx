import React, { useEffect, useState, useRef } from 'react';
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Typography } from "@mui/material";
import PageContainer from "../components/PageContainer";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MainLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const pageContainerRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = pageContainerRef.current;
      if (container) {
        const currentScrollTop = container.scrollTop;
        // Logic for header
        setScrolled(currentScrollTop > 20);

        // Logic for sidebar visibility
        if (currentScrollTop > lastScrollTop.current && currentScrollTop > 180) {
          // Scrolling down past 180px, hide sidebar
          setSidebarVisible(false);
        } else if (currentScrollTop < 120) {
          // Scrolled back to the top, show sidebar
          setSidebarVisible(true);
        }
        lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
      }
    };

    const container = pageContainerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

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

  const clockComponent = (
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
  );

  return (
    <PageContainer direction="column" justCont="start" alignItm="start" ref={pageContainerRef}>
      <CssBaseline />

      {/* Conteneur global avec padding */}
      <Box sx={{ width: '100%', padding: '30px', paddingBottom: '0px' }}>
        {/* Logo en haut à gauche */}
        <Box sx={{
          width: 'calc(100% - 70px)',
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          mb: 3,
          position: 'fixed',
          top: '30px',
          zIndex: 999,
          transition: 'padding 0.3s, background-color 0.3s, box-shadow 0.3s',
          ...(scrolled && {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            padding: '30px 20px',
            borderRadius: '22px',
            marginLeft: 1,
            top: '20px',
            width: 'calc(100% - 70px)',
            left: '20px',
          }),
        }}>
          <Logo width={142} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile && clockComponent}
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
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} mobileClock={isMobile ? clockComponent : null} isVisible={isSidebarVisible} />

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
