import '../Style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const DomainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://127.0.0.1:8080/api/domainLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email + '@cargoly.com', password }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
    
            const data = await response.json();
            const receivedToken = data.token; 
    
            localStorage.setItem('token', receivedToken);
    
            setError('');
            navigate('/Menu');
        } catch (err) {
            console.error('Error:', err);
            setEmail('');
            setPassword('');
            if (err instanceof TypeError) {
                setError('Network error. Please check your internet connection.');
            } else {
                setError('Failed to log in. Please check your credentials and try again.');
            }
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
                {error && <p className="error-message">{error}</p>}

                <p style={{ color: '#747487' }}>By signing in, I agree to the <a href="#">Terms and Conditions</a>.</p>
                <p style={{ color: '#747487' }}>Dont have Company Domain <a href="/">Back to Login Page</a></p>
            </div>
        </div>
    );
}

export default DomainLogin;
