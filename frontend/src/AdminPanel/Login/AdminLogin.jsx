import React from 'react';

export default function AdminLogin() {
  return (
    <>
    <div className="card"></div>
    <div className="container p-5">
      <div style={{textAlign:"center"}}>Admin Panel</div>
      <br/>
      <div className="card">
            <div className="card-body">
            <div className="row">
            <div className="col">
            <input type="email" className="form-control" placeholder='Enter email'/>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col">
            <input type="password" className="form-control" placeholder='Enter password' />
            </div>
          </div>
          <br/>
          <div className="row">
          <div className="col">
          <button type='submit' className="btn btn-primary">Sign In</button>
          </div>
          </div>
        </div>
      </div>
    </div>

    

    </>
  )
}
