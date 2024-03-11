import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import SignUp from './SignUp';

import '../Style.css'; 

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className='Auth'>
      <div className='aleft'></div>
      <div className='container aright'>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="authentication tabs">
          <Tab className="taba" label="Login" />
        
          <Tab className="tabb"label="SignUp" />
        </Tabs>
        {tabIndex === 0 && <div><Login /></div>}
        {tabIndex === 1 && <div><SignUp /></div>}
      </div>
    </div>
  );
};

export default Auth;
