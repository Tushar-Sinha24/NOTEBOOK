import React from 'react'
import {Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    
    const navigate=useNavigate();
    const loginButton=()=>{
        console.log("login")
        navigate('/login');
    }

    const signUpButton=()=>{
        console.log("signup")
        navigate('/signup');
    }
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    let location = useLocation();
    React.useEffect(() => {}, [location]);
    return (
        <div>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Notes</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname=== "/" ? "active" : "" }`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname=== "/about"? "active" :""}`} to="/about">About</Link>
                                </li>
                            </ul>
                            {!localStorage.getItem('token')?
                            <div className = "d-flex">
                                <button  onClick={loginButton} className="btn btn-primary mx-1 " >Login</button>
                                <button  onClick={signUpButton} className="btn btn-primary mx-1 ">Sign up</button>
                            </div>
                            :
                            <button onClick={handleLogout} className="btn btn-primary">Sign Out</button>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
