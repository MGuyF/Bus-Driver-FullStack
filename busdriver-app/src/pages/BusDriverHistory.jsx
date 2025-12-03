import { Box, Typography, TextField, InputAdornment, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  FormatListBulleted, DirectionsBus, Schedule, LocationOn, Flag, Badge, Star, Search
} from '@mui/icons-material';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function TourHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const columns = [
    {
      field: "driver",
      headerName: "Bus Driver",
      flex: 1,
      renderHeader: () => (
        <HeaderWithIcon icon={<DirectionsBus />} text="Bus Driver" />
      ),
    },
    {
      field: "startTime",
      headerName: "Début",
      flex: 1,
      renderHeader: () => (
        <HeaderWithIcon icon={<Schedule />} text="Début" />
      ),
      valueFormatter: (params) =>
        dayjs(params.value).format("HH:mm"),
    },
    {
      field: "departure",
      headerName: "Départ",
      flex: 1,
      renderHeader: () => (
        <HeaderWithIcon icon={<LocationOn />} text="Départ" />
      ),
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      renderHeader: () => (
        <HeaderWithIcon icon={<Flag />} text="Destination" />
      ),
    },
    {
      field: "matricule",
      headerName: "Matricule",
      flex: 1,
      renderHeader: () => (
        <HeaderWithIcon icon={<Badge />} text="Matricule" />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderHeader: () => (
        <HeaderWithIcon icon={<Star />} text="Status" />
      ),
    }
  ];

  const rows = [
    {
      id: 1,
      driver: "Jean Mugisha",
      startTime: "2025-04-17T08:00:00",
      departure: "Kigali",
      destination: "Bujumbura",
      matricule: "BI 1234 A",
      status: "Terminé",
    },
    {
      id: 2,
      driver: "Alice Niyonzima",
      startTime: "2025-04-17T09:30:00",
      departure: "Gitega",
      destination: "Ngozi",
      matricule: "BI 5678 B",
      status: "En cours",
    },
    {
      id: 3,
      driver: "Patrick Habonimana",
      startTime: "2025-04-17T07:45:00",
      departure: "Bujumbura",
      destination: "Rumonge",
      matricule: "BI 9012 C",
      status: "En attente",
    },
    {
      id: 4,
      driver: "Claudine Irakoze",
      startTime: "2025-04-17T10:15:00",
      departure: "Ngozi",
      destination: "Kirundo",
      matricule: "BI 3456 D",
      status: "Annulé",
    },
    {
      id: 5,
      driver: "Eric Ndayishimiye",
      startTime: "2025-04-17T06:30:00",
      departure: "Cibitoke",
      destination: "Bujumbura",
      matricule: "BI 7890 E",
      status: "Terminé",
    }
  ];

  const filteredRows = rows.filter(
    (row) =>
      row.driver.toLowerCase().includes(searchTerm) ||
      row.departure.toLowerCase().includes(searchTerm)
  );

  return (
    <Box display="block">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          marginLeft: '15px',
          marginTop: '-46px',
        }}
      >
        <FormatListBulleted sx={{ fontSize: '1.18rem', marginBottom: '8px', color: '#343434', mr: 1 }} />
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
          Historique des Tours
        </Typography>
      </Box>

      <Paper
  elevation={3}
  sx={{
    padding: '45px',
    width: '87vw',
    backgroundColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #e7f4ff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: '33px',
    overflow: 'hidden',
  }}
>
  {/* Champ de recherche */}
  <Box sx={{ marginBottom: 2 }}>
    <TextField
      fullWidth
      placeholder="Rechercher par nom ou ville"
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderRadius: '10px',
        },
        '& input': {
          fontSize: '0.9rem',
          color: '#000',
        },
      }}
    />
  </Box>

  {/* Wrapper avec scroll + scroll personnalisé */}
  <Box
    sx={{
      height: '50vh',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#a2b3f5',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      scrollbarWidth: 'thin', // Firefox
      scrollbarColor: '#a2b3f5 transparent', // Firefox
    }}
  >
    <DataGrid
      rows={filteredRows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
      }
      sx={{
        border: 0,
        minWidth: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          fontSize: '15.4px',
        },
        '& .even-row': {
          backgroundColor: '#bdcbfb52 !important',
        },
        '& .MuiDataGrid-cell': {
          fontSize: '14px',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: '600',
          color: '#343434',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
          marginTop: '-4px',
        },
        '& .MuiDataGrid-virtualScroller': {
          overflowX: 'hidden',
        },
        '& .MuiDataGrid-container--top [role=row]': {
          background: 'none',
        },
      }}
    />
  </Box>
</Paper>


    </Box>
  );
}

const HeaderWithIcon = ({ icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {icon}
    <span>{text}</span>
  </Box>
);
