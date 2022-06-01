import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import {AiFillDelete} from "react-icons/ai"
import {BsPencilSquare} from "react-icons/bs"

const NoteItem = (props) => {
    console.log(props);
    const {note,updateNote}= props
    // console.log(note);
    const context = useContext(noteContext)
    const {deleteNote} = context
  return (
   <>
  <div className='col-md-3 mb-3'>
        <div className="card" >
        
            <div className="card-body">
                <h5 className="card-title">{note.title} <span className='me-auto'>   
                <button className="btn mx-1" onClick={()=>deleteNote(note._id)}><AiFillDelete size={22} /></button>
                <button className="btn" onClick={()=>updateNote(note)}><BsPencilSquare size={22}/></button>
                </span></h5>
                <p className="card-text"> {note.description}</p>
                
                
                
               
                
            </div>
        </div>
  </div>
   
   </>
  )
}

export default NoteItem