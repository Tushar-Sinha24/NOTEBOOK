
import { useState } from "react";
import noteContext from "./noteContext"

const NoteState =(props)=> {
  const host="http://localhost:5000";
    const notesInitial=[]


      const [notes,setNotes]=useState(notesInitial)

      //get All NOTES
      const getNotes = async()=>{
        //Todo: api Call
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
           headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3Y2YxNjljOTk1NzRiYWU5YjljMzAxIn0sImlhdCI6MTY1MjM1NTQ0M30.m9bH0xBK7bhwCWQ9bK39HEhQjHUJOioQxF6sMcBrOCY'
          }
        });
        const json=await response.json(); 
        setNotes(json)
      }


      //Add a note
      const addNote = async(title , description, tag)=>{
        //Todo: api Call
        //API CALL
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST',
           headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3Y2YxNjljOTk1NzRiYWU5YjljMzAxIn0sImlhdCI6MTY1MjM1NTQ0M30.m9bH0xBK7bhwCWQ9bK39HEhQjHUJOioQxF6sMcBrOCY'
          },
          body: JSON.stringify({title , description, tag}) 
        });
        const json=await response.json(); 
        

        const note=json;
        setNotes(notes.concat(note))
      }

      //Delete A node
       //api Call
       

      const deleteNote =async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
           headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3Y2YxNjljOTk1NzRiYWU5YjljMzAxIn0sImlhdCI6MTY1MjM1NTQ0M30.m9bH0xBK7bhwCWQ9bK39HEhQjHUJOioQxF6sMcBrOCY'
          },
        });
        const json=await response.json(); 
        console.log(json)

        const newNotes =notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }




      //Edit a node
      const editNote =async (id,title,description,tag)=>{
        //Api Call
        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
           headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3Y2YxNjljOTk1NzRiYWU5YjljMzAxIn0sImlhdCI6MTY1MjM1NTQ0M30.m9bH0xBK7bhwCWQ9bK39HEhQjHUJOioQxF6sMcBrOCY'
          },
          body: JSON.stringify({title , description, tag}) 
        });
        const json=await response.json(); 
        console.log(json)
        
        let newNotes=JSON.parse(JSON.stringify(notes))
      //Logic to edit the client
        for (let index = 0; index < notes.length; index++) {
          let element = newNotes[index];
          if(element._id ===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
          
        }
        setNotes(newNotes);
      }

    return(
    <noteContext.Provider value={{notes,addNote, deleteNote, editNote , getNotes}}>
        {props.children}
    </noteContext.Provider>
    );
}
export default NoteState;