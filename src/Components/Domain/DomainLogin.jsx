import '../Style.css';
import * as React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import OTPI from '../assets/otp.svg';


const DomainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [otp, setOtp] = React.useState('');
    const [enteredEmail, setEnteredEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

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

            setEmail('');
            setPassword('');
            setError('');
            setLoading(false);
            setLoggedIn(true);
            setEnteredEmail(email); // Store entered email
        } catch (err) {
            console.error('Error:', err);
            setEmail('');
            setPassword('');
            setError(err instanceof TypeError ? 'Network error. Please check your internet connection.' : 'Invalid email or password');
            setLoading(false);
        }
    };

    const handleOtpValidation = async (e) => {
        e.preventDefault();
        // Add your OTP validation logic here
    };

    const handleChange = (newValue) => {
        setOtp(newValue);
    };

    return (
        <div className='sso'>
            {!loggedIn && (
    <div>
    <Card className='ssoslidea' sx={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)' }}>
        <CardContent> 
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
                            <Button className='kgf' variant='contained' color='primary' type='submit' disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                        {error && <p className="error-message">{error}</p>}

                        <p style={{ color: '#747487' }}>By signing in, I agree to the <a href="#">Terms and Conditions</a>.</p>
                        <p style={{ color: '#747487' }}>Dont have a Company Domain <a href="/">Back to Login Page</a></p>
                    </div>
                    </CardContent>
    </Card>
</div>     
            )}
            {loggedIn && (
                <div>
    <Card className='ssoslideb' sx={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)' }}>
        <CardContent>      
                          <img src={OTPI} alt="otp Icon" className="icona" />
                     <h6>Enter the verification code sent to: {enteredEmail}@cargoly.com</h6>
                    <form onSubmit={handleOtpValidation}>
                        <MuiOtpInput className="otp" value={otp} autoFocus={true}  onChange={handleChange} />

                        <Button className='verify' variant='contained' color='primary' type='submit' disabled={loading}>
                            {loading ? 'Logging in...' : 'Validate OTP'}
                        </Button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p style={{ color: '#747487' }}>Didnt receive a code? <a href="/">Resend</a></p>
                    <p style={{ color: '#747487' }}>By signing in, I agree to the <a href="#">Terms and Conditions</a>.</p>

                    </CardContent>
    </Card>
</div>     
       )}
        </div>
    );
};

export default DomainLogin;
