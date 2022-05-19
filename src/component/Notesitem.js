import React, { useContext  } from 'react'
import noteContext from '../context/notes/noteContext';

const Notesitem = (props) => {



    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note,updateNote} = props;
    
    return (<>
    
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h4 className="card-title">{note.title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{note.description}</h6>
                    <div className="d-flex flex-row justify-content-end">
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> updateNote(note)}></i>
                        
                    </div>
                </div>
            </div>
        </div>
        
    </>
    )
}

export default Notesitem
