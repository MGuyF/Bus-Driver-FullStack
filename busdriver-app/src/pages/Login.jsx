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
import { login } from "../services/apiAuth"; // Importer la fonction d'authentification
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/AddBusDriver");
      } else {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || "Erreur réseau ou serveur. Veuillez réessayer.");
      setLoading(false);
    }
  };


  return (
    <PageContainer>
      <Grid container justifyContent="center" alignItems="center" sx={{ padding: '1rem', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%', maxWidth: 490, px: 2 }}>
        <Card
          elevation={4}
        sx={{
          padding: { xs: '30px', md: '45px' },
          width: '100%',
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

        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPwd ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPwd((show) => !show)}
                    edge="end"
                  >
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

        {error && (
          <Box sx={{ color: 'red', mt: 1, mb: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ffe6e6', padding: '10px 16px', borderRadius: '8px' }}>
            <ErrorOutline sx={{ mr: 1 }} />
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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

        <Box
          sx={{
            p: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            background: 'linear-gradient(90deg, #d8dcea 0%, #f8fafc 100%)',
            borderRadius: '18px',
            border: '1.5px solid #e7f4ff',
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
            mt: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 0.5 }}>
            Pas encore de compte ?
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/register')}
            sx={{
              borderRadius: '999px',
              px: 4,
              py: 1.2,
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 2px 8px 0 rgba(0,123,255,0.07)',
              background: 'white',
              textTransform: 'none',
              transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
              '&:hover': {
                background: 'linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)',
                borderColor: '#007bff',
                color: '#007bff',
              },
            }}
          >
            Créer un compte
          </Button>
        </Box>
      </Box>
    </Grid>
  </PageContainer>
  );
};

export default LoginPage;
