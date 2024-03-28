import { useState } from 'react';
import {
  Button,
  TextField,
} from '@mui/material';
import GoogleAuth  from '../SSO/GoogleAuth';
import MicrososftAuth from '../SSO/Micrososft';
import AppleAuth from '../SSO/AppleAuth';
import DomainAuth from '../SSO/DomainAuth';
import '../Style.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setError('');
        setSuccessMessage('Your account has been successfully created');
        setUsername('');
        setPassword('');
        setTimeout(() => setSuccessMessage(''), 5000); 
      } else {
        const data = await response.json();
        setToken('');
        setUsername('');
        setPassword('');
        setError(data.error);
        setSuccessMessage('');
        setTimeout(() => setError(''), 5000);
      }
    } catch (err) {
      console.error('Error:', err);
      setToken('');
      setUsername('');
      setPassword('');
      setError('An error occurred. Please try again later.');
      setSuccessMessage('');
      setTimeout(() => setError(''), 5000);
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
      <form onSubmit={handleSignUp}>
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
          Sign Up
        </Button>
      </form>
      {token && <p>Token: {token}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="striped">
        <span className="striped-line"></span>
        <span className="striped-text">Or Sign In With</span>
        <span className="striped-line"></span>
      </div>
      <div className="social">
       
  <div>
    <DomainAuth  />
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

export default SignUp;
