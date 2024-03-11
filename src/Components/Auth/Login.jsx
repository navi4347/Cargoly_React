import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
} from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import KeyIcon from '@mui/icons-material/Key';
import '../Style.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setToken(data.token);
      } else {
        const text = await response.text();
        setToken(text.trim()); 
      }
  
      setError('');
      navigate('/Menu');
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again later.');
    }
  };
  
  

  return (
    <div className='login'>
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
          <Button className='kgf' variant='contained' color='primary' type='submit'>
            Login
          </Button>
        </form>
        {token && <p>Token: {token}</p>}
        {error && <p>{error}</p>}
        <div className="striped">
				<span className="striped-line"></span>
				<span className="striped-text">Or Sign In With</span>
				<span className="striped-line"></span>
			</div>
      <div className="social">
  <div className="icon-wrapper">
    <KeyIcon className="iconi" />
    <span>SSO</span>
  </div>
  
  <div className="icon-wrapper">
    <AppleIcon className="iconi" />
    <span>Apple</span>
  </div>
  
  <div className="icon-wrapper">
    <GoogleIcon className="iconi" />
    <span>Google</span>
  </div>
  
  <div className="icon-wrapper">
    <FacebookIcon className="iconi" />
    <span>Facebook</span>
  </div>
</div>
      </div>
  );
}

export default Login;
