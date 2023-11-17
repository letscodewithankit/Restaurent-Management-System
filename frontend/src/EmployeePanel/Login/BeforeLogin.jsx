import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './Login';


function BeforeLogin() {

  return (
    <>

   
        <Routes>
        <Route path='/' element={<Login/>}/>
        </Routes>
    
    </>
    
  );
}

export default BeforeLogin;
