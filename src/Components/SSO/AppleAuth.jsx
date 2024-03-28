import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AppleLogin from 'react-apple-login';
import AppleIcon from '../assets/Apple.svg';

const AppleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  const onSuccess = () => {
    setIsLoggedIn(true);
    navigate('/Menu');
  };

  const onFailure = (error) => {
    console.log(error);
    // Handle failure if needed
  };

  return (
    <div className="icon-wrapper">
      <a href="https://appleid.apple.com/sign-in">
        <img src={AppleIcon} alt="Apple Icon" className="icon" />
        <span>Apple</span>
      </a>
      {isLoggedIn && <p>Logged in successfully!</p>}
      {!isLoggedIn && (
        <AppleLogin
          clientId="your-client-id"
          redirectURI="your-redirect-uri"
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={({ onClick }) => (
            <button onClick={onClick} className="apple-login-button">
              Login with Apple
            </button>
          )}
        />
      )}
    </div>
  );
};

export default AppleAuth;
