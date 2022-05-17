
import { useState } from "react";
import noteContext from "./noteContext"

const NoteState =(props)=> {
    const notesInitial=[
        {
          "_id": "627e48bb5518c44fbee4afe4",
          "user": "627cf169c99574bae9b9c301",
          "title": "my Title",
          "description": " bla baks bsdjn dasd asd  nkjlsa",
          "tag": "Youtube",
          "date": "1652443323405",
          "__v": 0
        },
        {
          "_id": "62829b37fb7e827bb82a9deb",
          "user": "627cf169c99574bae9b9c301",
          "title": "my Title2",
          "description": " bla baks bsdjn  nkjlsa",
          "tag": "General",
          "date": "1652726583026",
          "__v": 0
        },
        {
          "_id": "62829b3cfb7e827bb82a9ded",
          "user": "627cf169c99574bae9b9c301",
          "title": "my Title3",
          "description": " bla baks bsdjn  nkjlsa",
          "tag": "General",
          "date": "1652726588604",
          "__v": 0
        },
        {
          "_id": "62829b3cfb7e827bb82a9ded",
          "user": "627cf169c99574bae9b9c301",
          "title": "my Title3",
          "description": " bla baks bsdjn  nkjlsa",
          "tag": "General",
          "date": "1652726588604",
          "__v": 0
        },
        {
          "_id": "62829b3cfb7e827bb82a9ded",
          "user": "627cf169c99574bae9b9c301",
          "title": "my Title3",
          "description": " bla baks bsdjn  nkjlsa",
          "tag": "General",
          "date": "1652726588604",
          "__v": 0
        },
        {
          "_id": "62829b3cfb7e827bb82a9ded",
          "user": "627cf169c99574bae9b9c301",
          "title": "my Title3",
          "description": " bla baks bsdjn  nkjlsa",
          "tag": "General",
          "date": "1652726588604",
          "__v": 0
        }
      ]

      const [notes,setNotes]=useState(notesInitial)
    return(
    <noteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </noteContext.Provider>
    );
}
export default NoteState;