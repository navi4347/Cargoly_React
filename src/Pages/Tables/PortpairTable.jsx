import { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const PortpairTable = () => {
  const [portpairs, setPortpairs] = useState([]);

  useEffect(() => {
    fetchPortpairs();
  }, []);

  const fetchPortpairs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/portpair');
      setPortpairs(response.data);
    } catch (error) {
      console.error('Error fetching port pairs:', error);
    }
  };

  const handleDelete = async (portcode) => {
    try {
      await axios.delete(`http://localhost:8080/api/portpair/${portcode}`);
      fetchPortpairs(); 
    } catch (error) {
      console.error('Error deleting port pair:', error);
    }
  };
  const handleEditClick = () => {

  }
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Port Code</TableCell>
            <TableCell>Actions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {portpairs.map(portpair => (
            <TableRow key={portpair.portcode}>
              <TableCell>{portpair.country}</TableCell>
              <TableCell>{portpair.location}</TableCell>
              <TableCell>{portpair.portcode}</TableCell>
              <TableCell>
                <IconButton aria-label="edit" onClick={handleEditClick} style={{ color: "#4caf50" }}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" style={{ color: "#ef5350" }} onClick={() => handleDelete(portpair.portcode)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PortpairTable;
