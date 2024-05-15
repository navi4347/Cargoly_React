import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
} from '@mui/material';
import GoogleAuth from '../SSO/GoogleAuth';
import AppleAuth from '../SSO/AppleAuth';
import MicrososftAuth from '../SSO/Micrososft';
import DomainAuth from '../SSO/DomainAuth';
import '../Style.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const loginResponse = await fetch('http://localhost:8080/api/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        const token = loginData.token;
        sessionStorage.setItem('token', token);
        navigate('/Sales');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please try again later.');
    }
  };

  const handleLoginSuccess = () => {
    console.log('Login success');
  };

  const handleLoginError = (error) => {
    console.error('Login error:', error);
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
      {error && <p className="error-message">{error}</p>}
      <div className="striped">
        <span className="striped-line"></span>
        <span className="striped-text">Or Sign In With</span>
        <span className="striped-line"></span>
      </div>
      <div className="social">
        <div>
          <DomainAuth />
        </div>
        <div>
          <AppleAuth onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
        <div>
          <GoogleAuth onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
        <div>
          <MicrososftAuth onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
      </div>
    </div>
  );
}

export default Login;