import React from 'react'

const Notesitem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div class="card my-3" >
                <div class="card-body">
                    <h4 class="card-title">{note.title}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{note.description}</h6>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Notesitem
