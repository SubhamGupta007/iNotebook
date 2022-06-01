import React from 'react'
import noteContext from '../context/notes/NoteContext'
import { useContext } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

const Home = () => {
  const context = useContext(noteContext)
  const {notes,setNotes} = context
  return (
    
    <>
    <div className='container'>
          
         
          <div className='container my-3'>
            
           
           <Notes/>
         
           
            
           
          </div>
    </div>
   
    </>
   
    
  )
}

export default Home