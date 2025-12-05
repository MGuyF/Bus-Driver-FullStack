import React, { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import { apiFetch } from '../services/apiAuth';
import BusDriverModal from "../components/BusDriverModal";
import swal from '../utils/useSwal';
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

export default function StyledDataGrid() {
  const { showLoader, hideLoader } = useLoading();
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0); // DataGrid uses 0-based page index
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  const fetchDrivers = async (page, pageSize, search) => {
    setLoading(true);
    showLoader();
    try {
      const params = new URLSearchParams({
        page: page + 1, // backend is usually 1-based
        page_size: pageSize,
      });
      if (search) params.append('search', search);
      const response = await apiFetch(`/busdrivers/?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        const isPaginated = Array.isArray(data.results);
        setRows(isPaginated ? data.results : Array.isArray(data) ? data : []);
        setRowCount(isPaginated ? data.count : (Array.isArray(data) ? data.length : 0));
      } else {
        setRows([]);
        setRowCount(0);
      }
    } catch (e) {
      setRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchDrivers(page, pageSize, searchTerm);
    // eslint-disable-next-line
  }, [page, pageSize, searchTerm]);

  const columns = [
    {
      field: 'full_name',
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
      field: 'birth_date',
      headerName: (
        <span>
          <DateRange style={{ verticalAlign: 'middle' }} /> D.Naissance
        </span>
      ),
      width: 150,
    },
    {
      field: 'bus_number',
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

  const handleOpenModal = (row, mode) => {
    setSelectedRow(row);
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSaveChanges = async (updatedRow) => {
    showLoader();
    try {
      const response = await apiFetch(`/busdrivers/${updatedRow.id}/`, {
        method: 'PUT',
        body: JSON.stringify(updatedRow),
      });
      if (response.ok) {
        const data = await response.json();
        setRows(rows.map(row => row.id === data.id ? data : row));
        handleCloseModal();
        swal.fire({
          icon: 'success',
          title: 'Chauffeur modifié !',
          text: 'Les modifications ont bien été enregistrées.',
          confirmButtonText: 'OK'
        });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de sauvegarder les modifications.',
          confirmButtonText: 'Fermer'
        });
        console.error("Failed to save changes");
      }
    } catch (e) {
      swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur s'est produite lors de l'enregistrement.",
        confirmButtonText: 'Fermer'
      });
      console.error("An error occurred while saving", e);
    } finally {
      hideLoader();
    }
  };

  
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
              rows={rows}
              columns={columns}
              rowCount={rowCount}
              page={page}
              pageSize={pageSize}
              pagination
              paginationMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => {
                setPageSize(newPageSize);
                setPage(0); // reset to first page
              }}
              loading={loading}
              rowsPerPageOptions={[5, 10, 20, 50]}
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
