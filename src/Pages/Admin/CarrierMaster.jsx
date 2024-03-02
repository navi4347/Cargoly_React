import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Export from '@mui/icons-material/FileDownload';
import Import from '@mui/icons-material/ImportExport';
import TextField from '@mui/material/TextField';
import './AdminStyle.css';
import CarrierMasterTable from '../Tables/CarrierMasterTable';

const CarrierMaster = () => {
  const [countryFilter, setCountryFilter] = useState('');
  const [isSlideBVisible, setIsSlideBVisible] = useState(false);

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  }

  const handleExportClick = () => {
    console.log("Export button clicked");
  }

  const handleImportClick = () => {
    console.log("Import button clicked");
  }

  const handleAddClick = () => {
    setIsSlideBVisible(true);
  }

  const handleSaveClick = () => {
    setIsSlideBVisible(false);
  }
  
  return (
    <div>
      <div className='slidea' style={{ display: isSlideBVisible ? 'none' : 'block' }}>
        <div className='container'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" component="div">
              CarrierMaster
            </Typography>
            <Stack spacing={3} direction="row">
              <Button variant="contained" onClick={handleExportClick} startIcon={<Export />}>
                Export
              </Button>
              <Button variant="contained" onClick={handleImportClick} startIcon={<Import />}>
                Import
              </Button>
              <Button variant="contained" onClick={handleAddClick} startIcon={<Add />}>
                ADD
              </Button>
            </Stack>  
          </Box>
          <div className="formContainer">
            <TextField id="CountryFilter" label="Country Filter" className="formField" variant="standard" onChange={handleFilterChange} />
            <TextField id="LocationFilter" label="Location Filter" className="formField" variant="standard" />
            <Button variant="contained">SUBMIT</Button>
          </div>   
          <CarrierMasterTable filter={countryFilter} />
        </div>
      </div>
      <div className='slideb' style={{ display: isSlideBVisible ? 'block' : 'none' }}>
        <div className="swiper-slide">
          <Typography variant="h4" component="div">
            This is CarrierMaster text
          </Typography>
          <Button variant="contained" onClick={handleSaveClick} startIcon={<Add />}>
            Save Data
          </Button>
        </div>
      </div>    
    </div>
  );
}

export default CarrierMaster;
