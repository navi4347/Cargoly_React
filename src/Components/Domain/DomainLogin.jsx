import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, Box } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import OTPI from '../assets/otp.svg';
import { useNavigate } from 'react-router-dom';

const DomainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailOtp, setEmailOtp] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [otpResent, setOtpResent] = useState(false); 
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(60);
    const [success, setSuccess] = useState('');

    const setSessionStorageItem = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    const getSessionStorageItem = (key) => {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    };

    useEffect(() => {
        const isLoggedIn = getSessionStorageItem('loggedIn');
        const storedEmail = getSessionStorageItem('enteredEmail');
        if (isLoggedIn && storedEmail) {
            setLoggedIn(isLoggedIn);
            setEnteredEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        setSessionStorageItem('loggedIn', loggedIn);
        setSessionStorageItem('enteredEmail', enteredEmail);
    }, [loggedIn, enteredEmail]);

    useEffect(() => {
        let timer;
        if (otpResent && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpResent, countdown]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/domainLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: `${email}@gmail.com`, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();
            sessionStorage.setItem('token', data.token);

            setEmail('');
            setPassword('');
            setError('');
            setLoading(false);
            setLoggedIn(true);
            setEnteredEmail(`${email}@gmail.com`);
            setOtpResent(true);
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Network error or invalid credentials. Please try again.');
            setLoading(false);
        }
    };

    const handleOtpValidation = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/validateOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailOtp }), 
            });

            if (!response.ok) {
                throw new Error('Failed to validate OTP');
            }

            const data = await response.json();
            if (data.isValid) {
                navigate('/Menu');
            } else {
                setError('Invalid OTP. Please try again.');
                setTimeout(() => setError(''), 30000);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error validating OTP:', err);
            setError('Failed to validate OTP. Please try again.');
            setLoading(false);
        }
    };

    const handleEmailOtpChange = (newValue) => {
        setEmailOtp(newValue);
    };

    const handleResendOtp = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/resendOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: enteredEmail }), 
            });

            if (!response.ok) {
                throw new Error('Failed to resend OTP');
            }

            setSuccess('Verification code sent successfully');
            setOtpResent(true);
            setCountdown(60);
            setTimeout(() => setSuccess(''), 10000);
        } catch (err) {
            console.error('Error resending OTP:', err);
            setError('Failed to resend OTP. Please try again.');
            setTimeout(() => setError(''), 10000);
        }
    };

    return (
        <div className='sso'>
        {!loggedIn && (
            <div>
                <Card className='ssoslidea' sx={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)' }}>
                    <CardContent>
                        <Typography variant="h4">Sign In With SSO</Typography>
                        <Typography variant="subtitle1">Enter your company domain.</Typography>
                        <div className='login'>
                        <form onSubmit={handleLogin} className='login'>
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
                                    endAdornment: '@gmail.com'
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

                            {error && <Typography color="error">{error}</Typography>}
                            <Typography sx={{ color: '#747487' }}>By signing in, I agree to the <a href="#">Terms and Conditions</a>.</Typography>
                            <Typography sx={{ color: '#747487' }}>Dont have a Company Domain? <a href="/">Back to Login Page</a></Typography>
                  </div>
                    </CardContent>
                </Card>
                            </div>     
                        )}
                        {loggedIn && (
                            <div>
            

                <Card className='ssoslideb' sx={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)' }}>
                    <CardContent>
                        <Typography variant="subtitle1">Enter the verification code sent to:</Typography>
                        <img src={OTPI} alt="OTP Icon" className="icona" />
                        <Typography variant="subtitle1">Email ID: {enteredEmail}</Typography>
                        <form onSubmit={handleOtpValidation}>
                            <MuiOtpInput className="otp" value={emailOtp} autoFocus={true} onChange={handleEmailOtpChange} />
                            <Button className='verify' variant='contained' color='primary' type='submit' disabled={loading || !emailOtp}>
                                {loading ? 'Validating...' : 'Validate OTP'}
                            </Button>
                            {error && <Typography color="error">{error}</Typography>}
                            {success && <Typography sx={{ color: 'green' }}>{success}</Typography>}
                            <Box sx={{ color: '#747487' }}>
                                <Typography sx={{ display: 'inline' }}>Didnt receive a code? </Typography>
                                {countdown > 0 ? (
                                    <Typography variant="body2" color="primary" sx={{ display: 'inline' }}>wait for {countdown} seconds</Typography>
                                ) : (
                                    <Button variant="text" color="primary" onClick={handleResendOtp} disabled={countdown > 0}>
                                        Resend
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </CardContent>
                </Card>
                </div>     
            )}
        </div>
    );
};

export default DomainLogin;
