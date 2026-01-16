import React, { useState } from "react";
import { register } from "../services/apiAuth";
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
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from "../components/Logo";
import PageContainer from "../components/PageContainer";
import { CircularProgress } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPwd) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (password !== confirmPwd) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    setLoading(true);
    try {
      const result = await register(name, email, password);
      setLoading(false);
      if (result.success) {
        navigate("/");
      } else {
        // Affiche les erreurs retournées par le backend (ex: email déjà utilisé)
        if (result.error && typeof result.error === 'object') {
          const messages = Object.values(result.error).flat().join(' ');
          setError(messages);
        } else {
          setError(result.error?.detail || "Erreur lors de l'inscription.");
        }
      }
    } catch (e) {
      setLoading(false);
      setError("Erreur réseau ou serveur. Veuillez réessayer.");
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
            <Box sx={{ mb: '30px' }}>
              <Logo width={180} />
            </Box>
            
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nom complet"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPwd"
                label="Confirmer le mot de passe"
                type={showConfirmPwd ? "text" : "password"}
                id="confirmPwd"
                autoComplete="new-password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowConfirmPwd((show) => !show)}
                        edge="end"
                      >
                        {showConfirmPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <Box sx={{ color: 'red', mt: 1, mb: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ffe6e6', padding: '10px 16px', borderRadius: '8px' }}>
                  <Typography variant="body2">{error}</Typography>
                </Box>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ position: 'relative', height: 45, mt: 1 }}
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
                {!loading && 'Créer un compte'}
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
              Déjà un compte ?
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
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
              Se connecter
            </Button>
          </Box>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default Register;
