import { FacebookProvider, LoginButton } from 'react-facebook';

import FacebookIcon from '../assets/facebook.svg'

export default function LoginButtonExample() {
  function handleLogin() {
  
    console.log('Logging in with Facebook...');
  }

  function handleSuccess(response) {
    console.log(response.status);
   
  }

  function handleError(error) {
    console.log(error);
   
  }

  return (
    <FacebookProvider appId="113289095462482">
      <LoginButton
        scope="email"
        onError={handleError}
        onSuccess={handleSuccess}
        style={{ border: 'none' }}
      >
        <div className="icon-wrapper" onClick={handleLogin}>
        <img src={FacebookIcon} alt="Google Icon" className="iconi"  />
          <span>Facebook</span>
        </div>
      </LoginButton>
    </FacebookProvider>
  );
}
