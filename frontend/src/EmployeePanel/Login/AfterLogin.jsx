import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddData from '../Add/AddData';
import Main from '../Pos/Main';


function AfterLogin() {

  return (
    <>
        <Routes>
        <Route path='/pos' element={<Main/>}/>
        <Route path='/item' element={<AddData/>}/>
        </Routes>
    </>
    
  );
}

export default AfterLogin;
