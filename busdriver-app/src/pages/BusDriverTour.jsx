import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Grid
} from "@mui/material";
import {
  DirectionsBus,
  Person,
  LocationOn,
  CalendarToday,
  AccessTime
} from "@mui/icons-material";

const textFieldStyle = {
  '& .MuiInputBase-root': {
    height: '47px'
  },
  '& .MuiInputBase-input': {
    fontSize: '0.9rem'
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.35rem'
  }
};

export default function TourForm({ formData = {}, handleChange, handleSubmit }) {

  const [scrolled, setScrolled] = React.useState(false);
const handleScroll = (e) => {
  const top = e.target.scrollTop;
  setScrolled(top > 0);
};


const boxRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
  
    if (!box) return;
  
    const checkOverflow = () => {
      const isOverflowing = box.scrollHeight > box.clientHeight;
      setHasOverflow(isOverflowing);
    };
  
    checkOverflow();
  
    // Re-check on window resize in case height changes
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);


  return (
    <Box ref={boxRef}
      onScroll={handleScroll}
        sx={{
          display: "block",
          height: '75.5vh',
          overflowY: hasOverflow ? 'auto' : 'visible',
          boxShadow: scrolled ? 'inset 0 10px 10px -10px rgba(0,0,0,0.2)' : 'none',
          paddingTop: hasOverflow ? '14px' : 0,
          paddingBottom: hasOverflow ? '20px' : 0,
          paddingRight: hasOverflow ? '15px' : 0,
          paddingLeft: hasOverflow ? '20px' : 0,
          marginTop: hasOverflow ? '-14px' : 0,
          marginLeft: hasOverflow ? '-20px' : 0,
          transition: 'box-shadow 0.3s ease, padding 0.3s ease',
          // Scrollbar styling
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(200, 200, 200, 0.4)', // piste claire
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(200,200,200)', // poignée
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgb(180,180,180)', // au survol
          },
        }}>
      {/* Titre du formulaire */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          marginLeft: '15px',
          marginTop: '-46px',
        }}
      >
        <DirectionsBus sx={{ fontSize: '1.18rem', marginBottom: '8px', color: '#343434', mr: 1 }} />
        <Typography
          variant="h5"
          color="#343434"
          gutterBottom
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '-0.008em',
          }}
        >
          Enregistrement d’un Tour
        </Typography>
      </Box>

      {/* Contenu du formulaire */}
      <Paper
        elevation={3}
        sx={{
          padding: '45px',
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          border: '1px solid #e7f4ff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: '33px',
        }}
      >
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
  <Grid container spacing={4}>
    {/* Section gauche */}
    <Grid item xs={12} md={6}>
      <Typography fontSize="1.2rem" variant="h6" gutterBottom>
        <CalendarToday fontSize="1.32rem" sx={{ mr: 1, mb: '-3px' }} />
        Informations temporelles
      </Typography>

      <TextField
        fullWidth
        type="date"
        label="Date du tour"
        name="date"
        value={formData.date}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarToday />
            </InputAdornment>
          ),
        }}
        placeholder="Sélectionnez la date"
      />

      <TextField
        fullWidth
        type="time"
        label="Heure de départ"
        name="departureTime"
        value={formData.departureTime}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime />
            </InputAdornment>
          ),
        }}
        placeholder="HH:MM"
      />

      <TextField
        fullWidth
        type="time"
        label="Heure d’arrivée"
        name="arrivalTime"
        value={formData.arrivalTime}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime />
            </InputAdornment>
          ),
        }}
        placeholder="HH:MM"
      />
    </Grid>

    {/* Section droite */}
    <Grid item xs={12} md={6}>
      <Typography fontSize="1.2rem" variant="h6" gutterBottom>
        <LocationOn fontSize="1.32rem" sx={{ mr: 1, mb: '-3px' }} />
        Trajet
      </Typography>

      <TextField
        fullWidth
        label="Point de départ"
        name="startLocation"
        value={formData.startLocation}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
        }}
        placeholder="Indiquer le point de départ"
      />

      <TextField
        fullWidth
        label="Destination"
        name="endLocation"
        value={formData.endLocation}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
        }}
        placeholder="Indiquer la destination"
      />

      <TextField
        fullWidth
        select
        label="Bus utilisé"
        name="busId"
        value={formData.busId}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DirectionsBus />
            </InputAdornment>
          ),
        }}
        placeholder="Sélectionner un bus"
      >
        <MenuItem value="1">Bus 1</MenuItem>
        <MenuItem value="2">Bus 2</MenuItem>
        {/* Liste dynamique à venir */}
      </TextField>

      <TextField
        fullWidth
        select
        label="Chauffeur"
        name="driverId"
        value={formData.driverId}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
        placeholder="Sélectionner un chauffeur"
      >
        <MenuItem value="101">John Doe</MenuItem>
        <MenuItem value="102">Jane Smith</MenuItem>
        {/* Liste dynamique à venir */}
      </TextField>
    </Grid>
  </Grid>
</Box>



        {/* Bouton */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button type="submit" variant="contained" size="large">
            Enregistrer
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
