import React from 'react';
import './App.css';
import AuthUser from './EmployeePanel/AuthUser';
import AfterLogin from './EmployeePanel/Login/AfterLogin';
import BeforeLogin from './EmployeePanel/Login/BeforeLogin';


function App() {

  const {getToken}=AuthUser();
  if(!getToken())
  {
    return <BeforeLogin/>
  }

  return (
    <>
    <AfterLogin/>
    </>
    
  );
}

export default App;
