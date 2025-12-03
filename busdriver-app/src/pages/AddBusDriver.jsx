import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Grid
} from "@mui/material";
import {
  Person,
  Phone,
  Email,
  Home,
  CalendarToday,
  DriveEta,
  Badge,
  DirectionsBus,
  Business,
  Event,
  AssignmentInd
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
  
  const BusDriverForm = () => {
    const [formData, setFormData] = useState({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      birthDate: "",
      licenseNumber: "",
      licenseExpiry: "",
      driverId: "",
      busNumber: "",
      companyName: "",
      busType: "",
      experienceYears: "",
      hireDate: "",
    });
  
    const getNextId = () => {
      let lastId = localStorage.getItem("lastDriverId") || 0;
      lastId = parseInt(lastId) + 1;
      localStorage.setItem("lastDriverId", lastId);
      return lastId;
    };
  
    const handleChange = (e) => {
      setFormData((prevFormData) => {
        const newId = prevFormData.id || getNextId(); // Génère un ID unique s'il n'existe pas déjà
  
        return {
          id: newId, // Met l'ID en premier
          ...prevFormData, // Ajoute le reste des données après
          [e.target.name]: e.target.value, // Met à jour le champ modifié
        };
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Données envoyées :", formData);
  
      // Sauvegarder les données dans le localStorage
      localStorage.setItem("busDrivers", JSON.stringify(formData));
      // Ajouter ici la logique pour envoyer les données à l'API ou à la base de données.
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
      <Box
      ref={boxRef}
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
        }}
      >
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: '15px',
    marginTop: '-46px',
  }}
>
  <AssignmentInd sx={{ fontSize: '1.18rem', marginBottom: '8px', color: '#343434', mr: 1 }} />
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
    Inscription Bus Driver
  </Typography>
</Box>

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
  
          {/* Les sections du formulaire */}
          
          <Grid container spacing={4} component="form" onSubmit={handleSubmit}>
    {/* Section 1 */}
    <Grid item xs={12} md={6} lg={4}>
      <Typography fontSize="1.2rem" variant="h6" gutterBottom>
        <Person fontSize="1.32rem" sx={{ mr: 1, marginBottom: "-3px" }} />
        Informations personnelles
      </Typography>
      <TextField
        fullWidth
        label="Nom complet"
        name="fullName"
        placeholder="Entrez le nom complet"
        value={formData.fullName}
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
      />
      <TextField
        fullWidth
        label="Téléphone"
        name="phone"
        placeholder="06 12 34 56 78"
        value={formData.phone}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        placeholder="exemple@domaine.com"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Adresse"
        name="address"
        placeholder="123 rue de Exemple"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Home />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    {/* Section 2 */}
    <Grid item xs={12} md={6} lg={4}>
      <Typography fontSize="1.2rem" variant="h6" gutterBottom>
        <CalendarToday fontSize="1.32rem" sx={{ mr: 1, marginBottom: "-3px" }} />
        Informations sur le permis
      </Typography>
      <TextField
        fullWidth
        type="date"
        label="Date de naissance"
        name="birthDate"
        placeholder="JJ/MM/AAAA"
        value={formData.birthDate}
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
      />
      <TextField
        fullWidth
        label="N° de permis"
        name="licenseNumber"
        placeholder="AB123456"
        value={formData.licenseNumber}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DriveEta />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        type="date"
        label="Expiration du permis"
        name="licenseExpiry"
        placeholder="JJ/MM/AAAA"
        value={formData.licenseExpiry}
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
      />
      <TextField
        fullWidth
        label="Matricule"
        name="driverId"
        placeholder="Ex : DRV001"
        value={formData.driverId}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Badge />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    {/* Section 3 */}
    <Grid item xs={12} md={12} lg={4}>
      <Typography fontSize="1.2rem" variant="h6" gutterBottom>
        <DirectionsBus fontSize="1.32rem" sx={{ mr: 1, marginBottom: "-3px" }} />
        Détails du bus
      </Typography>
      <TextField
        fullWidth
        label="N° du bus"
        name="busNumber"
        placeholder="Ex : BUS101"
        value={formData.busNumber}
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
      />
      <TextField
        fullWidth
        label="Compagnie"
        name="companyName"
        placeholder="Ex : Transport Express"
        value={formData.companyName}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Business />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        select
        label="Type de bus"
        name="busType"
        value={formData.busType}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
      >
        <MenuItem value="Minibus">Minibus</MenuItem>
        <MenuItem value="Grand bus">Grand bus</MenuItem>
      </TextField>
      <TextField
        fullWidth
        type="number"
        label="Années d'expérience"
        name="experienceYears"
        placeholder="Ex : 5"
        value={formData.experienceYears}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Event />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        type="date"
        label="Date d'embauche"
        name="hireDate"
        placeholder="JJ/MM/AAAA"
        value={formData.hireDate}
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
      />
    </Grid>
  </Grid>
  
          {/* Bouton en bas à droite */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button type="submit" variant="contained" size="large">
              Enregistrer
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  };


export default BusDriverForm;
