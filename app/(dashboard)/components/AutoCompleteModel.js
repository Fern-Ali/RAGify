import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function AutoCompleteModel() {
    const [selectedModel, setSelectedModel] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [modelList, setModelList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
    const fetchModels = async () => {
        try {
        const res = await fetch('/api/models');
        const data = await res.json();
        setModelList(
            data
            .filter((row) => row.inferenceTypesSupported?.includes('INFERENCE_PROFILE'))
            .map((row, index) => ({
                modelId: row.modelId ?? index,
                label: row.modelName ?? "N/A",
                modelName: row.modelName ?? "N/A",
                providerName: row.providerName ?? "n/a"
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
        <React.Fragment>
            {  <Autocomplete
            size="small"
            disablePortal
            value={selectedModel}
            onChange={(event, newValue) => {
                setSelectedModel(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
            options={modelList}
            groupBy={(option) => option.providerName}
            getOptionLabel={(option) => option.label}
            loading={loading}
            sx={{ width: {xs: 200, sm: 180, md: 200, lg: 240, xl: 280}, mr: 1 }}
            renderInput={(params) => <TextField
                {...params}
                label="Start Chat"
                slotProps={{
                    
                      type: 'search',
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                            <>
                              {loading && <CircularProgress size={20} />}
                              {params.InputProps.endAdornment}
                            </>
                            ),
                      }
                   
                  }}
                
              />}
        />}
        </React.Fragment>
    );

};

