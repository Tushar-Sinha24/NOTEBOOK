import React , { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Notesitem from './Notesitem';

function Notes() {
    const context=useContext(noteContext)
    const {notes ,getNotes}=context;
    useEffect(()=>{
      getNotes()
    },[]);
  return (
    <>
    <AddNote/>
    <div>
      <div className="row my-4">
        <h1>Your Notes</h1>
        {notes.map((notes)=>{
          return <Notesitem key={notes._id} note={notes}/>;
        })}
        </div>
    </div>
    </>
  )
}

export default Notes
