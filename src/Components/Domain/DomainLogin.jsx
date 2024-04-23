import { useState, useEffect } from 'react'; 
import { Button, TextField, Typography } from '@mui/material'; 
import { MuiOtpInput } from 'mui-one-time-password-input';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    const [contact, setContact] = useState('');
    const [otpResent, setOtpResent] = useState(false); 
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(60);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/domainUsers');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                const user = userData.find(user => user.email === enteredEmail);
                if (user) {
                    setContact(user.contact);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        if (loggedIn && enteredEmail) {
            fetchUserData();
        }
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

    useEffect(() => {
        console.log("Error state:", error);
      }, [error]);
      
      useEffect(() => {
        console.log("Success state:", success);
      }, [success]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/domainLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email + '@gmail.com', password }),
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
            setEnteredEmail(email + '@gmail.com');
            setOtpResent(true); 
        } catch (err) {
            console.error('Error logging in:', err);
            setEmail('');
            setPassword('');
            setError(err instanceof TypeError ? 'Network error. Please check your internet connection.' : 'Invalid email or password');
            setLoading(false);
        }
    };

    const handleOtpValidation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/validateOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailOtp }), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to validate OTPs');
            }
    
            const data = await response.json();
            const isValid = data.isValid;
    
            if (isValid) {
                navigate('/Menu');
            } else {
                setError('You have entered a wrong code...Please try again!');
                setTimeout(() => {
                    setError('');
                }, 30000); 
            }
        } catch (err) {
            console.error('Error validating OTPs:', err);
            setError('Failed to validate OTPs. Please try again.');
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
                body: JSON.stringify({ email: enteredEmail, contact }), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to resend OTP');
            }
        
            setSuccess('Verification code was sent successfully');
            setOtpResent(true);
            setCountdown(60); 
        
            setTimeout(() => {
                setSuccess('');
            }, 10000); 
        } catch (err) {
            console.error('Error resending OTP:', err);
            setError('Failed to resend OTP. Please try again.');
            setTimeout(() => {
                setError('');
            }, 10000);
        }
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
                        <h6>Enter the verification code sent to:</h6>
    
                            <img src={OTPI} alt="otp Icon" className="icona" />
                            <h6>Email ID: {enteredEmail}</h6>
                            <form onSubmit={handleOtpValidation}>
                                <MuiOtpInput className="otp" value={emailOtp} autoFocus={true}  onChange={handleEmailOtpChange} />                               
                                <Button className='verify' variant='contained' color='primary' type='submit' disabled={loading || !emailOtp}>
                                {loading ? 'Validating...' : 'Validate OTP'}
                                </Button>
                            </form>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">{success}</p>}
                            <Typography component="p" sx={{ color: '#747487' }}>Didnt receive a code? {countdown > 0 ? (<Typography variant="body2" color="primary">wait for {countdown} seconds</Typography>) : (<Button variant="text" color="primary" onClick={handleResendOtp}>Resend</Button>)}</Typography>
                            
                          
                        </CardContent>
                    </Card>
                </div>     
            )}
        </div>
    );
};

export default DomainLogin;
