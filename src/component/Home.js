import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';

export const Home = (props) => {

 
    return (
      <div>
        <Notes showAlert={props.showAlert}/>
        
      </div>
    )
  
}
