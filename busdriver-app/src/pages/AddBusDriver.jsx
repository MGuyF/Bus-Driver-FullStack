import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { apiFetch } from "../services/apiAuth";
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
  
  const BusDriverForm = () => {
  const { showLoader, hideLoader } = useLoading();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    birth_date: "",
    license_number: "",
    license_expiry: "",
    driver_id: "",
    bus_number: "",
    company_name: "",
    bus_type: "",
    experience_years: "",
    hire_date: "",
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
  
    const validate = () => {
    let tempErrors = {};
    tempErrors.full_name = formData.full_name ? "" : "Le nom complet est requis.";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "L'email n'est pas valide.";
    tempErrors.phone = formData.phone ? "" : "Le téléphone est requis.";
    tempErrors.address = formData.address ? "" : "L'adresse est requise.";
    tempErrors.birth_date = formData.birth_date ? "" : "La date de naissance est requise.";
    tempErrors.license_number = formData.license_number ? "" : "Le numéro de permis est requis.";
    tempErrors.license_expiry = formData.license_expiry ? "" : "La date d'expiration du permis est requise.";
    tempErrors.driver_id = formData.driver_id ? "" : "Le matricule est requis.";
    tempErrors.bus_number = formData.bus_number ? "" : "Le numéro du bus est requis.";
    tempErrors.company_name = formData.company_name ? "" : "Le nom de la compagnie est requis.";
    tempErrors.bus_type = formData.bus_type ? "" : "Le type de bus est requis.";
    tempErrors.experience_years = formData.experience_years ? "" : "Les années d'expérience sont requises.";
    tempErrors.hire_date = formData.hire_date ? "" : "La date d'embauche est requise.";

    setErrors({
      ...tempErrors,
    });

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      showLoader();
      try {
        const response = await apiFetch("/busdrivers/", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setFormData({
            full_name: "",
            phone: "",
            email: "",
            address: "",
            birth_date: "",
            license_number: "",
            license_expiry: "",
            driver_id: "",
            bus_number: "",
            company_name: "",
            bus_type: "",
            experience_years: "",
            hire_date: "",
          });
          swal.fire({
            icon: 'success',
            title: 'Chauffeur ajouté !',
            text: 'Le chauffeur a bien été enregistré.',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate("/BusDriverList");
          });
        } else {
          const errorData = await response.json();
          if (typeof errorData === 'object' && errorData !== null) {
            setErrors(errorData);
          } else {
            swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Impossible d\'ajouter le chauffeur.',
              confirmButtonText: 'Fermer'
            });
          }
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
          border: '1px solid #e7f4ff',
          borderRadius: '33px',
          padding: '45px',
            width: "100%",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
        name="full_name"
        placeholder="Entrez le nom complet"
        value={formData.full_name}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.full_name && { error: true, helperText: errors.full_name })}
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
        {...(errors.phone && { error: true, helperText: errors.phone })}
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
        type="email"
        placeholder="exemple@domaine.com"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.email && { error: true, helperText: errors.email })}
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
        {...(errors.address && { error: true, helperText: errors.address })}
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
        name="birth_date"
        placeholder="JJ/MM/AAAA"
        value={formData.birth_date}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputLabelProps={{ shrink: true }}
        {...(errors.birth_date && { error: true, helperText: errors.birth_date })}
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
        name="license_number"
        placeholder="AB123456"
        value={formData.license_number}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.license_number && { error: true, helperText: errors.license_number })}
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
        name="license_expiry"
        placeholder="JJ/MM/AAAA"
        value={formData.license_expiry}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputLabelProps={{ shrink: true }}
        {...(errors.license_expiry && { error: true, helperText: errors.license_expiry })}
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
        name="driver_id"
        placeholder="Ex : DRV001"
        value={formData.driver_id}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.driver_id && { error: true, helperText: errors.driver_id })}
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
        name="bus_number"
        placeholder="Ex : BUS101"
        value={formData.bus_number}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.bus_number && { error: true, helperText: errors.bus_number })}
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
        name="company_name"
        placeholder="Ex : Transport Express"
        value={formData.company_name}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.company_name && { error: true, helperText: errors.company_name })}
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
        name="bus_type"
        value={formData.bus_type}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.bus_type && { error: true, helperText: errors.bus_type })}
      >
        <MenuItem value="Minibus">Minibus</MenuItem>
        <MenuItem value="Grand bus">Grand bus</MenuItem>
      </TextField>
      <TextField
        fullWidth
        type="number"
        label="Années d'expérience"
        name="experience_years"
        placeholder="Ex : 5"
        value={formData.experience_years}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        {...(errors.experience_years && { error: true, helperText: errors.experience_years })}
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
        name="hire_date"
        placeholder="JJ/MM/AAAA"
        value={formData.hire_date}
        onChange={handleChange}
        margin="normal"
        sx={textFieldStyle}
        required
        InputLabelProps={{ shrink: true }}
        {...(errors.hire_date && { error: true, helperText: errors.hire_date })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarToday />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
      <Button type="submit" variant="contained" size="large">
        Enregistrer
      </Button>
    </Grid>
  </Grid>
        </Paper>
      </Box>
    );
  };

export default BusDriverForm;
