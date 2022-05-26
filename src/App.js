import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import {Home} from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import { useState } from "react";

function App() {

  const[alert,setAlert]=useState("")
    const showAlert=(message,type)=>{
      setAlert({
        msg:message,
        type:type
      })
      setTimeout(()=>{
        setAlert(null)
      },1500)
    }

  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Alert message={"Alert"}/>
          <div className="container">
          <Routes>
            <Route path='/*' element={<Home showAlert={showAlert}/>} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login showAlert={showAlert}/>} />
            <Route path='/signup' element={<SignUp showAlert={showAlert}/>} />
          </Routes>
          </div>
        </Router>

      </NoteState>
    </>

  );
}

export default App;
