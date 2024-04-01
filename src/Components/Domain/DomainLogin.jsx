import '../Style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const DomainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
            // Append '@cargoly.com' to the username before sending the request
            const response = await fetch('http://127.0.0.1:8080/api/domainLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ EmailID: email + '@cargoly.com', password }),
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
            setEmail('');
            setPassword('');
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className='sso'>
            <h2>Sign In With SSO</h2>
            <h6>Enter your company domain.</h6>
            <div className='login'>
                <form onSubmit={handleLogin}>
                    <TextField
                        label='Domain ID'
                        type='text'
                        id='email'
                        name='email'
                        variant="outlined"
                        className='kgf'
                        value={email}
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        InputProps={{
                            endAdornment: '@cargoly.com'
                        }}
                    />
                    <TextField
                        label='Password'
                        variant="outlined"
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
                {error && <p className="error-message">{error}</p>}

                <p style={{ color: '#747487' }}>By signing in, I agree to the <a href="#">Terms and Conditions</a>.</p>
                <p style={{ color: '#747487' }}>Dont have Company Domain <a href="/">Back to Login Page</a></p>
            </div>
        </div>
    );
}

export default DomainLogin;
