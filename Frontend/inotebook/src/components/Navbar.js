import React,{useEffect} from 'react'
import { useLocation } from "react-router-dom"


const Navbar = () => {
  

  const location = useLocation();

  useEffect(() => {
    // console.log(location);
  }, [location])

  const logout = () =>{
    localStorage.removeItem('token');
  }
  return (
    
    <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">iNotebook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className={`nav-link ${location.pathname==='/' ? "active" : "" }`} aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
        <a className={`nav-link ${location.pathname==='/about' ? "active" : "" }`} aria-current="page" href="/about">About</a>
        </li>
      
       
      </ul>
      
        {
          (!localStorage.getItem('token'))?
          <div>
          <a href="/login" className="btn btn-success btn-md active" role="button" aria-pressed="true">Login </a>
          <a href="/signup" className="btn btn-danger mx-1 btn-md active" role="button" aria-pressed="true">Signup</a>
          </div>:
          <div>
            <a href="" className="btn btn-danger btn-md active" role="button" aria-pressed="true" onClick={logout}>Logout </a>     
          </div>
        }
     
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar