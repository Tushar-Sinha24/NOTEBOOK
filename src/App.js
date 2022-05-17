import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import {Home} from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <div className="container">
          <Routes>
            <Route path='/*' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
          </div>
        </Router>

      </NoteState>
    </>

  );
}

export default App;
