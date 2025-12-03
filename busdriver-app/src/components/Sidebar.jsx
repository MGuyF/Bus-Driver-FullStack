import {
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Drawer,
  Box,
  useMediaQuery
} from "@mui/material";
import {
  DirectionsBus,
  ExitToApp,
  TrackChanges,
  HistoryToggleOff,
  ListAlt
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-height: 676px)');

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false); // Ferme le drawer sur mobile
  };

  const mobileListItems = (
    <List>
      <ListItemButton onClick={() => handleNavigate("/AddBusDriver")} sx={{ backgroundColor: isActive("/AddBusDriver") ? "#ffdb2961" : "transparent" }}>
        <ListItemIcon>
          <DirectionsBus sx={{ fontSize: '1.7rem', color: "#1a1a1a" }} />
        </ListItemIcon>
        Ajouter
      </ListItemButton>
  
      <ListItemButton onClick={() => handleNavigate("/BusDriverList")} sx={{ backgroundColor: isActive("/BusDriverList") ? "#ffdb2961" : "transparent" }}>
        <ListItemIcon>
          <ListAlt sx={{ fontSize: '1.65rem', color: "#1a1a1a" }} />
        </ListItemIcon>
        Bus drivers
      </ListItemButton>
  
      <ListItemButton onClick={() => handleNavigate("/BusDriverTour")} sx={{ backgroundColor: isActive("/BusDriverTour") ? "#ffdb2961" : "transparent" }}>
        <ListItemIcon>
          <TrackChanges sx={{ fontSize: '1.7rem', color: "#1a1a1a" }} />
        </ListItemIcon>
        Tours
      </ListItemButton>
  
      <ListItemButton onClick={() => handleNavigate("/BusDriverHistory")} sx={{ backgroundColor: isActive("/BusDriverHistory") ? "#ffdb2961" : "transparent" }}>
        <ListItemIcon>
          <HistoryToggleOff sx={{ fontSize: '1.7rem', color: "#1a1a1a" }} />
        </ListItemIcon>
        Historique
      </ListItemButton>
  
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp sx={{ fontSize: '1.8rem', color: "#1a1a1a" }} />
        </ListItemIcon>
        Déconnexion
      </ListItemButton>
    </List>
  );
  

  const desktopListItems = (
    <List sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", p: 0 }}>
      <Tooltip title="Ajouter" placement="right">
        <ListItemButton onClick={() => handleNavigate("/AddBusDriver")} sx={{ backgroundColor: isActive("/AddBusDriver") ? "#ffdb2961" : "transparent", justifyContent: "center" }}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <DirectionsBus sx={{ fontSize: '1.7rem', color: "#1a1a1a" }} />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
  
      <Tooltip title="Bus drivers" placement="right">
        <ListItemButton onClick={() => handleNavigate("/BusDriverList")} sx={{ backgroundColor: isActive("/BusDriverList") ? "#ffdb2961" : "transparent", justifyContent: "center" }}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <ListAlt sx={{ fontSize: '1.65rem', color: "#1a1a1a" }} />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
  
      <Tooltip title="Tours" placement="right">
        <ListItemButton onClick={() => handleNavigate("/BusDriverTour")} sx={{ backgroundColor: isActive("/BusDriverTour") ? "#ffdb2961" : "transparent", justifyContent: "center" }}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <TrackChanges sx={{ fontSize: '1.7rem', color: "#1a1a1a" }} />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
  
      <Tooltip title="Historique" placement="right">
        <ListItemButton onClick={() => handleNavigate("/BusDriverHistory")} sx={{ backgroundColor: isActive("/BusDriverHistory") ? "#ffdb2961" : "transparent", justifyContent: "center" }}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <HistoryToggleOff sx={{ fontSize: '1.7rem', color: "#1a1a1a" }} />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
  
      <Tooltip title="Déconnexion" placement="right">
        <ListItemButton onClick={handleLogout} sx={{ justifyContent: "center" }}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <ExitToApp sx={{ fontSize: '1.8rem', color: "#1a1a1a" }} />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </List>
  );
  

  return (
    <>
      {isMobile ? (
        <>
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            PaperProps={{
              sx: {
                width: 240,
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            {mobileListItems}
          </Drawer>
        </>
      ) : (
        <Box sx={{ flexShrink: 0, mr: 3, width: '82px', position: 'sticky', top: '230px' }}>
        <Paper
          sx={{
            width: 88,
            height: 500,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid #e7f4ff',
            borderRadius: 50,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
          elevation={0}
        >
          {desktopListItems}
        </Paper>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
