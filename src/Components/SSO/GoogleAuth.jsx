import { useGoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; 
import GoogleIcon from '../assets/Google.svg'

const GoogleAuth = ({ onSuccess }) => {
  const navigate = useNavigate(); 
  const handleSuccess = () => {
    if (typeof onSuccess === 'function') {
      onSuccess();
      navigate('/Sales'); 
    } else {
      console.error('onSuccess is not a function');
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess, 
  });

  return (
    <div className="icon-wrapper" onClick={login}>
      <img src={GoogleIcon} alt="Google Icon" className="iconi" />
      <span>Google</span>
    </div>
  );
};

GoogleAuth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default GoogleAuth;
