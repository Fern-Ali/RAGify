// components/FoundationModelGrid.js
'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import ModalityChips from './ModalityChips';
import useMediaQuery from '@mui/material/useMediaQuery';
import ModelCard from './ModelCard';


const columns = [
  { field: 'modelId', headerName: 'Model ID', flex: 2 },
  { field: 'providerName', headerName: 'Provider', flex: 1 },
  {
    field: 'inputModalities',
    headerName: 'Input',
    flex: 1.5,
    renderCell: (params) => <ModalityChips modalities={params.row?.inputModalities} />,
  },
  {
    field: 'outputModalities',
    headerName: 'Output',
    flex: 1,
    renderCell: (params) => <ModalityChips modalities={params.row?.outputModalities} />,
  },
  
  {
    field: 'responseStreamingSupported',
    headerName: 'Streaming',
    flex: 0.5,
    type: 'boolean',
  },
];

export default function FoundationModelGrid() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  React.useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch('/api/models');
        const data = await res.json();
        setRows(
          data.map((row, index) => ({
            id: row.modelId ?? index, // ensures DataGrid has a unique id
            ...row,
          }))
        );
      } catch (err) {
        console.error('Error loading models:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchModels();
  }, []);  

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Typography variant="h6" gutterBottom>Available Foundation Models</Typography>
      {isMobile
        ? rows.map((model) => <ModelCard key={model.modelId} model={model} />)
        : <DataGrid
        rows={rows}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        columns={columns}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
      />
        }
      
    </Box>
  );
}
