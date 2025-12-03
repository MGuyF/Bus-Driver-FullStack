import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';


export default function BusDriverModal({ open, onClose, data, mode, onSave }) {

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

  const isView = mode === 'view';

  return (
    <Dialog
  open={open}
  onClose={onClose}
  maxWidth="md"
  fullWidth
  BackdropProps={{
    sx: {
      backgroundColor: 'rgba(0, 0, 0, 0.16)',
    },
  }}
  PaperProps={{
    sx: {
      // backdropFilter: 'blur(10px)',
      // backgroundColor: 'rgba(255, 255, 255, 0.15)',
      // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      border: '1px solid #e7f4ff',
      borderRadius: '33px',
      padding: '45px',
      maxWidth: '700px',
      margin: 'auto',
    },
  }}
>
<DialogTitle
  sx={{
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 1,
  }}
>
  {isView ? (
    <>
      <InfoOutlinedIcon color="primary"  sx={{
    fontSize: '1.3rem',
  }} />
      Détails Bus Driver
    </>
  ) : (
    <>
      <EditOutlinedIcon color="primary" />
      Modifier Bus Driver
    </>
  )}
</DialogTitle>


  <DialogContent>
  <Grid container spacing={2} mt={1}>
  <Grid item xs={6}>
    <TextField
      label="Nom complet"
      fullWidth
      sx={textFieldStyle}
      value={data?.fullName || ''}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Téléphone"
      fullWidth
      sx={textFieldStyle}
      value={data?.phone || ''}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <PhoneIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Email"
      fullWidth
      sx={textFieldStyle}
      value={data?.email || ''}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Adresse"
      fullWidth
      sx={textFieldStyle}
      value={data?.address || ''}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <HomeIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Date de naissance"
      fullWidth
      sx={textFieldStyle}
      value={data?.birthDate || ''}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <CalendarTodayIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Bus"
      fullWidth
      sx={textFieldStyle}
      value={data?.busNumber || ''}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <DirectionsBusIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>
</Grid>

  </DialogContent>

  <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
    <Button onClick={onClose} color="secondary" variant="outlined">
      Fermer
    </Button>
    {!isView && (
      <Button onClick={onSave} variant="contained" color="primary">
        Enregistrer
      </Button>
    )}
  </DialogActions>
</Dialog>

  );
}
