import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Popup from '../modal/Popup';

import AddNote from './AddNote';
import Notesitem from './Notesitem';

function Notes() {

  const [popup, setPopup] = useState(false)
  const [note, setNote] = useState({ _id: "", etitle: "", edescription: "", etag: "default" })

  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, []);

  

  const updateNote = (_note) => {
    setPopup(true)
    
    setNote({ _id: _note._id, etitle: _note.title, edescription: _note.description, etag: _note.tag })
  }



  const handleSubmit = (e) => {
    editNote(note._id, note.etitle, note.edescription, note.etag)
    e.preventDefault()
    setPopup(false)
    
    
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <>

      <AddNote />
      <div className="row my-4">
        <h1>Your Notes</h1>
        {notes.map((notes) => {
          return <Notesitem key={notes._id} updateNote={updateNote} note={notes} />;
        })}
      </div>

      <Popup trigger={popup} setTrigger={setPopup} >
        <h3>Edit Notes</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} defaultValue={note.etitle} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} defaultValue={note.edescription} minLength ={5} required/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Edit</button>
        </form>
      </Popup>

    </>
  )
}

export default Notes
