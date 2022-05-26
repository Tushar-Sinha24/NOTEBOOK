import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [credential, setCredential] = useState({name: '', email: '', password: '',cpassword:''  })
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const {name,email,password}=credential;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email,password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.token)
      navigate('/');
    }
    else {
      alert("Invalid credential")
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })

  }


  return (
    <div style={{ display: "flex", position: "absolute", top: '0', left: "0", height: '100%', width: "100%" }}>
      <div className="card shadow bg-white rounded" style={{ width: "30rem", margin: "auto" }} >
        <div className='card-body'>
          <div className='text-center py-2'>
            <h3><strong>Sign Up</strong></h3>
          </div>
          <form className="my-4 mx-2" onSubmit={handleSignup}>
            <div className="form-group ">
              <label htmlFor="name">Full Name</label>
              <input type="text" className="form-control" id="name" name="name" aria-describedby="name" placeholder="Enter Your full name" onChange={onChange} />
            </div>
            <div className="form-group ">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder="Confirm password" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary my-3" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
