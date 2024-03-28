import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom'; 


const DomainAuth = () => {
  const navigate = useNavigate(); 

   
  const login = () => {
  navigate('/Domain');
  }
  
  return (
    <div className="icon-wrapper" onClick={login}>
    <KeyIcon className="iconi" />
    <span>SSO</span>
  </div>
  )
}

export default DomainAuth