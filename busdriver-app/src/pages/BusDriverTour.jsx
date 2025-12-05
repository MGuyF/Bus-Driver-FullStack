import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { apiFetch } from "../services/apiAuth";
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
import swal from '../utils/useSwal';

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

export default function TourForm() {
  const { showLoader, hideLoader } = useLoading();
  const navigate = useNavigate();
  const [busDrivers, setBusDrivers] = useState([]);
  const [formData, setFormData] = useState({
    bus_driver: '',
    tour_date: '',
    start_time: '',
    arrival_time: '',
    start_location: '',
    destination: '',
    status: 'scheduled',
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      showLoader();
      try {
        const response = await apiFetch('/busdrivers/');
        if (response.ok) {
          const data = await response.json();
          setBusDrivers(data);
        }
      } catch (error) {
        console.error("Failed to fetch bus drivers", error);
      } finally {
        hideLoader();
      }
    };
    fetchDrivers();
  }, [showLoader, hideLoader]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      // Assurez-vous que bus_driver est bien un ID
      const payload = {
        ...formData,
        bus_driver: parseInt(formData.bus_driver, 10),
      };

      const response = await apiFetch('/tours/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setFormData({
          bus_driver: '',
          tour_date: '',
          start_time: '',
          arrival_time: '',
          start_location: '',
          destination: '',
          status: 'scheduled',
        });
        swal.fire({
          icon: 'success',
          title: 'Tournée ajoutée !',
          text: 'La tournée a bien été enregistrée.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/BusDriverHistory');
        });
      } else {
        const errorData = await response.json();
        swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible d\'ajouter la tournée.',
          confirmButtonText: 'Fermer'
        });
      }
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la création.',
        confirmButtonText: 'Fermer'
      });
    } finally {
      hideLoader();
    }
  };


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
          border: '1px solid #e7f4ff',
          borderRadius: '33px',
          padding: '45px',
         width: "100%",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
        name="tour_date"
        value={formData.tour_date}
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
        name="start_time"
        value={formData.start_time}
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
        name="arrival_time"
        value={formData.arrival_time}
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
        name="start_location"
        value={formData.start_location}
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
        name="destination"
        value={formData.destination}
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
        select
        fullWidth
        label="Bus Driver"
        name="bus_driver"
        value={formData.bus_driver}
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
      >
        {busDrivers.map((driver) => (
          <MenuItem key={driver.id} value={driver.id}>
            {driver.full_name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
      <Button type="submit" variant="contained" size="large">
        Enregistrer la Tournée
      </Button>
    </Grid>
  </Grid>
</Box>
      </Paper>
    </Box>
  );
}
