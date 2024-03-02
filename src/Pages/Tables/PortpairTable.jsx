import { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';

const PortpairTable = () => {
  const [portpairs, setPortpairs] = useState([]);

  useEffect(() => {
    fetchPortpairs();
  }, []);

  const fetchPortpairs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/portpair', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      setPortpairs(response.data);
    } catch (error) {
      console.error('Error fetching port pairs:', error);
    }
  };

  return (
    <div>
      <h2>Portpair Table</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Port Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portpairs.map(portpair => (
            <TableRow key={portpair.portcode}>
              <TableCell>{portpair.country}</TableCell>
              <TableCell>{portpair.location}</TableCell>
              <TableCell>{portpair.portcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PortpairTable;
