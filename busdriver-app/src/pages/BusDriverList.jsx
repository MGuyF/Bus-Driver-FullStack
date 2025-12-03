import React, { useState } from 'react';
import BusDriverModal from "../components/BusDriverModal";
import {
  DataGrid
} from '@mui/x-data-grid';
import {
  Paper,
  IconButton,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  Box
} from '@mui/material';
import {
  Edit,
  Visibility,
  Person,
  Email,
  Home,
  Phone,
  DateRange,
  DirectionsBus,
  Search,
  FormatListBulleted
} from '@mui/icons-material';

const initialRows = [
  {
    id: 1,
    fullName: 'Jean Dupont',
    phone: '0123456789',
    email: 'jean@example.com',
    address: '123 rue des Lilas',
    birthDate: '1990-01-01',
    busNumber: 'BUS-001',
  },
  {
    id: 2,
    fullName: 'Marie Claire',
    phone: '0987654321',
    email: 'marie@example.com',
    address: '456 avenue des Roses',
    birthDate: '1985-05-05',
    busNumber: 'BUS-002',
  },
  {
    id: 3,
    fullName: 'Albert Ndayizeye',
    phone: '612345678',
    email: 'albert@exemple.bi',
    address: 'Avenue du Lac Tanganyika, Bujumbura',
    birthDate: '1992-08-12',
    busNumber: 'BUS-003',
  },
  {
    id: 4,
    fullName: 'Fatou Ndiaye',
    phone: '722345678',
    email: 'fatou@exemple.sn',
    address: 'Rue des Baobabs, Dakar',
    birthDate: '1988-03-20',
    busNumber: 'BUS-004',
  },
  {
    id: 5,
    fullName: 'Lucas Martin',
    phone: '0632457890',
    email: 'lucas.martin@example.fr',
    address: '34 rue de Lyon, Paris',
    birthDate: '1995-11-23',
    busNumber: 'BUS-005',
  },
  {
    id: 6,
    fullName: 'Chantal Uwimana',
    phone: '712345678',
    email: 'chantal@exemple.bi',
    address: 'Quartier Kabondo, Goma',
    birthDate: '1987-09-14',
    busNumber: 'BUS-006',
  }
];

export default function StyledDataGrid() {
  const columns = [
    {
      field: 'fullName',
      headerName: (
        <span>
          <Person style={{ verticalAlign: 'middle' }} /> Nom complet
        </span>
      ),
      flex: 2,
    },
    {
      field: 'phone',
      headerName: (
        <span>
          <Phone style={{ verticalAlign: 'middle' }} /> Tel
        </span>
      ),
      minWidth: 150,
      maxWidth: 250,
    },
    {
      field: 'email',
      headerName: (
        <span>
          <Email style={{ verticalAlign: 'middle' }} /> E-mail
        </span>
      ),
      flex: 2,
    },
    {
      field: 'address',
      headerName: (
        <span>
          <Home style={{ verticalAlign: 'middle' }} /> Adresse
        </span>
      ),
      flex: 2,
    },
    {
      field: 'birthDate',
      headerName: (
        <span>
          <DateRange style={{ verticalAlign: 'middle' }} /> D.Naissance
        </span>
      ),
      width: 150,
    },
    {
      field: 'busNumber',
      headerName: (
        <span>
          <DirectionsBus style={{ verticalAlign: 'middle' }} /> Bus
        </span>
      ),
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Voir">
            <IconButton onClick={() => handleOpenModal(params.row, 'view')} color="primary" size="small">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Modifier">
            <IconButton onClick={() => handleOpenModal(params.row, 'edit')} color="secondary" size="small">
              <Edit />
            </IconButton>
          </Tooltip>
        </>
      )
    },
  ];

  // Ajoute en haut du composant :
const [openModal, setOpenModal] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const [modalMode, setModalMode] = useState('view');

const handleOpenModal = (row, mode) => {
  setSelectedRow(row);
  setModalMode(mode);
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedRow(null);
};

const handleSaveChanges = () => {
  // Ici tu pourras faire un appel backend si tu veux sauvegarder
  console.log('Save', selectedRow);
  handleCloseModal();
};


  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState(initialRows);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialRows.filter(
      (row) =>
        row.fullName.toLowerCase().includes(value) ||
        row.email.toLowerCase().includes(value)
    );
    setFilteredRows(filtered);
  };

  return (
    <>
    <Box
            sx={{
              display: "block"
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
                Liste Bus Driver
              </Typography>
            </Box>
            <Paper
  elevation={3}
  sx={{
    padding: '45px',
    width: '85.5vw',
    backgroundColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #e7f4ff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: '33px',
    overflow: 'hidden',
  }}
>
  <Box sx={{ marginBottom: 2 }}>
    <TextField
      fullWidth
      placeholder="Rechercher par nom ou email"
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

  {/* Container avec scroll stylisé */}
  <Box
    sx={{
      height: '52vh',
      width: '100%',
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

<BusDriverModal
open={openModal}
onClose={handleCloseModal}
data={selectedRow}
mode={modalMode}
onSave={handleSaveChanges}
/>
</>
  );
}
