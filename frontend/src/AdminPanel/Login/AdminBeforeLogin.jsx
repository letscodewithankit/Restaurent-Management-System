import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';

export default function AdminBeforeLogin() {
  return (
    <>
    <Routes>
      <Route path='/admin' element={<AdminLogin/>} />
    </Routes>
    </>
  )
}
