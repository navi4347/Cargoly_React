import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header'
import Button from '@mui/material/Button';

const Sales = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
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