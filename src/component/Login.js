import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const[credential,setCredential]=useState({email:'',password:''})
  const navigate = useNavigate();
  
  

  const handleLogin= async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
       headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:credential.email,password:credential.password})
    });
    const json=await response.json();
    
    if(json.success){
      //save the auth token and redirect
      console.log(json.authToken)
      localStorage.setItem('token',json.authToken);
      props.showAlert("Successfully Loged in","success");
      navigate('/');
    }
    else{
      props.showAlert("User Not Found","danger")
      
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })

  }

  return (
    <div style={{display:"flex",position:"absolute",top:'0', left:"0",height:'100%',width:"100%" }}>
      <div className="card shadow bg-white rounded" style={{width:"30rem" ,margin:"auto" }} >
      <div className='card-body'>
        <div className='text-center py-2'>
        <h3><strong>Login</strong></h3>
        </div>
      <form onSubmit={handleLogin} className="my-4 mx-2">
  <div className="form-group ">
    <label htmlFor="email">Email address</label>
    <input  type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input  type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-3" >Submit</button>
</form>
</div>
    </div>
    </div>
  )
}

export default Login

