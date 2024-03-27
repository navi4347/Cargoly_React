import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ExportIcon from '@mui/icons-material/FileDownload';
import ImportIcon from '@mui/icons-material/ImportExport';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [rows, setRows] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [isSlideBVisible, setIsSlideBVisible] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [isPortcodeEditable, setIsPortcodeEditable] = useState(true);

  const [formData, setFormData] = useState({
    country: '',
    location: '',
    portcode: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

 

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/portpair')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const { id, value } = event.target;
    if (id === "CountryFilter") {
      setCountryFilter(value);
    } else if (id === "LocationFilter") {
      setLocationFilter(value);
    }
  };

  const handleExportClick = () => {
  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',') + '\n';
    const csv = data.map((row) => Object.values(row).join(',')).join('\n');
    return header + csv;
  };

  const csvData = convertToCSV(rows); // Assuming `rows` contains your table data

  const blob = new Blob([csvData], { type: 'text/csv' });

  const downloadLink = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadLink;
  a.download = 'tableData.csv';
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
};


  const handleImportClick = () => {
    console.log("Import button clicked");
  };

  const handleCreateClick = () => {
    setIsSlideBVisible(true);
  };
  
  const handleEditClick = (row) => {
    setFormData({
      country: row.country,
      location: row.location,
      portcode: row.portcode
    });
    setIsSlideBVisible(true);
    setIsPortcodeEditable(false);
  };
  
  

  const handleSaveEdit = () => {
    if (formData.portcode) {
      axios.post('http://localhost:8080/api/portpair', formData)
      .then(response => {
        console.log("Data saved:", response.data);
        setFormData({
          country: '',
          location: '',
          portcode: ''
        });
        setIsSlideBVisible(false);
        setIsPortcodeEditable(true);
      })
      .catch(error => {
        console.error("Error saving data:", error);
      });
    } else {
      axios.put(`http://localhost:8080/api/portpair/${formData.portcode}`, formData)
      .then(response => {
        console.log("Data updated:", response.data);
        setFormData({
          country: '',
          location: '',
          portcode: ''
        });
        setIsSlideBVisible(false);
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
    }
  };
  

  const handleCancelClick = () => {
    setIsSlideBVisible(false);
    setFormData({
      country: '',
      location: '',
      portcode: ''
    });
    setIsPortcodeEditable(true);
  };

  const handleDeleteClick = async (portcode) => {
    try {
      await axios.delete(`http://localhost:8080/api/portpair/${portcode}`);
      setRows(rows.filter(row => row.portcode !== portcode));
      console.log(`Data with portcode ${portcode} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting data with portcode ${portcode}:`, error);
    }
  };
  
  
  return (
    <>
      <div className='slidea' style={{ display: isSlideBVisible ? 'none' : 'block' }}>
        <div className='container'> 
          <h1>Port Pair</h1>
          <div className='rowx'>
            <div className='colxa'>
            <TextField id="CountryFilter" label="Country Filter" className="formField" variant="standard" onChange={handleFilterChange} />
  <TextField id="LocationFilter" label="Location Filter" className="formField" variant="standard" onChange={handleFilterChange} />
  <Button variant="contained" className='tw' onClick={handleFilterChange}>
    SUBMIT
  </Button>
            </div>
            <div className='colxb'>
              <Stack spacing={3} direction="row">
                <Button variant="contained" onClick={handleExportClick} startIcon={<ExportIcon />}>
                  Export
                </Button>
                <Button variant="contained" onClick={handleImportClick} startIcon={<ImportIcon />}>
                  Import
                </Button>
                <Button variant="contained" onClick={handleCreateClick} startIcon={<AddIcon />}>
                  ADD
                </Button>
              </Stack>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Country</StyledTableCell>
                  <StyledTableCell>Location</StyledTableCell>
                  <StyledTableCell>Port Code</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
              {rows
    .filter(row => 
      row.country.toLowerCase().includes(countryFilter.toLowerCase()) &&
      row.location.toLowerCase().includes(locationFilter.toLowerCase())
    )
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((row) => (
    <StyledTableRow key={row.portcode}>
      <StyledTableCell>{row.country}</StyledTableCell>
      <StyledTableCell>{row.location}</StyledTableCell>
      <StyledTableCell>{row.portcode}</StyledTableCell>
      <StyledTableCell>
        <EditIcon color="warning" style={{ cursor: 'pointer' }}  onClick={() => handleEditClick(row)} /> 
        <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(row.portcode)} /> 
      </StyledTableCell>
    </StyledTableRow>
))}

</TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
                <TextField id="standard-basic1" className="data" name="country" label="Country" value={formData.country}
          onChange={handleChange}  autoComplete="off" variant="standard" />
                <TextField id="standard-basic2" className="data" name="location"label="Location" value={formData.location}
          onChange={handleChange}  autoComplete="off" variant="standard" />
                <TextField id="standard-basic3" className="data" name="portcode" label="Portcode" value={formData.portcode}
          onChange={handleChange}  autoComplete="off" disabled={!isPortcodeEditable} variant="standard" />
                <Button variant="contained"  className="data" onClick={handleSaveEdit}>
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
    </>
  );
}
