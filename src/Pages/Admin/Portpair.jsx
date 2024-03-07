import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Export from '@mui/icons-material/FileDownload';
import Import from '@mui/icons-material/ImportExport';
import TextField from '@mui/material/TextField';
import './AdminStyle.css';
import PortpairTable from '../Tables/PortpairTable';

const Portpair = () => {
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
  const handleCancelClick = () => {
    setIsSlideBVisible(false);
  }
  
  return (
    <div>
      <div className='slidea' style={{ display: isSlideBVisible ? 'none' : 'block' }}>
        <div className='container'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" component="div">
              PortPair
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
          <PortpairTable filter={countryFilter} />
        </div>
      </div>
      <div className='slideb' style={{ display: isSlideBVisible ? 'block' : 'none' }}>
        <div className="swiper-slide">
          <Typography variant="h4" component="div">
            Portpair Data
          </Typography>
           <div className='container'>
<div className="save">
<form>
        <TextField id="standard-basic1" className="data" label="Country" variant="standard" />
        <TextField id="standard-basic2" className="data" label="Location" variant="standard" />
        <TextField id="standard-basic3" className="data" label="Portcode" variant="standard" />
        <Button variant="contained"  className="data" onClick={handleSaveClick} type="submit">
          Save
        </Button>
        <Button variant="contained"  className="data" onClick={handleCancelClick} color="error">
          Cancel
        </Button>
      </form>
    </div>
    </div>  
        </div>
      </div>    
    </div>
  );
}

export default Portpair;