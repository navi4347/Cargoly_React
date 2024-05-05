import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Button from '@mui/material/Button';

const Sales = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async (token) => {
      try {
        const response = await fetch('http://api/user-role', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch user role');
        }
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      fetchUserRole(token);
    }
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userRole !== 'sales') {
    navigate('/');
    return null;
  }

  return (
    <div className='sales'>
      <Header />
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
      <h1>SALES PAGE</h1>
    </div>
  );
};

export default Sales;
