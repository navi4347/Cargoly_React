import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; 
import MicrosoftLogin from "react-microsoft-login";
import MicrosoftIcon from '../assets/Microsoft.svg';

const Microsoft = ({ onSuccess }) => {
  const navigate = useNavigate(); 

  const handleSuccess = (response) => {
    const token = response.token; 
    localStorage.setItem('token', token); 
    if (typeof onSuccess === 'function') {
      onSuccess(response);
      navigate('/Sales'); 
    } else {
      console.error('onSuccess is not a function');
    }
  };

  const authHandler = (err, data) => {
    if (err) {
      console.error('Microsoft login error:', err);
    } else {
      handleSuccess(data);
    }
  };

  return (
    <div className="icon-wrapper">
      <MicrosoftLogin
        clientId="b0488e09-96c9-4342-ad0c-7463c7bbb023"
        authCallback={authHandler}
      >
        <img src={MicrosoftIcon} alt="Microsoft Icon" className="iconi" />
        <span>Microsoft</span>
      </MicrosoftLogin>
    </div>
  );
};

Microsoft.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Microsoft;
