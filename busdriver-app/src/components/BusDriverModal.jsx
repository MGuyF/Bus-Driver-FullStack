import React, { useState, useEffect } from 'react';
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
import BusinessIcon from '@mui/icons-material/Business';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CardMembershipIcon from '@mui/icons-material/CardMembership';


export default function BusDriverModal({ open, onClose, data, mode, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    // Assuming the value is a Date object or a string that can be formatted
    // You might need to format it to 'YYYY-MM-DD'
    const formattedDate = value instanceof Date ? value.toISOString().split('T')[0] : value;
    setFormData(prev => ({ ...prev, [name]: formattedDate }));
  };

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
  <Grid item xs={12} sm={6}>
    <TextField
      autoFocus={!isView}
      label="Nom complet"
      fullWidth
      sx={textFieldStyle}
      name="full_name"
      value={formData?.full_name || ''}
      onChange={handleChange}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Téléphone"
      fullWidth
      sx={textFieldStyle}
      name="phone"
      value={formData?.phone || ''}
      onChange={handleChange}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Email"
      fullWidth
      sx={textFieldStyle}
      name="email"
      value={formData?.email || ''}
      onChange={handleChange}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Adresse"
      fullWidth
      sx={textFieldStyle}
      name="address"
      value={formData?.address || ''}
      onChange={handleChange}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Date de naissance"
      fullWidth
      sx={textFieldStyle}
      name="birth_date"
      value={formData?.birth_date || ''}
      onChange={handleChange}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Bus"
      fullWidth
      sx={textFieldStyle}
      name="bus_number"
      value={formData?.bus_number || ''}
      onChange={handleChange}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Numéro de permis"
      name="license_number"
      fullWidth
      sx={textFieldStyle}
      value={formData?.license_number || ''}
      onChange={handleChange}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <CardMembershipIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

  <Grid item xs={12} sm={6}>
    <TextField
      label="Expiration du permis"
      name="license_expiry"
      fullWidth
      type="date"
      sx={textFieldStyle}
      value={formData?.license_expiry || ''}
      onChange={(e) => handleDateChange('license_expiry', e.target.value)}
      InputLabelProps={{
          shrink: true,
        }}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Société"
      name="company_name"
      fullWidth
      sx={textFieldStyle}
      value={formData?.company_name || ''}
      onChange={handleChange}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <BusinessIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

    <Grid item xs={12} sm={6}>
    <TextField
      label="Type de bus"
      name="bus_type"
      fullWidth
      sx={textFieldStyle}
      value={formData?.bus_type || ''}
      onChange={handleChange}
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

  <Grid item xs={12} sm={6}>
    <TextField
      label="Années d'expérience"
      name="experience_years"
      type="number"
      fullWidth
      sx={textFieldStyle}
      value={formData?.experience_years || ''}
      onChange={handleChange}
      InputProps={{
        readOnly: isView,
        startAdornment: (
          <InputAdornment position="start">
            <WorkHistoryIcon />
          </InputAdornment>
        )
      }}
    />
  </Grid>

  <Grid item xs={12} sm={6}>
    <TextField
      label="Date d'embauche"
      name="hire_date"
      type="date"
      fullWidth
      sx={textFieldStyle}
      value={formData?.hire_date || ''}
      onChange={(e) => handleDateChange('hire_date', e.target.value)}
      InputLabelProps={{
          shrink: true,
        }}
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

</Grid>

  </DialogContent>

  <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onClose} color="secondary" variant="outlined" autoFocus={isView}>
      Fermer
    </Button>
    {!isView && (
      <Button onClick={() => onSave(formData)} variant="contained" color="primary">
        Enregistrer
      </Button>
    )}
  </DialogActions>
</Dialog>

  );
}
