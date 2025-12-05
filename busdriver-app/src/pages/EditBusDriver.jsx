import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { apiFetch } from "../services/apiAuth";
import { Box, Paper, TextField, Button } from "@mui/material";
import { MenuItem } from '@mui/material';

const EditBusDriver = () => {
  const { id } = useParams();
  const [busDriver, setBusDriver] = useState(null);
  const { showLoader, hideLoader } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriver = async () => {
      showLoader();
      try {
        const response = await apiFetch(`/busdrivers/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setBusDriver(data);
        } else {
          alert("Chauffeur non trouvé.");
          navigate("/bus-driver-list");
        }
      } catch (error) {
        alert("Une erreur réseau est survenue.");
      } finally {
        hideLoader();
      }
    };
    fetchDriver();
  }, [id, navigate, showLoader, hideLoader]);

  // Mettre à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusDriver((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const response = await apiFetch(`/busdrivers/${id}/`, {
        method: "PUT",
        body: JSON.stringify(busDriver),
      });
      if (response.ok) {
        alert("Modifications enregistrées !");
        navigate("/bus-driver-list");
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      alert("Une erreur réseau est survenue.");
    } finally {
      hideLoader();
    }
  };

  // Vérification si les données existent avant d'afficher le formulaire
  if (!busDriver) return <p>Chargement...</p>;

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ padding: 2 }}>
        <h3>Modifier le Bus Driver</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom"
            name="fullName"
            value={busDriver.fullName}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Téléphone"
            name="phone"
            value={busDriver.phone}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={busDriver.email}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Adresse"
            name="address"
            value={busDriver.address}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Date de naissance"
            name="birthDate"
            value={busDriver.birthDate}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Numéro de permis"
            name="licenseNumber"
            value={busDriver.licenseNumber}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Expiration du permis"
            name="licenseExpiry"
            value={busDriver.licenseExpiry}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Matricule du chauffeur"
            name="driverId"
            value={busDriver.driverId}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Numéro du bus"
            name="busNumber"
            type="number"
            value={busDriver.busNumber}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Compagnie de transport"
            name="companyName"
            value={busDriver.companyName}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            select
            label="Type de bus"
            name="busType"
            value={busDriver.busType}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="Minibus">Minibus</MenuItem>
            <MenuItem value="Autocar">Autocar</MenuItem>
            <MenuItem value="Bus Urbain">Bus Urbain</MenuItem>
            <MenuItem value="Double étage">Double étage</MenuItem>
          </TextField>
          <TextField
            label="Années d'expérience"
            type="number"
            name="experienceYears"
            value={busDriver.experienceYears}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Date d'embauche"
            name="hireDate"
            value={busDriver.hireDate}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Sauvegarder
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditBusDriver;
