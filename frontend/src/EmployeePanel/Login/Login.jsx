
import React from 'react';
import AuthUser from '../AuthUser';



export default function Login() {

  const {http,setToken}=AuthUser();
  const handleSubmit=(e)=>
  {
    e.preventDefault();
    if((e.target[0].value!==null)&&(e.target[1].value!==null))
    {
      http.post('/login',{email:e.target[0].value,password:e.target[1].value})
      .then((res)=>
      {
      setToken(res.data.user,res.data.authorization.token);
      
      }
      )
    }
  }

  return (
  <div  style={{height:"571px",backgroundImage:`url(../image/10.jpg)`,backgroundSize:"900px"}}>
  <div  className="container p-4 ">
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div  className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src={'./image/6.jpg'}
                alt="login form"
                className="img-fluid"
                style={{ borderRadius: "1rem 0 0 1rem",height:"500px"}}
              />
            </div>
            <div  className="col d-flex align-items-center">
              <div className="card-body p-2 p-lg-5 text-black">
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                  <h5
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: 1 }}
                  >
                    Sign into your account
                  </h5>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example17"
                      className="form-control form-control-lg"
                      placeholder='Enter email'
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example27"
                      className="form-control form-control-lg"
                      placeholder='Enter password'
                      required
                    />
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-dark btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}
