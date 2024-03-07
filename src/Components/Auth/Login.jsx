import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import '../Style.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Select');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.percient);
        setError('');

        if (userType === 'Admin') {
          navigate('/Menu');
        } else if (userType === 'User') {
          navigate('/User');
        }
      } else {
        const data = await response.json();
        setToken('');
        setError(data.error);
      }
    } catch (err) {
      console.error('Error:', err);
      setToken('');
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='login'>
      <div className='left'></div>
      <div className='right'>
        <form onSubmit={handleLogin}>
          <TextField
            label='Username'
            type='text'
            id='username'
            name='username'
            variant="standard"
            className='kgf'
            value={username}
            autoComplete='off'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label='Password'
            variant="standard"
            type='password'
            name='password'
            id='password'
            className='kgf'
            value={password}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl className='wide-select'>
            <Select
              value={userType}
              className='gh'
              name='options'
              id='options'
              variant="standard"
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <MenuItem value='Select'>Select</MenuItem>
              <MenuItem value='Admin'>Admin</MenuItem>
              <MenuItem value='User'>User</MenuItem>
            </Select>
          </FormControl>
          
          <Button className='kgf' variant='contained' color='primary' type='submit'>
            Login
          </Button>
        </form>
        {token && <p>Token: {token}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
