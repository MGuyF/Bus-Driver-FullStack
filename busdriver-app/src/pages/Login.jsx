import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  TextField,
  InputAdornment,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from "../services/authService"; // Importer la fonction d'authentification
import Logo from "../components/Logo";
import "../assets/css/Index.css";
import PageContainer from "../components/PageContainer";
import { CircularProgress } from "@mui/material"; // Pour le spinner

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Permet de rediriger après connexion
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");       // Retirer l’erreur précédente
    setLoading(true);   // Activer le spinner
    if (login(email, password)) {
      navigate("/AddBusDriver"); // Rediriger vers la page Dashboard après connexion
    } else {
      setError("Email ou mot de passe incorrect.");
      setLoading(false); // Arrêter le spinner
    }
  };

  return (
    <PageContainer>
      <Grid container justifyContent="center" alignItems="center" sx={{ padding: '1rem', height: '100vh' }}>
      <Card
        elevation={4}
        sx={{
          padding: '45px',
          width: 490,
          border: '1px solid #e7f4ff',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: '33px',
          textAlign: 'center'
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: '30px' }}>
          <Logo width={180} />
        </Box>

        {/* Message d'erreur */}
        {error && (
          <Box
            className="invalid"
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffe6e6',
              color: '#b00020',
              padding: '10px 16px',
              borderRadius: '8px',
              mb: '22px',
              mt: '-10px'
            }}
          >
            <ErrorOutline sx={{ mr: 1 }} />
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            label="Email"
            placeholder="exemple@domaine.com"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, fontSize: '14px'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Mot de passe */}
          <TextField
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            variant="outlined"
            fullWidth
            type={showPwd ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3, fontSize: '14px'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPwd(!showPwd)} edge="end">
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Bouton */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ position: 'relative', height: 45 }}
          >
            {loading && (
              <CircularProgress
                size={22}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-11px',
                  marginLeft: '-11px',
                }}
              />
            )}
            {!loading && 'Se connecter'}
          </Button>
        </form>
      </Card>
    </Grid>
    </PageContainer>
  );
};

export default LoginPage;
