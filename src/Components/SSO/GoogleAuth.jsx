import { GoogleLogin } from '@react-oauth/google';
import '../Style.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GoogleAuth = ({ onSuccess, onError }) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    if (typeof onSuccess === 'function') {
      onSuccess();
      navigate('/Menu');
    } else {
      console.error('onSuccess is not a function');
    }
  };

  return (
    <>
      <GoogleLogin
        clientId="556403120176-00stpvlv9kfjfph7kji6h0g5dp90nrm4.apps.googleusercontent.com"
        onSuccess={handleSuccess}
        onError={onError}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};

GoogleAuth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default GoogleAuth;