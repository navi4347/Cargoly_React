import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down('sm')}`]: {
    display: 'none',
  },
}));

const Test = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.9:8083/devices-api/devices/all-devices?currentPage=0&pageSize=3');
        setDevices(response.data.list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Device List</h1>
      <TableContainer component={Paper}>
        <Table aria-label="device table">
          <TableHead>
            <TableRow>
              <StyledTableCell>UUID</StyledTableCell>
              <StyledTableCell>Model Number</StyledTableCell>
              <StyledTableCell>Device Type</StyledTableCell>
              <StyledTableCell>QC Device Status</StyledTableCell>
              <StyledTableCell>Device Serial Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map(device => (
              <TableRow key={device.uuid}>
                <TableCell>{device.uuid}</TableCell>
                <TableCell>{device.modelNumber}</TableCell>
                <TableCell>{device.deviceType}</TableCell>
                <TableCell>{device.qcDeviceStatus}</TableCell>
                <TableCell>{device.deviceSerialNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Test;
