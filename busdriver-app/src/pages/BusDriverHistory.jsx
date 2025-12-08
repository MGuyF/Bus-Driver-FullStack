import { Box, Typography, TextField, InputAdornment, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  FormatListBulleted, DirectionsBus, Schedule, LocationOn, Flag, Star, Search
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import { apiFetch } from '../services/apiAuth';


const HeaderWithIcon = ({ icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {icon}
    <span>{text}</span>
  </Box>
);

export default function TourHistory() {
  const [tourRows, setTourRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0); // DataGrid uses 0-based page index
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useLoading();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTours = async (page, pageSize, search) => {
    setLoading(true);
    showLoader();
    try {
      const params = new URLSearchParams({
        page: page + 1,
        page_size: pageSize,
      });
      if (search) params.append('search', search);
      const response = await apiFetch(`/tours/?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        const isPaginated = Array.isArray(data.results);
        const toursData = isPaginated ? data.results : Array.isArray(data) ? data : [];
        // Forcer la recréation de l'objet pour casser la mémoization
        const newTours = toursData.map(tour => ({ ...tour }));
        setTourRows(newTours);
        setRowCount(isPaginated ? data.count : (Array.isArray(data) ? data.length : 0));
      } else {
        setTourRows([]);
        setRowCount(0);
      }
    } catch (error) {
      setTourRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchTours(page, pageSize, searchTerm);
    // eslint-disable-next-line
  }, [page, pageSize, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // reset to first page on new search
  };

  const columns = [
    {
      field: "bus_driver_name",
      headerName: "Bus Driver",
      flex: 1,
      renderHeader: () => <HeaderWithIcon icon={<DirectionsBus />} text="Bus Driver" />,
    },
    {
      field: "start_time",
      headerName: "Début",
      flex: 1,
      renderHeader: () => <HeaderWithIcon icon={<Schedule />} text="Début" />,
      renderCell: (params) => {
        // Log final pour voir ce que la cellule reçoit VRAIMENT
        if (params.row.id === 1) { // Log seulement pour la première ligne pour éviter le spam
            console.log("Contenu de params.row pour ID 1:", JSON.stringify(params.row));
        }
        const time = params.row.start_time;
        return time ? time.substring(0, 5) : '--';
      },
    },
    {
      field: "start_location",
      headerName: "Départ",
      flex: 1,
      renderHeader: () => <HeaderWithIcon icon={<LocationOn />} text="Départ" />,
    },
    {
      field: "arrival_time",
      headerName: "Arrivée",
      flex: 1,
      renderHeader: () => <HeaderWithIcon icon={<Schedule />} text="Arrivée" />,
      renderCell: (params) => {
        const time = params.row.arrival_time;
        return time ? time.substring(0, 5) : '--';
      },
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      renderHeader: () => <HeaderWithIcon icon={<Flag />} text="Destination" />,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderHeader: () => <HeaderWithIcon icon={<Star />} text="Status" />,
    },
  ];

  // Plus de filtre local, la recherche est côté serveur

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
            width: '100%',
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
              rows={tourRows}
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
              getRowId={(row) => row.id}
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
    </>
  );
}
