import React , { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';

function Notes() {
    const context=useContext(noteContext)
    const {notes,setNotes}=context;
  return (
    <div>
      <div className="row my-4 ">
        <h1>Your Notes</h1>
        {notes.map((notes)=>{
          return <Notesitem note={notes}/>;
        })}
        </div>
    </div>
  )
}

export default Notes
